package com.quiztech.questionservice.services;

import com.quiztech.questionservice.dto.QuestionRequest;
import com.quiztech.questionservice.dto.QuestionResponse;
import com.quiztech.questionservice.entities.Question;
import com.quiztech.questionservice.mapper.QuestionMapper;
import com.quiztech.questionservice.repository.QuestionRepository;
import com.quiztech.questionservice.utils.Response;
import com.quiztech.questionservice.validators.QuestionValidator;
import com.quiztech.questionservice.webClient.WebClientQuiz;
import jakarta.servlet.ServletContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService{
    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;
    private final WebClientQuiz webClient;
    @Override
    public Response add(QuestionRequest request) {
        List<String> errors= QuestionValidator.isValid(request);
        if (!errors.isEmpty()) {
            log.error("some field don't matched!!!");
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "some field don't matched!!!"
            );
        }

        Question question= questionMapper.mapToQuestion(request);
        question.setId(UUID.randomUUID().toString());
        Boolean isAdded = webClient.addQuestionToQuiz(
                Map.of(
                        "idQuiz", question.getQuizId(),
                        "idQuestion", question.getId()
                )
        );

        if (isAdded)
            log.info("the new question added successfully to the quiz {}", question.getQuizId());

        URI location= ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("{id}")
                .buildAndExpand("api/question/get/"+question.getId())
                .toUri();

        questionRepository.save(question);
        log.info("new question added successfully!!!");
        return generateResponse(
                HttpStatus.OK,
                location,
                Map.of(
                        "question", questionMapper.mapToQuestionResponse(question),
                        "isAddedToQuiz", isAdded
                ),
                "new question added successfully"
        );
    }

    @Override
    public Response get(String id) {
        if (!questionRepository.existsById(id)) {
            log.error("question with the id: {} doesn't exist on the database!", id);
            generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "question with the id: "+id+" doesn't exist on the database!"
            );
        }

        Question question= questionRepository.findById(id).orElseThrow(
                ()-> new IllegalArgumentException("error to fetch the question on the database!")
        );

        log.info("question with the id  {} getted successfully!", id);
        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "question", questionMapper.mapToQuestionResponse(question)
                ),
                "question with the id "+id+" getted successfully!"
        );
    }

    @Override
    public Response allByQuizId(String quizId) {
        log.info("all Question with the quiz id: {} getted successfully!", quizId);
        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "questions", questionRepository.findByQuizId(quizId).stream()
                                .map(questionMapper::mapToQuestionResponse)
                                .toList()
                ),
                "all question with the quiz id: "+quizId+" getted successfully!"
        );
    }

    @Override
    public Response all(int page, int size) {
        Pageable pageable= PageRequest.of(page, size);

        log.info("all question getted successfully!");
        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "questions", questionRepository.findAll(pageable).stream()
                                .map(questionMapper::mapToQuestionResponse)
                                .toList()
                ),
                "all question getted successfully!"
        );
    }

    @Override
    public Response delete(String id) {

        if (!questionRepository.existsById(id)) {
            log.error("question with the id: {} doesn't exist on the database!", id);
            generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "question with the id: "+id+" doesn't exist on the database!"
            );
        }

        questionRepository.deleteById(id);
        log.info("question with the id {} deleted successfully", id);
        return generateResponse(
                HttpStatus.OK,
                null,
                null,
                "question with the id "+id+" deleted successfully"
        );
    }

    private Response generateResponse(HttpStatus status, URI location, Map<?, ?> data, String message) {
        return Response.builder()
                .timeStamp(LocalDateTime.now())
                .status(status)
                .statusCode(status.value())
                .location(location)
                .data(data)
                .message(message)
                .build();
    }
}
