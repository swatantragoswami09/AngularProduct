package com.nagarro.communityRest.posts.repository;

import com.nagarro.communityRest.posts.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByApproval(boolean approval);

    List<Review> findByTitleContaining(String title);

    List<Review> findByReviewContaining(String review);

}
