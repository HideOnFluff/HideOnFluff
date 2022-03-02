<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  name: "Chart",
  props: {
    chartData: {
      type: Object
    },
  },
  data(){
    return{
      gradient: null,
      data:{
        labels:[],
        datasets:[],
      }
    }
  },
  watch:{
    chartData:{
      handler(value) {
        console.log(value)
        this.gradientGenerator();
        this.data.datasets = [];
        this.data.labels = this.chartData.data.hourly.time;
        for (const key in this.chartData.data.hourly) {
          if (key !== 'time') {
            this.data.datasets.push({
              label: key,
              data: this.chartData.data.hourly[key],
              borderColor: 'rgba(17, 130, 249, 1)',
              pointBackgroundColor: 'white',
              pointBorderColor: 'white',
              backgroundColor: this.gradient,
            })
          }
        }
        this.renderChart(this.data, {responsive: true, maintainAspectRatio: false});
      }
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
  mounted(){
            this.renderChart(this.data, {responsive: true, maintainAspectRatio: false});
  }
}


</script>

<style scoped>
line-chart{
  overflow-x: scroll;
}
</style>