<template>
    <div class="flex w-full border-b-2">
    <span class="font-bold">Documentos</span>
</div>

<div class="flex flex-col mt-4">
    <div class="flex flex-row justify-between">
        <InputField label="Número de identidade" class="w-[243px]" :value="userData.numero_identidade" @update:modelValue="updateUser('numero_identidade', $event)" />
        <InputField label="Órgão emissor" class="w-[243px]" :value="userData.orgao_emissor_identidade" @update:modelValue="updateUser('orgao_emissor_identidade', $event)" />
        <DropDownMenu :required="invalidFields.uf_identidadeInvalid" class="w-[243px]" label="UF identidade" :selectedValue="userData.uf_identidade" @update:modelValue="updateUser('uf_identidade', $event)">
            <option v-for="(status, index) in ufStates" :key="index">{{ status.label }}</option>
        </DropDownMenu>
    </div>

    <div class="flex flex-row justify-between">
        <InputField label="Título de eleitor" class="w-[243px]" :value="userData.numero_titulo_eleitor" @update:modelValue="updateUser('numero_titulo_eleitor', $event)" />
        <InputField label="Seção do título" class="w-[243px]" :value="userData.secao_titulo_eleitor" @update:modelValue="updateUser('secao_titulo_eleitor', $event)" />
        <InputField label="Zona do título" class="w-[243px]" :value="userData.zona_titulo_eleitor" @update:modelValue="updateUser('zona_titulo_eleitor', $event)" />
    </div>

    <div class="flex flex-row justify-between">
        <InputField label="Carteira de trabalho" class="w-[190px]" :value="userData.numero_carteira_trabalho" @update:modelValue="updateUser('numero_carteira_trabalho', $event)" />
        <InputField label="Série da carteira" class="w-[190px]" :value="userData.serie_carteira_trabalho" @update:modelValue="updateUser('serie_carteira_trabalho', $event)" />
        <InputField :required="invalidFields.data_emissao_carteira_trabalhoInvalid" label="Data da emissão da carteira" class="w-[190px]" :value="userData.data_emissao_carteira_trabalho" @update:modelValue="updateUser('data_emissao_carteira_trabalho', $event)" />
        <DropDownMenu :required="invalidFields.uf_carteira_trabalhoInvalid" class="w-[155px]" label="UF da carteira" :selectedValue="userData.uf_carteira_trabalho" @update:modelValue="updateUser('uf_carteira_trabalho', $event)">
            <option v-for="(status, index) in ufStates" :key="index">{{ status.label }}</option>
        </DropDownMenu>
    </div>
    
</div>
</template>

<script setup>
import { ref } from 'vue'
import InputField from './InputField.vue';
import DropDownMenu from './DropDownMenu.vue';
import { ufStates } from '@/enums/ufStatesEnum.js';

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