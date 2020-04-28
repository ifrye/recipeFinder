import Menu from './components/Menu';
import Page from './pages/Search';
import React from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import Login from './pages/Login'
import Home from './pages/Home'
import Search from './pages/Search'
import RecipeOfTheDay from './pages/RecipeOfTheDay'
import jsCookie from "js-cookie";

import * as firebase from 'firebase';
import { environment } from './env/environment';

/* Theme variables */
import './theme/variables.css';
firebase.initializeApp(environment.firebaseConfig);
const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          {console.log("loggedin cookie: " + jsCookie.get("loggedin"))}
          {jsCookie.get("loggedin")=="true" ? <Menu /> : null}
          <IonRouterOutlet id="main">
            <Route path="/login" component={Login} exact={true} />
            <Route path="/home" component={Home} exact={true} />
            <Route path="/search" component={Search} exact={true} />
            <Route path="/recipeoftheday" component={RecipeOfTheDay} exact={true} />
            <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
            {/*<Route path="/page/inbox" render={() => <Redirect to="/login" />} exact={true} />*/}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
