<template>
    <div class="flex w-full border-b-2 mt-2">
        <span class="font-bold">Dados básicos</span> 
    </div>

    <div class="flex flex-row mt-4 h-full w-full items-start justify-center gap-[81px]">
        <emptyUserPhotoIcon />
        <div class="flex flex-col flex-grow">
            <InputField :required="invalidFields.nomeInvalid" label="Nome" :value="userData.nome" @update:modelValue="updateUser('nome', $event)"/>
            <InputField label="Nome da Mãe" :value="userData.nome_mae" @update:modelValue="updateUser('nome_mae', $event)"/>
            <InputField label="Nome do Pai" :value="userData.nome_pai" @update:modelValue="updateUser('nome_pai', $event)"/>
        </div>
    </div>

    <div class="flex gap-2 flex-row">
        <!-- CPF -->
        <InputField :required="invalidFields.cpf_cnpjInvalid" label="CPF" class="w-[180px]" :value="userData.cpf_cnpj" @update:modelValue="updateUser('cpf_cnpj', $event)"/>

        <!-- Menu de dropdown pro estado civil -->
        <DropDownMenu :required="invalidFields.estado_civilInvalid" label="Estado Civil" class="w-[180px]" :selectedValue="userData.estado_civil" @update:modelValue="updateUser('estado_civil', $event)">
            <option v-for="(status, index) in civilStatusOptions" :key="index">{{ status.label }}</option>
        </DropDownMenu>

        <!-- Calendario -->
        <div class="flex flex-col">
            <span class="text-sm text-[#00000080]"> Data de nascimento </span>
            <VueDatePicker model-value="birthdate" locale="pt-BR" class="w-[180px]" @update:model-value="formatDate">
                <template #trigger>
                    <button class="flex gap-6 items-center w-full border h-[38px] rounded-lg"><calendarIcon class="ml-1" />{{ userData.data_nascimento }}</button>
                    <span v-if="invalidFields.data_nascimentoInvalid" class="text-[10px] text-red-500">Campo obrigatório</span>
                </template>
            </VueDatePicker>
        </div>

        <!-- Apelido-->
        <InputField label="Apelido" class="w-[180px]" :value="userData.apelido" @update:modelValue="updateUser('apelido', $event)"/>
            
    </div>
</template>

<script setup>
import { ref } from 'vue'
import InputField from './InputField.vue';
import DropDownMenu from './DropDownMenu.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { civilStatusOptions } from '@/enums/civilStatusEnum';
import emptyUserPhotoIcon from '@/assets/adduser/empty-user-photo-icon.svg';
import calendarIcon from '@/assets/adduser/calendar-icon.svg';

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

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  userData.data_nascimento = `${day}/${month}/${year}`;
  updateUser('data_nascimento', userData.data_nascimento);
};

</script>