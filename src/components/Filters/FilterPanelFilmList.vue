<template>
  <v-form class="d-flex flex-wrap justify-space-between align-center">
    <v-text-field v-model="formData.id" label="Id" class="mx-1" />
    <v-text-field
      type="text"
      v-model="formData.name"
      label="Name"
      class="mx-1"
    />
    <v-text-field v-model="formData.genres" label="Genres" class="mx-1" />

    <v-btn small class="mx-1" @click="handleClickApplyFilter"> Apply </v-btn>
    <v-btn small class="mx-1" @click="handleClickResetFilter"> Reset </v-btn>
  </v-form>
</template>

<script setup>
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();
const emit = defineEmits(["loading"]);

const formData = ref({
  id: "",
  name: "",
  genres: "",
});

const resetFields = () => {
  formData.value = {
    id: "",
    name: "",
    genres: "",
  };
};

const fetchLoadFilmList = (data) => {
  emit("loading", true);
  console.log("formdata ", data);

  store
    .dispatch("loadFilmList", data)
    .then(() => {})
    .finally(() => {
      emit("loading", false);
    });
};

const handleClickApplyFilter = () => {
  fetchLoadFilmList(formData.value);
};

const handleClickResetFilter = () => {
  resetFields();
  fetchLoadFilmList(formData.value);
};
</script>
