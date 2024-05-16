
<template>
    <div class="card">
        <DataTable :value="studentsRecord" ref="dt" tableStyle="min-width: 50rem">
            <template #header>
                <div style="text-align: left">
                    <Button class="bg-blue-600 text-white hover:bg-blue-500" icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
                </div>
            </template>
            <Column field="name" header="Name" exportHeader="Name"></Column>
            <Column field="attendance" header="Attendance"></Column>
            <Column field="timeIn" header="Time in"></Column>
            <Column field="timeOut" header="Time out"></Column>
            <Column field="date" header="Date"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

let currentDate = new Date();

// Extract month, day, and year
let month = currentDate.toLocaleString('default', { month: 'long' });
let day = currentDate.getDate();
let year = currentDate.getFullYear();

const dt = ref();
const studentsRecord = ref([
    {
        name: 'Harrey Antonio',
        attendance: 'Present',
        timeIn: '06:00 am',
        timeOut: '04:30 pm',
        date: month + '/' + day + '/' + year
    }
]);
const exportCSV = () => {
    dt.value.exportCSV();
};
</script>
