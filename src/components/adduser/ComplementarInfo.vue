<template>
    <div class="flex w-full border-b-2">
        <span class="font-bold">Dados complementares</span>
    </div>

    <div class="flex flex-col mt-4">
        <div class="flex flex-row gap-2">
            <DropDownMenu :required="invalidFields.perfilInvalid" class="w-[243px]" label="Perfil" :selectedValue="userData.perfil" @update:modelValue="updateUser('perfil', $event)">
                <option v-for="(status, index) in profiles" :key="index">{{ status.label }}</option>
            </DropDownMenu>
            <InputField label="Função" class="w-[243px]" :value="userData.funcao" @update:modelValue="updateUser('funcao', $event)" />
            <InputField label="Naturalidade" class="w-[243px]" :value="userData.naturalidade" @update:modelValue="updateUser('nome', $event)" />
        </div>
        <InputField label="Chave PIX" class="w-[387px]" :value="userData.pix_key" @update:modelValue="updateUser('pix_key', $event)" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import InputField from './InputField.vue';
import DropDownMenu from './DropDownMenu.vue';
import { profiles } from '@/enums/profilesEnum';

const props = defineProps({
    userData: Object,
    invalidFields: Object
})

const userData = ref(props.userData);
const invalidFields = ref(props.invalidFields);

const emits = defineEmits(['updateUserData']);

const updateUser = (field, value) => {
    emits('updateUserData', { field, value });
};
</script>