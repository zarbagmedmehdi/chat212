import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
      // public firebaseNative: Firebase,
      // public afs: AngularFirestore,
      // private platform: Platform,
      // private afAuth:AngularFireAuth,
  ) {}

  // Get permission from the user
  // async getToken() {
  //   let token;
  //
  //   if (this.platform.is('android')) {
  //     token = await this.firebaseNative.getToken()
  //   }
  //
  //   if (this.platform.is('ios')) {
  //     token = await this.firebaseNative.getToken();
  //     await this.firebaseNative.grantPermission();
  //   }
  //
  //   return this.saveTokenToFirestore(token)
  //
  // }
  //
  // // Save the token to firestore
  // private saveTokenToFirestore(token) {
  //   if (!token) return;
  //
  //   const devicesRef = this.afs.collection('device')
  //
  //   const docData = {
  //     token:token,
  //     userId: this.afAuth.auth.currentUser.uid,
  //   }
  //
  //   return devicesRef.doc(token).set(docData)
  // }
  //
  // // Listen to incoming FCM messages
  // listenToNotifications() {
  //   return this.firebaseNative.onNotificationOpen()
  //
  // }
  //



}
