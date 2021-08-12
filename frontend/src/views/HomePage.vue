<template>
  <div>
    <div class="container">
      <div v-if="a">
        <notification :comp="comp" :op="op" />
      </div>
      <p class="current-user">Welcome {{ users[0].name | capitalize }}</p>
      <div v-for="user in users" :key="user.name" class="user-info">
        <div
          v-for="group in user.group"
          :key="group.name"
          v-show="user.group.length > 0"
        >
          <div
            class=" user-group card"
            style="width: 18rem;"
            @click="userData(user.name, group.name)"
            v-if="group.city.length > 0"
          >
            <div class="card-header">
              {{ group.name | capitalize }} ({{ citycount(group.city) }})
            </div>
            <ul
              class="list-group list-group-flush"
              v-for="city in group.city"
              :key="city.id"
            >
              <li class="list-group-item">{{ city.name }}</li>
            </ul>
          </div>
        </div>
        <div v-if="user.group.length == 0">
          <p class="empty-user">
            Add group to user {{ user.name | capitalize }}
          </p>
        </div>
      </div>
      <div>
        <b-button
          class="add-group"
          variant="primary"
          @click="addNewGroup(users[0].name)"
        >
          Add New Group
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
//import { getUsers } from "../cityService.js";
import { mapState } from 'vuex';
import notification from "../component/notification.vue";

export default {
  name: "HomePage",
  components: {
    notification,
  },
  computed: {
    ...mapState('user' , {
      userDetail: 'user'
    })
  },
  data() {
    return {
      users: [],
      isgroupadd: false,
      a: false,
      comp: "",
      op: "",
    };
  },
  methods: {
    citycount(c) {
      return c.length;
    },
    userData(userName, userRegion) {
      this.$router.push({
        name: "userRegion",
        params: {
          uname: userName,
          region: userRegion,
        },
      });
    },
    addNewGroup(userName) {
      this.$router.push({
        name: "addNewGroup",
        params: {
          uname: userName,
        },
      });
    },
  },

  async created() {
    await this.$store.dispatch('user/getUser');
    this.users = this.userDetail;
    if (this.$route.params.comp) {
      this.isgroupadd = this.$route.params.isgroupadd;
      this.comp = this.$route.params.comp;
      this.op = this.$route.params.op;
    }
    this.$nextTick(function() {
      if (this.comp) this.a = true;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-info {
  /* border: 2px solid  #e6e6e6; */
  /* padding: 30px; */
  margin-top: 32px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.user-group {
  margin-right: 20px;
  margin-bottom: 10px;
  cursor: pointer;
}
.card-header:first-child {
  background-color: rgba(0, 0, 0, 0.08);
  text-align: center;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.empty-user {
  color: red;
}
.current-user {
  font-size: 20px;
  font-weight: 500;
}
.add-group {
  background-color: #4a4090;
}
</style>
