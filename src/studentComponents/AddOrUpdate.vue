
<script setup>
import { onMounted, ref } from "vue";
import Dialog from "primevue/dialog";
import Btn from "primevue/button";
import Calendar from "primevue/calendar";
import Message from "primevue/message";
import { onFileChange, file, image, clear } from "@/stores/imageFileHandler";
import { AddStudentData, toastType, updateStudentData } from "@/stores/crud";
import { upload } from "@/stores/imageUpload";
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { storage } from "@/firebaseConfig/config";

const position = ref('center');
const visible = ref(false);
const date = ref(0)

const openPosition = (pos) => {
    position.value = pos;
    visible.value = true;
}
const props = defineProps({
    isNew: Boolean,
    studentData: Object
})

const studentData = ref({
    fullname: '',
    gender: '',
    date_of_birth: date.value,
    province: '',
    municipality: '',
    barangay: '',
    street: '',
    zone: '',
    parent: '',
    contact_number: 0,
    token: '',
    level: '',
    section: '',
    lrn: 0,
    imageUrl: '',
    adviser_id: '',
})

onMounted(()=>{
    studentData.value = {...studentData.value, ...props.studentData}
})

async function addData(){
    const path = 'studentsImage/'
    const tableName = 'students'

    //define if file has image 
    if(file){
        await upload(path, file)
        const imageRef = storageRef(storage, path + file.name);
        const url = await getDownloadURL(imageRef);
        studentData.value.imageUrl = url
    }

    //define if new
    if(props.isNew){
        try{
            AddStudentData(studentData.value)
            visible.value = false
            
        } catch(error){
    
        }
    } else{
        try{
            updateStudentData(tableName, studentData.value, props.studentData.id)
            visible.value = false
        
        } catch(error){
            console.error(error);
        }

    }
    clear()
}
</script>
<template>
    <Btn label="Student" icon="pi pi-plus" class="\ text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="openPosition('left')" v-if="isNew"/>
    <button type="button" class="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="openPosition('left')"  v-else>
        <svg class="w-5 h-5  text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
        </svg> 
    </button>
    <div class="fixed top-0 left-0 right-0 bg-black-500 modal" v-if="visible">
        <Dialog v-model:visible="visible" :header="isNew? 'Add Student' : 'Update Student'" class="overflow-y-auto" :style="{ width: '50rem', maxHeight: '100vh' }" :position="position" :modal="true" :draggable="false">
            <!-- Modal content -->
            <div>
                    <!-- Modal header -->
                    <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                    </div>
                    <!-- Modal body -->
                    <form action="#">
                        <p class="text-2xl text-gray-900 dark:text-white">Personal Details</p><br>
                        <div class="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
                                <input v-model="studentData.fullname" type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000" placeholder="full name" required>
                            </div>
                            <div>
                                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <select v-model="studentData.gender" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000">
                                    <option selected>Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label for="d-birth" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                                <Calendar v-model="date" class="w-full border border-slate-300 rounded-md text-sm shadow-sm placeholder-blue-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000" placeholder="date of birth" id="d-birth" />
                            </div>
                            <div>
                                <label for="province" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Province</label>
                                <input v-model="studentData.province"  type="text" name="province" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000" placeholder="enter province" required>
                            </div>
                            <div>
                                <label for="municipality" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Municipality</label>
                                <input v-model="studentData.municipality" type="text" name="municipality" id="municipality" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000" placeholder="municipality" required>
                            </div>
                            <div>
                                <label for="barangay" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Barangay</label>
                                <input v-model="studentData.barangay" type="text" name="barangay" id="barangay" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000" placeholder="barangay" required>
                            </div>
                            <div>
                                <label for="street" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Street</label>
                                <input v-model="studentData.street" type="text" name="street" id="street" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000" placeholder="street" required>
                            </div>
                            <div>
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Zone</label>
                                <input v-model="studentData.zone" type="text" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000" placeholder="zone" required>
                            </div>
                            <div>
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parents/Guardian</label>
                                <input v-model="studentData.parent" type="text" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000" placeholder="parents/guardian" required>
                            </div>
                            <div>
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Number</label>
                                <input v-model="studentData.contact_number" type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000" placeholder="#" required>
                            </div>
                            <div>
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Token</label>
                                <input v-model="studentData.token" type="text" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000" placeholder="#" required>
                            </div>
                        </div>
                        <!-- Educational Detail -->
                        <p class="text-2xl text-gray-900 dark:text-white">Educational Details</p><br>
                        <div class="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Level</label>
                                <select v-model="studentData.level" id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000">
                                    <option selected>Select grade level</option>
                                    <option value="I">I</option>
                                    <option value="II">II</option>
                                    <option value="III">III</option>
                                    <option value="IV">IV</option>
                                    <option value="V">V</option>
                                    <option value="VI">VI</option>
                                </select>
                            </div>
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section</label>
                                <input v-model="studentData.section" type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000" placeholder="section" required>
                            </div>
                            <div>
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LRN</label>
                                <input v-model="studentData.lrn" type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-5000" placeholder="learners reference number" required>
                            </div>
                        </div>
                        <p class="text-2xl text-gray-900 dark:text-white">Upload</p><br>
                        <div class="mb-4">
                            <span class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Images</span>
                            <div class="flex justify-center items-center w-full">
                                <label for="dropzone-file" class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <img class="h-60 max-w-full" :src="image" alt="image description" v-if="image">
                                    <img class="h-60 max-w-full" :src="studentData.imageUrl" alt="image description" v-else-if="studentData.imageUrl">
                                    <div class="flex flex-col justify-center items-center pt-5 pb-6" v-else>
                                        <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span class="font-semibold">Click to upload</span>
                                        </p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (MAX. 400x400px)</p>
                                    </div>
                                </label>
                                <input id="dropzone-file" @change="onFileChange" type="file" class="hidden">
                            </div>
                        </div>
                        <div class="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <Btn @click="addData" :label="isNew? 'Add Student' : 'Update Student'" class="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
                            <Btn @click="visible = false" label="Discard" icon="pi pi-times"  class="w-full sm:w-auto justify-center text-black-500 inline-flex bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"/>
                        </div>
                    </form>
            </div>
        </Dialog>

    </div>
    
</template>

<style scoped>
.modal{
    width: 100%; height: 100vh; background:#000000cb; z-index:200;
    opacity: 25%;
}
</style>