import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';

const baseUrl = 'http://localhost:8282/api/auth/reviews';
const urll = 'http://localhost:8282/api/auth/reviews/z';
const urlll = 'http://localhost:8282/api/auth/reviews/approved';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Review[]> {
    return this.http.get<Review[]>(baseUrl);
  }

  get(id: any): Observable<Review> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByProductName(title: any): Observable<Review[]> {
    return this.http.get<Review[]>(`${baseUrl}?title=${title}`);
  }
  findByReview(review: any): Observable<Review[]> {
    return this.http.get<Review[]>(`${urll}?review=${review}`);
  }
  
  findByApproval(title: any): Observable<Review[]> {
    return this.http.get<Review[]>(`${urlll}`);
  }

}
