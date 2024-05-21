import { ref } from "vue";

export function getCurrentTime() {
    var options = { timeZone: 'Asia/Manila', hour12: true, hour: '2-digit', minute: '2-digit' };
    const timeString = new Date().toLocaleTimeString('en-US', options);

    // Format the time string as "00:00 PM"
    const formattedTimeString = timeString.replace(/(\d{1,2}:\d{2})(:\d{2})?(\s*[ap]m)?/i, "$1 $3");

    return {
        timeString: formattedTimeString
    };
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