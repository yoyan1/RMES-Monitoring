<script setup>
// import Calendar from '../components/Calendar.vue';
import { onMounted, ref } from 'vue';
import { getCurrentUser, useCurrentUser } from 'vuefire'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig/config';
import { students, staff } from '../stores/fetch'
const authUser = ref({})
const user = useCurrentUser()
onMounted(async ()=>{
    try{
        const adminRef = doc(db, 'admin_info', user.value.uid)
        const docAdmin = await getDoc(adminRef);
        authUser.value = {...authUser.value, ... docAdmin.data()}
    } catch(error){
        console.error(error);
    }
})

</script>
<template>
    <div class="card flex gap-5 flex-nowrap">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 border flex-none w-64 ">
                <div class="flex justify-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Students</span>
                        <div class="font-medium text-xl">total: {{ students.length }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-address-book text-orange-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ students.length }} </span>
                <span class="text-500"> newly added</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 border flex-none w-64">
                <div class="flex justify-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Teachers</span>
                        <div class="text-900 font-medium text-xl">{{ staff.length }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ staff.length }} </span>
                <span class="text-500"> newly registered</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0 border flex-none w-64">
                <div class="flex justify-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Request</span>
                        <div class="text-900 font-medium text-xl">0</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-inbox text-purple-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">3 </span>
                <span class="text-500">pending</span>
            </div>
        </div>
    </div>
    {{ authUser.name }}
    <Calendar/>
</template>