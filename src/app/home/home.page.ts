import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service';
import { Router, NavigationExtras} from  '@angular/router';

import * as moment from 'moment';

import { RelatosService, relato } from "../servicios/relatos.service";
import { UsersService} from "../servicios/users.service";
import { ModalController, ActionSheetController } from "@ionic/angular";

//import {RelatoComponent} from '../components/relato/relato.component';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public relatosCompletos: any = [];
  public user: any;

  public relatosUsers: any = [];



  constructor(private authService: AuthService,
              public relatoService: RelatosService,
              public usersService: UsersService,
              public router: Router,
              public actionSheetController: ActionSheetController) {}

  Onlogout(){
    this.authService.logout();
  }

  goToProfile(){

    this.router.navigate(['user-profile']);

  }



  ngOnInit(){
    this.relatoService.getRelatos().subscribe(relatos => {
        this.relatosCompletos = relatos;
      console.log(this.relatosCompletos);
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

  openUser(user){
    let navigationExtras: NavigationExtras = {
      state: {
        user: user
      }
    };

    this.router.navigate(['user'], navigationExtras);

  }

  ago(time){
    let difference = moment(time).diff(moment());
    moment.locale('es');
    return moment.duration(difference).humanize();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Desconectarse',
     //   role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.Onlogout();
        }
      },
      {
        text: 'Perfil',
        icon: 'person',
        handler: () => {
         this.goToProfile();
        }
      },
      {
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
    //    role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
    });
    await actionSheet.present();
  }


}
