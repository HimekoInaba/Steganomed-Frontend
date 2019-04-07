<template>
  <div>
    <md-table v-model="docs" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Creation Time">{{
          item.creationTime
        }}</md-table-cell>
        <md-table-cell md-label="Doctor Id">{{ item.doctorId }}</md-table-cell>
        <md-table-cell md-label="Image"
          ><img :src="item.content"
        /></md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import ApiService from "../../services/ApiService";

export default {
  name: "simple-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      docs: [],
      selected: []
    };
  },
  created() {
    this.getDocs();
  },
  methods: {
    async getDocs() {
      if (sessionStorage.getItem("role") === "PATIENT") {
        const res = await ApiService.get(
          "http://localhost:8080/api/doc/getByUser/" +
            sessionStorage.getItem("id")
        );
        this.docs = res.data;
      } else {
        const res = await ApiService.get(
          "http://localhost:8080/api/doc/getAllDocuments"
        );
        this.docs = res.data;
      }
    }
  }
};
</script>
