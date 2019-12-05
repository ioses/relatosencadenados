import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { RelatosService } from '../../servicios/relatos.service';

@Component({
  selector: 'app-nuevorelato',
  templateUrl: './nuevorelato.page.html',
  styleUrls: ['./nuevorelato.page.scss'],
})
export class NuevorelatoPage implements OnInit {

  relatoPadre: any;
  textoNuevoRelato: string;
  ultimaFraseNuevoRelato: string;
  user: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private relatosService: RelatosService) { 

    this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.relatoPadre = this.router.getCurrentNavigation().extras.state.relato;
      }
    })
  }

  ngOnInit() {

    this.relatosService.getUser(firebase.auth().currentUser.uid.toString()).subscribe(u =>{
      this.user = u;
      console.log('hola');
    })
  }


  sendNuevoRelato(){
    console.log(this.textoNuevoRelato);
    console.log(this.ultimaFraseNuevoRelato);

    

    this.relatosService.sendNuevoRelato(this.textoNuevoRelato, 
                                        this.ultimaFraseNuevoRelato, 
                                        this.relatoPadre.id,
                                        this.relatoPadre.last_phrase,
                                        this.user);
  }

}
