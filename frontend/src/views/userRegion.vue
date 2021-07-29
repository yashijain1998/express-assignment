<template>
  <div>
    <span class="close-icon">
      <font-awesome-icon icon="times" @click="goBack" />
    </span>
    <div class="container">
      <div v-if="isToastVisible">
        <notification :comp="comp" :op="op" />
      </div>
      <h1 class="app-heading">User : {{ uname | upperCase }}</h1>
      <h3>
        Following are the cities available for {{ uname }} in {{ region }}
      </h3>
      <div v-if="regionCity.length > 0 && !noCities">
        <div v-for="city in regionCity" :key="city.id">
          <div class="card">
            <h5 class="card-header">{{ city.name }}</h5>
            <div class="card-body">
              <h5 class="card-title">Weather is</h5>
              <div class="card-text icon-weather">
                <div>
                  <weatherData :CityWeatherData="getCityWeather(city)" />
                </div>
                <div></div>
              </div>
              <b-button
                variant="outline-info"
                @click="onBtnClick(city.name)"
                class="reg"
                >Check full weather</b-button
              >
              <b-button
                class="delete-city"
                variant="outline-danger"
                @click="showAlerBeforeDelete(city.name, 'cityDelete')"
                >Delete City</b-button
              >
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="no-cities">
          OOPS! no cities available, click on below button to add cities.
        </p>
      </div>
      <div class="btn-city">
        <div>
          <div style="margin-right: 30px">For Adding City</div>
          <b-button
            class="back-color"
            @click="addCity"
            :disabled="isbuttondisable()"
            >Add City</b-button
          >
        </div>
        <div>
          <div>For Deleting Group</div>
          <b-button
            class="back-color"
            @click="showAlerBeforeDelete(region, 'regionDelete')"
            >Delete Group : {{ region }}</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getRegionCity,
  getCityWeather,
  deleteGroup,
  deleteCity,
} from "../cityService.js";
import weatherData from "../component/weatherData.vue";
import notification from "../component/notification.vue";

export default {
  components: {
    weatherData,
    notification,
  },
  data() {
    return {
      uname: "",
      region: "",
      regionCity: [],
      regionWeather: [],
      weather: {},
      isCityadded: false,
      isToastVisible: false,
      comp: "",
      op: "",
      noCities: false,
      isAddCity: false,
    };
  },
  methods: {
    getCityWeather(city) {
      let c = this.regionWeather.find((ele) => ele.name == city.name);
      return c;
    },
    onBtnClick(city) {
      this.$router.push({
        name: "CityWeather",
        params: {
          uname: this.uname,
          region: this.region,
          city: city,
        },
      });
    },
    showAlerBeforeDelete(name, wdelete) {
      this.$bvModal
        .msgBoxConfirm(`Are you sure you want to delete this ${name} ?`, {
          title: "Please Confirm",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            if (wdelete == "regionDelete") this.onDeleteClick();
            else this.onDeleteCity(name);
          }
        })
        .catch((err) => {
          // An error occurred
          console.log(err);
        });
    },

    async onDeleteClick() {
      await deleteGroup(this.uname, this.region);
      this.$router.push({
        name: "home",
        params: {
          isDeleteGroup: true,
          comp: this.region,
          op: "Deleted",
        },
      });
    },
    async addCity() {
      this.isAddCity = true;
      this.$router.push({
        name: "newCity",
        params: {
          uname: this.uname,
          region: this.region,
        },
      });
    },

    async onDeleteCity(cname) {
      try {
        await deleteCity(this.uname, this.region, cname);
        (this.comp = cname),
          (this.op = "Deleted"),
          this.$nextTick(function() {
            if (this.comp) this.isToastVisible = true;
          });
        this.regionCity = await getRegionCity(this.uname, this.region);
      } catch (e) {
        console.log(e);
        this.noCities = true;
      }
    },
    isbuttondisable() {
      if (this.regionCity.length >= 5) {
        return true;
      }
    },
    goBack() {
      this.$router.push({
        name: "home",
      });
    },
  },

  async created() {
    this.uname = this.$route.params.uname;
    this.region = this.$route.params.region;
    try {
      this.regionCity = await getRegionCity(this.uname, this.region);
      this.regionCity.forEach(async (element) => {
        let weathers = {};
        weathers = await getCityWeather(this.uname, this.region, element.name);
        this.regionWeather.push(weathers);
      });
      if (this.$route.params.comp) {
        (this.comp = this.$route.params.comp),
          (this.op = this.$route.params.op);
        this.isToastVisible = true;
      }
    } catch (e) {
      this.$router.push({
        name: "noGroup",
        params: {
          comp: 'group'
        }
      });
    }
  },
  async beforeDestroy() {
    if (this.noCities && !this.isAddCity) {
      await deleteGroup(this.uname, this.region);
    }
  },
};
</script>

<style scoped>
.icon-weather {
  display: flex;
  flex-direction: row;
}
.reg {
  margin-top: 10px;
}
.delete-city {
  margin-top: 10px;
  margin-left: 10px;
}
.btn-city {
  display: flex;
}
.card {
  margin-bottom: 20px;
  border-radius: 5px;
}
.no-cities {
  color: red;
  font-size: 20px;
}
.back-color {
  background-color: #4a4090;
}
.btn-city {
  margin-bottom: 15px;
}
</style>
