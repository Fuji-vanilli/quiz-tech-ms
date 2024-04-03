package com.quiztech.courseservice.mapper;

import com.quiztech.courseservice.dto.CourseRequest;
import com.quiztech.courseservice.dto.CourseResponse;
import com.quiztech.courseservice.entities.Course;
import org.springframework.context.annotation.Configuration;


@Configuration
public class CourseMapperImpl implements CourseMapper{
    @Override
    public Course mapToCourse(CourseRequest request) {
        return Course.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .build();
    }

    @Override
    public CourseResponse mapToCourseResponse(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .createdDate(course.getCreatedDate())
                .lastUpdateDate(course.getLastUpdateDate())
                .build();
    }
}
