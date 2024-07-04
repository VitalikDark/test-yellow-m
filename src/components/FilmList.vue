<template>
  <v-container fluid>
    <h2>Film list</h2>

    <filter-panel-film-list @loading="getLoadingFiltList" />

    <v-progress-circular
      :size="46"
      color="primary"
      indeterminate
      class="mx-auto mt-2 d-block"
      v-if="isLoadingFilmList"
    />

    <div v-else>
      <div v-for="item in getFilmList" :key="item.id">
        <v-card elevation="2" class="px-1 py-1 my-4">
          <v-btn
            color="blue"
            :disabled="!item.id"
            @click="hanleRouteFilmById(item.id)"
          >
            Movie session
          </v-btn>
          <v-btn
            color="blue"
            class="mx-1"
            @click="hanleRouteFilmBookTicket(item.id)"
          >
            Book ticket
          </v-btn>

          <div v-html="item.id"></div>
          <div v-html="item.name"></div>
          <div>{{ item.description }}</div>
          <div>{{ item.genre }}</div>
          <div v-html="item.additional"></div>
          <v-img max-width="250" :src="item.image" />
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import FilterPanelFilmList from "@/components/Filters/FilterPanelFilmList";
import router from "@/router";
const store = useStore();

const fileList = ref([]);
const isLoadingFilmList = ref(false);

const getFilmList = computed(() => store.getters["getFilmList"]);

watch(getFilmList, (newVal) => {
  fileList.value = newVal;
});

const getLoadingFiltList = (loading) => {
  isLoadingFilmList.value = loading;
};

const fetchLoadFilmList = () => {
  isLoadingFilmList.value = true;

  store
    .dispatch("loadFilmList")
    .then(() => {
      fileList.value = getFilmList.value;
    })
    .finally(() => {
      isLoadingFilmList.value = false;
    });
};

const hanleRouteFilmById = (id) => {
  router.push(`/films/${id}`);
};

const hanleRouteFilmBookTicket = (id) => {
  router.push(`/films/book/ticket/${id}`);
};

onMounted(() => {
  fetchLoadFilmList();
});
</script>
