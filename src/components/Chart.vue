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
      },
      options:{
        scales: {
          yAxes: [],
        },
        responsive: false,
        maintainAspectRatio: false,
        legend: {
          align: 'start',
        },
        plugins: {
          colorschemes: {
            scheme: 'brewer.YlGnBu9'
          }

        }
      }
    }
  },
  watch:{
    changeData:{
      handler(value) {
        //this.gradientGenerator(); //Disabled since now I have a library for the colors yet I'd like to reimplement this in the future.
        this.data.datasets = [];
        if (value.chartType){
          this.chartDataGenerator(value.chartData.data.daily);
          this.chartUnitsGenerator(value.chartData.data["daily_units"])
          this.options.responsive = true;
        }
        else {
          this.chartDataGenerator(value.chartData.data.hourly)
          this.chartUnitsGenerator(value.chartData.data["hourly_units"])
          this.options.responsive = false;
        }

        this.renderChart(this.data, this.options);
      }
            },
      deep: true
    },
  methods: {
    // gradientGenerator(){
    //   this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    //   this.gradient.addColorStop(0, 'rgba(17, 130, 249, 0.9)')
    //   this.gradient.addColorStop(0.5, 'rgba(17, 130, 249, 0.25)');
    //   this.gradient.addColorStop(1, 'rgba(17, 130, 249, 0)');
    // },
    chartDataGenerator(value){
      if (value){
        this.data.labels = value.time;
        for (const key in value) {
          if (key !== 'time') {
            this.data.datasets.push({
              label: key,
              data: value[key],
              fill: false
             // backgroundColor: this.gradient,
            })
          }
        }
      }

    },
    chartUnitsGenerator(value){
      this.options.scales.yAxes = [];
      for (const key in value){
        if (key !== 'time'){
          this.options.scales.yAxes.push({
            id: value[key],
            type: "linear",
            position: "left",
            scaleLabel: {
              display: true,
              labelString: value[key],
            },
            ticks: {
              stepSize: 1,
              maxTicksLimit: 8,
            }
          });
        }
      }
    }
  },
  mounted(){
            this.renderChart(this.data, this.options);
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