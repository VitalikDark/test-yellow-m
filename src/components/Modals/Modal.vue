<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card>
      <template v-slot:actions>
        <slot name="content"></slot>

        <v-spacer></v-spacer>
        <v-btn @click="dialog = false">Close</v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref, defineProps, computed, toRefs, defineEmits} from 'vue';
  
  const props = defineProps(['modelValue'])
  const emit = defineEmits(['modelValue'])

  const { modelValue } = toRefs(props);

    const dialog = computed({
      get: () => modelValue.value,
      set: value => {
        emit('update:modelValue', value);
      }
    });

  const show = () => ref(false)
</script>