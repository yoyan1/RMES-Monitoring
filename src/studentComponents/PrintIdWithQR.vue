<script setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import QrcodeVue from 'qrcode.vue'

const visible = ref(false);
const value = 'https://example.com'
</script>
<template>
        <Button label="Show" @click="visible = true" />
        <div class="fixed top-0 left-0 right-0 bg-black-500 transparent modal" v-if="visible">
            <Dialog v-model:visible="visible" modal header="Print ID" :style="{ width: '50rem', height: '80vh' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                <qrcode-vue :value="value" size="100"  />
            </Dialog>
        </div>
</template>
<style scoped>
.modal{
    width: 105%; 
    height: 100vh; 
    background:#000000cb; 
    z-index:200;
    opacity: 25%;
}
</style>