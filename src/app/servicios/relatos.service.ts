import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { message } from '../models/message';
import { firestore } from 'firebase';
import * as firebase from 'firebase/app';


import { parent_phraseFirebase } from '../models/parent_phrase';
import { relatoFirebase } from '../models/relato';

export interface relato{
  relato: relatoFirebase
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class RelatosService {

  constructor(private db: AngularFirestore) { }


getRelatos(){
  return this.db.collection('Relatos').snapshotChanges().pipe(map(relatos =>{
    return relatos.map(a =>{
      const data = a.payload.doc.data() as relato;
      data.id = a.payload.doc.id;
      return data;
    })
  }))
}

getRelato(relato_id: string){
  return this.db.collection('Relatos').doc(relato_id).valueChanges()
}

sendComentToFirebase(comentario: message, relato_id){
  this.db.collection('Relatos').doc(relato_id).update({
    comentarios: firestore.FieldValue.arrayUnion(comentario),
  });
}

sendNuevoRelato(textoNuevoRelato: string, ultimaFraseNuevoRelato: string, relato_padre_id: string, relato_padre_ultima_frase: string){

  const parent_phrase: parent_phraseFirebase = {
    id_parent_phrase:  relato_padre_id,
    text_parent_phrase: relato_padre_ultima_frase
  }

  this.db.collection('Relatos').add({
    
    parent_phrase: parent_phrase, 
    image: "",
    likes: [],
    story_text: textoNuevoRelato,
    last_phrase: ultimaFraseNuevoRelato,
    date: firestore.FieldValue.serverTimestamp(),
    comments: [],
    tag: [],
    user_id: firebase.auth().currentUser.uid.toString()

  }).then((doc)=>{

  }).catch((err)=>{

  })
}

getRelatosHijos(id_relato: string){
  console.log(id_relato);
  return this.db.collection('Relatos', ref=>ref
                                      .where('parent_phrase.id_parent_phrase', '==',id_relato)
                                     // .where('user_id', '==','WaxMoKqikEcVlktgqqjt8rLJOTm2')
                                      .orderBy('date','desc')).snapshotChanges().pipe(map(relatosHijos =>{
    return relatosHijos.map(a =>{
      const data = a.payload.doc.data() as relato;
      data.id = a.payload.doc.id;


      return data;
    })
  }))

  }

}
