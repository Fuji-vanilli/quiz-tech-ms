package com.quiztech.resultquizservice.repository;

import com.quiztech.resultquizservice.entities.ResultQuiz;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.math.BigDecimal;
import java.util.List;

public interface ResultQuizRepository extends MongoRepository<ResultQuiz, String> {
    boolean existsByQuizIdAndEmailUser(String quizId, String emailUser);
    void deleteByQuizIdAndEmailUserAndFrequency(String quizId, String emailUser, BigDecimal frequency);
    ResultQuiz findFirstByQuizIdAndEmailUserOrderByCreatedDateDesc(String quizId, String emailUser);
    List<ResultQuiz> findByEmailUser(String emailUser);

}
