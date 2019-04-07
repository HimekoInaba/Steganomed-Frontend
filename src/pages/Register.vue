<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title text-center">Register</h4>
        <p class="category text-center">Create a new account to use service</p>
        <br />
        <div class="md-layout-item md-size-100 text-center">
          <p class="md-danger">
            If you already have an account, click here to login
          </p>
          <md-button v-on:click="login" class="md-raised md-danger"
            >Login</md-button
          >
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
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Re-enter password</label>
              <md-input v-model="repass" type="password"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-center">
            <md-button v-on:click="register" class="md-raised md-success"
              >Register</md-button
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>

<script>
import { TokenService } from "../services/TokenService";
import apiService from "../services/ApiService";

export default {
  name: "register-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green"
    }
  },
  data() {
    return {
      email: "",
      password: "",
      repass: ""
    };
  },
  methods: {
    register: async function() {
      if (this.email !== "" && this.password !== "" && this.repass !== "") {
        if (this.password === this.repass) {
          const response = await apiService.post(
            "http://localhost:8080/api/register",
            {
              username: this.email,
              password: this.password
            }
          );
          TokenService.saveRefreshToken(response.data.accessToken);
          TokenService.saveToken(response.data.accessToken);
          console.log(response);
          sessionStorage.setItem('id', response.data.id);
          sessionStorage.setItem('role', response.data.authorities[0].authority);
          this.$router.push({ name: "User Profile" });
        }
      }
    },
    login: function() {
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped></style>
