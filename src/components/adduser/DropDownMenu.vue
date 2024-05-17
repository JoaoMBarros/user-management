<!-- DropdownMenu.vue -->
<template>
    <div class="flex flex-col">
      <span class="text-sm text-[#00000080]">{{ label }}</span>
      <select class="h-[38px] rounded-lg border">
        <option disabled value="">Selecione uma opção</option>
        <slot></slot>
      </select>
    </div>
  </template>
  
<script setup>
    defineProps(['label']);
    defineEmits(['update:modelValue']);
</script>