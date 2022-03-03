<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  name: "Chart",
  props: {
    chartData: {},
    chartType: null
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
    changeData:{
      handler(value) {
        this.gradientGenerator();
        this.data.datasets = [];
        if (value.chartType){
          this.data.labels = value.chartData.data.daily.time;
          for (const key in value.chartData.data.daily) {
            if (key !== 'time') {
              this.data.datasets.push({
                label: key,
                data: value.chartData.data.daily[key],
                borderColor: 'rgba(17, 130, 249, 1)',
                pointBackgroundColor: 'white',
                pointBorderColor: 'white',
                backgroundColor: this.gradient,
              })
            }
          }
        }
        else{
          this.data.labels = value.chartData.data.hourly.time;
          for (const key in value.chartData.data.hourly) {
            if (key !== 'time') {
              this.data.datasets.push({
                label: key,
                data: value.chartData.data.hourly[key],
                borderColor: 'rgba(17, 130, 249, 1)',
                pointBackgroundColor: 'white',
                pointBorderColor: 'white',
                backgroundColor: this.gradient,
              })
            }
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
  },
  computed: {
    changeData() {
      const {chartData, chartType} = this
      return {
        chartData,
        chartType
      }
    }
  }
}


</script>

<style scoped>
line-chart{
  overflow-x: scroll;
}
</style>