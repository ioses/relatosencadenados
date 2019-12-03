import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from "@ionic/angular";
import { ActivatedRoute, Router} from '@angular/router';

import { RelatosService } from '../../servicios/relatos.service';

import { message } from '../../models/message';



@Component({
  selector: 'app-relato',
  templateUrl: './relato.component.html',
  styleUrls: ['./relato.component.scss'],
})
export class RelatoComponent implements OnInit {

  public relato: any;
  public rel: any;
  public msg: any;

  public mensajes = [];
  public message: message;

  constructor(private navparams: NavParams,
              private modal: ModalController,
              private relatoService: RelatosService) { }

  ngOnInit() {

    this.relato = this.navparams.get('relato');

      this.relatoService.getRelato(this.relato.id).subscribe(rel =>{
        console.log(rel);
        this.rel = rel;
      })


  }

  closeRelato(){
    this.modal.dismiss();
  }

  sendComentario(){
    console.log('prueba');
    const comentario: message = {
      content: this.msg,
      date: new Date,
      type: 'text'

    }
    

    this.relatoService.sendComentToFirebase(comentario, this.relato.id);
    this.msg="";

  }

  GoToRelatoPadre(){
    console.log(this.relato.FrasePadre.IDUserPadre);
  }

}
