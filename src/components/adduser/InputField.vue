
<template>
    <div class="flex flex-col">
        <span class="text-sm text-[#00000080]">{{ label }}</span>
        <input class="h-[38px] rounded-lg border mb-4"/>
    </div>
</template>
  
<script setup>
  import { defineProps } from 'vue';
  
  defineProps({
    label: String,
  });
</script>