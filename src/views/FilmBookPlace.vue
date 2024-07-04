<template>
  <v-card class="px-10">
    <v-progress-circular
      :size="46"
      color="primary"
      indeterminate
      class="mx-auto mt-2 d-block"
      v-if="loading"
    />

    <div v-if="bookTicket">
      <div v-for="ticket in bookTicket" :key="ticket[0].row">
        <span>Row {{ ticket[0].row }}</span>

        <div class="d-flex flex-wrap" v-for="row in ticket">
          <div
            v-for="item in row"
            :key="item.seat"
            class="my-1"
            style="width: 120px"
          >
            <FilmBookPlaceRow
              v-if="item.seat"
              :seat="item.seat"
              :is-free="item.is_free"
              :disabled-button="!item.is_free"
              :loading="isLoadingFilmBookPlace"
              @book="handleClickBookPlace(ticket[0].row, item.seat)"
            />
          </div>
        </div>
      </div>
    </div>
    <span v-else> Ticket not choose or empty </span>

    <Modal v-model="isOpenModal">
      <template v-slot:content>
        <span>
          Seat {{ bookedTicket.seat }}, date: {{ bookedTicket.showdate }}, time:
          {{ bookedTicket.daytime }}
        </span>
      </template>
    </Modal>
  </v-card>
</template>

<script setup>
import { computed, ref, defineEmits } from "vue";
import { useStore } from "vuex";
import Modal from "../components/Modals/Modal.vue";
import FilmBookPlaceRow from "../components/FilmBookPlaceRow.vue";

const store = useStore();
const emit = defineEmits(["loading"]);
const props = defineProps([
  "id",
  "bookTicket",
  "daytime",
  "showdate",
  "loading",
]);

const isOpenModal = ref(false);
const bookedTicket = ref({});
const isLoadingFilmBookPlace = ref(false);

const getFilmBookedPlace = computed(() => store.getters["getFilmBookedPlace"]);

const handleClickBookPlace = (row, seat) => {
  fetchLoadBookPlace(row, seat);
};

const fetchLoadBookPlace = (row, seat) => {
  const { showdate, daytime } = props;

  const formData = {
    movie_id: props.id,
    row,
    seat,
    showdate: "2021-06-27",
    daytime,
  };

  isLoadingFilmBookPlace.value = true;

  store
    .dispatch("loadBookPlace", formData)
    .then(() => {
      isOpenModal.value = true;
      bookedTicket.value = getFilmBookedPlace.value;
      emit("update-list");
    })
    .catch((err) => {
      alert(err?.response?.statusText);
    })
    .finally(() => {
      isLoadingFilmBookPlace.value = false;
    });
};
</script>