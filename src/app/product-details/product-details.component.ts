import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { product } from '../model/product';
import { review } from '../model/review';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent {
  avgRatings = ''
  review: Array<review> = []
  product: product | undefined
  id: any

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.getProductId();
  }

  getProductId(){
    this.id = this.route.snapshot.queryParams['id'];
    this.getProductDetails(this.id);
  }

  getProductDetails(id: number) {
    this.apiService.getProductById(id).subscribe(result => {
      this.product = result      
      this.getReviews();
    })
  }

  askForReview(){
    var request = {
      uid: localStorage['id'],
      productId: parseInt(this.id)
    }
    this.apiService.requestForPostReview(request).subscribe(result => {
      alert(result.message)
    })
  }

  getReviews(){
    this.apiService.getReviewsByProductId(this.id).subscribe(result => {
      for(const review of result) {
        if(review.status === 1) {
          this.review.push(review)
          let totalRating = 0
          for(const item of this.review) {
            totalRating += parseInt(item.ratings);
          }
          this.avgRatings = (totalRating / this.review.length).toString()
        }
      }
    })
  }


}
