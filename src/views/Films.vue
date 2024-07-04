<template>
  <v-container fluid>
    <film-list />
  </v-container>
</template>

<script>
import FilmList from "@/components/FilmList";

export default {
  name: "Films",

  components: {
    FilmList,
  },
};
</script>
