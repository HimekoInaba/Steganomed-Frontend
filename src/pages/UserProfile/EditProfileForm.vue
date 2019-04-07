<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Profile</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">

          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <h3>Name: {{ username }}</h3>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <h3>Creation date: {{ creationTime }}</h3>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import ApiService from "../../services/ApiService";

export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      username: "",
      creationTime: "",
      aboutme:
        "Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const user = await ApiService.get("http://localhost:8080/api/user/" + sessionStorage.getItem("id"));
      this.username = user.data.username;
      this.creationTime = user.data.creationTime;
      console.log(user);
    }
  }
};
</script>
<style></style>
