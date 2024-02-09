package com.quiztech.questionservice.repository;

import com.quiztech.questionservice.entities.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionRepository extends MongoRepository<Question, String> {
}
