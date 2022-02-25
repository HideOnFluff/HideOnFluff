<script>
import axios from "axios";
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  name: "Chart",
  props: ['query'],
  data(){
    return{
      gradient: null,
      data:{
        labels:[],
        datasets:[],
      },
      options: {

      }
    }
  },
  watch:{
    query(value){
      this.gradientGenerator();
      this.data.datasets = [];
      axios.get(value)
          .then(response =>{
            this.data.labels = response.data.hourly.time;
            for (const key in response.data.hourly){
              if (key!=='time') {
                this.data.datasets.push({
                  label: key,
                  data: response.data.hourly[key],
                  borderColor: 'rgba(17, 130, 249, 1)',
                  pointBackgroundColor: 'white',
                  pointBorderColor: 'white',
                  backgroundColor: this.gradient,
                })
              }
            }
            this.renderChart(this.data,{responsive: true, maintainAspectRatio: false, scales: {
              }
            });
          })
          .catch(error=>{
            console.log(error.response)
          });
    },
      deep: true
    },
  methods: {
    gradientGenerator(){
      this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      this.gradient.addColorStop(0, 'rgba(17, 130, 249, 0.9)')
      this.gradient.addColorStop(0.5, 'rgba(17, 130, 249, 0.25)');
      this.gradient.addColorStop(1, 'rgba(17, 130, 249, 0)');
    }
  },
  mounted () {


  }
}


</script>

<style scoped>
line-chart{
  overflow-x: scroll;
}
</style>