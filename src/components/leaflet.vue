<template>
  <l-map
      style="height: 50vh"
      :zoom="zoom"
      :center="center"
      @click="coordsOnClick">
    <l-tile-layer :url="url"/>
    <l-marker
        v-if="position.lat && position.lng"
        visible
        :zIndexOffset="20"
        :lat-lng.sync="position"
        :icon="icon"
        @change="openPopup"
    >
      <l-popup
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
        this.popupChangeData(value.data);
        if(this.position.lat !== this.coords.latitude || this.position.lng !== this.coords.longitude){
          this.position = {
            lat: this.coords.latitude,
            lng: this.coords.longitude
          }
          this.center = this.position;
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
        })
      }
    },
    deep: true
  },
  methods: {
    openPopup (layer) {
      layer.openPopup()
    },
    popupChangeData(data){
      this.popupText = '';
      console.log(data)
      if (data.current_weather){
        this.popupText = `<h6><b>Current Status</b></h6>
      <b>Time:</b> ${moment(data.current_weather.time).format('MMMM Do, YYYY - hh:mm A')}
      <br><b>Status:</b> ${data.current_weather.weathercode}
      <br><b>Temperature:</b> ${data.current_weather.temperature}
      <br><b>Wind Direction:</b> ${data.current_weather.winddirection}
      <br><b>Wind Speed:</b> ${data.current_weather.windspeed}`;

        if (data.hourly){
          let currentTime = data.hourly.time.indexOf(data.current_weather.time);
          console.log(currentTime)
          this.popupText += `<hr><h6><b>Hourly</b></h6>`
          for (const key in data.hourly) if(key !== 'time') this.popupText += `<b>${key}:</b> ${data.hourly[key][currentTime]} ${data.hourly_units[key]}<br>`
        }
        if (data.daily){
          console.log(moment(data.current_weather.time).format('YYYY-MM-DD'))
          let currentTime = data.daily.time.indexOf(moment(data.current_weather.time).format('YYYY-MM-DD'));
          console.log(currentTime);
          this.popupText += `<hr><h6><b>Daily</b></h6>`
          for (const key in data.daily) if(key !== 'time'){
            switch (key){
              case 'sunrise':this.popupText += `<b>sunrise:</b> ${moment(data.daily.sunrise[currentTime]).format('MMMM Do, YYYY - hh:mm A')}<br>`
                break;
              case 'sunset': this.popupText += `<b>sunset:</b> ${moment(data.daily.sunset[currentTime]).format('MMMM Do, YYYY - hh:mm A')}<br>`
                break;
              default: this.popupText += `<b>${key}:</b> ${data.daily[key][currentTime]} ${data.daily_units[key]}<br>`
            }

          }

        }
     }
      else this.popupText = "turn on current weather to display data"
    },
    coordsOnClick(e) {
      this.$emit('update:leafletCoords', e.latlng);
      this.position = e.latlng;
    },
    leafletIcon(a){
      let size = [41,41]
      let anchor = [21,41];
        switch(a){
          case 0:
            this.icon = icon({
            iconUrl: require("../assets/weatherMapIcons/wi-day-sunny.svg"),
            iconSize: size,
            iconAnchor: anchor,
            iconRetinaUrl: null,
            shadowUrl: null
          })
            break;
          case 1:
          case 2:
          case 3:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-day-sunny-overcast.svg"),
              iconSize: size,
              iconAnchor: anchor,
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 48:
          case 45:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-fog.svg"),
              iconSize: size,
              iconAnchor: anchor,
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 53:
          case 55:
          case 51:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-sprinkle.svg"),
              iconSize: size,
              iconAnchor: anchor,
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 56:
          case 57:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-snowflake-cold.svg"),
              iconSize: size,
              iconAnchor: anchor,
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 65:
          case 63:
          case 61:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-rain.svg"),
              iconSize: size,
              iconAnchor: anchor,
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;

          case 67:
          case 66:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-rain-mix.svg"),
              iconSize: size,
              iconAnchor: anchor,
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 73:
          case 75:
          case 71:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-snow.svg"),
              iconSize: size,
              iconAnchor: anchor,
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;

          case 77:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-snow-wind.svg"),
              iconSize: size,
              iconAnchor: anchor,
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 81:
          case 82:
          case 80:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-storm-showers.svg"),
              iconSize: size,
              iconAnchor: anchor,
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 86:
          case 85:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-showers.svg"),
              iconSize: size,
              iconAnchor: anchor,
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 95:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-thunderstorm.svg"),
              iconSize: size,
              iconAnchor: anchor,
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 99:
          case 96:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-hail.svg"),
              iconSize: size,
              iconAnchor: anchor,
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;

          default:
            this.icon = icon({
              iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
              iconUrl: require("leaflet/dist/images/marker-icon.png"),
              shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
              iconSize: [25,41],
              iconAnchor: [12.5,41],
            })

        }
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