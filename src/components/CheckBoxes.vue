<template>
  <div>
    <b-form-group label="Hourly Weather Variables" v-slot="{ ariaDescribedby }" label-size="lg" label-align-sm="left" label-class="font-weight-bold pt-0">
      <b-form-checkbox-group
          id="checkboxHourly"
          v-model="selectedHourly"
          :options="optionsHourly"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
      ></b-form-checkbox-group>
    </b-form-group>

    <b-form-group label="Daily Weather Variables" v-slot="{ ariaDescribedby }" label-size="lg" label-align-sm="left" label-class="font-weight-bold pt-0">
      <b-form-checkbox-group
          id="checkboxDaily"
          v-model="selectedDaily"
          :options="optionsDaily"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
      ></b-form-checkbox-group>
    </b-form-group>
    <b-row>
        <b-col>Selected Hourly: <strong>{{ selectedHourly}}</strong> </b-col>
        <b-col>Selected Daily: <strong>{{selectedDaily}}</strong> </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "CheckBoxes",
    data() {
      return {
        selectedHourly: [], // Must be an array reference!
        selectedDaily: [],
        optionsHourly: [
          { text: 'Temperature (2 m)', value: 'temperature_2m' },
          { text: 'Relative Humidity (2 m)', value: 'relativehumidity_2m' },
          { text: 'Dewpoint (2 m)', value: 'dewpoint_2m' },
          { text: 'Apparent Temperature', value: 'apparent_temperature' },
          { text: 'Sealevel Pressure', value: 'pressure_msl' },
          { text: 'Precipitation', value: 'precipitation' },
          { text: 'Weathercode', value: 'weathercode' },
          { text: 'Snow Depth', value: 'snow_depth' },
          { text: 'Freezinglevel Height', value: 'freezinglevel_height' },

          { text: 'Cloudcover Total', value: 'cloudcover' },
          { text: 'Cloudcover Low', value: 'cloudcover_low' },
          { text: 'Cloudcover Mid', value: 'cloudcover_mid' },
          { text: 'Cloudcover High', value: 'cloudcover_high' },
          { text: 'Direct Solar Radiation', value: 'direct_radiation' },
          { text: 'Diffuse Solar Radiation', value: 'diffuse_radiation' },
          { text: 'Direct Normal Irradiance (DNI) New', value: 'direct_normal_irradiance' },
          { text: 'Evapotranspiration', value: 'evapotranspiration' },
          { text: 'Vapor Pressure Deficit', value: 'vapor_pressure_deficit' },

          { text: 'Wind Speed (10 m)', value: 'windspeed_10m' },
          { text: 'Wind Speed (80 m)', value: 'windspeed_80m' },
          { text: 'Wind Speed (120 m)', value: 'windspeed_120m' },
          { text: 'Wind Speed (180 m)', value: 'windspeed_180m' },
          { text: 'Wind Direction (10 m)', value: 'winddirection_10m' },
          { text: 'Wind Direction (80 m)', value: 'winddirection_80m' },
          { text: 'Wind Direction (120 m)', value: 'winddirection_120m' },
          { text: 'Wind Direction (180 m)', value: 'winddirection_180m' },
          { text: 'Wind Gusts (10 m)', value: 'windgusts_10m' },

          { text: 'Soil Temperature (0 cm)', value: 'soil_temperature_0cm' },
          { text: 'Soil Temperature (6 cm)', value: 'soil_temperature_6cm' },
          { text: 'Soil Temperature (18 cm)', value: 'soil_temperature_18cm' },
          { text: 'Soil Temperature (54 cm)', value: 'soil_temperature_54cm' },
          { text: 'Soil Moisture (0-1 cm)', value: 'soil_moisture_0_1cm' },
          { text: 'Soil Moisture (1-3 cm)', value: 'soil_moisture_1_3cm' },
          { text: 'Soil Moisture (3-9 cm)', value: 'soil_moisture_3_9cm' },
          { text: 'Soil Moisture (9-27 cm)', value: 'soil_moisture_9_27cm' },
          { text: 'Soil Moisture (27-81 cm)', value: 'soil_moisture_27_81cm' },
      ],
      optionsDaily:[
        { text: 'Weathercode', value: 'weathercode' },
        { text: 'Maximum Temperature (2 m)', value: 'temperature_2m_max' },
        { text: 'Minimum Temperature (2 m)', value: 'temperature_2m_min' },
        { text: 'Maximum Apparent Temperature (2 m)', value: 'apparent_temperature_max' },
        { text: 'Minimum Apparent Temperature (2 m)', value: 'apparent_temperature_min' },
        { text: 'Sunrise', value: 'sunrise' },
        { text: 'Sunset', value: 'sunset' },

        { text: 'Precipitation Sum', value: 'precipitation_sum' },
        { text: 'Precipitation Hours', value: 'precipitation_hours' },
        { text: 'Maximum Wind Speed (10 m)', value: 'windspeed_10m_max' },
        { text: 'Maximum Wind Gusts (10 m)', value: 'windgusts_10m_max' },
        { text: 'Dominant Wind Direction (10 m)', value: 'winddirection_10m_dominant' },
        { text: 'Shortwave Radiation Sum', value: 'shortwave_radiation_sum' },
      ]
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
   grid-template-columns: repeat(auto-fill, minmax(16rem, 2fr));
 }
</style>