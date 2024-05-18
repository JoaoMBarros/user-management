<template>
    <div class="flex flex-col w-[135px] border-b-2">
        <span class="text-sm text-[#00000080]">{{props.label}}</span>
        <VueDatePicker modelValue="time" time-picker @update:modelValue="formatTime">
            <template #trigger>
                <div class="flex flex-row items-center justify-between mx-5">
                    <button class="h-[38px] text-[24px] rounded-lg">{{ clockInTime }}</button>
                    <clockIcon  />
                </div>
            </template>
        </VueDatePicker>
    </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, defineEmits } from 'vue';
import clockIcon from '@/assets/adduser/clock-icon.svg';

const props = defineProps({
    label: String,
    time: String,
});

let clockInTime = ref(props.time);
const emits = defineEmits(['update:modelValue']);

const formatTime = (time) => {
  const hours = String(time['hours']).padStart(2, '0');
  const minutes = String(time['minutes']).padStart(2, '0');

  clockInTime = `${hours}:${minutes}`;
  emits('update:modelValue', clockInTime);
};

</script>