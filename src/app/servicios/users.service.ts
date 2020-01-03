import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map, finalize, tap } from "rxjs/operators";


import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { firestore } from 'firebase';
import * as firebase from 'firebase/app';


import { userFirebase } from '../models/user';


export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 

  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage) { 

                
              }

  getUsers(){
    return this.db.collection('users').snapshotChanges().pipe(map(users =>{
      return users.map(a=>{
        const data = a.payload.doc.data() as userFirebase;
        return data;
      })
    }))
  }

  getUser (user_id: string){
    console.log(user_id);
    return this.db.collection('users').doc(user_id).valueChanges();
  }


}
