<template>
  <l-map style="height: 30vh" :zoom="zoom" :center="center" @click="coordsOnClick">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker
        v-if="position.lat && position.lng"
        visible
        :zIndexOffset="20"
        :lat-lng.sync="position"
        :icon="icon"
    >
    </l-marker>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';
import { icon } from "leaflet";
export default {
  props: {
    coords: {},
    response: {},
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
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
      center: [56.8796, 24.6032]
    };
  },
  watch:{
    response:{
      handler() {
        this.position = {
          lat: this.coords.latitude,
          lng: this.coords.longitude
        };
        if(this.response.data.current_weather) {
          this.leafletIcon(this.response.data.current_weather.weathercode);
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
    coordsOnClick(e) {
      this.$emit('update:leafletCoords', e.latlng);
      this.position = e.latlng;
    },
    leafletIcon(a){
        switch(a){
          case 0:
            this.icon = icon({
            iconUrl: require("../assets/weatherMapIcons/wi-day-sunny.svg"),
            iconSize: [41,41],
            iconAnchor: [21,41],
            iconRetinaUrl: null,
            shadowUrl: null
          })
            break;
          case 1:
          case 2:
          case 3:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-day-sunny-overcast.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 48:
          case 45:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-fog.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 53:
          case 55:
          case 51:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-sprinkle.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 56:
          case 57:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-snowflake-cold.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 65:
          case 63:
          case 61:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-rain.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;

          case 67:
          case 66:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-rain-mix.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 73:
          case 75:
          case 71:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-snow.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;

          case 77:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-snow-wind.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 81:
          case 82:
          case 80:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-storm-showers.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 86:
          case 85:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-showers.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 95:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-thunderstorm.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;
          case 99:
          case 96:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-hail.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
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