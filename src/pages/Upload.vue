<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Upload new document</h4>
        <p class="category">Select image to upload</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Document title</label>
              <md-input v-model="documentName" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Secret message</label>
              <md-input v-model="secret" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Patient id</label>
              <md-input v-model="patientId" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <md-input type="file" v-on:change="setFile"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" v-on:click="upload"
              >Upload</md-button
            >
          </div>
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
      file: null,
      documentName: "",
      secret: "",
      doctorId: null,
      userId: null,
      patientId: null
    };
  },
  methods: {
    upload: async function() {
      if (this.file !== null) {
        console.log(this.file);
        const response = await ApiService.post(
          "http://localhost:8080/api/doc/create",this.getMultipartFile(),
          {
            headers: {
              "content-type": "multipart/form-data"
            },
            params: {
              message: this.secret,
              name: this.documentName,
              doctorId: sessionStorage.getItem("id"),
              userId: this.patientId
            }
          }
        );
        console.log(response);
      }
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
