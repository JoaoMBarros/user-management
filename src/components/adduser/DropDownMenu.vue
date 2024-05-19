<!-- DropdownMenu.vue -->
<template>
    <div class="flex flex-col">
      <span class="text-sm text-[#00000080]">{{ props.label }}</span>
      <select class="h-[38px] rounded-lg border" @change="onSelectionChange" :value="localSelectedValue">
        <option disabled>Selecione uma opção</option>
        <slot></slot>
      </select>
      <span v-if="localInvalid" class="text-red-500 text-[10px]">Campo obrigatório</span>
    </div>
  </template>
  
<script setup>
import { ref, watch, watchEffect } from 'vue';

  const props = defineProps({
    label: String,
    selectedValue: String,
    required: {
      type: Boolean,
      default: false,
    },
  });

  const localRequired = ref(props.required);
  const localSelectedValue = ref(props.selectedValue);
  const localInvalid = ref(false);
  const emits = defineEmits(['update:modelValue']);

  watch(props, (newProps) => {
    localRequired.value = newProps.required;
  });


  watchEffect(() => {
    localInvalid.value = localRequired.value && localSelectedValue.value === '';
  });

  const onSelectionChange = (event) => {
    localSelectedValue.value = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex].value;
    emits('update:modelValue', selectedOption);
  };


</script>