<template>
  <div>
    <p>Seat: {{ seat }}</p>
    <p>{{ isFree ? "Free" : "No free" }}</p>

    <v-btn
      x-small
      :disabled="disabledButton"
      :loading="loading"
      @click="handleClick"
    >
      Book
    </v-btn>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const emit = defineEmits(["seat"]);
const props = defineProps(["seat", "isFree", "disabledButton", "loading"]);

const handleClick = (seat) => {
  emit("book");
};
</script>