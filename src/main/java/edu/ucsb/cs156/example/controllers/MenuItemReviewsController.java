package edu.ucsb.cs156.example.controllers;

import edu.ucsb.cs156.example.entities.MenuItemReviews;
import edu.ucsb.cs156.example.errors.EntityNotFoundException;
import edu.ucsb.cs156.example.repositories.UCSBDateRepository;
import edu.ucsb.cs156.example.services.MenuItemReviewsService;
import io.swagger.v3.core.util.Json;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.catalina.mapper.Mapper;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import java.time.LocalDateTime;

@Tag(name = "MenuItemReviews")
@RequestMapping("/api/menuitemreviews")
@RestController
public class MenuItemReviewsController {
    
    @Autowired
    ObjectMapper mapper;

    @Autowired
    MenuItemReviewsService service;
    
    @PostMapping("/post")
    MenuItemReviews postMenuItemReview(@Parameter Long itemId, 
                                        @Parameter String email,
                                        @Parameter int stars,
                                        @Parameter String comments
                                        )throws JsonProcessingException
                                        {
        MenuItemReviews newReview = MenuItemReviews.builder()
                                                    .itemId(itemId)
                                                    .reviewerEmail(email)
                                                    .stars(stars)
                                                    .comments(comments)
                                                    .dateReviewed(LocalDateTime.now())
                                                    .build();
        
        MenuItemReviews postedObj = service.postReview(newReview);
        return postedObj;
    }
    
    @GetMapping("")
    MenuItemReviews getMenuItemReview(@RequestParam Long id){
        MenuItemReviews returnedItem = service.getReview(id);
        return returnedItem;
    }
    @GetMapping("/all")
    Iterable<MenuItemReviews> getAllReviews(){
        Iterable<MenuItemReviews> allItems = service.getAll();
        return allItems;
    }
    
    @PutMapping("")
    void updateReview(@RequestParam Long id, @RequestBody JSON jsonBody){
        jsonBody.pretty();
        /*MenuItemReviews updatedReview = new MenuItemReviews();
        try{
            LocalDateTime time = LocalDateTime.parse(jsonBody.getString("timeReviewed"));
            if(time == null || time.equals(""))
                time = LocalDateTime.now();
            MenuItemReviews newReview = MenuItemReviews.builder()
                                                    .itemId(jsonBody.getLong("itemId"))
                                                    .reviewerEmail(jsonBody.getString("reviewerEmail"))
                                                    .stars(jsonBody.getInt("stars"))
                                                    .dateReviewed(time)
                                                    .comments(jsonBody.getString("comments"))
                                                    .build();
            updatedReview = service.updateReview(id, newReview);
        }
        catch(Exception ex){}
        return updatedReview;*/
    }
    
    @DeleteMapping("")
    MenuItemReviews deleteItem(@RequestParam Long id){
        MenuItemReviews deletedItem = service.deleteReview(id);
        return deletedItem;
    }
    
}
