<template>
    <div class="flex w-full border-b-2">
        <span class="font-bold">Horário de trabalho</span>
    </div>

    <div class="flex flex-row mt-4 w-full justify-between mb-4">
        <div class="flex flex-col w-[285px] h-[96px]">
            <span class="text-sm font-bold mb-[17px]">
                Dias da semana
            </span>
            
            <div class="flex flex-row w-[285px] justify-between">
                <TimePicker label="Inicio" :time="workHours.dia_util_inicio" @update:modelValue="updateWorkHours('dia_util_inicio', $event)" />
                <TimePicker label="Fim" :time="workHours.dia_util_fim" @update:modelValue="updateWorkHours('dia_util_fim', $event)" />
            </div>
            <span v-if="invalidFields.dia_util_fimInvalid || invalidFields.dia_util_inicioInvalid" class="text-[10px] text-red-500">Campo obrigatório</span>
        </div>

        <div class="flex flex-col w-[285px] h-[96px]">
            <span class="text-sm font-bold mb-[17px]">
                Sábado
            </span>

            <div class="flex flex-row w-[285px] justify-between">
                <TimePicker label="Inicio" :time="workHours.sabado_inicio" @update:modelValue="updateWorkHours('sabado_inicio', $event)"/>
                <TimePicker label="Fim" :time="workHours.sabado_fim" @update:modelValue="updateWorkHours('sabado_fim', $event)" />
            </div>
            <span v-if="invalidFields.sabado_fimInvalid || invalidFields.sabado_inicioInvalid" class="text-[10px] text-red-500">Campo obrigatório</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import TimePicker from './TimePicker.vue';

const props = defineProps({
    workHours: Object,
    invalidFields: Object
})

const workHours = ref(props.workHours);
const invalidFields = ref(props.invalidFields);

const emits = defineEmits(['updateWorkHours']);

const updateWorkHours = (field, value) => {
    emits('updateWorkHours', { field, value });
};

</script>