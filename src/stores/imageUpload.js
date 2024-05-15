import { storage } from '@/firebaseConfig/config'; // Import storage from Firebase Storage
import { ref as storageRef, uploadBytes } from 'firebase/storage';

export async function upload(path, file){
    const storageRefObj = storageRef(storage, path + file.name); // Reference to the file location
    // Upload the file to Firebase Storage
    await uploadBytes(storageRefObj, file)
}