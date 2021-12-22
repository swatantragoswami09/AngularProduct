import { Component, OnInit } from '@angular/core';
import { Review } from '../models/review.model';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {
  review?: Review[];
  currentReview?: Review;
  currentIndex = -1;
  title = '';
  
  titleSearch: any;
  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {

    this.reviewService.findByApproval(true)
      .subscribe(
        data => {
          this.review = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  setActivePost(review: Review, index: number): void {
    this.currentReview = review;
    this.currentIndex = index;
  }


}