<template>
  <l-map
      style="height: 50vh"
      :zoom="zoom"
      :center="center"
      @click="coordsOnClick">
    <l-tile-layer :url="url"/>
    <l-marker
        ref="marker"
        v-if="position.lat && position.lng"
        visible
        :zIndexOffset="20"
        :lat-lng.sync="position"
        :icon="icon"
        :label="popupText"
    >
      <l-popup
          ref="popup"
          :content="popupText"
      />
    </l-marker>

  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet';
import {icon} from 'leaflet';
import moment from 'moment';
export default {
  props: {
    coords: {},
    response: {},
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      position: {
        lat: 40,
        lng: 20
      },
      mapIcon: "leaflet/dist/images/marker-icon.png",
      icon: icon({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
      }),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 5,
      center: [56.8796, 24.6032],
      popupText: 'Unknown',
    };
  },
  watch:{
    response:{
      handler(value) {
        this.$refs.marker.mapObject.openPopup()
        this.popupChangeData(value.data);
        if(this.position.lat !== this.coords.latitude || this.position.lng !== this.coords.longitude){
          this.position = {
            lat: this.coords.latitude,
            lng: this.coords.longitude
          }
          this.center = this.position;
          this.zoom = 8;
        }
        if(value.data.current_weather) {
          this.leafletIcon(value.data.current_weather.weathercode);
        }
        else this.icon = icon({
          iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
          iconUrl: require("leaflet/dist/images/marker-icon.png"),
          shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
          iconSize: [25,41],
          iconAnchor: [12.5,41],
          popupAnchor: [0,-40]
        })
      }
    },
    deep: true
  },
  methods: {
    popupChangeData(data){
      this.popupText = '';
      if (data.current_weather){
        this.popupText = `<h6><b>Current Status</b></h6>
      <b>Time:</b> ${moment(data.current_weather.time).format('MMMM Do, YYYY - hh:mm A')}
      <br><b>Temperature:</b> ${data.current_weather.temperature}
      <br><b>Wind Direction:</b> ${data.current_weather.winddirection}
      <br><b>Wind Speed:</b> ${data.current_weather.windspeed}`;

        if (data.hourly){
          let index = data.hourly.time.indexOf(data.current_weather.time);
          this.popupText += `<hr><h6><b>Hourly</b></h6>`
          for (const key in data.hourly) if(key !== 'time') this.popupText += `<b>${key}:</b> ${data.hourly[key][index]} ${data.hourly_units[key]}<br>`
        }
        if (data.daily){
          let index = data.daily.time.indexOf(moment(data.current_weather.time).format('YYYY-MM-DD'));
          this.popupText += `<hr><h6><b>Daily</b></h6>`
          for (const key in data.daily) if(key !== 'time'){
            switch (key){
              case 'sunrise':this.popupText += `<b>sunrise:</b> ${moment(data.daily.sunrise[index]).format('MMMM Do, YYYY - hh:mm A')}<br>`
                break;
              case 'sunset': this.popupText += `<b>sunset:</b> ${moment(data.daily.sunset[index]).format('MMMM Do, YYYY - hh:mm A')}<br>`
                break;
              default: this.popupText += `<b>${key}:</b> ${data.daily[key][index]} ${data.daily_units[key]}<br>`
            }

          }

        }
     }
      else this.popupText = "turn on current weather to display data"
    },
    coordsOnClick(mapCoords) {
      this.$emit('update:leafletCoords', mapCoords.latlng);
      this.position = mapCoords.latlng;
    },
    leafletIcon(weathercode){
      let size = [41,41]
      let anchor = [21,41];
      let popupAnchor = [0,-40]
      let iconURL
        switch(weathercode){
          case 0:
            iconURL = require("../assets/weatherMapIcons/wi-day-sunny.svg")
            break;
          case 1:
          case 2:
          case 3:
            iconURL = require("../assets/weatherMapIcons/wi-day-sunny-overcast.svg")
            break;
          case 48:
          case 45:
            iconURL = require("../assets/weatherMapIcons/wi-fog.svg")
            break;
          case 53:
          case 55:
          case 51:
            iconURL = require("../assets/weatherMapIcons/wi-sprinkle.svg")
            break;
          case 56:
          case 57:
            iconURL = require("../assets/weatherMapIcons/wi-snowflake-cold.svg")
            break;
          case 65:
          case 63:
          case 61:
            iconURL = require("../assets/weatherMapIcons/wi-rain.svg")
            break;

          case 67:
          case 66:
            iconURL = require("../assets/weatherMapIcons/wi-rain-mix.svg")
            break;
          case 73:
          case 75:
          case 71:
            iconURL = require("../assets/weatherMapIcons/wi-snow.svg")
            break;
          case 77:
            iconURL = require("../assets/weatherMapIcons/wi-snow-wind.svg")
            break;
          case 81:
          case 82:
          case 80:
            iconURL = require("../assets/weatherMapIcons/wi-storm-showers.svg")
            break;
          case 86:
          case 85:
            iconURL = require("../assets/weatherMapIcons/wi-showers.svg")
            break;
          case 95:
            iconURL = require("../assets/weatherMapIcons/wi-thunderstorm.svg")

            break;
          case 99:
          case 96:
            iconURL = require("../assets/weatherMapIcons/wi-hail.svg")
            break;
          default:
            this.icon = icon({
              iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
              iconUrl: require("leaflet/dist/images/marker-icon.png"),
              shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
              iconSize: [25,41],
              iconAnchor: [12.5,41],
              popupAnchor: popupAnchor
            })
            return;
        }
      this.icon = this.icon = icon({
        iconUrl: iconURL,
        iconSize: size,
        iconAnchor: anchor,
        popupAnchor: popupAnchor,
        shadowUrl: null,
        iconRetinaUrl: null
      })
      }
  }
}

</script>

<style scoped>
.leaflet-grab{
  cursor: auto;
}
.leaflet-dragging .leaflet-grab{
  cursor: move;
}
</style>