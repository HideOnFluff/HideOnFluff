<template>
  <div id="app">
    <b-container fluid="md">
      <b-row>
        <b-col>
            <Coordinates></Coordinates>
            <CheckBoxes></CheckBoxes>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
 import Coordinates from './components/Coordinates.vue';
import CheckBoxes from './components/CheckBoxes.vue';
// import Settings from './components/Settings.vue';
// import Chart from './components/Chart.vue';
export default {
  name: 'App',
  components: {
    Coordinates,
    CheckBoxes,
    //Settings,
    //Chart,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}



</style>
