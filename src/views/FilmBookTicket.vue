<template>
  <v-container>
    <h2>Firm book ticket</h2>

    <v-form ref="form" v-model="isFormValid">
      <v-text-field
        v-model="time"
        :active="modalWinw"
        :focused="modalWinw"
        label="Time"
        :rules="timeRules"
        readonly
      >
        <v-dialog v-model="modalWinw" activator="parent">
          <v-time-picker
            v-if="modalWinw"
            v-model="time"
            scrollable
          ></v-time-picker>
        </v-dialog>
      </v-text-field>

      <v-text-field
        v-model="datePicker"
        :active="modalDatePicker"
        :focused="modalDatePicker"
        :rules="dateRules"
        label="Date"
        readonly
      >
        <v-dialog v-model="modalDatePicker" activator="parent">
          <v-date-picker
            v-if="modalDatePicker"
            v-model="datePicker"
            elevation="24"
          />
        </v-dialog>
      </v-text-field>

      <v-btn
        color="blue"
        class="my-2"
        :loading="isLoadingBookTicket.value"
        @click="handleClickBookTicket"
      >
        Create ticket
      </v-btn>
    </v-form>

    <film-book-place
      :id="route.params.id"
      :daytime="time"
      :showdate="datePicker"
      :book-ticket="bookTicket"
      :loading="isLoadingBookTicket.value"
      @update-list="fetchLoadBookTicket"
      v-if="bookTicket.length > 0"
    />
    <span v-else>No data or choose date and time</span>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { useDate } from "vuetify/lib/framework.mjs";
import moment from "moment";

import FilmBookPlace from "./FilmBookPlace.vue";

const date = useDate();
const route = useRoute();
const store = useStore();

const form = ref(null);
const isFormValid = ref(false);

const time = ref(null);
const modalWinw = ref(false);
const datePicker = ref(null);
const modalDatePicker = ref(false);

const isLoadingBookTicket = ref(false);

const timeRules = [(v) => !!v || "Time is required"];
const dateRules = [(v) => !!v || "Date is required"];

const bookTicket = ref([]);

watch(time, () => {
  bookTicket.value = [];
});

watch(datePicker, () => {
  bookTicket.value = [];
});

const getBookTicket = computed(() => store.getters["getBookTicket"]);

const fetchLoadBookTicket = () => {
  form.value.validate();

  if (isFormValid.value) {
    const formData = {
      id: route.params.id,
      daytime: time.value,
      showdate: ref(moment(datePicker.value).format("YYYY-MM-DD")).value,
    };

    isLoadingBookTicket.value = true;
    store
      .dispatch("loadBookTicket", formData)
      .then(() => {
        bookTicket.value = getBookTicket.value;
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        isLoadingBookTicket.value = false;
      });
  }
};

const handleClickBookTicket = () => {
  fetchLoadBookTicket();
};
</script>