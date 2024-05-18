<template>
    <div class="flex w-full border-b-2">
        <span class="font-bold">Endereço</span>
    </div>

    <div class="flex flex-col mt-4">
        <div class="flex flex-row items-center">
            <InputField :required="invalidFields.cepInvalid" label="CEP" class="w-[208px]" :value="addressData.cep" @update:modelValue="updateAddress('cep', $event)" />
            <button class="text-blue-500 ml-1">Maps</button>
        </div>

        <div class="flex flex-row justify-between">
            <InputField :required="invalidFields.logradouroInvalid" label="Logradouro" class="w-[555px]" :value="addressData.logradouro" @update:modelValue="updateAddress('logradouro', $event)" />
            <InputField :required="invalidFields.numeroInvalid" label="Número" class="w-[182px]" :value="addressData.numero" @update:modelValue="updateAddress('numero', $event)" />
        </div>

        <div class="flex flex-row justify-between mb-4">
            <DropDownMenu class="w-[102px]" label="Estado" :selectedValue="addressData.estado" @update:modelValue="updateAddress('estado', $event)">
                <option v-for="(status, index) in ufStates" :key="index">{{ status.label }}</option>
            </DropDownMenu>
            <DropDownMenu :required="invalidFields.cidadeInvalid" class="w-[317px]" label="Cidade" :selectedValue="addressData.cidade" @update:modelValue="updateAddress('cidade', $event)">
                <option v-if="citiesLoaded" v-for="(status, index) in cities" :key="index">{{ status.label }}</option>
            </DropDownMenu>
            <DropDownMenu :required="invalidFields.bairroInvalid" class="w-[317px]" label="Bairro" :selectedValue="addressData.bairro" @update:modelValue="updateAddress('bairro', $event)">
                <option v-if="neighborhoodLoaded" v-for="(status, index) in neighborhoods" :key="index">{{ status.label }}</option>
            </DropDownMenu>
        </div>

        <div class="flex flex-w justify-between">
            <InputField label="Referência" class="w-[368px]" :value="addressData.referencia" @update:modelValue="updateAddress('referencia', $event)" />
            <InputField label="Complemento" class="w-[369px]" :value="addressData.complemento" @update:modelValue="updateAddress('complemento', $event)" />
        </div>
    </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import InputField from './InputField.vue';
import DropDownMenu from './DropDownMenu.vue';
import { ufStates } from '@/enums/ufStatesEnum.js';

const props = defineProps({
    addressData: Object,
    invalidFields: Object,
    cities: Object,
    neighborhoods: Array,
    citiesLoaded: Boolean,
    neighborhoodLoaded: Boolean
})

const addressData = ref(props.addressData);
const invalidFields = ref(props.invalidFields);
const cities = ref(props.cities);
const neighborhoods = ref(props.neighborhoods);
const citiesLoaded = ref(props.citiesLoaded);
const neighborhoodLoaded = ref(props.neighborhoodLoaded);

watchEffect(() => {
        addressData.value = props.addressData;
        invalidFields.value = props.invalidFields;
        cities.value = props.cities;
        neighborhoods.value = props.neighborhoods;
        citiesLoaded.value = props.citiesLoaded;
        neighborhoodLoaded.value = props.neighborhoodLoaded;
});

const emits = defineEmits(['updateAddressData']);

const updateAddress = (field, value) => {
    emits('updateAddressData', { field, value });
};

</script>