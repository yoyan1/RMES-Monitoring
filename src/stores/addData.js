import { doc, addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig/config";
import { ref } from "vue";

const toastType = ref()
const toastMessage = ref()

export async function AddStudentData(docData) {
    
    try{
        await addDoc(collection(db, 'students'), docData)
        toastType.value = 'success'
        toastMessage.value = 'added successfuly'
    } catch(error){
        console.error("error adding students Data: ", error)
        toastType.value = 'error'
        toastMessage.value = 'error adding student data try again'
        console.log(docData);
    }
}
export { toastType, toastMessage }