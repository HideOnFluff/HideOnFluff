<template>
  <div id="app">
    <b-container fluid="md">
      <b-row>
        <b-col>
            <Coordinates @update:coords="getCords"></Coordinates>
            <CheckBoxes @update:parameters="getParameters"></CheckBoxes>
            <button @click="sendURL">Preview Data</button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
 import Coordinates from './components/Coordinates.vue';
 import CheckBoxes from './components/CheckBoxes.vue';
 import axios from "axios";
// import Settings from './components/Settings.vue';
// import Chart from './components/Chart.vue';
export default {
  name: 'App',
  components: {
    Coordinates,
    CheckBoxes,
    //Settings,
    //Chart,
  },
  data() {
    return {
      latitude: '',
      longitude: '',
      hourlyArray: [],
      dailyArray: [],

    }

  },
  methods:{
      getCords(lat, long) {
        this.latitude = lat;
        this.longitude = long;
      },


      getParameters(hourlyParam, dailyParam) {
       this.hourlyArray = hourlyParam;
        this.dailyArray = dailyParam;
      console.log(this.hourlyArray, this.dailyArray);
    },

      sendURL(){
        console.log([this.hourlyArray, this.dailyArray, this.latitude, this.longitude])
      },

  },

  mounted:
      function request(){
        axios.get('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,cloudcover_mid,cloudcover_high,shortwave_radiation&daily=winddirection_10m_dominant,shortwave_radiation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=ms&precipitation_unit=inch&timezone=America%2FChicago&past_days=1')
         .then(response =>{
           console.log(response.data)
         })
         .catch(error=>{
          console.log(error.response)
    })
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



</style>
