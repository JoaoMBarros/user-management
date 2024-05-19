<template>
    <button v-on:click="handleClick">
        <div class="bg-blue-500 w-[125px] h-[108px] rounded-md hover:scale-110">
            <div class="flex flex-col justify-start items-center h-full">
                <Icon />
                <text class="text-white text-sm font-bold text-balance text-center">{{ props.text }}</text>
            </div>
        </div>
    </button>
</template>

<script setup>
    import { defineAsyncComponent } from 'vue';

    const props = defineProps({
        text: String,
        iconName: String
    });

    const emit = defineEmits(['click']);

    const handleClick = () => {
        emit('click');
    };

    const Icon = defineAsyncComponent(() =>
        import (`@/assets/dashboard/${props.iconName}.svg`)
    );


</script>