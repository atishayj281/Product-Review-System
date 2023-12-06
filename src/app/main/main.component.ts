import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { product } from '../model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit{

  username = localStorage['firstName']
  name = ''
  brand = ''
  code = ''

  product: Array<product> = []

  constructor(private router: Router, private apiService: ApiService) {

  }
  ngOnInit(): void {
    this.getAllProducts()
  }

  search(){
    var options = {
      name : this.name,
      brand : this.brand,
      code: this.code
    }
    console.log(options);
    
    this.apiService.getProductByCriteria(options).subscribe(result => {
      console.log(result);
      this.product = result
      
    })
  }


  getAllProducts() {
    this.apiService.getProducts().subscribe(result => {
      this.product = result
      console.log(this.product);
      
    })
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('');
  }

}
