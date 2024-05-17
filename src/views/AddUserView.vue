<template>
    <div class="flex h-screen w-screen justify-center overflow-x-hidden bg-zinc-400">
        <section class="flex h-[1541.86px] w-[770px] flex-col  mt-[73px] bg-white rounded-t-xl">
            <div class="flex w-full items-center bg-[rgb(0,145,255)] h-[50px] rounded-t-xl">
                <h1 class="text-white text-md ml-3">Novo usuário</h1>
            </div>

            <div class="flex mx-[13px] flex-col">

                <div class="flex w-full border-b-2 mt-2">
                    <span class="font-bold">Dados básicos</span>
                </div>

                <div class="flex flex-row mt-4 h-full w-full items-start justify-center gap-[81px]">
                    <emptyUserPhotoIcon />
                    <div class="flex flex-col flex-grow">
                        <InputField label="Nome"/>
                        <InputField label="Nome da Mãe"/>
                        <InputField label="Nome do Pai"/>
                    </div>
                </div>

                <div class="flex gap-2 flex-row">
                        <!-- CPF -->
                        <InputField label="CPF" class="w-[180px]"/>

                        <!-- Menu de dropdown pro estado civil -->
                        <DropDownMenu label="Estado Civil" class="w-[180px]" @update:model-value="selectedCivilStatus">
                            <option v-for="(status, index) in civilStatusOptions" :key="index">{{ status.label }}</option>
                        </DropDownMenu>
                    
                        <!-- Calendario -->
                        <div class="flex flex-col">
                            <span class="text-sm text-[#00000080]"> Data de nascimento </span>
                            <VueDatePicker model-value="birthdate" locale="pt-BR" class="w-[180px]" @update:model-value="formatDate">
                                <template #trigger>
                                    <button class="flex gap-6 items-center w-full border h-[38px] rounded-lg"><calendarIcon class="ml-1" />{{ formatedBirthdate }}</button>
                                </template>
                            </VueDatePicker>
                        </div>

                        <!-- Apelido-->
                        <InputField label="Apelido" class="w-[180px]"/>
                        
                </div>

                    <div class="flex w-full border-b-2">
                        <span class="font-bold">Dados complementares</span>
                    </div>

                    <div class="flex flex-col mt-4">
                        <div class="flex flex-row gap-2">
                            <DropDownMenu class="w-[243px]" label="Perfil">
                                <option v-for="(status, index) in profiles" :key="index">{{ status.label }}</option>
                            </DropDownMenu>
                            <InputField label="Função" class="w-[243px]" />
                            <InputField label="Naturalidade" class="w-[243px]" />
                        </div>
                        <InputField label="Chave PIX" class="w-[387px]" />
                    </div>

                    <div class="flex w-full border-b-2">
                        <span class="font-bold">Horário de trabalho</span>
                    </div>

                    <div class="flex flex-row mt-4 w-full justify-between">
                        <div class="flex flex-col w-[285px] h-[96px] gap-[17px]">
                            <span class="text-sm font-bold">
                                Dias da semana
                            </span>
                            
                            <div class="flex flex-row w-[285px] justify-between">
                                <TimePicker label="Inicio" @update:modelValue="clockInTime = $event" />
                                <TimePicker label="Fim" @update:modelValue="clockInTime = $event" />
                            </div>
                        </div>

                        <div class="flex flex-col w-[285px] h-[96px] gap-[17px]">
                            <span class="text-sm font-bold">
                                Sábado
                            </span>

                            <div class="flex flex-row w-[285px] justify-between">
                                <TimePicker label="Inicio" @update:modelValue="clockInTime = $event" />
                                <TimePicker label="Fim" @update:modelValue="clockInTime = $event" />
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    </div>
</template>

<script setup>
import emptyUserPhotoIcon from '@/assets/adduser/empty-user-photo-icon.svg';
import calendarIcon from '@/assets/adduser/calendar-icon.svg';
import clockIcon from '@/assets/adduser/clock-icon.svg';
import InputField from '@/components/adduser/InputField.vue';
import DropDownMenu from '@/components/adduser/DropDownMenu.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import TimePicker from '@/components/adduser/TimePicker.vue';

const civilStatusOptions = ref([
        { value: 1, label: 'Casado(a)' },
        { value: 2, label: 'Solteiro(a)' },
        { value: 3, label: 'Divorciado(a)' },
        { value: 4, label: 'Viuvo(a)' },
        { value: 5, label: 'Separado(a)'}
      ])

const profiles = ref([
    { value: 1, label: 'ADMIN' },
    { value: 2, label: 'FINANCEIRO' },
    { value: 3, label: 'GERENTE' },
    { value: 4, label: 'SUPORTE' },
    { value: 5, label: 'MARKETING' }
])

let formatedBirthdate = ref('');
const clockInTime = ref('');
const selectedCivilStatus = ref(null);

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  formatedBirthdate = `${day}/${month}/${year}`;
};

</script>