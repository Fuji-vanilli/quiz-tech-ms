package com.quiztech.courseservice.controller;


import com.quiztech.courseservice.dto.CourseRequest;
import com.quiztech.courseservice.services.CourseService;
import com.quiztech.courseservice.utils.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.quiztech.courseservice.utils.Root.APP_ROOT;

@RestController
@RequestMapping(APP_ROOT)
@RequiredArgsConstructor
@CrossOrigin("*")
public class CourseApi implements CourseController{
    private final CourseService courseService;
    @Override
    public ResponseEntity<Response> add(CourseRequest request) {
        return ResponseEntity.ok(courseService.add(request));
    }

    @Override
    public ResponseEntity<Response> update(CourseRequest request) {
        return ResponseEntity.ok(courseService.update(request));
    }

    @Override
    public ResponseEntity<Response> get(String id) {
        return ResponseEntity.ok(courseService.get(id));
    }

    @Override
    public ResponseEntity<Response> all() {
        return ResponseEntity.ok(courseService.all());
    }

    @Override
    public ResponseEntity<Response> delete(String id) {
        return ResponseEntity.ok(courseService.delete(id));
    }
}
