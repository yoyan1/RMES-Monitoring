<script setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import QrcodeVue from 'qrcode.vue'

const props= defineProps({
    studentData: Object
})
const visible = ref(false);

</script>
<template>
        <Button label="print QR" class="border border-blue-600 bg-blue-200 hover:bg-blue-600 hover:text-white" @click="visible = true"/>
        <div class="fixed top-0 left-0 right-0 bg-black-500 transparent modal" v-if="visible">
            <Dialog v-model:visible="visible" modal header="Print ID" :style="{ width: '60rem', height: '90vh' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                <div class="flex gap-20" style="height: 75vh">
                    <div class="bg-gray-100">
                        <div class="flex items-center bg-blue-600 p-2">
                            <img src="../components/images/RMES-logo.png" class="h-16 w-16 rounded-full">
                            <div class="flex flex-col  text-white">
                                <b class="text-base">RAMON MAGSAYSAY ELEMENTARY SCHOOL</b>
                                <i>San Carlos City, Negros Occidental</i>
                            </div>
                        </div>
                        <div class="flex flex-col items-center py-8">
                            <img :src="props.studentData.imageUrl" class="h-24 w-24 rounded-full" alt="">
                            <div class="text-center">
                                <b class="text-xl">{{ props.studentData.fullname }}</b><br>
                                <i>Grade: {{ props.studentData.level }}</i>
                            </div>
                        </div>
                        <div class="flex justify-center items-center ">
                            <qrcode-vue :value="props.studentData.id" size="100"  />
                        </div>
                    </div>
                    <!-- <div class="bg-gray-100 p-2 " style="width: 56vh">
                    </div> -->
                </div>
            </Dialog>
        </div>
</template>
<style scoped>
.modal{
    width: 105%; 
    height: 100vh; 
    background:#000000cb; 
    z-index:200;
    opacity: 25%;
}
</style>