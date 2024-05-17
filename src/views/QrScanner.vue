<script setup>
import {onMounted, ref} from 'vue'
import { Html5Qrcode } from 'html5-qrcode';
import { useRouter } from 'vue-router';
import { useDocument } from 'vuefire'
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { useCollection } from 'vuefire';
import { db } from '@/firebaseConfig/config';
import {getCurrentTime, getCurrentDate } from '@/stores/getDateAndTime';
import Button from 'primevue/button';
import { AddStudentData, AddStudentRecord, toastType, updateStudentData } from '@/stores/crud';

const currentTime = ref()
const {currentDate} = getCurrentDate()

setInterval(()=>{
    const {timeString} = getCurrentTime()
    currentTime.value = timeString
}, 100)

const router = useRouter()
const studentsData = useCollection(collection(db, 'students'))

const scannedQrCodes = ref()
const Html5Qrcodes = ref()

function createscanqrcodes(){
    Html5Qrcodes.value = new Html5Qrcode("qr-code-full-region")
    const config = {fps:10, qrbox: {width: 350, height: 350 }};
    
    Html5Qrcodes.value.start({facingMode:"environment" }, config, onScanSuccess)
}

const students = ref([]) 
const errMsg = ref();
const recentScanned = ref();

async function onScanSuccess(decodeResult){
    scannedQrCodes.value = decodeResult
    if(recentScanned.value != scannedQrCodes.value){
        try{
            studentsData.value.forEach(student => {
                if(student.id == scannedQrCodes.value){
                    students.value.push(student)
                    
                    recentScanned.value = scannedQrCodes.value
                    const recentData = ref()
                    recentData.value = {...recentData.value, ...student};
                    const record = ref({
                        studentId: scannedQrCodes.value,
                        name: recentData.value.fullname,
                        attendance: 'present',
                        time_in: currentTime,
                        time_out: '',
                        date: currentDate,
                    })
                    AddStudentRecord(record.value, scannedQrCodes.value)          
                }
            });
            
        } catch(error){
            console.error(error);
            errMsg.value = 'no match found';
        }
    } else{
        errMsg = "already scanned";
    }
}

</script>
<template>
    <div class="container mx-full flex justify-center gap-10 drop-shadow-lg" style="width: 100%">
        <div  class="bg-white" style="width: 100%">
            <div>
                <h2>Scan QR codes</h2>
            </div>
            <div>
                <h1>Date: {{ currentDate }}</h1>
                <h1>Time: {{ currentTime }}</h1>
            </div>
            <div id="qr-code-full-region"></div>
            <Button label="start scanning" @click="createscanqrcodes"></Button>
        </div>
        <div class="bg-white" style="width: 100%">
            <div>
                <h2>Students Monitoring System</h2>
            </div>
            <div>
                <h2 v-for="student in students" :key="student.id"> <img :src="student.imageUrl" class="rounded-full" alt="" width="100px" height="100px">{{ student.fullname }} time: {{ currentTime }}</h2>
                {{ errMsg }}
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
