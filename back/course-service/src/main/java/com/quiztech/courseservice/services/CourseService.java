package com.quiztech.courseservice.services;

import com.quiztech.courseservice.dto.CourseRequest;
import com.quiztech.courseservice.utils.Response;

public interface CourseService {
    Response add(CourseRequest request);
    Response update(CourseRequest request);
    Response get(String id);
    Response all();
    Response delete(String id);

}
