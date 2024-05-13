<script setup>
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { useRouter } from "vue-router";

const router = useRouter()

const navTo = () => {router.push('/dashboard/overview')}
</script>
<template>
    <div class="container mx-auto flex flex-col items-center gap-3 drop-shadow-lg">
        <img src="../components/images/RMES-logo.png" width="100px" alt="">
        <div class="bg-white flex flex-col items-center rounded-xl" style="padding: 3rem 5rem">
            <img src="../components/images/RMES-logo.png" width="50px">
            <h4>Welcome, Admin!</h4>
            <p>Sign in to continue</p>
            <div>
                <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                <InputText id="email1" type="text" placeholder="Email address" class="bg-white w-full md:w-30rem mb-5" style="padding: 1rem; width:25rem" v-model="email" />
                <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="bg-white w-full" :inputStyle="{ padding: '1rem' }"></Password><br><br>
                <div class="flex items-center justify-between mb-5 gap-5">
                    <div class="flex items-center">
                        <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                        <label for="rememberme1">Remember me</label>
                    </div>
                    <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                </div>
                <Button label="Sign In" @click="navTo" class="w-full p-3 text-xl bg-blue-600 text-white hover:bg-blue-800"></Button>
            </div>
        </div>
    </div>
</template>