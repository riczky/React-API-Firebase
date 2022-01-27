import '../../../config/firebase';
import { getAuth} from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import { database } from '../../../config/firebase';
import { getDatabase, push, ref, set, onValue, remove } from "firebase/database";

export const actionUsername = () => {
    return (dispatch) => {
        setTimeout(() => {
            return dispatch({type:'CHANGE_USER', value: 'rizukipurinsu'})
        }, 2000)
    }
}

const auth = getAuth();
export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: 'CHANGE_LOADING', value:true })
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('success: ', userCredential);
            dispatch({type: 'CHANGE_LOADING', value:false })
            resolve(true)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            dispatch({type: 'CHANGE_LOADING', value:false })
            reject(false)
            })
    })
}

export const loginUserAPI = (data) => (dispatch) => {
    
    return new Promise((resolve, reject) => {

        dispatch({type: 'CHANGE_LOADING', value:true })
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('success: ', userCredential);
            const dataUser = {
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                emailVerified: userCredential.user.emailVerified,
                refreshToken: userCredential.user.refreshToken
            }
            dispatch({type: 'CHANGE_LOADING', value:false })
            dispatch({type: 'CHANGE_ISLOGIN', value:true })
            dispatch({type: 'CHANGE_USER', value:dataUser })    
            // resolve(true)
            resolve(dataUser)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            dispatch({type: 'CHANGE_LOADING', value:false })
            dispatch({type: 'CHANGE_ISLOGIN', value:false })
            reject(false)
        })
       
    })
}

// export const addDataToAPI = (data) => (dispatch) =>{
//     database.ref('notes/' + data.userId).set({
//         title: data.title,
//         content: data.content,
//         date: data.date
//     })
// }


const db = getDatabase();
export const addDataToAPI = (data) => (dispatch) =>{
    push(ref(db, 'notes/' + data.userId), {
        title: data.title,
        content: data.content,
        date: data.date
    });
}

export const getDataFromAPI = (userId) => (dispatch) => {
        const urlNotes = ref(db, 'notes/' + userId);

        return new Promise((resolve, reject) => {
            onValue(urlNotes, (snapshot) => {
                console.log('get Data:', snapshot.val());
                const data = [];
                Object.keys(snapshot.val()).map(key => {
                    data.push({
                        id:key, 
                        data: snapshot.val()[key]
                    })
                });
                dispatch({type: 'SET_NOTES', value:data})
                resolve(snapshot.val())
            });
        })
    }


// export const updateDataAPI = (data) => (dispatch) => {
//     const urlNotes = ref(db,  `notes/${data.userId}/${data.noteId}`);

//     return new Promise((resolve, reject) => {
//         urlNotes.set({
//             title: data.title,
//             content: data.content,
//             date: data.date
//         }, (err) => {
//             if(err){
//                 reject(false);
//             } else{
//                 resolve(true)
//             }
//         })
//     })
// }    

export const updateDataAPI = (data) => (dispatch) => {
    set(ref(db, `notes/${data.userId}/${data.noteId}`), {
        title: data.title,
        content: data.content,
        date: data.date
    })
    .then((res) => {
      // Data saved successfully!
      console.log('Data Berhasil di Update', res)
    })
    .catch((error) => {
      // The write failed...
      console.log(error)
    });
    
}

export const deleteDataAPI = (data) => (dispatch) => {
    remove(ref(db, `notes/${data.userId}/${data.noteId}`), {
        title: data.title,
        content: data.content,
        date: data.date
    })
    // .then((res) => {
    //   // Data saved successfully!
    //   console.log('Data Berhasil di Update', res)
    // })
    // .catch((error) => {
    //   // The write failed...
    //   console.log(error)
    // });
    
}

