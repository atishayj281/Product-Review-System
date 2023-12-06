import { Component } from '@angular/core';
import { product } from 'src/app/model/product';
import { review } from 'src/app/model/review';
import { reviewDetails } from 'src/app/model/reviewDetails';
import { reviewRequest } from 'src/app/model/reviewRequest';
import { reviewRequestDetails } from 'src/app/model/reviewRequestDetails';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.sass']
})
export class RequestsComponent {

  reviewRequests: Array<reviewRequest> = []
  reviews: Array<review> = []
  reviewRequestsWithProductAndUser: Array<reviewRequestDetails> = []
  reviewsWithProductAndUser: Array<reviewDetails> = []

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.getReviewRequests()
    this.getReviews();
  }

  viewRequests() {
    let requestContainer = document.getElementById("request-status-content") as HTMLDivElement
    let reviewContainer = document.getElementById("review-status-content") as HTMLDivElement
    requestContainer.classList.remove('d-none')
    reviewContainer.classList.add('d-none')
  }

  viewReviews() {
    let requestContainer = document.getElementById("request-status-content") as HTMLDivElement
    let reviewContainer = document.getElementById("review-status-content") as HTMLDivElement
    requestContainer.classList.add('d-none')
    reviewContainer.classList.remove('d-none')
  }

  getReviewRequests() {
    this.apiService.getAllReviewRequests().subscribe(reviewsRequest => {
      this.reviewRequests = reviewsRequest
      console.log(this.reviewRequests);
      for (const request of this.reviewRequests) {
        if (request.status == 0) {
          this.getProductById(request.productId).subscribe(product => {
            this.getUserById(request.uid).subscribe(user => {
              var option = {
                request: request,
                user: user,
                product: product
              }
              this.reviewRequestsWithProductAndUser.push(option)
            })
          });
        }
      }
    })
  }

  getReviews() {
    this.apiService.getAllReviews().subscribe(reviews => {
      this.reviews = reviews
      console.log(this.reviews);
      for (const review of this.reviews) {
        console.log(review);
        this.setReview(review);
      }
      console.log(this.reviewsWithProductAndUser);
    })
  }

  setReview(review: review) {
    if (review.status == 0) {
      this.getProductById(review.productId).subscribe(product => {
        this.getUserById(review.uid).subscribe(user => {
          var details = {
            user: user,
            review: review,
            product: product
          }
          this.reviewsWithProductAndUser.push(details)
        })
      });
    }
  }

  getProductById(productId: number) {
    return this.apiService.getProductById(productId)
  }

  getUserById(id: number) {
    var option = {
      uid: id
    }
    return this.apiService.getUserById(option)
  }

  acceptReview(review: review) {
    this.apiService.approveReview(review).subscribe(result => {
      alert(result.message);
      this.updateReview(review);
    })
  }

  rejectReview(review: review) {
    this.apiService.rejectReview(review).subscribe(result => {
      alert(result.message)
      this.updateReview(review);
    })
  }

  approveReviewRequest(request: reviewRequest) {
    this.apiService.approveRequestForReview(request).subscribe(result => {
      alert(result.message)
      this.updateRequests(request)
      
    })
  }

  rejectReviewRequest(request: reviewRequest) {
    this.apiService.rejectRequestForReview(request).subscribe(result => {
      alert(result.message)
      this.updateRequests(request);
    })
  }

  updateRequests(reviewRequest: reviewRequest) {
    for(let i = 0; i<this.reviewsWithProductAndUser.length; i++) {
      if(this.reviewRequestsWithProductAndUser[i].request.id === reviewRequest.id) {
        this.reviewsWithProductAndUser.splice(i, 1);
      }
    }
  } 

  updateReview(review: review) {
    for(let i = 0; i<this.reviewsWithProductAndUser.length; i++) {
      if(this.reviewsWithProductAndUser[i].review.id === review.id) {
        this.reviewsWithProductAndUser.splice(i, 1);
      }
    }
  }

}
