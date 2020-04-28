import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';
import jsCookie from "js-cookie";

import React from 'react';
import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp, restaurantOutline, listOutline, homeOutline } from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeOutline
  },
  {
    title: 'Nearby Grocery Stores',
    url: '/nearbygrocerystores',
    iosIcon: restaurantOutline,
    mdIcon: restaurantOutline
  },
  {
    title: 'Grocery List',
    url: '/grocerylist',
    iosIcon: listOutline,
    mdIcon: listOutline
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          {console.log("in menu, logged in is: " + jsCookie.get("loggedin"))}
          {console.log("in menu, username is: " + jsCookie.get("username"))}
          {jsCookie.get("loggedin")==="true"? <IonListHeader>{jsCookie.get("username")}</IonListHeader> : null}
          <IonNote>Welcome!</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" detail={false}>
                  <IonIcon slot="start" icon={appPage.iosIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
