
<template>
    <div class="bg-white ">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" style="width: 50vh;"/>
    </div>
</template>

<script setup>
import Chart from "primevue/chart";
import { ref, onMounted } from "vue";
import { query, collection, where,getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig/config";
import { getCurrentDate } from "@/stores/getDateAndTime";
import { students } from "@/stores/fetch";

const {currentDate} = getCurrentDate()
const Present = ref(0)
const outOfSchool = ref(0)
const total = ref(0)
onMounted(async() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
    try{
        Present.value = 0;
        outOfSchool.value = 0;
        total.value= 0
        students.value.forEach((doc) => {
            if(doc.status == 'Present'){
                Present.value++
            } else{
                outOfSchool.value++
            }
            total.value++
        });

    } catch(error){
        console.error(error);
    }
});


const chartData = ref();
const chartOptions = ref(null);

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['Present', 'Out of SChool', 'Total students'],
        datasets: [
            {
                data: [Present, outOfSchool, total],
                backgroundColor: [documentStyle.getPropertyValue('--cyan-500'), documentStyle.getPropertyValue('--orange-500'), documentStyle.getPropertyValue('--gray-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--cyan-400'), documentStyle.getPropertyValue('--orange-400'), documentStyle.getPropertyValue('--gray-400')]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-chart');

    return {
        plugins: {
            legend: {
                labels: {
                    cutout: '60%',
                    color: textColor
                }
            }
        }
    };
};
</script>
