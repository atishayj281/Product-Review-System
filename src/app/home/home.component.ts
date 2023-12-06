import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit{
  members: any = ''
  products: any = ''
  review: any = ''
  constructor(private apiService: ApiService, private router: Router) {}
  ngOnInit(): void {
    this.getStats()
  }

  getStats(){
    this.apiService.getStats().subscribe(result => {
      console.log(result);
      
      this.members = result.totalUsers
      this.products = result.totalProducts
      this.review = result.totalReviews
    })
  }

  login(){
    this.router.navigateByUrl('/login')
  }
}
