<template>
  <div class="new-group">
    <h1>Add New City for group {{ region }}</h1>
    <form>
      <div class="input-align">
        <label>Enter City</label>
        <Dropdown
          :options="cities"
          :disabled="false"
          name="zipcode"
          v-model="selectedCity"
          @selected="validateSelection"
          placeholder="Please select an City"
        >
        </Dropdown>
      </div>
      <div class="btn-class">
        <b-button
          style="margin-right:20px;background-color: #4a4090"
          @click="addCityInGroup"
          >Add City</b-button
        >
        <router-link
          :to="{
            name: 'userRegion',
            params: {
              uname: this.$route.params.uname,
              region: this.$route.params.region,
            },
          }"
        >
          <b-button variant="danger">Cancel</b-button>
        </router-link>
      </div>
    </form>
    <br />
    <b-alert show variant="warning" v-if="showalert"
      >This City already exist in {{ region }} group</b-alert
    >
  </div>
</template>

<script>
import { addNewCity } from "../cityService.js";
import Dropdown from "vue-simple-search-dropdown";
import cityList from "../cityList.json";

export default {
  name: "newCity",
  components: {
    Dropdown,
  },
  data() {
    return {
      uname: "",
      region: "",
      selectedCity: { name: null },
      addCity: "",
      showalert: false,
      cities: cityList,
    };
  },
  methods: {
    validateSelection(selection) {
      this.addCity = selection.name;
    },
    async addCityInGroup() {
      try {
        await addNewCity(this.uname, this.region, this.addCity);
        this.$router.push({
          name: "userRegion",
          params: {
            uname: this.$route.params.uname,
            region: this.$route.params.region,
            isCityadded: true,
            comp: this.addCity,
            op: "Added",
          },
        });
      } catch (e) {
        this.showalert = true;
      }
    },
  },
  created() {
    this.region = this.$route.params.region;
    this.uname = this.$route.params.uname;
  },
};
</script>

<style scoped>
.new-group {
  text-align: center;
  border: 1px solid #ccccff;
  padding: 10px;
  width: 50%;
  padding-bottom: 20px;
  margin: auto;
  margin-top: 7%;
}
::v-deep .dropdown .dropdown-input {
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: auto;
  padding: 15px 20px;
  min-width: 265px;
}

::v-deep .dropdown .dropdown-content {
  position: relative;
  margin: auto;
  min-width: 260px;
  text-align: left;
  font-size: 20px;
}
.btn-class {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
}
@media (max-width: 425px) {
  .new-group {
    width: 95%;
  }
}
</style>
