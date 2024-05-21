<template>
    <ThemeSwitcher />
    <div class="card">
        <DataTable :value="students" tableStyle="min-width: 50rem" editMode="row" dataKey="id" @row-edit-save="onRowEditSave">
            <template #header>
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="text-xl text-surface-900 dark:text-surface-0 font-bold">Requests</span>
                    <div class="flex gap-5">
                        <Button label="Accept all" class="bg-blue-600 text-white hover:bg-blue-400"/>
                        <Button label="Decline all" class="border border-red-600 text-red-600 hover:bg-red-400"/>
                        <Button icon="pi pi-refresh" class="bg-blue-600 text-white p-2" rounded raised />
                    </div>
                </div>
            </template>
            <Column field="fullname" header="Name"></Column>
            <Column header="Image">
                <template #body="slotProps">
                    <img :src="slotProps.data.imageUrl" :alt="slotProps.data.image" class="w-20 h-20 shadow-md rounded" />
                </template>
            </Column>
            <Column field="level" header="Grade Level"></Column>
            <Column field="adviser" header="Adviser">
                <!-- <template #body="slotProps">
                    <Rating :modelValue="slotProps.data.rating" readonly :cancel="false" />
                </template> -->
            </Column>
            <Column header="Status" field="status">
                <template #body="slotProps">
                    <Tag value="pending" class="bg-red-200" :severity="getSeverity(slotProps.data)" />
                </template>
            </Column>
            <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
            <template #footer> In total there are {{ students ? students.length : 0 }} requests. </template>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

const students = ref([
    {
        fullname: 'Roland Clarion',
        imageUrl: 'data:image/jpeg;base64,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',
        level: 'Grade III',
        status: 'pending',
        adviser: 'Ella Cruz'
    }
])

const onRowEditSave = (event) => {
    let { newData, index } = event;

    students.value[index] = newData;
};

const getSeverity = (product) => {
    switch (product.status) {
        case 'Present':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'pending':
            return 'danger';

        default:
            return null;
    }
};

</script>
