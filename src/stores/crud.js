import { doc, setDoc, addDoc, updateDoc, deleteDoc, collection, query, getDoc, where} from "firebase/firestore";
import { db } from "@/firebaseConfig/config";
import { useCollection } from "vuefire";
import { ref } from "vue";
import { getCurrentDate, getCurrentTime } from "./getDateAndTime";

const {currentDate} = getCurrentDate()
const {timeString} = getCurrentTime()
const studentsRecord = useCollection(collection(db, 'students_record'))

const toastType = ref()
const toastMessage = ref()
const studentStatus = ref({
    id: '',
    status: ''
})
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
    const docRef = doc(db, "students_record", id);
    const docSnap = await getDoc(docRef);
    studentsRecord.value.forEach(async (doc)=> {
         // Compare the dates
        if (doc.studentId == id && doc.date == currentDate.value) {
            
            console.log("User exists for the current date");
            const newRecord = ref({
                studentId: id,
                name: doc.name,
                attendance: 'out of school',
                time_in: doc.time_in,
                time_out: timeString,
                date: doc.date,
            })
            try{
            console.log(newRecord);
                const docRef = doc(db, "students_record", id)
                await updateDoc(docRef, newRecord.value)
            } catch(error){
                console.error("error updating record: ", error);
            }
            toastType.value = 'OUT';
        } else {
            // console.log("User not exists for the current date");
            // await addDoc(collection(db, "students_record"), docData)
        }
    })

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