<template>
    <div class="flex w-full border-b-2">
        <span class="font-bold">Telefone</span>
    </div>

    <div class="flex flex-row justify-between mt-4">
        <InputField :required="invalidFields.telefoneInvalid" label="Telefone" class="w-[368px]" :value="userData.telefone" @update:modelValue="updateUser('telefone', $event)" />
        <InputField :required="invalidFields.emailInvalid" label="Email" class="w-[368px]" :value="userData.email" @update:modelValue="updateUser('email', $event)" />
    </div>

</template>

<script setup>
import { ref } from 'vue'
import InputField from './InputField.vue';

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