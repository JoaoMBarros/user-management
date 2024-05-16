<template>
    <div class="list-container flex w-screen h-screen overflow-x-hidden bg-[#F5F6F7]">
        <div class="flex flex-col">
            <SideBar />
            <TopBar />
        </div>
        
        <EmptyUsers v-if="users.length === 0" />
        <ListUsers v-else :users="users" />
        
    </div>
</template>

<script setup>
import SideBar from '@/components/sidebar/SideBar.vue';
import TopBar from '@/components/topbar/TopBar.vue';
import EmptyUsers from '@/components/users/EmptyUsers.vue';
import ListUsers from '@/components/users/ListUsers.vue';
import { onMounted, ref } from 'vue';

const users = ref([]);

const getUsers = async () => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const authToken = userData.token;

    const response = await fetch('https://api-manager-test.infog2.com.br.infog2.com.br/a/colaborador/?text=', {
        headers: {
            Authorization: `Token ${authToken}`,
        },
    });

    const responseData = await response.json();

    if (!response.ok) {
        console.error(users.value);
    }

    users.value = responseData.results;
};

// onMounted(() => {
//     getUsers();
// });

</script>

<style scoped>
.list-container::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.list-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 8px;
}

</style>