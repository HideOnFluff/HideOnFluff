
<script>
import axios from "axios";
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  name: "Chart",
  props: ['query'],
  data(){
    return{
      data:{
        labels:[],
        datasets:[],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  watch:{
    query(value){
      axios.get(value)
          .then(response =>{
            this.data.labels = response.data.hourly.time;
            for (const key in response.data.hourly){
              this.data.datasets.push({
                label: key,
                data: response.data.hourly[key],
                    borderColor: 'rgb(75, 192, 192)',
                fill: false,
                pointStyle: 'line'
              })
            }
              this.renderChart(this.data, this.options)
          })
          .catch(error=>{
            console.log(error.response)
          })
    },
      deep: true
    },
}


</script>

<style scoped>

</style>