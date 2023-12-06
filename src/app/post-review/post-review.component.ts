import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.sass']
})
export class PostReviewComponent implements OnInit {
  formData: any = {}; 
  requestId: any;
  productId: any;
  error: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    this.getReviewId();
  }

  getReviewId() {
    this.requestId = this.route.snapshot.queryParams['id'];
    this.productId = this.route.snapshot.queryParams['pid'];
  }
  ngOnInit(): void {

  }
  submitReview() {
    console.log(this.formData);
    if (this.formData.heading == '' || this.formData.message == '' || this.formData.selectedStar == undefined || this.formData.selectedStar == '0') {
      alert("Please Provide required Details")
    } else if(this.formData.message.length > 400 || this.formData.message.length < 20) {
      alert("Message should be between 20 to 400 characters")
    }
    else {
      var requets = {
        review: {
          uid: localStorage['id'],
          productId: this.productId,
          heading: this.formData.heading,
          message: this.formData.message,
          ratings: parseInt(this.formData.selectedStar)
        },
        requestId: this.requestId
      }
      console.log(requets);
      this.apiService.requestForReview(requets).subscribe(result => {
        alert(result.message)
        console.log(result);
        this.router.navigateByUrl('/profile')
      })
    }
  }


  validateInput() {
    if (this.formData.message.length > 400) {
      this.error = 'Input exceeds maximum length of 400 characters';      
      this.formData.message = this.formData.message.substr(0, 400);
    } else {
      this.error = '';
    }
  }

  resetAll() {
    this.formData.selectedStar = undefined
    this.formData.heading = ''
    this.formData.message = ''
  }
}
