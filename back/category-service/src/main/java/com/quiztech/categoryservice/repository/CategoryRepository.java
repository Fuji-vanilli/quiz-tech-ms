package com.quiztech.categoryservice.repository;

import com.quiztech.categoryservice.entities.Category;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
    boolean existsByTitle(String title);
}
