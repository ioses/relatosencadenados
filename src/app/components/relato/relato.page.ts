import { Component, OnInit } from '@angular/core';

import { RelatosService } from '../../servicios/relatos.service';

import { message } from '../../models/message';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-relato',
  templateUrl: './relato.page.html',
  styleUrls: ['./relato.page.scss'],
})
export class RelatoPage implements OnInit {

  relato: any;
  relatosHijos: any =[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private relatosService: RelatosService) { 

                this.route.queryParams.subscribe(params =>{
                  if(this.router.getCurrentNavigation().extras.state){
                    this.relato = this.router.getCurrentNavigation().extras.state.relato;
                  }
                })

              }

  ngOnInit() {
/*
    this.relatoService.getRelato(this.relato.id).subscribe(rel =>{
      console.log(rel);
      this.rel = rel;
    })
    */

    this.getRelatosHijos();
  }

  nuevoRelato(){

    let navigationExtras: NavigationExtras = {
      state: {
        relato: this.relato
      }
    };

    this.router.navigate(['nuevorelato'], navigationExtras);


  }

  getRelatosHijos(){

   this.relatosService.getRelatosHijos(this.relato.id).subscribe(relatos => {

    this.relatosHijos = relatos;

  console.log(this.relatosHijos);

})



  }

}
