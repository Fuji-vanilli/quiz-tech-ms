package com.quiztech.quizservice.service;

import com.quiztech.quizservice.dto.QuizRequest;
import com.quiztech.quizservice.dto.QuizResponse;
import com.quiztech.quizservice.entities.Quiz;
import com.quiztech.quizservice.mapper.QuizMapper;
import com.quiztech.quizservice.model.Category;
import com.quiztech.quizservice.repository.QuizRepository;
import com.quiztech.quizservice.utils.Response;
import com.quiztech.quizservice.validators.QuizValidator;
import com.quiztech.quizservice.webClient.WebClientGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class QuizServiceImpl implements QuizService {
    private final QuizRepository quizRepository;
    private final QuizMapper quizMapper;
    private final WebClientGetter webClient;

    @Override
    public Response add(QuizRequest request) {
        List<String> errors= QuizValidator.isValid(request);

        if (!errors.isEmpty()) {
            log.error("some field not valid!!! {}", errors);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "some field not valid!!! - "+errors
            );
        }

        if (quizRepository.existsByTitle(request.getTitle())) {
            log.error("quiz already exist on the database§");
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "quiz already exist on the database:"
            );
        }

        Quiz quiz= quizMapper.mapToQuiz(request);
        quiz.setId(UUID.randomUUID().toString());

        String s = webClient.addQuizToCategory(Map.of(
                "idCategory", quiz.getCategoryId(),
                "idQuiz", quiz.getId()
        ));

        Category category= webClient.getCategory(quiz.getCategoryId());
        quiz.setCategory(category);

        URI location= ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("{id}")
                                .buildAndExpand("api/quiz/get/"+quiz.getId())
                                        .toUri();
        quizRepository.save(quiz);
        log.info("new Quiz added successfully!!!");
        return generateResponse(
            HttpStatus.OK,
            location,
            Map.of(
                    "quiz", quizMapper.mapToQuizResponse(quiz)
            ),
            "quiz added successfully!"
        );
    }

    @Override
    public Response addQuestion(Map<String, String> questionRequest) {
        final String idQuiz= questionRequest.get("idQuiz");
        final String idQuestion= questionRequest.get("idQuestion");

        if (!quizRepository.existsById(idQuiz)) {
            log.error("quiz with the id: {} doesn't exist on the database!", idQuiz);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "quiz with the id: "+idQuiz+" doesn't exist on the database!"
            );
        }

        Quiz quiz= quizRepository.findById(idQuiz).orElseThrow(
                ()-> new IllegalArgumentException("error to fetch quiz with the id: "+idQuiz)
        );

        if (quiz.getQuestionsId().contains(idQuestion)) {
            log.error("question with the id {} already exist on the quiz!", idQuestion);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "question with the id: "+idQuestion+" already exist on the quiz!"
            );
        }
        quiz.getQuestionsId().add(idQuestion);
        quizRepository.save(quiz);

        log.info("question added successfully to the quiz with the id: "+idQuiz);

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "quiz", quizMapper.mapToQuizResponse(quiz)
                ),
               "question added successfully to the quiz with the id: "+idQuiz
        );
    }

    @Override
    public Response update(QuizRequest request) {
        Quiz quiz= quizRepository.findById(request.getId()).orElseThrow(
                ()-> new IllegalArgumentException("error to fetch quiz into the database!")
        );

        quiz.setActive(request.isActive());
        quiz.setMarks(request.getMarks());
        quiz.setNumberOfQuestions(request.getNumberOfQuestions());
        quiz.setCategoryId(request.getCategoryId());
        quiz.setLastUpdateDate(new Date());

        quizRepository.save(quiz);
        log.info("quiz with the id: {} updated successfully!", quiz.getId());

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "quiz", quizMapper.mapToQuizResponse(quiz)
                ),
                "quiz with the id: "+quiz.getId()+" updated successfully"
        );
    }

    @Override
    public Response get(String id) {
        if (!quizRepository.existsById(id)) {
            log.error("quiz with the id: {} doesn't exist on the database!", id);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "quiz with the id: "+id+" doesn't exist on the database!"
            );
        }
        Quiz quiz= quizRepository.findById(id).orElseThrow(
                ()-> new IllegalArgumentException("error to fetch quiz with the id: "+id)
        );

        log.info("quiz with the id {} getted successfully!", id);
        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "quiz", quizMapper.mapToQuizResponse(quiz)
                ),
                "quiz with the id: "+id+" getted successfully!"
        );
    }

    @Override
    public Response quizByCategory(String idCategory) {
        log.info("all quiz with the category: {} getted successfully!", idCategory);
        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "quizzes", quizRepository.findAll().stream()
                                .map(quizMapper::mapToQuizResponse)
                                .collect(Collectors.toSet())
                ),
                "all quizzes with the category: "+idCategory+" getted successfully!"
        );
    }

    @Override
    public Response all(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "quizzes", quizRepository.findAll(pageable).stream()
                                .map(quizMapper::mapToQuizResponse)
                                .collect(Collectors.toSet()),
                        "totalQuizzes", quizRepository.findAll(pageable).getTotalElements()
                ),
                "all quizzes getted successfully!"
        );
    }

    @Override
    public Response delete(String id) {
        if (!quizRepository.existsById(id)) {
            log.error("quiz with the id: {} doesn't exist on the database!", id);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "quiz with the id: "+id+" doesn't exist on the database!"
            );
        }

        quizRepository.deleteById(id);
        log.info("quiz with the id {} deleted successfully!", id);

        return generateResponse(
                HttpStatus.OK,
                null,
                null,
                "quiz with the id: "+id+" deleted successfully!"
        );
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
