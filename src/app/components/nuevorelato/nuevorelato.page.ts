import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  }


  sendNuevoRelato(){
    console.log(this.textoNuevoRelato);
    console.log(this.ultimaFraseNuevoRelato);
    this.relatosService.sendNuevoRelato(this.textoNuevoRelato, 
                                        this.ultimaFraseNuevoRelato, 
                                        this.relatoPadre.id,
                                        this.relatoPadre.last_phrase);
  }

}
