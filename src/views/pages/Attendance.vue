
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
                    <div style="text-align: left">
                        <Button class="bg-blue-600 text-white hover:bg-blue-500" icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                    </div>
                </div>
            </template>
            <Column field="name" header="Name" sortable exportHeader="Name"></Column>
            <Column field="attendance" header="Attendance"></Column>
            <Column field="inventoryStatus" header="Status" style="width: 20%">
                <template #editor="{ data, field }">
                    <Dropdown v-model="data[field]" :options="statuses" optionLabel="label" optionValue="value" placeholder="Select a Status">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option.value" :severity="getStatusLabel(slotProps.option.value)" />
                        </template>
                    </Dropdown>
                </template>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                </template>
            </Column>
            <Column field="time_in" sortable header="Time in"></Column>
            <Column field="time_out" sortable header="Time out"></Column>
            <Column field="date" header="Date"></Column>
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

const {currentDate } = getCurrentDate()

const dt = ref();
const isNoRecords = ref(false)

const studentRecord = ref([]);

studentsRecord.value.forEach((attendance)=>{
    if(attendance.date == currentDate.value){
        studentRecord.value.push(attendance)
    }else{
        isNoRecords.value = true
    }
})
const exportCSV = () => {
    dt.value.exportCSV();
};
</script>
