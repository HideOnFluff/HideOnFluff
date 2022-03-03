<template>
  <l-map style="height: 50vh" :zoom="zoom" :center="center" @click="coordsOnClick">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker
        v-if="position.lat && position.lng"
        visible
        :zIndexOffset="20"
        :lat-lng.sync="position"
        :icon="icon"
    >
<!--      <l-icon-->
<!--          :icon-size=[41,41]-->
<!--          :icon-anchor=[21,41]-->
<!--          icon-url="https://external-preview.redd.it/tUAgq_EQ0z2oSSqk4o-Y1Q1tFyU8JwUdVKG55H1KeWQ.jpg?auto=webp&s=234855d537ac827e85f1ee4319692f45947fdb62"-->
<!--          shadow-url="null"-->
<!--      >-->
<!--      </l-icon>-->
    </l-marker>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker,} from 'vue2-leaflet';
import { icon } from "leaflet";
export default {
  props: {
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
          case 1, 2, 3:
            this.icon = icon({
            iconUrl: require("../assets/weatherMapIcons/wi-day-sunny.svg"),
            iconSize: [41,41],
            iconAnchor: [21,41],
            iconRetinaUrl: null,
            shadowUrl: null
          })
            break;
          case 45, 48:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-fog.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;

          case 51, 53, 55:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-sprinkle.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;

          case 56, 57:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-snowflake-cold.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;

          case 61, 63, 65:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-rain.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;


          case 66,67:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-rain-mix.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;

          case 71,73,75:
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

          case 80,81,82:
            this.icon = icon({
              iconUrl: require("../assets/weatherMapIcons/wi-storm-showers.svg"),
              iconSize: [41,41],
              iconAnchor: [21,41],
              iconRetinaUrl: null,
              shadowUrl: null
            })
            break;

          case 85,86:
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

          case 96,99:
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
.leaflet-grab {
  cursor: auto;
}

.leaflet-dragging .leaflet-grab{
  cursor: move;
}
</style>