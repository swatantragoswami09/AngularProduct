package com.nagarro.communityRest.controller;

import com.nagarro.communityRest.messege.request.LoginForm;
import com.nagarro.communityRest.messege.request.SignUpForm;
import com.nagarro.communityRest.messege.response.JwtResponse;
import com.nagarro.communityRest.messege.response.ResponseMessage;
import com.nagarro.communityRest.model.User;
import com.nagarro.communityRest.posts.model.Review;
import com.nagarro.communityRest.posts.repository.ReviewRepository;
import com.nagarro.communityRest.repository.UserRepository;
import com.nagarro.communityRest.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthRestAPIs {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;

    @GetMapping("/reviews")
    public ResponseEntity<List<Review>> getAllPosts(@RequestParam(required = false) String title) {
        try {
            List<Review> reviews = new ArrayList<Review>();
            if (title == null)
                reviewRepository.findAll().forEach(reviews::add);

            else
                reviewRepository.findByTitleContaining(title).forEach(reviews::add);

            if (reviews.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(reviews, HttpStatus.OK);

        } catch (Exception e) {

            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @GetMapping("/reviews/z")
    public ResponseEntity<List<Review>> getAllPostss(@RequestParam(required = false) String review) {
        try {
            List<Review> reviews = new ArrayList<>();

            if (review == null)
                reviewRepository.findAll().forEach(reviews::add);
            else
                reviewRepository.findByReviewContaining(review).forEach(reviews::add);

            if (reviews.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/reviews/{id}")
    public ResponseEntity<Review> getPostById(@PathVariable("id") long id) {
        Optional<Review> reviewData = reviewRepository.findById(id);

        if (reviewData.isPresent()) {
            return new ResponseEntity<>(reviewData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/reviews")
    public ResponseEntity<Review> createQuestion(@RequestBody Review reviews) {
        try {
            Review _reviews = reviewRepository
                    .save(new Review(0, reviews.getTitle(), reviews.getReview(),reviews.getProduct(),reviews.getProductCode(),false,0));
            return new ResponseEntity<>(_reviews, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/reviews/{id}")
    public ResponseEntity<Review> updateQuestion(@PathVariable("id") long id, @RequestBody Review reviews) {
        Optional<Review> reviewsData = reviewRepository.findById(id);

        if (reviewsData.isPresent()) {
            Review _reviews = reviewsData.get();
            _reviews.setTitle(reviews.getTitle());

            _reviews.setReview(reviews.getReview());
            _reviews.setProduct(reviews.getProduct());
            _reviews.setProductCode(reviews.getProductCode());
            _reviews.setApproval(reviews.isApproval());
            _reviews.setCount(reviews.getCount());

            return new ResponseEntity<>(reviewRepository.save(_reviews), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<HttpStatus> deleteReview(@PathVariable("id") long id) {
        try {
            reviewRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/reviews")
    public ResponseEntity<HttpStatus> deleteAllReviews() {
        try {
            reviewRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/reviews/approved")
    public ResponseEntity<List<Review>> findByAnswered() {
        try {
            List<Review> questions = reviewRepository.findByApproval(true);

            if (questions.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        System.out.println(userDetails.getUsername());
        return ResponseEntity.ok(new JwtResponse(token, userDetails.getUsername()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        userRepository.save(user);

        return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
    }
}