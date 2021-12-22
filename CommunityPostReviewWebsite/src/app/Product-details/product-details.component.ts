import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '../models/review.model';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class productDetailsComponent implements OnInit {
  currentProduct: Review = {
    title: '',

    review: '',
    product: '',
    productCode: '',
    approval: false,
    count: 0,
  };
  message = '';

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.message = '';
    this.getProduct(this.route.snapshot.params.id);
  }

  getProduct(id: string): void {
    this.reviewService.get(id).subscribe(
      (data) => {
        this.currentProduct = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateApproved(status: boolean): void {
    const data = {
      title: this.currentProduct.title,
      review: this.currentProduct.review,
      product: this.currentProduct.product,
      productCode: this.currentProduct.productCode,
      approval: this.currentProduct.approval,
      count: 0,
    };

    this.message = '';

    this.reviewService.update(this.currentProduct.id, data).subscribe(
      (response) => {
        this.currentProduct.approval = status;
        this.message = response.message
          ? response.message
          : 'This product was updated successfully!';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  update(): void {
    this.message = '';

    this.reviewService
      .update(this.currentProduct.id, this.currentProduct)
      .subscribe(
        (response) => {
          console.log(response);
          this.message = response.message
            ? response.message
            : 'This Product was updated successfully!';
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteProduct(): void {
    this.reviewService.delete(this.currentProduct.id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/products']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
