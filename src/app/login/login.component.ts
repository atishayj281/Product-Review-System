import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  email: '' | undefined
  password: '' | undefined

  constructor(private apiService: ApiService, private router: Router) {}

  login(){
    var user = {
      email: this.email,
      password: this.password
    }
    console.log(user)
    this.apiService.login(user).subscribe(result => {
      console.log(result)
      var message = result.message
      var user = result.user
      if(message.status === 200) {
        this.router.navigateByUrl('/index')
        localStorage['id'] = user.id
        localStorage['firstName'] = user.firstName
      } else {
        alert("Invalid Credentials")
      }
    })
  }
}
