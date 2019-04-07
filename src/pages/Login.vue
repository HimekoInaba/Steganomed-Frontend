<template>
  <form>
    <md-card class="md-medium-size-100 md-medium-size-100">
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title text-center">Login</h4>
        <p class="category text-center">Enter your email and password</p>
        <br />
        <div class="md-layout-item md-size-100 text-center">
          <p class="md-danger">
            If you don't have an account yet, click here to register
          </p>
          <md-button v-on:click="register" class="md-raised md-danger">
            Register
          </md-button>
        </div>
      </md-card-header>

      <md-card-content>
        <div class="md-layout md-alignment-center">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Email</label>
              <md-input v-model="email" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Password</label>
              <md-input v-model="password" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-center">
            <md-button v-on:click="login" class="md-raised md-success">
              Login
            </md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import { TokenService } from "../services/TokenService";
import ApiService from "../services/ApiService";

export default {
  name: "login-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green"
    }
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: async function() {
      if (this.email !== "" && this.password !== "") {
        const response = await ApiService.post(
          "http://localhost:8080/api/login",
          {
            username: this.email,
            password: this.password
          }
        );
        TokenService.saveRefreshToken(response.data.accessToken);
        TokenService.saveToken(response.data.accessToken);
        if (TokenService.getToken()) {
          ApiService.setHeader();
        }
        const res = await ApiService.get(
          "http://localhost:8080/api/user/me",
          {}
        );
        console.log(res.data);
        sessionStorage.setItem('id', res.data.id);
        sessionStorage.setItem('role', res.data.authorities[0].authority);
        this.$router.push({ name: "User Profile" });
      }
    },
    register: function() {
      this.$router.push("/register");
    }
  }
};
</script>

<style scoped></style>
