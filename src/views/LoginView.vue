<template>
  <main class="flex flex-row h-screen">
    <div class="flex bg-masked-login-bg bg-no-repeat bg-cover absolute left-0 top-0 h-full w-3/6" /> 
    <div class="flex flex-col w-3/6 h-full justify-center items-center absolute right-0">
        <AuthCard @formSubmitted="login"/> <!--  Waits for the form submission event -->
        <div class="absolute bottom-0 flex flex-col w-full">
          <img :src="loginFooterImg" />
        </div>
    </div>
  </main>
</template>

<script setup>
  import loginFooterImg from '@/assets/login/login-footer.png'
  import AuthCard from '../components/auth/AuthCard.vue';
  import router from '@/router';
  
  // Login
  const login = async (formData) => {
    const email = formData.email;
    const password = formData.password;

      if (!email || !password) {
        alert('Preencha todos os campos');
        return;
      }

      try {
        const response = await fetch('https://api-manager-test.infog2.com.br.infog2.com.br/a/auth/login_colaborador/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('user_data', JSON.stringify(data));

          // Redirect to the dashboard
          router.push('/');
        } else {
          console.error(data);
          alert(data.error)
        }
      } catch (error) {
        console.error(error);
        alert('Erro ao realizar login');
      }
  }
</script>