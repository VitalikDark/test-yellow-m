<template>
  <v-container>
    <h2>More about film</h2>

    <div v-for="(showtimes, id) in sessionList" :key="id">
      <h4>Theatre {{ id }}</h4>

      <ul>
        <li v-for="(show, index) in showtimes" :key="index">
          <i>{{ show.showdate }}</i
          >: {{ show.daytime }}
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const route = useRoute();
const store = useStore();

const isLoadingSession = ref(false);
const sessionList = ref([]);

const getMovieSessionById = computed(
  () => store.getters["getMovieSessionById"]
);

const fetchLoadMoviesSessionById = () => {
  isLoadingSession.value = true;

  store
    .dispatch("loadMoviesSessionById", route.params.id)
    .then(() => {
      sessionList.value = getMovieSessionById.value;
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      isLoadingSession.value = false;
    });
};

onMounted(() => {
  fetchLoadMoviesSessionById();
});
</script>