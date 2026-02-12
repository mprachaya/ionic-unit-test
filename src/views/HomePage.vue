<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container">
        <strong>Ionic Vue Unit Test</strong>
        <p>
          Ready to practice unit tests. Use Cursor commands to add validators, store, services, and the login page.
        </p>
        <ion-button router-link="/login">Go to Login</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/vue';
</script>

<style scoped>
#container {
  text-align: center;
  padding: 2rem;
}
#container strong {
  font-size: 1.25rem;
}
#container p {
  margin: 1rem 0;
  color: var(--ion-color-medium-shade);
}
</style>
