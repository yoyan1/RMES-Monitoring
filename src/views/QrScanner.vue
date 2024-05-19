<script setup>
import {onMounted, ref} from 'vue'
import { Html5Qrcode } from 'html5-qrcode';
import { useRouter } from 'vue-router';
import { useDocument } from 'vuefire'
import { doc, getDoc, setDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
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
// const studentsRecord = useCollection(collection(db, 'students_record'))


const scannedQrCodes = ref()
const Html5Qrcodes = ref()

function createscanqrcodes(){
    Html5Qrcodes.value = new Html5Qrcode("qr-code-full-region")
    const config = {fps:10, qrbox: {width: 250, height: 250 }};
    
    Html5Qrcodes.value.start({facingMode:"environment" }, config, onScanSuccess)
}

const students = ref([]) 
const recentRecord = ref([])
const getRecord = async()=>{
    recentRecord.value = []
    try{
        const queryRecord = query(collection(db, 'students_record'), where('date', '==', currentDate.value));
        const queryAttendance = await getDocs(queryRecord);
        
        queryAttendance.forEach((doc) => {
            recentRecord.value.push(doc.data())
            
        })
    } catch(error){
        console.error(error);
    }
}
getRecord()
const errMsg = ref();
const recentScanned = ref();
const record = ref([]);
async function onScanSuccess(decodeResult){
    record.value = []
    scannedQrCodes.value = decodeResult
    if(recentScanned.value != scannedQrCodes.value){
        try{
            studentsData.value.forEach(student => {
                if(student.id == scannedQrCodes.value){
                    students.value.push(student)
                    
                    recentScanned.value = scannedQrCodes.value
                    const recentData = ref()
                    recentData.value = {...recentData.value, ...student};
                    record.value.push({
                        imageUrl: recentData.value.imageUrl,
                        studentId: scannedQrCodes.value,
                        name: recentData.value.fullname,
                        attendance: 'present',
                        time_in: currentTime,
                        time_out: '',
                        date: currentDate,
                        status: 'IN'
                    })
                    record.value.forEach(async doc =>{
                        await AddStudentRecord(doc, doc.studentId)     
                    })
                    getRecord()
                }
            });
            
        } catch(error){
            console.error(error);
            errMsg.value = 'no match found';
            setInterval(()=>{
                errMsg.value = ''
            }, 5000)
        }
    } else{
        errMsg.value = "already scanned";
        setInterval(()=>{
            errMsg.value = ''
        }, 5000)
    }
}
onMounted(()=>{
    createscanqrcodes()

})

async function deleteAllDocuments(collectionRef) {
    try {
        // Get all documents in the collection
        const queryAttendance = await getDocs(collectionRef);

        // Delete each document
        queryAttendance.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });

        console.log("All documents deleted successfully");
    } catch (error) {
        console.error("Error deleting documents:", error);
    }
}

// Usage example:
const collectionRef = collection(db, "students_record");

</script>
<template>
    <div class="mx-full flex gap-10 drop-shadow-lg" style="width: 100%">
        <div  class="bg-white" style="width: 100%">
            <div class="bg-blue-500 p-5">
                <h3 class="text-white">Scan QR codes</h3>
            </div><br>
            <div class="px-20 py-6 border">
                <div id="qr-code-full-region"></div><br>
                <div class="flex flex-col">
                    <p class="text-xl">Date: {{ currentDate }}</p>
                    <p class="text-xl">Time: {{ currentTime }}</p>
                </div>
            </div>
        </div>
        <div class="bg-white" style="width: 100%">
            <div class="bg-blue-500 flex items-center p-5">
                <img src="../components/images/RMES-logo.png" width="80px" alt="">
                <div class="flex flex-col items-center">
                    <b class="text-white text-3xl p-0">RAMON MAGSAYSAY ELEMENTAY SCHOOL</b>
                    <i class="text-white text-lg">San Carlos City, Negros Occidental</i>
                </div>
            </div>
            <div class="px-8">
                <div class="flex items-center justify-between p-3 bg-gray-200 border border-gray-300"   v-for="student in recentRecord" :key="student.name">
                    <div class="flex items-center gap-5">
                        <img :src="student.imageUrl" class="h-10 w-10" size="xlarge" shape="circle" />
                        <div class="flex flex-col">
                            <b class="text-xl"> {{ student.name }}</b>
                            <i>time: {{ student.time_in }}</i>
                        </div>
                    </div>
                    <div class="h-5 w-5  rounded-full relative right-50" :class="student.status == 'IN'? 'bg-green-600' : 'bg-red-600'"></div>
                </div>
                <div class="flex justify-center">
                    <h3 class="text-red-500">{{ errMsg }}</h3>
                </div>
            </div>
        </div>
    </div>
    <Button label="delete" @click="deleteAllDocuments(collectionRef)"/>
</template>
<style scoped>

</style>
