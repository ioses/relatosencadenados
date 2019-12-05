import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';

import { RelatosService, relato } from "../servicios/relatos.service";
import { ModalController, ActionSheetController } from "@ionic/angular";

//import {RelatoComponent} from '../components/relato/relato.component';

import { Router, NavigationExtras} from  '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public relatosCompletos: any = [];
  public usersTodos: any = [];

  public relatosUsers: any = [];



  constructor(private authService: AuthService,
              public relatoService: RelatosService,
              public router: Router,
              public actionSheetController: ActionSheetController) {}

  Onlogout(){
    this.authService.logout();
  }

  ngOnInit(){
    this.relatoService.getRelatos().subscribe(relatos => {
        this.relatosCompletos = relatos;
      console.log(this.relatosCompletos);
    })
   
    this.relatoService.getUsers().subscribe(users =>{
      this.usersTodos = users;
      console.log(this.usersTodos);
    })
  
    for (let i = 0; i < this.relatosCompletos.length; i++) {
      for (let j = 0; j < this.usersTodos.length; j++) {
        if(this.relatosCompletos[i].user_id == this.usersTodos[j].uid){
          var relatoUser = [this.relatosCompletos[i], this.usersTodos[j]];

          this.relatosUsers.push(relatoUser);
          console.log(relatoUser);
        }
        
        
      }
      
    }

  }

  openRelato(relato){


    let navigationExtras: NavigationExtras = {
      state: {
        relato: relato
      }
    };

    this.router.navigate(['relato'], navigationExtras);


  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Desconectarse',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.Onlogout();
        }
      }
      /*, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Play (open modal)',
        icon: 'arrow-dropright-circle',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Favorite',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    */]
    });
    await actionSheet.present();
  }


}
