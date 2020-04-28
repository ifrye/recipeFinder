import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonInput, IonFabButton } from '@ionic/react';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import './Login.css';
import { star, logoFacebook } from 'ionicons/icons';
import { userLogin } from '../hooks/useFirebase';
import  { Redirect } from 'react-router-dom';
import jsCookie from "js-cookie";

const Login: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoggedIn, setLogIn] = useState<boolean>();

  async function login(){
    const res = await userLogin(email, password)
    console.log(`${res ? "Login Success": "Login Failed"}`);
    if (res) {
      setLogIn(true);
      jsCookie.set("loggedin", "true");
      {console.log("loggedin cookie: " + jsCookie.get("loggedin"))}
      //NEED TO UNSET COOKIE!!
    }
  }

  return (
    <IonPage>
      <IonContent className="ion-padding login">
        <div className="container">
            <IonTitle className="sanserif textFont"><h1>RECIPE FINDER</h1></IonTitle>

            <IonInput value={email} placeholder='Email' type='email' onIonChange={e => setEmail(e.detail.value!)} ></IonInput>
            <IonInput value={password} placeholder='Password' type='password' onIonChange={e => setPassword(e.detail.value!)}></IonInput>
            {isLoggedIn ? <Redirect to='/home'  /> : <Redirect to='/login'  />}
            {console.log("isLoggedIn: " + isLoggedIn)}
            <IonButton expand="block" onClick={() => login()}>
                <IonIcon slot="start" icon={logoFacebook}></IonIcon>
                Sign in with Facebook
            </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
