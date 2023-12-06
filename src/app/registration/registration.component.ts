import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent {
  firstName = ''
  lastName = ''
  email = ''
  password = ''
  confirmPassword = ''

  constructor(private apiService: ApiService, private router: Router) { }

  clearForm() {
    this.firstName = ''
    this.lastName = ''
    this.email = ''
    this.password = ''
    this.confirmPassword = ''
  }

  isValid() {
    if (this.firstName == '' || this.lastName === '' || this.email === '' || this.password === '') {
      return false;
    }
    return true;
  }

  register() {
    if (this.isValid()) {
      if (this.password === this.confirmPassword) {
        var user = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        }
        this.apiService.register(user).subscribe(result => {
          console.log(result);
          var message: any = result.message
          var message = result.message
          var user = result.user
          if (message.status === 200) {
            this.router.navigateByUrl('/index')
            // localStorage['user'] = JSON.stringify(user)
            localStorage['id'] = user.id
            localStorage['firstName'] = user.firstName
          }
        })
      } else {
        alert("Password Not Matched")
      }
    } else {
      alert("Please provide required details")
    }
  }
}
