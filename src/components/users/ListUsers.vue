<template>
    <div class="flex w-full h-fit mx-20 mt-16 mb-8 flex-col">
            <div class="flex flex-row items-center mb-2 h-[50px]">
                <div class="w-[419px] bg-white gap-2 flex items-center rounded-lg h-[35px]">  
                    <searchUserIcon />                  
                    <input type="text" class="w-full h-[35px] rounded-md" placeholder="Nome e CPF" />
                </div>
                <button class="flex ml-2">
                    <addUserIcon />
                </button>
            </div>

            <ul class="flex flex-col gap-4">
                <li v-for="(user, index) in users" :key="index" class="rounded-lg shadow-lg bg-white hover:cursor-pointer hover:scale-105 overflow-hidden">
                    <div class="flex w-full mx-16 max-w-full items-center justify-between h-[85px]">
                        
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
import { onMounted, ref } from 'vue';

const props = defineProps({
    users: Array,
});

</script>