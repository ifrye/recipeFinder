import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import React, { useState } from 'react';
import { useParams, Route, Redirect } from 'react-router';
//import ExploreContainer from '../components/ExploreContainer';
import './Search.css';
require ("isomorphic-fetch");
require('es6-promise').polyfill();

const RecipeOfTheDay: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [tag1, setTag1] = useState<string>();
  const [tag2, setTag2] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [imageURL, setImageURL] = useState<string>();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);

  async function handleSearch(){
    const item1 = await getItem(tag1,tag2);
    
    console.log(item1);
    setTitle(item1.recipes[0].title);
    setImageURL(item1.recipes[0].image);
    let tempArr = []
    for (let i = 0; i < item1.recipes[0].extendedIngredients.length; i++){
      tempArr[i] = item1.recipes[0].extendedIngredients[i].originalString;
    }
    for(let j = 0; j < tempArr.length; j++){
      console.log("ingredient:  " + tempArr[j]);
    }
    setIngredients(tempArr);

    let tempArr2 = []
    for (let i = 0; i < item1.recipes[0].analyzedInstructions[0].steps.length; i++){
      tempArr2[i] = item1.recipes[0].analyzedInstructions[0].steps[i].step;
    }
    for(let j = 0; j < tempArr2.length; j++){
      console.log("instruction:  " + tempArr2[j]);
    }
    setInstructions(tempArr2);

  }
  
  function getItem(tag1: string | undefined,tag2: string | undefined){
    return fetch(`https://api.spoonacular.com/recipes/random?number=1&tags=${tag1},${tag2}&apiKey=c1bb1be9fdbb410c8cc4a4b4d47e3867`).then(function(resp){
      return resp.json();
    })
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
        <br />
        <IonTitle>Recipe of the Day</IonTitle>

        <br />

        <IonInput value={tag1} placeholder='Tag1' type='text' onIonChange={e => setTag1(e.detail.value!)} ></IonInput>
        <IonInput value={tag2} placeholder='Tag2' type='text' onIonChange={e => setTag2(e.detail.value!)}></IonInput>

        <IonButton expand="block" onClick={() => handleSearch()}>
                Search
        </IonButton>
        
        {title ? 
        <IonGrid>
          <IonRow>
            <IonCol>
              <div>
                Name
              </div>
            </IonCol>
            <IonCol>
              <div>
               {title}
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div>
                Image
              </div>
            </IonCol>
            <IonCol>
              <div>
                <IonImg src={imageURL}></IonImg>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div>
                Ingredients
              </div>
            </IonCol>
            <IonCol>
              <div>
              {ingredients.map((thing, index) =>
                <ul>
                 <li key={index}>{thing}</li>
                </ul>
                )}
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div>
                Instructions
              </div>
            </IonCol>
            <IonCol>
              <div>
              {instructions.map((thing1, index) =>
                <ul>
                 <li key={index}>{thing1}</li>
                </ul>
                )}
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
        : null }

      </IonContent>
    </IonPage>
  );
};

export default RecipeOfTheDay;
