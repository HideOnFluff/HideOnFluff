<template>
  <div>
    <b-container fluid>
      <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
        Sorry, but the following error
        occurred: {{errorStr}}
      </b-alert>
      <b-row>
        <b-col sm="3">
          <b-form-input v-model="latitude" placeholder="Latitude" type="number"></b-form-input>
        </b-col>
        <b-col sm="3">
          <b-form-input v-model="longitude" placeholder="Longitude" type="number"></b-form-input>
          <div class="mt-2">Lat: {{ latitude }} Long: {{longitude}}</div>
        </b-col>
        <b-col sm="6">
          <b-form-select v-model="selected" :options="citiesPlaceholder"></b-form-select>
          <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
          <b-button @click="locateMe">Get location</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Coordinates",
  data() {
    return {
      latitude: '',
      longitude: '',
      location:null,
      gettingLocation: false,
      errorStr:null,
      selected: null,
      showDismissibleAlert: false,
      citiesPlaceholder: [
        { value: { latitude: '1', longitude: '1' }, text: 'City 1' },
        { value: { latitude: '2', longitude: '2' }, text: 'City 2' },
        { value: { latitude: '3', longitude: '3' }, text: 'City 3' },
        { value: { latitude: '4', longitude: '4' }, text: 'City 4' },
        { value: { latitude: '5', longitude: '5' }, text: 'City 5' },
      ]
    }
  },
  methods:{

    async getLocation() {

      return new Promise((resolve, reject) => {

        if(!("geolocation" in navigator)) {
          reject(new Error('Geolocation is not available.'));
        }

        navigator.geolocation.getCurrentPosition(pos => {
          this.latitude = pos.coords.latitude;
          this.longitude = pos.coords.longitude;
          resolve(pos);
        }, err => {
          reject(err);
        });

      });
    },
    async locateMe() {
      this.gettingLocation = true;
      try {
        this.gettingLocation = false;
        this.location = await this.getLocation();

      } catch(e) {
        this.gettingLocation = false;
        this.errorStr = e.message;
        this.showDismissibleAlert=true
      }
    }
  }
}

</script>

<style scoped>

</style>