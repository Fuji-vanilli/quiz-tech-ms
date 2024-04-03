package com.quiztech.courseservice.controller;

import com.quiztech.courseservice.dto.CourseRequest;
import com.quiztech.courseservice.utils.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public interface CourseController {

    @PostMapping("add")
    ResponseEntity<Response> add(@RequestBody CourseRequest request);
    @PutMapping("update")
    ResponseEntity<Response> update(@RequestBody CourseRequest request);
    @GetMapping("get/{id}")
    ResponseEntity<Response> get(@PathVariable String id);
    @GetMapping("all")
    ResponseEntity<Response> all();
    @DeleteMapping("delete/{id}")
    ResponseEntity<Response> delete(@PathVariable String id);
}
