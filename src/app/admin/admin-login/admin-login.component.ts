import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.sass']
})
export class AdminLoginComponent {
  email: '' | undefined
  password: '' | undefined

  constructor(private apiService: ApiService, private router: Router) {}

  login(){
    var user = {
      email: this.email,
      password: this.password
    }
    console.log(user)
    this.apiService.adminAuth(user).subscribe(result => {
      console.log(result)
      var status = result.status
      var user = result.admin
      if(status === 200) {
        this.router.navigateByUrl('/admin/requests')
        console.log(user);
        sessionStorage['admin'] = JSON.stringify(user)
      } else {
        alert("Invalid Credentials")
      }
    })
  }
}
