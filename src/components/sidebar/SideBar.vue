<template>
    <div class="relative side-nav-bar bg-[#0091FF] h-full w-[50px]">
        <div class="flex items-center flex-col gap-9">
            <ListIcon :iconNames="['first-icon', 'second-icon', 'third-icon', 'fourth-icon', 'fifth-icon', 'sixth-icon']" />
            <img :src="logo" class="w-10 h-10 absolute bottom-0" />
        </div>
    </div>
</template>
  
<script setup>
  import ListIcon from './ListIcon.vue';
  import logo from '@/assets/logo.png';
</script>