
<template>
    <div class="side-nav-bar h-full mt-[70px] w-12">
      <div class="flex items-center flex-col gap-9">
        <DynamicIcon v-for="(iconName, index) in iconNames" :key="index" :name="iconName" />
      </div>
    </div>
</template>
  
<script setup>
  import DynamicIcon from './ShowIcon.vue';
  import { defineProps } from 'vue';
  
  const props = defineProps({
    iconNames: Array,
  });
</script>