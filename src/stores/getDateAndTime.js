import { ref } from "vue";

export function getCurrentTime() {
    var options = { timeZone: 'Asia/Manila', hour12: true, hour: '2-digit', minute: '2-digit' };
    const timeString = new Date().toLocaleString('en-US', options);

    return {
        timeString
    }
}

export function getCurrentDate(){
    const currentDate = ref()
    let date = new Date();

    // Extract month, day, and year
    let month = date.toLocaleString('default', { month: 'long' });
    let day = date.getDate();
    let year = date.getFullYear();
    currentDate.value = month + ' ' + day + ', ' + year
    return {
        currentDate
    }

}