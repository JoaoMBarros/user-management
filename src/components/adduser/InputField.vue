<template>
  <div class="flex flex-col mb-4">
    <span class="text-sm text-[#00000080]">{{ label }}</span>
    <input class="h-[38px] rounded-lg border p-2" :value="localValue" @input="updateLocalValue($event.target.value)">
    <span v-if="localInvalid" class="text-red-500 text-[10px]">Campo obrigatório</span>
  </div>
</template>

  
<script setup>
import { ref, defineProps, watchEffect, watch } from 'vue';

const props = defineProps({
  label: String,
  value: String,
  required: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:modelValue']);
const localValue = ref(props.value);
const localRequired = ref(props.required);
const localInvalid = ref(false);

watch(props, (newProps) => {
  localRequired.value = newProps.required;
});


watchEffect(() => {
  localInvalid.value = localRequired.value && localValue.value === '';
});


function updateLocalValue(value) {
  localValue.value = value;
  emits('update:modelValue', value);
}
</script>
