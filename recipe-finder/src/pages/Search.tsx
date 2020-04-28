import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonGrid, IonRow, IonCol, IonImg, IonSelect, IonSelectOption, IonList, IonItem, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import { useParams, Route, Redirect } from 'react-router';
//import ExploreContainer from '../components/ExploreContainer';
import './Search.css';
import api from '../env/apikey'
require ("isomorphic-fetch");
require('es6-promise').polyfill();

const Search: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [tag1, setTag1] = useState<string>();
  const [tag2, setTag2] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [imageURL, setImageURL] = useState<string>();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);

  async function handleSearch(){
    console.log("tag1: " + {tag1});
    console.log("tag2: " + {tag2});
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
    return fetch(`https://api.spoonacular.com/recipes/random?number=1&tags=${tag1},${tag2}&apiKey=${api.apiKey}`).then(function(resp){
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
          <IonTitle className="randomTitle">Random Recipe</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <br />
        <IonList>
          <IonItem>
            <IonLabel>Category</IonLabel>
            <IonSelect value={tag1} interface="popover" onIonChange={e => setTag1(e.detail.value!)} >
              <IonSelectOption value="breakfast">Breakfast</IonSelectOption>
              <IonSelectOption value="lunch">Lunch</IonSelectOption>
              <IonSelectOption value="dinner">Dinner</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel>Diet</IonLabel>
            <IonSelect value={tag2} interface="popover" onIonChange={e => setTag2(e.detail.value!)}>
              <IonSelectOption value="vegetarian">Vegetarian</IonSelectOption>
              <IonSelectOption value="vegan">Vegan</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonButton color="medium" expand="block" onClick={() => handleSearch()}>
                  Search
          </IonButton>
        </IonList>
        
        {title ? 
        <IonGrid>
          <IonRow>
          <IonCol>
              <div>
                <IonImg src={imageURL}></IonImg>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
          <IonCol>
              <h1 className="recipeTitle">
               {title}
              </h1>
            </IonCol>
          </IonRow>
          <IonRow>
          <IonCol>
              <h2>
                Ingredients:
              </h2>
            </IonCol>
          </IonRow>
          <IonRow>
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
              <h2>
                Instructions:
              </h2>
            </IonCol>
          </IonRow>
          <IonRow>
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

export default Search;
