package com.quiztech.courseservice.mapper;

import com.quiztech.courseservice.dto.CourseRequest;
import com.quiztech.courseservice.dto.CourseResponse;
import com.quiztech.courseservice.entities.Course;

public interface CourseMapper {
    Course mapToCourse(CourseRequest request);
    CourseResponse mapToCourseResponse(Course course);
}
