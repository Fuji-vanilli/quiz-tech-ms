package com.quiztech.quizservice.service;

import com.quiztech.quizservice.dto.QuizRequest;
import com.quiztech.quizservice.dto.QuizResponse;
import com.quiztech.quizservice.entities.Quiz;
import com.quiztech.quizservice.mapper.QuizMapper;
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

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.UUID;
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
    public QuizResponse add(QuizRequest request) {
        List<String> errors= QuizValidator.isValid(request);

        if (!errors.isEmpty()) {
            log.error("some field not valid!!! {}", errors);
            return null;
        }

        if (quizRepository.existsByTitle(request.getTitle())) {
            log.error("quiz already exist on the database:");
            return null;
        }

        Quiz quiz= quizMapper.mapToQuiz(request);
        quiz.setId(UUID.randomUUID().toString());

        String s = webClient.addQuizToCategory(Map.of(
                "idCategory", quiz.getCategoryId(),
                "idQuiz", quiz.getId()
        ));

        log.info("quiz added {}", s);

        quizRepository.save(quiz);
        log.info("new Quiz added successfully!!!");
        return quizMapper.mapToQuizResponse(quiz);
    }

    @Override
    public QuizResponse get(String id) {
        if (!quizRepository.existsById(id)) {
            log.error("quiz with the id: {} doesn't exist on the database!", id);
            return null;
        }
        Quiz quiz= quizRepository.findById(id).orElseThrow(
                ()-> new IllegalArgumentException("error to fetch quiz with the id: "+id)
        );

        return quizMapper.mapToQuizResponse(quiz);
    }

    @Override
    public Response quizByCategory(String idCategory) {
        log.info("all quiz with the category: {} getted successfully!", idCategory);
        return generateResponse(
                HttpStatus.OK,
                Map.of(
                        "quizzes", quizRepository.findAll().stream()
                                .map(quizMapper::mapToQuizResponse)
                                .collect(Collectors.toSet())
                ),
                "all quizzes getted successfully!"
        );
    }

    @Override
    public Response all(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return generateResponse(
                HttpStatus.OK,
                Map.of(
                        "quizzes", quizRepository.findAll(pageable).stream()
                                .map(quizMapper::mapToQuizResponse)
                                .collect(Collectors.toSet())
                ),
                "all quizzes getted successfully!"
        );
    }

    @Override
    public Boolean delete(String id) {
        if (!quizRepository.existsById(id)) {
            log.error("quiz with the id: {} doesn't exist on the database!", id);
            return false;
        }

        quizRepository.deleteById(id);

        return true;
    }

    private Response generateResponse(HttpStatus status, Map<?, ?> data, String message) {
        return Response.builder()
                .timeStamp(LocalDateTime.now())
                .status(status)
                .statusCode(status.value())
                .data(data)
                .message(message)
                .build();
    }
}
