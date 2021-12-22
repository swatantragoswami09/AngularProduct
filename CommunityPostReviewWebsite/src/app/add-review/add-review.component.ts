import { Review } from '../models/review.model';
import { ReviewService } from '../services/review.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit  {
  currentReview: Review = {
    title: '',
    product:'',
    productCode:'',
    review:'',
    approval: false,
    count: 0,
    
  };
  submitted = false;

  constructor(private postService: ReviewService) { }

  ngOnInit(): void {
  }

  saveReview(): void {
    const data = {
      title: this.currentReview.title,
      review:this.currentReview.review,
      product:this.currentReview.product,
      productCode:this.currentReview.productCode
    };

    this.postService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newReview(): void {
    this.submitted = false;
    this.currentReview= {
      title: '',
      product:'',
      productCode:'',
      review: '',

      approval: false,
      count: 0
    

    };
  }

}
