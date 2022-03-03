<template>
  <l-map style="height: 50vh" :zoom="zoom" :center="center" @click="coordsOnClick">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker
        v-if="position.lat && position.lng"
        visible
        :zIndexOffset="20"
        :lat-lng.sync="position"
        @dragstart="dragging = true"
        @dragend="dragging = false"
    >
      <l-icon
          :icon-size=[41,41]
          :icon-anchor=[21,41]
          icon-url="https://external-preview.redd.it/tUAgq_EQ0z2oSSqk4o-Y1Q1tFyU8JwUdVKG55H1KeWQ.jpg?auto=webp&s=234855d537ac827e85f1ee4319692f45947fdb62" >
      </l-icon>
    </l-marker>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker, LIcon} from 'vue2-leaflet';
import { icon } from "leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
  },
  data() {
    return {
      position: {
        lat: 40,
        lng: 20
      },
      dragging:false,
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
  methods: {
    coordsOnClick(e) {
      this.$emit('update:leafletCoords', e.latlng);
      this.position = e.latlng;
    },
  }
}
</script>

<style scoped>

</style>