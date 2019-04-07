<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Decode image</h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <md-input
                type="file"
                v-on:change="setFile"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" v-on:click="upload">Decode</md-button>
          </div>
          <md-card-content>
            <h4>Your secret message is: {{ decoded }}</h4>
          </md-card-content>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import ApiService from "../services/ApiService";

export default {
  name: "edit-profile-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: "green"
    }
  },
  data() {
    return {
      decoded: "",
      file: null
    };
  },
  methods: {
    async upload() {
      const response = await ApiService.post(
        "http://localhost:8080/decode",
        this.getMultipartFile(),
        {
          headers: {
            "content-type": "multipart/form-data"
          }
        }
      );
      this.decoded = response.data;
    },
    getMultipartFile() {
      const filedata = new FormData();
      filedata.append("file", this.file);
      return filedata;
    },
    setFile(event) {
      this.file = event.target.files[0];
    }
  }
};
</script>
<style></style>
