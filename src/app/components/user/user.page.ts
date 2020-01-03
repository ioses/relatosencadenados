import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { RelatosService} from '../../servicios/relatos.service';
import { UsersService } from '../../servicios/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

   userDB: any; 
   user: any; // VIene de la tabla de relatos
   relatosUser: any =[];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private relatosService: RelatosService,
    private usersService: UsersService) { 

      this.route.queryParams.subscribe(params =>{
        if(this.router.getCurrentNavigation().extras.state){
          this.user = this.router.getCurrentNavigation().extras.state.user;
        }
      })

  }

  ngOnInit() {

    this.getRelatosUser();


  }



  getRelatosUser(){
    this.relatosService.getRelatosUser(this.user.uid).subscribe(relatos =>{
      
      this.relatosUser = relatos;
    })

  }

  getUser(){

      this.usersService.getUser(this.user.uid).subscribe(user =>{

        this.userDB = user;

      })
  }

  

  openRelato(relato){


    let navigationExtras: NavigationExtras = {
      state: {
        relato: relato
      }
    };

    this.router.navigate(['relato'], navigationExtras);


  }

}


