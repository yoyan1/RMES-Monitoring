
<template>
    <div class="card flex justify-center">
        <Calendar v-model="date" inline showWeek />
    </div>
</template>

<script setup>
import Calendar from "primevue/calendar";
import { ref } from "vue";

// Create a new Date object
const currentDate = new Date();

// Get the current date
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1; // January is 0
const year = currentDate.getFullYear();

const date = currentDate;
</script>
