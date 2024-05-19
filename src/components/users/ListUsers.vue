<template>
    <div class="flex w-full h-fit mx-20 mt-16 mb-8 flex-col">
        <AddUserView v-if="showModal" @close-modal="toggleModal" :userId="user_id" />
            <div class="flex flex-row items-center mb-2 h-[50px]">
                <div class="w-[419px] bg-white gap-2 flex items-center rounded-lg h-[35px]">  
                    <searchUserIcon />                  
                    <input type="text" class="w-full h-[35px] rounded-md p-1" placeholder="Nome e CPF" @input="updateSearchValue($event.target.value)" />
                </div>
                <button class="flex ml-2 hover:scale-105" @click="toggleModal">
                    <addUserIcon />
                </button>
            </div>

            <ul class="flex flex-col gap-4">
                <li v-for="(user, index) in filteredUsers" :key="index" class="rounded-lg shadow-lg bg-white hover:cursor-pointer hover:scale-105 overflow-hidden" @click="toggleModal(user)">
                    <div v-if="checkUser(user)" class="flex w-full mx-16 max-w-full items-center justify-between h-[85px]">
                        <!-- Nome e Cargo -->
                        <div class="flex-col items-start w-[120px]"> 
                            <p class="text-sm font-bold overflow-hidden whitespace-nowrap text-ellipsis">{{ user.nome }}</p>
                            <p class="text-sm">{{ user.perfil_str }}</p>
                        </div>

                        <!-- Status -->
                        <div class="flex w-[56px] bg-[#AEF5E4] rounded-md">
                            <p class="text-sm text-[#038868] font-bold text-center w-full">{{ user.status }}</p>
                        </div>

                        <!-- CPF/CNPJ -->
                        <div class="flex items-start w-[187px]">
                            <p class="text-sm">{{ user.cpf_cnpj_formatado }}</p>
                        </div>
                        
                        <!-- Endereço -->
                        <div class="flex flex-col items-start justify-start w-[320px]">
                            <p class="text-sm">{{ user.endereco_residencial }}</p>
                            <p class="text-sm">{{ user.cidade }}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
</template>

<script setup>
import addUserIcon from '@/assets/users/add-user-button-icon.svg';
import searchUserIcon from '@/assets/users/search-user-icon.svg';
import AddUserView from '@/views/AddUserView.vue';
import { ref, computed } from 'vue';

const props = defineProps({
    users: Array,
});

const showModal = ref(false);

const user_id = ref('')

const searchInput = ref('');

const updateSearchValue = (value) => {
    searchInput.value = value;
};

const checkUser = (user) => {
    return user.nome.toLowerCase().includes(searchInput.value.toLowerCase()) || user.cpf_cnpj_formatado.includes(searchInput.value) || searchInput.value === '';
};

const filteredUsers = computed(() => {
    return props.users.filter(checkUser);
});

const toggleModal = (user) => {
    if (user){
        user_id.value = user.id
    }
    showModal.value = !showModal.value;
};

</script>