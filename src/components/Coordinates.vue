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
          <b-form-select v-on:change="optionsChanged" v-model="selected" :options="citiesPlaceholder"></b-form-select>
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
      errorStr:null,
      selected: null,
      gettingLocation: false,
      showDismissibleAlert: false,
      citiesPlaceholder: [
        { value: { lat: '1', long: '1' }, text: 'City 1' },
        { value: { lat: '2', long: '2' }, text: 'City 2' },
        { value: { lat: '3', long: '3' }, text: 'City 3' },
        { value: { lat: '4', long: '4' }, text: 'City 4' },
        { value: { lat: '5', long: '5' }, text: 'City 5' },
      ]
    }
  },
  watch:{
    //In Vue.js 3 you can watch two variables or parameters easily, but in Vue.js 2 I found it too
    // overcomplicated for this simple task (sending two variables when they get updated),
    // so this works enough.
    latitude(newValue){
      this.$emit('update:coords', newValue, this.longitude);
    },
    longitude(newValue){
      this.$emit('update:coords', this.latitude, newValue);
    }
  },
  methods:{

    optionsChanged: function (){
      this.latitude = this.selected.lat;
      this.longitude = this.selected.long;
    },


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