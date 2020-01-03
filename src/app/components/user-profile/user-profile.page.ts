import { Component, OnInit, Input } from '@angular/core';

import { ToastController, NavController, AlertController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker} from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';


import { UsersService } from '../../servicios/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  captureDataUrl: string;
  alertCtrl: AlertController;

  @Input('useURI') useURI: Boolean = true;

  constructor(private usersService: UsersService,
              private toastCtrl: ToastController,
              private imagePicker: ImagePicker,
              private cropService: Crop,
              private navCtrl: NavController,
              alertCtrl: AlertController) {

                this.alertCtrl=alertCtrl;
               }

  ngOnInit() {
  }






  async presentToast(message){
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
