<template>
  <div id="app">
    <b-container fluid="md">
      <b-row>
        <b-col>
            <Coordinates
                @update:coords="getCords"
                v-bind:response="response"
            />
              <div class="scroll">
                <chart
                    :width="3000"
                    v-bind:chartData="response"
                    v-bind:chartType="chartType"
                />
              </div>
            <Settings class="mt-4" @update:settings="getSettings"/>
            <hr>
            <label>API URL (<a v-bind:href="query" target="_blank">Open in new tab</a>)</label>
            <b-form-input v-model="query" readonly></b-form-input>
            <small class="form-text text-muted">You can copy this API URL into your application.</small>
            <Checkboxes @update:parameters="getParameters"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Coordinates from './components/Coordinates';
import Checkboxes from './components/Checkboxes';
import Settings from './components/Settings';
import Chart from './components/Chart';
import axios from "axios";
export default {
  name: 'App',
  components: {
    Coordinates,
    Checkboxes,
    Settings,
    Chart,
  },
  data() {
    return {
      query:'https://api.open-meteo.com/v1/forecast?',
      watching:{
        coordinates:{},
        settings:{
          current_weather: true,
        },
        parameters:{
          hourly: [],
          daily: []
        }
      },
      chartType: null,
      response: {}
    }

  },

  watch:{

    watching: {
      handler(value) {
          if (value.coordinates.latitude && value.coordinates.longitude){
            if (this.query !== 'https://api.open-meteo.com/v1/forecast?') this.query = 'https://api.open-meteo.com/v1/forecast?';
              this.query += `latitude=${this.watching.coordinates.latitude}&longitude=${this.watching.coordinates.longitude}`;
              if (this.watching.parameters){
                if (this.watching.parameters.hourly.length>=1) this.query += `&hourly=${this.watching.parameters.hourly}`;
                if (this.watching.parameters.daily.length>=1){
                  this.query += `&daily=${this.watching.parameters.daily}`;
                  if(!this.watching.settings.timezone) this.query += "&timezone=UTC";
                }
            }
            if (this.watching.settings){
              for (const key in this.watching.settings){
                if (this.watching.settings[key]) this.query += `&${key}=${this.watching.settings[key]}`;
              }
            }
          }
          else console.log('im watching but I need both coords')
      },
      deep: true
    },
    query(value) {
      axios.get(value)
          .then(response => {
            this.response = response
          })
          .catch(error => {
            console.log(error.response)
          });
    }
  },

  methods:{
      getCords(coordinates) {
        this.watching.coordinates = coordinates;
      },

    getSettings(settings) {
        this.watching.settings = settings.selected;
        this.chartType = settings.chartType;
    },

      getParameters(parameters) {
       this.watching.parameters = parameters;
    },
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.scroll{
  overflow-x: scroll;
  white-space: nowrap;
}

</style>
