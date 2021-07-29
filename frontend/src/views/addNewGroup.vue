<template>
  <div class="new-group">
    <h1>Enter Details Of New Group</h1>
    <form>
      <div class="input-align">
        <label>Group Name</label>
        <input
          required
          type="text"
          name="groupname"
          id="groupname"
          v-model="groupname"
        />
      </div>
      <div class="input-align">
        <label>Enter City</label>
        <Dropdown
          :options= cities
          :disabled="false"
          name="zipcode"
          v-model="selectedCity"
          @selected="validateSelection"
          placeholder="Please select an option"
        >
        </Dropdown>
      </div>
      <div class="btn-class">
          <b-button
            style="margin-right:20px;background-color: #4a4090;"
            @click="addNewGroup"
            >Add Group</b-button
          >
          <router-link :to="{ name: 'home' }">
            <b-button variant="danger">Cancel</b-button>
          </router-link>
      </div>
    </form>
    <b-alert show  variant="warning" v-if="showalert"
      >This Group already exist</b-alert
    >
  </div>
</template>

<script>
import { addGroup } from "../cityService.js";
import Dropdown from "vue-simple-search-dropdown";
import cityList from '../cityList.json';

export default {
  name: "newform",
  components: {
    Dropdown
  },
  data() {
    return {
      groupname: "",
      selectedCity: {name:null},
      addCity :"",
      cityId: 0,
      showalert: false,
      cities: cityList,
    };
  },
  methods: {
    validateSelection(selection) {
      this.addCity = selection.name;
      this.cityId = selection.id
    },
    async addNewGroup() {    
      try {
        await addGroup(
          this.$route.params.uname,
          this.groupname,
          this.addCity,
          this.cityId
        );
        this.$router.push({
          name: "home",
          params: {
            isgroupadd: true,
            comp: this.groupname,
            op: 'Added'
          },
        });
      } catch (e) {
        this.showalert = true;
      }
    },
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

input[type="text"]
 {
  width: 17em;
  padding: 12px 20px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top:10px;
}
::v-deep .dropdown .dropdown-input {
  border: 1px solid #ccc;
  border-radius: 4px;
    margin: auto;
    padding: 15px 20px;
    min-width: 265px;
    margin-top:10px
}

::v-deep .dropdown .dropdown-content {
  position: relative;
  margin:auto ;
  min-width: 260px;
  text-align: left;
  font-size: 20px;
}

.btn-class {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px
}
@media (max-width: 768px) {
  .new-group {
    width: 95%;
  }
}
</style>
