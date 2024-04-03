package com.quiztech.courseservice.repositories;

import com.quiztech.courseservice.entities.Course;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepository extends MongoRepository<Course, String> {
    boolean existsByTitle(String title);
}
