<script>
import moment from 'moment'
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
        tooltips: { mode: 'index', intersect: false, yAlign: 'center'},
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
        this.data.datasets = [];
        if (value.chartType){
          this.chartDataGenerator(value.chartData.data.daily);
          this.chartUnitsGenerator(value.chartData.data["daily_units"])
          this.options.responsive = true;
        }
        else {
          this.chartDataGenerator(value.chartData.data)
          this.chartUnitsGenerator(value.chartData.data["hourly_units"])
          this.options.responsive = false;
        }

        this.renderChart(this.data, this.options);
      }
            },
      deep: true
    },
  methods: {
    chartDataGenerator(value){
      if (value){
        this.data.labels = this.dateFormating(value.hourly.time);
        for (const key in value.hourly) {
          if (key !== 'time') {
            this.data.datasets.push({
              label: key,
              data: value.hourly[key],
              yAxisID: value.hourly_units[key],
              fill: false
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
    },
    dateFormating(a){
      let time = [];
      for (const key in a) {
        time[key] = moment(a[key]).format('MMMM Do, YYYY - hh:mm A');
      }
      return time;
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