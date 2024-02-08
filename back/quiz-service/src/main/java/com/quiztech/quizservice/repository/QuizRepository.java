package com.quiztech.quizservice.repository;

import com.quiztech.quizservice.entities.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuizRepository extends MongoRepository<Quiz, String> {
    boolean existsByTitle(String title);
    List<Quiz> findByCategoryId(String idCategory);
}
