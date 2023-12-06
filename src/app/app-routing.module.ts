import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProfileComponent } from './profile/profile.component';
import { PostReviewComponent } from './post-review/post-review.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { RequestsComponent } from './admin/requests/requests.component';
import { AdminAuthGuard } from './services/admin-auth.guard';

const routes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'index',
    component: MainComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'details',
    component: ProductDetailsComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'review/post',
    component: PostReviewComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin/requests',
    component: RequestsComponent,
    canActivate: [AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [HomeComponent]
})
export class AppRoutingModule { }
