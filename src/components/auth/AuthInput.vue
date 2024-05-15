<template>
    <label class="text-black font-bold text-sm mb-1">{{ label }}</label>
    <input @input="updateLocalValue($event.target.value)" :type="type" class="border border-[#E9EEF2] p-1 rounded-md mb-9"/>
</template>

<script setup>
  import { defineProps, ref } from 'vue';
  
  const props = defineProps({
    type: String,
    label: String,
  });
  
  // Define the event of type update:modelValue
  const emits = defineEmits(['update:modelValue']);
  
  // Create a local value to store the input value
  const localValue = ref(props.value);
  
  // Update the local value and emit the event
  function updateLocalValue(value) {
    localValue.value = value;
    emits('update:modelValue', value);
  }
</script>