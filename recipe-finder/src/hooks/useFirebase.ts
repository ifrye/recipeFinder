import * as firebase from 'firebase';

export async function userLogin(email:any ,password:any){
      try{
        const res = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log(res)
        return true
      }catch(error){
        console.log(error)
        return false
      }
  }