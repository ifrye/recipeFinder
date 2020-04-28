import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonInput, IonFabButton } from '@ionic/react';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import './Home.css';
import { star, logoFacebook } from 'ionicons/icons';
import { userLogin } from '../hooks/useFirebase';
import  { Redirect } from 'react-router-dom';
import jsCookie from "js-cookie";

const Home: React.FC = () => {

const [clickedButton1, setClickedButton1] = useState<string>();
const [clickedButton2, setClickedButton2] = useState<string>();

function randomRecipe(){
    setClickedButton1("random");
}

function recipeOfTheDay(){
    setClickedButton2("recipeOfTheDay");
}

return (
      <IonPage>
          <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <br />
          <IonTitle>Recipe Finder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonButton expand="block" onClick={randomRecipe}>
          Random Recipe
    </IonButton>
    <IonButton expand="block" onClick={recipeOfTheDay}>
          Recipe of the Day
    </IonButton>
    {clickedButton1 == "random" ? <Redirect to='/search'  /> : <Redirect to='/home'  /> }
    {clickedButton2 == "recipeOfTheDay" ? <Redirect to='/recipeoftheday'  /> : <Redirect to='/home'  />}
      </IonContent>
    </IonPage>
  )
};

export default Home;
