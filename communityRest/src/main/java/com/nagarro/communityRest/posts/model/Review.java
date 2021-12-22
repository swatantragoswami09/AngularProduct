package com.nagarro.communityRest.posts.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "reviews")
@Data
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String title;
    private String review;
    private String product;
    private String ProductCode;
    private boolean approval;
    private long count;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
        this.product = product;
    }

    public String getProductCode() {
        return ProductCode;
    }

    public void setProductCode(String productCode) {
        ProductCode = productCode;
    }

    public boolean isApproval() {
        return approval;
    }

    public void setApproval(boolean approval) {
        this.approval = approval;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }

    public Review(long id, String title, String review, String product, String productCode, boolean approval, long count) {
        this.id = id;
        this.title = title;
        this.review = review;
        this.product = product;
        ProductCode = productCode;
        this.approval = approval;
        this.count = count;
    }

    public Review() {
    }

    @Override
    public String toString() {
        return "Review{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", review='" + review + '\'' +
                ", product='" + product + '\'' +
                ", ProductCode='" + ProductCode + '\'' +
                ", approval=" + approval +
                ", count=" + count +
                '}';
    }
}