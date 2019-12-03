import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public name: string;
  public email: string;
  public password: string;

  constructor(private auth: AuthService,
            private router: Router) { }

  ngOnInit() {
  }

  OnSubmitRegister(){
    this.auth.register(this.email, this.password, this.name).then(auth =>{
      this.router.navigate(['home'])
      console.log(auth)
    }).catch(err=>  console.log(err))
  }

}
