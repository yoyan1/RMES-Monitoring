
<template>
    <div class="card">
        <DataTable :value="studentsRecord" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}" ref="dt">
            <template #header>
                <div class="flex justify-between">
                    <div>
                        <InputText class="bg-gray-100" placeholder="search name"/>
                    </div>
                    <div>
                        <!-- <select name="" id="">
                            <option v-for="filter in dateSave" value="" :key="filter">{{ filter }}</option>
                        </select> -->
                    </div>
                    <div style="text-align: left">
                        <Button class="bg-blue-600 text-white hover:bg-blue-500" icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                    </div>
                </div>
            </template>
            <Column field="name" header="Name" sortable exportHeader="Name"></Column>
            <Column field="attendance" header="Attendance"></Column>
            <Column field="status" header="Status">
            </Column>
            <Column field="time_in" sortable header="Time in"></Column>
            <Column field="time_out" sortable header="Time out"></Column>
            <Column field="date" sortable="" header="Date"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import { students, studentsRecord } from '@/stores/fetch.js';
import { getCurrentDate } from '@/stores/getDateAndTime';
import InputText from 'primevue/inputtext';
import { useCollection } from "vuefire"
import { collection, getDoc, doc } from "firebase/firestore"
import { db } from "@/firebaseConfig/config"
import { deleteAllDocuments } from '@/stores/crud';

const {currentDate } = getCurrentDate()

const dt = ref();
const isNoRecords = ref(false)

const studentRecord = ref([]);
const dateSave = ref([])
const lastSave = ref()

onMounted(() =>{
    studentsRecord.value.forEach((attendance)=>{
        if(attendance.date == currentDate.value){
            studentRecord.value.push(attendance)
        }else{
            isNoRecords.value = true
        }

        if(lastSave.value != attendance.date){
            dateSave.value.push(attendance.date);
        } else{
            dateSave.value.forEach(date =>{
                if(date.date != attendance.date){
                    dateSave.value.push(attendance.date);
                }
            })
        }
            lastSave.value = attendance.date
    
    
    })
})

const exportCSV = () => {
    dt.value.exportCSV();
};
</script>
