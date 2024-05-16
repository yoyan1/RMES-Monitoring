
<template>
    <div>
        <Toast class="bg-green-100 transparent border border-green-400 text-green-400" v-if="isSucces"/>
        <Toast class="bg-red-100 transparent border border-red-400" v-else/>
        <ConfirmPopup group="templating">
            <template #message="slotProps">
                <div class="flex flex-col items-center w-full gap-3 border-b border-surfac-300 edark:border-surface-700 p-3 mb-3 pb-0">
                    <i :class="slotProps.message.icon" class="text-6xl text-red-600"></i>
                    <p>{{ slotProps.message.message }}</p>
                </div>
            </template>
        </ConfirmPopup>
        <div class="flex justify-center">
            <button @click="showTemplate($event)" type="button" data-modal-target="delete-modal" data-modal-toggle="delete-modal" class="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                <svg class="w-5 h-5 text-red-600 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import Button from "primevue/button";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ConfirmPopup from "primevue/confirmpopup";
import Toast from "primevue/toast";
import { ref } from "vue";
import { deleteData } from "@/stores/crud";

const props = defineProps({
    id: String
})
const confirm = useConfirm();
const toast = useToast();

const isSucces = ref(false)

const showTemplate = (event) => {
    confirm.require({
        target: event.currentTarget,
        group: 'templating',
        message: 'Are you sure you want to delete this?',
        icon: 'pi pi-exclamation-circle',
        rejectProps: {
            icon: 'pi pi-times',
            label: 'Cancel',
            outlined: true
        },
        acceptProps: {
            icon: 'pi pi-check',
            label: 'Confirm'
        },
        accept: () => {
            const tableName = 'students'
            deleteData(tableName, props.id)
        },
        reject: () => {
            
        }
    });
}

</script>
