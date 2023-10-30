package edu.ucsb.cs156.example.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.configurationprocessor.json.JSONArray;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.cs156.example.entities.MenuItemReviews;
import edu.ucsb.cs156.example.entities.MenuItemReviews.MenuItemReviewsBuilder;
import edu.ucsb.cs156.example.repositories.MenuItemReviewsRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("menuitemreviewsservice")
public class MenuItemReviewsService {
    @Autowired
    MenuItemReviewsRepository repo;

    @Autowired
    ObjectMapper mapper;

    public MenuItemReviews postReview(MenuItemReviews obj){
        repo.save(obj);
        return obj;
    }

    public MenuItemReviews getReview(Long id){
        MenuItemReviews obj = repo.findById(id).get();
        return obj;
    }
    public Iterable<MenuItemReviews> getAll(){
        Iterable<MenuItemReviews> allItems = repo.findAll();
        return allItems;
    }

    public MenuItemReviews updateReview(Long id, MenuItemReviews newItem){
        MenuItemReviews updatedItem = repo.findById(id).get();
        updatedItem.setItemId(newItem.getItemId());
        updatedItem.setReviewerEmail(newItem.getReviewerEmail());
        updatedItem.setStars(newItem.getStars());
        updatedItem.setDateReviewed(newItem.getDateReviewed());
        updatedItem.setComments(newItem.getComments());

        repo.save(updatedItem);
        return updatedItem;
    }

    public MenuItemReviews deleteReview(Long id){
        MenuItemReviews deletedItem = repo.findById(id).get();
        repo.deleteById(id);

        return deletedItem;
    }
}
