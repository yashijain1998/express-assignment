<template>
  <div>
    <font-awesome-icon icon="wind" color="#b3b3b3" class="icon-font" />
    <span class="mar">{{ CityWeatherData.wind.speed }} mph</span>
    <font-awesome-icon icon="tint" color="#66a3ff" class="icon-font" />
    <span class="mar">{{ CityWeatherData.main.humidity }}%</span>
    <font-awesome-icon icon="temperature-low" color="red" class="icon-font" />
    <span class="mar">{{ (CityWeatherData.main.temp -273.15).toFixed(2) }}<sup style="font-size:10px">O</sup>C</span>
    <font-awesome-icon icon="cloud" color="#1a53ff" class="icon-font" />
    <span class="mar">{{ CityWeatherData.clouds.all }}%</span>
  </div>
</template>

<script>
export default {
  props: {
    CityWeatherData: Object,
  },
};
</script>
<style scoped>
.mar {
  margin-right: 10px;
  margin-left: 6px;
  font-size: 18px;
}
.icon-font {
    font-size:22px;
}
</style>
