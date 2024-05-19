<template>
    <div class="flex w-screen h-screen overflow-x-hidden">
        <div class="flex flex-col">
            <SideBar />
            <TopBar />
        </div>

        <div class="flex flex-wrap gap-4 justify-start w-fit h-fit mx-28 mt-32">
            <DashboardCard text="Configuração" iconName="config-icon" /> 
            <DashboardCard @click="navigate('/users')" text="Usuários" iconName="user-avatar-icon" /> 
            <DashboardCard text="Permissões" iconName="permissions-icon" /> 
            <DashboardCard text="Motivo de cancelamento" iconName="cancel-icon" /> 
            <DashboardCard text="Logs" iconName="logs-icon" /> 
            <DashboardCard text="Segmentos" iconName="segments-icon" /> 
            <DashboardCard text="Versões" iconName="versions-icon" /> 
            <DashboardCard text="Feriados" iconName="holidays-icon" /> 
            <DashboardCard text="Laudos" iconName="reports-icon" /> 
            <DashboardCard text="Mensagens pré-definidas" iconName="pre-messages-icon" /> 
        </div>
    </div>
</template>

<script setup>
import SideBar from '@/components/sidebar/SideBar.vue';
import TopBar from '@/components/topbar/TopBar.vue';
import DashboardCard from '@/components/dashboard/DashboardCard.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navigate = (path) => {
    router.push(path);
};


</script>