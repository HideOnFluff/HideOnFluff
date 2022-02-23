<template>
<div>
  <b-container fluid aria-label="Hourly Weather Variables">
    <b-row>
      <b-form-checkbox v-model="selected.current_weather" name="check-button" switch>Current weather with temperature, windspeed and weather code</b-form-checkbox>
    </b-row>
    <b-row>
      <b-col sm="4">
        <b-form-select v-model="selected.temperature_unit" :options="options.temperature_unit" size="sm" class="mt-3"></b-form-select>
      </b-col>
      <b-col sm="4">
        <b-form-select v-model="selected.windspeed_unit" :options="options.windspeed_unit" size="sm" class="mt-3"></b-form-select>
      </b-col >
      <b-col sm="4">
        <b-form-select v-model="selected.precipitation_unit" :options="options.precipitation_unit" size="sm" class="mt-3"></b-form-select>
      </b-col>
      <b-col sm="4">
        <b-form-select v-model="selected.timeformat" :options="options.timeformat" size="sm" class="mt-3"></b-form-select>
      </b-col>
      <b-col sm="4">
        <b-form-select v-model="selected.timezone" :options="options.timezone" size="sm" class="mt-3"></b-form-select>
      </b-col>
      <b-col sm="4">
        <b-form-select v-model="selected.past_days" :options="options.past_days" size="sm" class="mt-3"></b-form-select>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      selected:{
        current_weather: null,
        temperature_unit: null,
        windspeed_unit: null,
        precipitation_unit: null,
        timeformat: null,
        timezone: 'UTC',
        past_days: null
      },

      options:{
        temperature_unit: [
          {value: null, text: 'Celsius °C'},
          {value: 'fahrenheit', text: 'Fahrenheit °F'}
        ],
        windspeed_unit: [
          {value: null, text: 'km/h'},
          {value: 'ms', text: 'm/s'},
          {value: 'mph', text: 'Mph'},
          {value: 'kn', text: 'Knots'}
        ],
        precipitation_unit: [
          {value: null, text: 'Millimeter'},
          {value: 'inch', text: 'Inch'}
        ],
        timeformat: [
          {value: null, text: 'ISO 8601 (e.g. 2022-05-12)'},
          {value: 'unixtime', text: 'Unix timestamp'}
        ],
        timezone: [
          {value: 'UTC', text: 'UTC'},
          {value: 'America/Anchorage', text: 'America/Anchorage'},
          {value: 'America/Los_Angeles', text: 'America/Los_Angeles'},
          {value: 'America/Denver', text: 'America/Denver'},
          {value: 'America/Chicago', text: 'America/Chicago'},
          {value: 'America/New_York', text: 'America/New_York'},
          {value: 'America/Sao_Paulo', text: 'America/Sao_Paulo'},
          {value: 'Europe/London', text: 'Europe/London'},
          {value: 'Europe/Berlin', text: 'Europe/Berlin'},
          {value: 'Europe/Moscow', text: 'Europe/Moscow'},
          {value: 'Africa/Cairo', text: 'Africa/Cairo'},
          {value: 'Asia/Bangkok', text: 'Asia/Bangkok'},
          {value: 'Asia/Singapore', text: 'Asia/Singapore'},
          {value: 'Asia/Tokyo', text: 'Asia/Tokyo'},
          {value: 'Australia/Sydney', text: 'Australia/Sydney'},
          {value: 'Pacific/Auckland', text: 'Pacific/Auckland'}
        ],
        past_days: [
          {value: null, text: '0'},
          {value: '1', text: '1'},
          {value: '2', text: '2'}
        ]
      }
    }
  },
  watch: {
    selected: {
      handler(value){
        this.$emit('update:settings', value);
      },
      deep: true
    },

  }
}
</script>

<style scoped>

</style>