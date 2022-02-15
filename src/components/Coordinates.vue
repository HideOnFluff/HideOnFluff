<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col sm="3">
          <b-form-input v-model="latitude" placeholder="Latitude" type="number"></b-form-input>
        </b-col>
        <b-col sm="3">
          <b-form-input v-model="longitude" placeholder="Longitude" type="number"></b-form-input>
          <div class="mt-2">Lat: {{ latitude }} Long: {{longitude}}</div>
        </b-col>
        <b-col sm="6">

          <b-button @click="locateMe">Get location</b-button>
          <div v-if="errorStr">
            Sorry, but the following error
            occurred: {{errorStr}}
          </div>

          <div v-if="gettingLocation">
            <i>Getting your location...</i>
          </div>

          <div v-if="location">
            Your location data is {{ location.coords.latitude }}, {{ location.coords.longitude}}
          </div>
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
      latitude: 0,
      longitude: 0,
      location:null,
      gettingLocation: false,
      errorStr:null

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
      }
    }
  }
}

</script>

<style scoped>

</style>