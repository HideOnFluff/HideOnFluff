<template>
  <div>

    <b-form-group label="Hourly Weather Variables" v-slot="{ ariaDescribedby }" label-size="lg" label-align-sm="left" label->
      <b-form-checkbox-group
          id="checkboxHourly"
          v-model="selected.hourly"
          :options="options.hourly"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
      ></b-form-checkbox-group>
    </b-form-group>

    <b-form-group label="Daily Weather Variables" v-slot="{ ariaDescribedby }" label-size="lg" label-align-sm="left">
    <b-form-checkbox-group
        id="checkboxDaily"
        v-model="selected.daily"
        :options="options.daily"
        :aria-describedby="ariaDescribedby"
        name="flavour-1"
    ></b-form-checkbox-group>
  </b-form-group>
  </div>
</template>

<script>
export default {
  name: "CheckBoxes",
  data() {
    return {
      selected: {
        hourly: [],
        daily: []
      },
      options:{
          hourly: [
          {text: 'Temperature (2 m)', value: 'temperature_2m'},
          {text: 'Cloudcover Total', value: 'cloudcover'},
          {text: 'Wind Speed (10 m)', value: 'windspeed_10m'},
          {text: 'Soil Temperature (0 cm)', value: 'soil_temperature_0cm'},

          {text: 'Relative Humidity (2 m)', value: 'relativehumidity_2m'},
          {text: 'Cloudcover Low', value: 'cloudcover_low'},
          {text: 'Wind Speed (80 m)', value: 'windspeed_80m'},
          {text: 'Soil Temperature (6 cm)', value: 'soil_temperature_6cm'},

          {text: 'Dewpoint (2 m)', value: 'dewpoint_2m'},
          {text: 'Cloudcover Mid', value: 'cloudcover_mid'},
          {text: 'Wind Speed (120 m)', value: 'windspeed_120m'},
          {text: 'Soil Temperature (18 cm)', value: 'soil_temperature_18cm'},

          {text: 'Apparent Temperature', value: 'apparent_temperature'},
          {text: 'Cloudcover High', value: 'cloudcover_high'},
          {text: 'Wind Speed (180 m)', value: 'windspeed_180m'},
          {text: 'Soil Temperature (54 cm)', value: 'soil_temperature_54cm'},

          {text: 'Sealevel Pressure', value: 'pressure_msl'},
          {text: 'Shortwave Solar Radiation', value: 'shortwave_radiation'},
          {text: 'Wind Direction (10 m)', value: 'winddirection_10m'},
          {text: 'Soil Moisture (0-1 cm)', value: 'soil_moisture_0_1cm'},

          {text: 'Precipitation', value: 'precipitation'},
          {text: 'Direct Solar Radiation', value: 'direct_radiation'},
          {text: 'Wind Direction (80 m)', value: 'winddirection_80m'},
          {text: 'Soil Moisture (1-3 cm)', value: 'soil_moisture_1_3cm'},

          {text: 'Weathercode', value: 'weathercode'},
          {text: 'Diffuse Solar Radiation', value: 'diffuse_radiation'},
          {text: 'Wind Direction (120 m)', value: 'winddirection_120m'},
          {text: 'Soil Moisture (3-9 cm)', value: 'soil_moisture_3_9cm'},

          {text: 'Snow Depth', value: 'snow_depth'},
          {text: 'Evapotranspiration', value: 'evapotranspiration'},
          {text: 'Wind Direction (180 m)', value: 'winddirection_180m'},
          {text: 'Soil Moisture (9-27 cm)', value: 'soil_moisture_9_27cm'},

          {text: 'Freezinglevel Height', value: 'freezinglevel_height'},
          {text: 'Vapor Pressure Deficit', value: 'vapor_pressure_deficit'},
          {text: 'Wind Gusts (10 m)', value: 'windgusts_10m'},
          {text: 'Soil Moisture (27-81 cm)', value: 'soil_moisture_27_81cm'}
        ],
        daily: [
          {text: 'Weathercode', value: 'weathercode'},
          {text: 'Precipitation Sum', value: 'precipitation_sum'},

          {text: 'Maximum Temperature (2 m)', value: 'temperature_2m_max'},
          {text: 'Precipitation Hours', value: 'precipitation_hours'},

          {text: 'Minimum Temperature (2 m)', value: 'temperature_2m_min'},
          {text: 'Maximum Wind Speed (10 m)', value: 'windspeed_10m_max'},

          {text: 'Maximum Apparent Temperature (2 m)', value: 'apparent_temperature_max'},
          {text: 'Maximum Wind Gusts (10 m)', value: 'windgusts_10m_max'},

          {text: 'Minimum Apparent Temperature (2 m)', value: 'apparent_temperature_min'},
          {text: 'Dominant Wind Direction (10 m)', value: 'winddirection_10m_dominant'},

          {text: 'Sunrise', value: 'sunrise'},
          {text: 'Shortwave Radiation Sum', value: 'shortwave_radiation_sum'},

          {text: 'Sunset', value: 'sunset'}
        ]
      }
    }
  },

  watch: {
    selected: {
      handler(value) {
        this.$emit('update:parameters', value);
      },
      deep: true
    }
  }
}

</script>

<style scoped>
 label {
   display: block;
   justify-self: left;
 }
 #checkboxHourly,  #checkboxDaily {
   display: grid;
   grid-template-columns: 1fr 1fr 1fr 1fr;
 }

 #checkboxDaily{
   grid-template-columns: 1fr 1fr;
 }

 @media(max-width: 768px){
   #checkboxHourly,  #checkboxDaily {
     grid-template-columns: 1fr;
   }
 }
</style>