<template>
    <div class="flex w-full mx-20 mt-16 mb-8 flex-col overflow-hidden">
        <div class="flex flex-row items-center mb-2 h-[50px]">
            <div class="w-[419px] gap-2 flex items-center rounded-lg h-[35px]">                  
                <h1 class="font-bold">Usuários</h1>
            </div>
            <button class="flex ml-2">
                <addUserIcon />
            </button>
        </div>
        <div class="flex flex-col items-center h-full justify-center max-h-screen rounded-lg">
            <button class="rounded-full overflow-hidden">
                <emptyUserIcon />
            </button>
            <span class="text-sm text-[#939393] text-center w-[260px] p-1">Não há usuários. Clique no ícone acima para adicionar</span>
        </div>
    </div>
</template>

<script setup>
import addUserIcon from '@/assets/users/add-user-button-icon.svg';
import emptyUserIcon from '@/assets/users/empty-users-icon.svg';
</script>