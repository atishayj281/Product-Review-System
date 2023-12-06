import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'http://localhost:8087'

  constructor(private httpCient: HttpClient) { }

  public register(user: any) {
    var url = `${this.BASE_URL}/addUser`
    return this.httpCient.post<any>(url, user);
  }

  public login(user: any) {
    var url =  `${this.BASE_URL}/auth`
    return this.httpCient.post<any>(url, user);
  }

  public getUserById(option: any) {
    var url =  `${this.BASE_URL}/user`
    return this.httpCient.post<any>(url, option);
  }

  public adminAuth(credentials: any) {
    var url = `${this.BASE_URL}/adminAuth`
    return this.httpCient.post<any>(url, credentials)
  }

  public addProduct(product: any) {
    var url = `${this.BASE_URL}/product`
    return this.httpCient.post<any>(url, product);
  }

  public getProducts(){
    var url = `${this.BASE_URL}/product`
    return this.httpCient.get<any>(url);
  }

  public getProductById(id: number) {
    var url = `${this.BASE_URL}/getProductById?id=${id}`
    return this.httpCient.get<product>(url);
  }

  public getProductByCriteria(criteria: any) {
    var url = `${this.BASE_URL}/products?name=${criteria['name']}&code=${criteria['code']}&brand=${criteria['brand']}`
    return this.httpCient.get<any>(url);
  }

  public getReviewsByProductId(productId: number) {
    var url = `${this.BASE_URL}/review/getByProduct?productId=${productId}`
    return this.httpCient.get<any>(url);
  }

  public requestForPostReview(request: any) {
    var url = `${this.BASE_URL}/reviewRequest/request`
    return this.httpCient.post<any>(url, request);
  }

  public approveRequestForReview(option: any) {
    var url = `${this.BASE_URL}/reviewRequest/approve`
    return this.httpCient.post<any>(url, option);
  }

  public rejectRequestForReview(option: any) {
    var url = `${this.BASE_URL}/reviewRequest/reject`
    return this.httpCient.post<any>(url, option)
  }

  public getReviewRequestStatusById(option: any) {
    var url = `${this.BASE_URL}/reviewRequest/statusById`
    return this.httpCient.post<any>(url, option)
  }

  public getReviewRequestStatus(option: any) {
    var url = `${this.BASE_URL}/reviewRequest/status`
    return this.httpCient.post<any>(url, option);
  }

  public getAllReviewRequests() {
    var url = `${this.BASE_URL}/reviewRequest`
    return this.httpCient.get<any>(url)
  }

  public requestForReview(review: any) {
    var url = `${this.BASE_URL}/review/request`
    return this.httpCient.post<any>(url, review)
  }

  public approveReview(review: any) {
    var url = `${this.BASE_URL}/review/approve`
    return this.httpCient.post<any>(url, review)
  }

  public rejectReview(review: any) {
    var url = `${this.BASE_URL}/review/reject`
    return this.httpCient.post<any>(url, review)
  }

  public getReviewStatusById(review: any) {
    var url =`${this.BASE_URL}/review/statusById`
    return this.httpCient.post<any>(url, review)
  }

  public getReviews(option: any) {
    var url = `${this.BASE_URL}/review/status`
    return this.httpCient.post<any>(url, option)
  }


  public getAllReviews() {
    var url = `${this.BASE_URL}/review`
    return this.httpCient.get<any>(url)
  }

  public getStats() {
    var url = `${this.BASE_URL}/stats`
    return this.httpCient.get<any>(url);
  }
}
