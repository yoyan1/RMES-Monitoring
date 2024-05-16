import { doc, addDoc, updateDoc, deleteDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig/config";
import { ref } from "vue";

const toastType = ref()
const toastMessage = ref()

export async function AddStudentData(path, docData) {
    
    try{
        await addDoc(collection(db, path), docData)
        toastType.value = 'success'
        toastMessage.value = 'added successfuly'
    } catch(error){
        console.error("error adding students Data: ", error)
        toastType.value = 'error'
        toastMessage.value = 'error adding student data try again'
        console.log(docData);
    }
}

export async function AddStudentRecord(docData, id){
    await setDoc(doc(db, "students_record", id), docData)
}

export async function updateStudentData(dbTableName, docData, id){
    const docRef = doc(db, dbTableName, id)
    try{
        await updateDoc(docRef, docData)
        toastType.value = 'success'
        toastMessage.value = 'Update successfuly'
    } catch(error){
        toastType.value = 'error'
        toastMessage.value = 'error updating student data'
    }

}

export async function deleteData(dbTableName, id){
    try{
        
        await deleteDoc(doc(db, dbTableName, id));
        toastType.value = 'success'
        toastMessage.value = 'Deleted successfuly'
    } catch(error){
        toastType.value = 'error'
        toastMessage.value = 'error deleting this data'
    }
}

export { toastType, toastMessage }