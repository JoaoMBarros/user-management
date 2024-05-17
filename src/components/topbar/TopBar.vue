<template>
    <nav class="flex-col absolute top-0 top-nav-bar bg-[#007AD6] h-[50px] w-screen justify-start"> 
        <div class="flex flex-row items-center h-full gap-9 ml-[13px]">
            <topBarIcon />
            <h1 class="text-white text-lg font-bold">Utilitários{{ props.text }}</h1>
            <h1 class="text-white text-lg font-bold text-end w-full mr-4">Manager</h1>
        </div>
    </nav>
</template>

<script setup>
import topBarIcon from '@/assets/topbar/icon.svg'

const props = defineProps({
    text: String,
});

</script>