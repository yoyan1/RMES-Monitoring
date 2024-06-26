import { ref } from "vue"
import { useCollection } from "vuefire"
import { collection, getDoc, doc } from "firebase/firestore"
import { db } from "@/firebaseConfig/config"
import { getCurrentUser, useCurrentUser } from 'vuefire'

const studentsRecord = useCollection(collection(db, 'students_record'))
const students = useCollection(collection(db, 'students'))
const staff = useCollection(collection(db, 'admin_info'))

export {students, studentsRecord, staff}