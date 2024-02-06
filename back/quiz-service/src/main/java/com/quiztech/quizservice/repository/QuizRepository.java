package com.quiztech.quizservice.repository;

import com.quiztech.quizservice.entities.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizRepository extends MongoRepository<Quiz, String> {
    boolean existsByTitle(String title);
}
