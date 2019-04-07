<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">{{ role }}</h6>
      <h4 class="card-title">{{ username }}</h4>
      <p class="card-description">
        Йо собаки, я Наруто Узумаки
      </p>
    </md-card-content>
  </md-card>
</template>
<script>
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.jpg")
    }
  },
  created() {

  },
  data() {
    return {
      username: "",
      role: ""
    };
  }
};
</script>
<style></style>
