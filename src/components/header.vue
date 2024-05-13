
<template>
    <div class="card">
        <Menubar>
            <template #start>
                <Button icon="pi pi-bars" @click="emits('toggle')" />
            </template>
            <template #end>
                <div class="flex items-center gap-2">
                    <InputText placeholder="Search" type="text" class="w-[8rem] sm:w-auto" />
                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Menubar from "primevue/menubar";
import { ref } from "vue";

const emits = defineEmits()
</script>
<style scoped>
.card{
    justify-content: space-between;
    width: 100%;
}
</style>