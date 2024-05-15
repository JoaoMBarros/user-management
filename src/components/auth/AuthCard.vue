<template>
    <div class="flex flex-col w-[375px]">
        <h1 class="text-center font-mulish font-bold text-3xl mb-16">Login</h1>
        <div class="flex flex-col mb-[136px]">
            <CustomInput @update:modelValue="email = $event" type="email" label="E-mail"/>
            <CustomInput @update:modelValue="password = $event" type="password" label="Senha"/>
            <div class="flex justify-between items-center">
                <RouterLink to="" class="text-black font-bold">Esqueceu a senha?</RouterLink>
                <button @click="handleSubmit" class="bg-black/80 text-white p-2 rounded-sm w-[149px] h-[48px] hover:bg-black/60 transition-colors duration-300">Entrar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import CustomInput from './AuthInput.vue';
    import { ref, onMounted } from 'vue';

    const email = ref('');
    const password = ref('');

    // Define the event of type formSubmitted
    const emits = defineEmits(['formSubmitted']);

    // This function will be called when the user clicks the "Entrar" button
    function handleSubmit() {
    const formData = {
        email: email.value,
        password: password.value,
    };

    // Emit the event with the form data
    emits('formSubmitted', formData);
}

// Reset the form fields
onMounted(() => {
        email.value = '';
        password.value = '';
});

</script>