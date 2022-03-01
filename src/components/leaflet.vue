<template>
  <l-map style="height: 300px" :zoom="zoom" :center="center" @click="coordsOnClick">
    <l-tile-layer :url="url"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng"></l-marker>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet';

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 5,
      center: [51.505, -0.159],
      markerLatLng: [51.504, -0.159]
    };
  },
  methods: {
    coordsOnClick(e) {
      this.$emit('update:leafletCoords', e.latlng);
    }
  }
}
</script>

<style scoped>

</style>