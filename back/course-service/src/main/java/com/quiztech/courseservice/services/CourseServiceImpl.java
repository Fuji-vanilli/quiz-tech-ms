package com.quiztech.courseservice.services;

import com.quiztech.courseservice.dto.CourseRequest;
import com.quiztech.courseservice.entities.Course;
import com.quiztech.courseservice.mapper.CourseMapper;
import com.quiztech.courseservice.repositories.CourseRepository;
import com.quiztech.courseservice.utils.Response;
import com.quiztech.courseservice.validators.CourseValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CourseServiceImpl implements CourseService{
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    @Override
    public Response add(CourseRequest request) {
        List<String> errors = CourseValidator.isValid(request);

        if (!errors.isEmpty()) {
            log.error("some field error or required...Please try again!!!");
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    Map.of(
                            "errors", errors
                    ),
                    "some field error or requiered...Please try again!"
            );
        }

        if (courseRepository.existsByTitle(request.getTitle())) {
            log.error("course already exist...Please try again");
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "course already exist...Please try again"
            );
        }

        Course course = courseMapper.mapToCourse(request);

        course.setId(UUID.randomUUID().toString());
        course.setCreatedDate(new Date());
        course.setLastUpdateDate(new Date());

        courseRepository.save(course);
        log.info("course added successfully");

        URI location = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("{code}")
                .buildAndExpand("/api/course/get/" + course.getId())
                .toUri();

        return generateResponse(
                HttpStatus.OK,
                location,
                Map.of(
                        "course", courseMapper.mapToCourseResponse(course)
                ),
                "course added successfully"
        );
    }

    @Override
    public Response update(CourseRequest request) {
        return null;
    }

    @Override
    public Response get(String id) {
        return null;
    }

    @Override
    public Response all() {
        return null;
    }

    @Override
    public Response delete(String id) {
        return null;
    }

    private Response generateResponse(HttpStatus status, URI location, Map<?, ?> data, String message) {
        return Response.builder()
                .timeStamp(LocalDateTime.now())
                .status(status)
                .location(location)
                .statusCode(status.value())
                .data(data)
                .message(message)
                .build();
    }
}
