import { Injectable } from '@angular/core';
import {Network} from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor() { }

   networkCheck(network: Network){
// watch network for a disconnection
     let disconnectSubscription = network.onDisconnect().subscribe(() => {
      alert('la connexion est perdu');
     });

// stop disconnect watch
     disconnectSubscription.unsubscribe();


// watch network for a connection
     let connectSubscription = network.onConnect().subscribe(() => {
       alert('Connexion en  retour !');
       // We just got a connection but we need to wait briefly
       // before we determine the connection type. Might need to wait.
       // prior to doing any api requests as well.
       setTimeout(() => {
         if (network.type === 'wifi') {
          console.log('Connexion en  retour !');
         }
       }, 3000);
     });

// stop connect watch
     connectSubscription.unsubscribe();
  }
}
