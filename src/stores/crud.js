import { doc, setDoc, addDoc, updateDoc, deleteDoc, collection, query, getDoc, where, limit, getDocs} from "firebase/firestore";
import { db } from "@/firebaseConfig/config";
import { useCollection } from "vuefire";
import { ref } from "vue";
import { getCurrentDate, getCurrentTime } from "./getDateAndTime";

const {currentDate} = getCurrentDate()
const {timeString} = getCurrentTime()
const studentsRecord = useCollection(collection(db, 'students_record'))

const toastType = ref()
const toastMessage = ref()
const isToast = ref(false)
const studentStatus = ref({
    id: '',
    status: ''
})
export async function AddStudentData(path, docData) {
    
    try{
        await addDoc(collection(db, path), docData)
        isToast.value = true
        toastType.value = 'success'
        toastMessage.value = 'added successfuly'
        setInterval(()=>{
            isToast.value = false
            toastType.value = ''
            toastMessage.value = ''
        }, 5000)
    } catch(error){
        console.error("error adding students Data: ", error)
        isToast.value = true
        toastType.value = 'error'
        toastMessage.value = 'error adding student data try again'
        setInterval(()=>{
            isToast.value = false
            toastType.value = ''
            toastMessage.value = ''
        }, 5000)
        console.log(docData);
    }
}

export async function AddStudentRecord(docData, id){
    const recentRecord = ref({});

try {
    const queryRecord = query(
        collection(db, 'students_record'),
        where('studentId', '==', id),
        where('attendance', '==', 'present'),
        where('date', '==', currentDate.value),
    );
    
    const attendanceSnapshot = await getDocs(queryRecord);
    if (attendanceSnapshot.empty) {
        await addDoc(collection(db, "students_record"), docData)
        console.log("IN");
    } else{
        for (const record of attendanceSnapshot.docs) {
            const docRef = doc(db, 'students_record', record.id);
            const data = record.data();
            
            const updatedRecord = {
                ...data,
                attendance: 'out of school',
                time_out: timeString,
                status: 'OUT'
            };
    
            await updateDoc(docRef, updatedRecord);
            recentRecord.value = updatedRecord;
            console.log("OUT");
        }
    }
} catch (error) {
    console.error(error);
}


}

export async function updateStudentData(dbTableName, docData, id){
    const docRef = doc(db, dbTableName, id)
    try{
        await updateDoc(docRef, docData)
        isToast.value = true
        toastType.value = 'success'
        toastMessage.value = 'Update successfuly'
        setInterval(()=>{
            isToast.value = false
            toastType.value = ''
            toastMessage.value = ''
        }, 5000)
        console.log(docData);
    } catch(error){
        isToast.value = true
        toastType.value = 'error'
        toastMessage.value = 'error updating student data'
        setInterval(()=>{
            isToast.value = false
            toastType.value = ''
            toastMessage.value = ''
        }, 5000)
        console.log(docData);
    }

}

export async function deleteData(dbTableName, id){
    try{
        
        await deleteDoc(doc(db, dbTableName, id));
        isToast.value = true
        toastType.value = 'success'
        toastMessage.value = 'Deleted successfuly'
        setInterval(()=>{
            isToast.value = false
            toastType.value = ''
            toastMessage.value = ''
        }, 5000)
        console.log(docData);
    } catch(error){
        isToast.value = true
        toastType.value = 'error'
        toastMessage.value = 'error deleting this data'
        setInterval(()=>{
            isToast.value = false
            toastType.value = ''
            toastMessage.value = ''
        }, 5000)
        console.log(docData);
    }
}

export {isToast, toastType, toastMessage}