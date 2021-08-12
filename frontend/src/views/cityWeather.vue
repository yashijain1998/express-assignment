<template>
  <div>
    <span class="close-icon">
      <font-awesome-icon icon="times" @click="goBack" />
    </span>
    <div class="container">
      <div class="app-heading">Weather for city {{ cweather.name }} is</div>
      <b-list-group class="list-class">
        <b-list-group-item variant="danger"
          >Weather Type - {{ cweather.weather[0].main }}</b-list-group-item
        >
        <b-list-group-item variant="primary" class="radio-btn temp"
          >Temperature - {{ tempcon }} {{ selected }}
          <b-form-radio-group
            v-model="selected"
            :options="options"
            class="radio-btn"
            value-field="item"
            text-field="name"
            disabled-field="notEnabled"
            @change="tempconver"
          ></b-form-radio-group>
        </b-list-group-item>
        <b-list-group-item variant="success"
          >Pressure - {{ cweather.main.pressure }} mb</b-list-group-item
        >
        <b-list-group-item variant="danger"
          >Humidity - {{ cweather.main.humidity }} %</b-list-group-item
        >
        <b-list-group-item variant="warning"
          >Visibilty - {{ cweather.visibility }} km</b-list-group-item
        >
        <b-list-group-item variant="info"
          >Wind Speed - {{ cweather.wind.speed }} mph</b-list-group-item
        >
      </b-list-group>
    </div>
  </div>
</template>

<script>
//import { getCityWeather } from "../cityService.js";
export default {
  data() {
    return {
      //cweather: {},
      selected: "Celsius",
      temp: 0,
      tempcon: 0,
      options: [
        { item: "Celsius", name: "Celsius" },
        { item: "Fahrenheit", name: "Fahrenheit" },
        { item: "kelvin", name: "kelvin" },
      ],
    };
  },
  computed: {
    cweather() {
      return this.$store.getters['weather/weatherDetail'](this.$route.params.city);
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    tempconver() {
      if (this.selected == "Celsius") {
        this.tempcon = (this.temp - 273.15).toFixed(2);
      } else if (this.selected == "Fahrenheit") {
        this.tempcon = ((this.temp - 273.15) * 1.8 + 32).toFixed(2);
      } else {
        this.tempcon = this.temp;
      }
    },
  },
  async created() {
    try{
    //   this.cweather = await getCityWeather(
    //   this.$route.params.uname,
    //   this.$route.params.region,
    //   this.$route.params.city
    // );
    //this.cweather = this.$store.getters['weather/weatherDetail'](this.$route.params.city);
    this.temp = this.cweather.main.temp;
    this.tempcon = (this.temp - 273.15).toFixed(2);
    } catch(e) {
      this.$router.push({
        name: "noGroup",
        params: {
          comp: 'city'
        }
      });
    }
    
  },
};
</script>

<style scoped>
.list-class {
  text-align: center;
  width: 50%;
  margin: auto;
  margin-top: 50px;
}
.radio-btn {
  display: flex;
  justify-content: space-evenly;
}
::v-deep .custom-control.custom-control-inline.custom-radio {
  margin-right: 8px;
}

::v-deep .custom-control-label {
  margin-left: 3px;
}

@media (max-width: 425px) {
    .radio-btn {
        display: flex;
        flex-direction: column;
        text-align: left;
    }
    .temp {
        display:flex;
        flex-direction: column;
    }
    .container {
        margin: auto;
    }
}
</style>
