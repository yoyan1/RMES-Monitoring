<script setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { onMounted, ref } from "vue";
import AddOrUpdate from "./AddOrUpdate.vue";
import ConfirmationPop from "./ConfirmationPop.vue";
import PrintID from "./PrintIdWithQR.vue"
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig/config";
import { studentsRecord } from "@/stores/fetch";

const props = defineProps({
    studentData: Object,
    role: String
})

const attendances = ref([]);

onMounted(()=>{
    attendances.value = []
        studentsRecord.value.forEach((record)=>{
            if(record.studentId == props.studentData.id){
                attendances.value.push(record)
            }else{
                console.log("no record");
                console.log(record.studentId,  props.studentData.id );
            }
        })

})
const position = ref('center');
const visible = ref(false);


const openPosition = (pos) => {
    position.value = pos;
    visible.value = true;
}
</script>

<template>
        <button @click="openPosition('left')" type="button"  class="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M4.998 7.78C6.729 6.345 9.198 5 12 5c2.802 0 5.27 1.345 7.002 2.78a12.713 12.713 0 0 1 2.096 2.183c.253.344.465.682.618.997.14.286.284.658.284 1.04s-.145.754-.284 1.04a6.6 6.6 0 0 1-.618.997 12.712 12.712 0 0 1-2.096 2.183C17.271 17.655 14.802 19 12 19c-2.802 0-5.27-1.345-7.002-2.78a12.712 12.712 0 0 1-2.096-2.183 6.6 6.6 0 0 1-.618-.997C2.144 12.754 2 12.382 2 12s.145-.754.284-1.04c.153-.315.365-.653.618-.997A12.714 12.714 0 0 1 4.998 7.78ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
            </svg>
        </button>
        <div class="fixed top-0 left-0 right-0 bg-black-500 transparent modal" v-if="visible">
            <Dialog v-model:visible="visible" header="Preview student" :style="{  height: '100vh'}" :position="position" :modal="true" :draggable="false">      
                <div class="flex items-center mb-4 sm:mb-5">
                    <div class="w-full  bg-white  rounded-lg dark:border-gray-700">
                        <div class="flex items-center gap-5"><br><br>
                            <img class="w-28 h-28 rounded-full mb-3 shadow-lg" :src="props.studentData.imageUrl" alt="image" v-if="props.studentData.imageUrl"/>
                            <img class="w-28 h-28 rounded-full mb-3 shadow-lg" src="../components/images/default.jpg" alt="default" v-else/>
                            <div>
                                <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{props.studentData.fullname}} <i class="px-5 rounded-full text-base" :class="studentData.status == 'Present'? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'">{{ studentData.status }}</i></h5>
                                <span class="text-sm text-gray-500 dark:text-gray-400">Grade {{ props.studentData.level }}</span><br>
                                <span class="text-base text-blue-500 dark:text-gray-400"><i class="pi pi-map-marker"></i> {{ props.studentData.street }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-between gap-10">
                    <dl class="sm:mb-5 border shadow px-6 py-3 rounded" style="width: 70vh">
                        <dt class="mb-2 text-xl leading-none text-gray-900 dark:text-white"><b>Student Details</b></dt>
                        <dd class="mb-4  sm:mb-5 dark:text-gray-400 ">
                            <div class="flex justify-between">
                                <div class="flex flex-col gap-5 py-2">
                                    <div>
                                        <span class="font-semibold text-gray-500">Fullname</span><br>
                                        <b class="text-gray-700 text-base">{{ props.studentData.fullname }}</b>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">LRN (<i>learner's Reference Number</i>)</span><br>
                                        <b class="text-gray-700 text-base">{{ props.studentData.lrn }}</b>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">Adviser</span><br>
                                        <b class="text-gray-700 text-base">Rosmarie Panilagao</b>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">Date of Birth</span><br>
                                        <b class="text-gray-700 text-sm">{{ props.studentData.date_of_birth }}</b>
                                    </div>
                                    <!-- <div>
                                        <span class="font-semibold text-gray-500">Province</span><br>
                                        <b class="text-gray-700 text-base">{{ props.studentData.province }}</b>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">Barangay</span><br>
                                        <b class="text-gray-700 text-base">{{ props.studentData.barangay }}</b>
                                    </div> -->
                                </div>
                                <div class="flex flex-col py-2 gap-5">
                                    <div>
                                        <span class="font-semibold text-gray-500">Grade/Section</span><br>
                                        <b class="text-gray-700 text-base">Grade: {{ props.studentData.level }} - {{ props.studentData.section }}</b>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">Status</span><br>
                                        <b class="text-gray-700 text-base">present</b>
                                    </div>
                                    <!-- <div>
                                        <span class="font-semibold text-white">gap</span><br>
                                        <b class="text-white text-base">gap</b>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">Municipality</span><br>
                                        <b class="text-gray-700 text-base">{{ props.studentData.municipality }}</b>
                                    </div>
                                    <div>
                                        <span class="font-semibold text-gray-500">Zone</span><br>
                                        <b class="text-gray-700 text-base">{{ props.studentData.zone }}</b>
                                    </div> -->
                                </div>
                            </div>
                        </dd>
                    </dl>
                    <dl class="sm:mb-5 border shadow px-6 py-3 rounded" style="width: 70vh">
                        <dt class="mb-2 text-xl leading-none text-gray-900 dark:text-white flex justify-between">
                            <b>Attendance Record</b>
                            <div class="flex gap-1">
                                <button  class="text-base border px-5 text-blue-600 bg-blue-100 rounded">all</button>
                                <button  class="text-base border px-5 bg-gray-100 rounded">today</button>
                            </div>
                        </dt>
                        <dt class="mb-2 text-xl leading-none text-gray-900 dark:text-white">
                            <div class="flex gap-1">
                                <select name="" id="" class="bg-gray-100 border border-gray-300 text-base rounded">
                                    <option selected>Select date</option>
                                </select>
                            </div><hr class="border border-gray-200">
                            <div>
                                <DataTable :value="attendances" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" v-if="attendances.length != 0">
                                    <Column class="text-base" field="date" header="Date"></Column>
                                    <Column class="text-base" field="time_in" header="Time In"></Column>
                                    <Column class="text-base" field="time_out" header="Time Out"></Column>
                                </DataTable>
                                <div class="text-center" v-else>
                                    <span class="text-gray-400">No records yet</span>
                                </div>
                            </div>
                        </dt>
                        <dd class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                                <div class="relative overflow-x-auto">
                                    
                                </div>
                        </dd>
                    </dl>
                </div>
                <dl class="grid grid-cols-2 gap-4 mb-4">
                    <div class="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600">
                        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Parents/Guardian</dt>
                        <dd class="flex items-center text-gray-500 dark:text-gray-400">
                            {{ props.studentData.parent }}
                        </dd>
                    </div>
                    <div class="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600">
                        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Address</dt>
                        <dd class="flex items-center space-x-2 font-light text-gray-500 dark:text-gray-400">
                            {{ props.studentData.street + ', ' +  props.studentData.barangay + ', ' + props.studentData.municipality + ', ' + props.studentData.province}}
                            {{ 'zone: ' + props.studentData.zone  }}
                        </dd>
                    </div>
                    <div class="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Contact Number</dt>
                        <dd class="text-gray-500 dark:text-gray-400">
                            {{ props.studentData.contact_number }}
                        </dd>
                    </div>
                    <div class="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 sm:col-span-1 dark:border-gray-600">
                        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Mobile Token</dt>
                        <dd class="flex items-center space-x-2 font-light text-gray-500 dark:text-gray-400">
                            {{ props.studentData.token }}
                        </dd>
                    </div>
                </dl>
                <div class="flex bottom-0 left-0 justify-end pb-4 space-x-4 w-full">
                    <AddOrUpdate :isNew="false" :studentData="props.studentData" v-if="role == 'staff'"/>
                    <ConfirmationPop />
                    <PrintID :studentData="props.studentData"/>
                </div>
            </Dialog>
        </div>
</template>

<style scoped>
.modal{
    width: 100%; 
    height: 100vh; 
    background:#000000cb; 
    z-index:200;
    opacity: 25%;
}
</style>