package edu.ucsb.cs156.example.repositories;

import org.springframework.data.repository.CrudRepository;

import edu.ucsb.cs156.example.entities.MenuItemReviews;

import org.springframework.stereotype.Repository;

@Repository
public interface MenuItemReviewsRepository extends CrudRepository<MenuItemReviews, Long>{
    Iterable<MenuItemReviews> findAllBydateReviewed(String dateReviewed);
}
