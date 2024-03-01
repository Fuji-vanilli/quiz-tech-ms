package com.quiztech.resultquizservice.repository;

import com.quiztech.resultquizservice.entities.ResultQuiz;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ResultQuizRepository extends MongoRepository<ResultQuiz, String> {
    boolean existsByQuizId(String id);
    List<ResultQuiz> findByEmailUser(String emailUser);
}
