package com.quiztech.resultquizservice.repository;

import com.quiztech.resultquizservice.entities.ResultQuiz;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ResultQuizRepository extends MongoRepository<ResultQuiz, String> {
    boolean existsByQuizId(String id);
}
