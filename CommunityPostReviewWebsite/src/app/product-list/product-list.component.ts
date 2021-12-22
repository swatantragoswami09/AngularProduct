import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from '../models/review.model';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  reviews?: Review[];
  currentReview?: Review;
  currentIndex = -1;
  title = '';
  review = '';
  product = '';
  ProductCode = '';
  approval = '';
  count = 0;
  newproducts?: Review[];
  titleSearch: any;
  tSearch: any;
  isDesc: any;
  message = '';
  list = [];

  error: any;

  constructor(private reviewService: ReviewService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.reviewService.getAll().subscribe(
      (data) => {
        this.reviews = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentReview = undefined;
    this.reviews.sort;
    this.currentIndex = -1;
  }

  setActiveProducts(review: Review, index: number): void {
    this.currentReview = review;
    this.currentIndex = index;
    this.reviews.sort;
    document.getElementById('productlist').scrollIntoView({ behavior: 'auto' });
  }
  goTop(): void {
    document
      .getElementById('dropdownBasic1')
      .scrollIntoView({ behavior: 'auto' });
  }

  likeReview(countt: any): void {
    const data = {
      count: countt,
      title: this.currentReview.title,
      review: this.currentReview.review,
      approval: status,
    };
    this.message = '';
    console.log(data);

    this.reviewService.update(this.currentReview.id, data).subscribe(
      (response) => {
        this.currentReview.count = countt;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  searchTitle(): void {
    this.currentReview = undefined;
    this.currentIndex = -1;
    this.titleSearch = null;
    this.tSearch = null;
    this.reviewService.findByProductName(this.title).subscribe(
      (data) => {
        this.error == 'Search successfully done';
        this.reviews = data;
        this.titleSearch = data;
        console.log(this.titleSearch);
      },
      (error) => {
        console.log(error);
      }
    );
    this.reviewService.findByProductName(this.title).subscribe(
      (data) => {
        this.error = 'Search Results';
        this.reviews = data;
        this.tSearch = data;
        console.log(this.titleSearch);
        console.log(this.tSearch);
      },
      (error) => {
        console.log(error);
      }
    );

    if (this.tSearch == null && this.titleSearch == null) {
      console.log(this.tSearch);
      this.error = 'Error : Product Not Found!';
    }
  }
  sortbyTitle(): void {
    this.currentReview = undefined;
    this.currentIndex = -1;
    this.reviewService.findByProductName('').subscribe(
      (data) => {
        this.reviews = data;
        this.titleSearch = data;
        console.log(this.titleSearch);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  sortbyLatest(): void {
    this.newproducts = this.reviews.sort((a, b) => b.id - a.id);
  }

  sortbyLike(): void {
    this.newproducts = this.reviews.sort((a, b) => b.count - a.count);
  }

  sortbyName(title): void {
    this.isDesc = !this.isDesc;
    let direction = this.isDesc ? 1 : -1;
    this.reviews.sort(function (a, b) {
      if (a[title] < b[title]) {
        return -1 * direction;
      } else if (a[title] > b[title]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
}
