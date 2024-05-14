// display errors if any
const error = ref(null)

function signin(email, password) {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("succesfully log in");
    router.push('/home/overview')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    console.log(email, password);
  });
}