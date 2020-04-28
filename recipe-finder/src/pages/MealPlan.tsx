import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonGrid, IonRow, IonCol, IonImg, IonList, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState } from 'react';
import { useParams, Route, Redirect } from 'react-router';
//import ExploreContainer from '../components/ExploreContainer';
import './MealPlan.css';
import api from '../env/apikey'
require ("isomorphic-fetch");
require('es6-promise').polyfill();

const MealPlan: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [tag1, setTag1] = useState<string>();
  const [tag2, setTag2] = useState<string>();
  const [title1, setTitle1] = useState<string>();
  const [title2, setTitle2] = useState<string>();
  const [title3, setTitle3] = useState<string>();
  const [id1, setId1] = useState<string>();
  const [id2, setId2] = useState<string>();
  const [id3, setId3] = useState<string>();
  const [ingredients1, setIngredients1] = useState<string[]>([]);
  const [ingredients2, setIngredients2] = useState<string[]>([]);
  const [ingredients3, setIngredients3] = useState<string[]>([]);
  const [instructions1, setInstructions1] = useState<string[]>([]);
  const [instructions2, setInstructions2] = useState<string[]>([]);
  const [instructions3, setInstructions3] = useState<string[]>([]);
  const [calories, setCalories] = useState<string>();
  const [carbs, setCarbs] = useState<string>();
  const [pro, setPro] = useState<string>();
  const [fat, setFat] = useState<string>();

  async function handleSearch(){
    const item1 = await getItem(tag1,tag2);
    
    console.log(item1);
    setTitle1(item1.meals[0].title);
    setTitle2(item1.meals[1].title);
    setTitle3(item1.meals[2].title);
    console.log("title1: " + item1.meals[0].title);
    console.log("title2: " + item1.meals[1].title);
    console.log("title3: " + item1.meals[2].title);

    setId1(item1.meals[0].id);
    setId2(item1.meals[1].id);
    setId3(item1.meals[2].id);
    console.log("id1: " + item1.meals[0].id);
    console.log("id2: " + item1.meals[1].id);
    console.log("id3: " + item1.meals[2].id);

    setCalories(item1.nutrients.calories);
    setCarbs(item1.nutrients.carbohydrates);
    setFat(item1.nutrients.fat);
    setPro(item1.nutrients.protein);

    const ingredientsJSON1 = await getIngredientsById(item1.meals[0].id);
    const ingredientsJSON2 = await getIngredientsById(item1.meals[1].id);
    const ingredientsJSON3 = await getIngredientsById(item1.meals[2].id);
    
    let ingredientTempArr1 = []
    let ingredientTempArr2 = []
    let ingredientTempArr3 = []

    for (let i = 0; i < ingredientsJSON1.extendedIngredients.length; i++){
      ingredientTempArr1[i] = ingredientsJSON1.extendedIngredients[i].original;
    }
    for(let i = 0; i < ingredientTempArr1.length; i++){
      console.log("ingredient for ID1:  " + ingredientTempArr1[i]);
    }

    for (let i = 0; i < ingredientsJSON2.extendedIngredients.length; i++){
        ingredientTempArr2[i] = ingredientsJSON2.extendedIngredients[i].original;
    }
    for(let i = 0; i < ingredientTempArr1.length; i++){
       console.log("ingredient for ID2:  " + ingredientTempArr2[i]);
    }

    for (let i = 0; i < ingredientsJSON3.extendedIngredients.length; i++){
       ingredientTempArr3[i] = ingredientsJSON3.extendedIngredients[i].original;
    }
    for(let i = 0; i < ingredientTempArr1.length; i++){
        console.log("ingredient for ID3:  " + ingredientTempArr3[i]);
    }

    setIngredients1(ingredientTempArr1);
    setIngredients2(ingredientTempArr2);
    setIngredients3(ingredientTempArr3);


    const instJSON1 = await getInstructionsById(item1.meals[0].id);
    const instJSON2 = await getInstructionsById(item1.meals[1].id);
    const instJSON3 = await getInstructionsById(item1.meals[2].id);

    console.log(instJSON1);

    let instTempArr1 = []
    let instTempArr2 = []
    let instTempArr3 = []

    for (let i = 0; i < instJSON1[0].steps.length; i++){
        instTempArr1[i] = instJSON1[0].steps[i].step;
    }
    for(let i = 0; i < instJSON1[0].steps.length; i++){
        console.log("instructions for ID1:  " + instTempArr1[i]);
    }

    for (let i = 0; i < instJSON2[0].steps.length; i++){
        instTempArr2[i] = instJSON2[0].steps[i].step;
    }
    for(let i = 0; i < instJSON2[0].steps.length; i++){
        console.log("instructions for ID2:  " + instTempArr2[i]);
    }

    for (let i = 0; i < instJSON3[0].steps.length; i++){
        instTempArr3[i] = instJSON3[0].steps[i].step;
    }
    for(let i = 0; i < instJSON3[0].steps.length; i++){
        console.log("instructions for ID3:  " + instTempArr3[i]);
    }

    setInstructions1(instTempArr1);
    setInstructions2(instTempArr2);
    setInstructions3(instTempArr3);

  }
  
  function getItem(tag1: string | undefined,tag2: string | undefined){
    return fetch(`https://api.spoonacular.com/mealplanner/generate?targetCalories=${tag1}&diet=${tag2}&apiKey=${api.apiKey}&timeFrame=day`).then(function(resp){
      return resp.json();
    })
  }

  function getIngredientsById(id: string | undefined){
    return fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${api.apiKey}`).then(function(resp){
        return resp.json();
      })
  }

  function getInstructionsById(id: string | undefined){
    return fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${api.apiKey}`).then(function(resp){
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
          <IonTitle className="mealPlanTitle">Meal Plan</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <br />

        <IonList>
          <IonItem>
            <IonLabel>Total Calories</IonLabel>
            <IonInput value={tag1} placeholder='e.g. 2000' type='text' onIonChange={e => setTag1(e.detail.value!)} ></IonInput>
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

        <br />
        
        {title1 ? 
        <IonGrid>
          <IonRow>
            <IonCol>
              <h2>
                Breakfast:
              </h2>
            </IonCol>
            <IonCol>
              <h2>
               {title1}
              </h2>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div>
                <b>Ingredients:</b>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div>
              {ingredients1.map((thing, index) =>
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
                <b>Instructions:</b>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div>
              {instructions1.map((thing, index) =>
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
                Lunch:
              </h2>
            </IonCol>
            <IonCol>
              <h2>
               {title2}
              </h2>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div>
                <b>ngredients:</b>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div>
              {ingredients2.map((thing, index) =>
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
                <b>Instructions:</b>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div>
              {instructions2.map((thing, index) =>
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
                Dinner:
              </h2>
            </IonCol>
            <IonCol>
              <h2>
               {title3}
              </h2>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div>
                <b>Ingredients:</b>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div>
              {ingredients3.map((thing, index) =>
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
                <b>Instructions:</b>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <div>
              {instructions3.map((thing, index) =>
                <ul>
                 <li key={index}>{thing}</li>
                </ul>
                )}
              </div>
            </IonCol>
          </IonRow>

          <IonRow className="nutritionFormat">
              <IonCol>
              <div><b>Nutrition:</b></div>
              </IonCol>
          </IonRow>
          <IonRow>
              <IonCol>
                  <div>Calories</div>
              </IonCol>
              <IonCol>
                {calories}
              </IonCol>
          </IonRow>
          <IonRow>
              <IonCol>
                  <div>Carbohydrates</div>
              </IonCol>
              <IonCol>
                {carbs}
              </IonCol>
          </IonRow>
          <IonRow>
              <IonCol>
                  <div>Fat</div>
              </IonCol>
              <IonCol>
                {fat}
              </IonCol>
          </IonRow>
          <IonRow>
              <IonCol>
                  <div>Protein</div>
              </IonCol>
              <IonCol>
                {pro}
              </IonCol>
          </IonRow>

        </IonGrid>
        : null }

      </IonContent>
    </IonPage>
  );
};

export default MealPlan;
