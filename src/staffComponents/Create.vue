<script setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
const visible = ref(false);

function register () {
    //need .value because ref
    isLoading.value = !isLoading.value
    createUserWithEmailAndPassword(getAuth(), email.value, password.value).then((data) => {
        isNew.value = false
        router.push('/editProfile')
    }).catch((error) => {
        console.log(error.code);
        isLoading.value = !isLoading.value
        switch (error.code) {
            case 'auth/email-already-in-use':
                errMsg.value = "Email already in use"
                break;
            case 'auth/weak-password':
                errMsg.value = "weak password"
                break;
            case 'auth/missing-password':
                errMsg.value = "password must not be empty"
                break;
            default:
                break;
        }
    })
}

</script>
<style scoped>
.modal{
    width: 100%; height: 100vh; background:#000000cb; z-index:200;
    opacity: 25%;
}
</style>

<template>
        <Button class="bg-blue-600 text-white hover:bg-blue-500" label="Add Staff" @click="visible = true" />
        <div class="fixed top-0 left-0 right-0 bg-black-500 modal" v-if="visible">
            <Dialog v-model:visible="visible" modal header="Add staff" :style="{ width: '25rem' }">
                <!-- <span class="text-surface-600 dark:text-surface-0/70 block mb-5">Update your information.</span> -->
                <div class="flex items-center gap-3 mb-3">
                    <label for="name" class="font-semibold w-[6rem]">Name</label>
                    <InputText id="name" placeholder="full name" class="flex-auto bg-gray-100" autocomplete="off" />
                </div>
                <div class="flex items-center gap-3 mb-3">
                    <label for="username" class="font-semibold w-[6rem]">Username</label>
                    <InputText id="username" placeholder="username" class="flex-auto bg-gray-100" autocomplete="off" />
                </div>
                <div class="flex items-center gap-3 mb-5">
                    <label for="email" class="font-semibold w-[6rem]">Email</label>
                    <InputText id="email" placeholder="email" class="flex-auto bg-gray-100" autocomplete="off" />
                </div>
                <div class="flex justify-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                    <Button type="button" label="Save" @click="visible = false"></Button>
                </div>
            </Dialog>
        </div>
</template>
