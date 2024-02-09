package com.quiztech.questionservice.services;

import com.quiztech.questionservice.dto.QuestionRequest;
import com.quiztech.questionservice.dto.QuestionResponse;
import com.quiztech.questionservice.entities.Question;
import com.quiztech.questionservice.mapper.QuestionMapper;
import com.quiztech.questionservice.repository.QuestionRepository;
import com.quiztech.questionservice.utils.Response;
import com.quiztech.questionservice.validators.QuestionValidator;
import jakarta.servlet.ServletContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

        URI location= ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("{id}")
                .buildAndExpand("api/question/get/"+question.getId())
                .toUri();

        questionRepository.save(question);
        return generateResponse(
                HttpStatus.OK,
                location,
                Map.of(
                        "question", questionMapper.mapToQuestionResponse(question)
                ),
                "new question added successfully"
        );
    }

    @Override
    public Response get(String id) {
        return null;
    }

    @Override
    public Response all(int page, int size) {
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
                .statusCode(status.value())
                .location(location)
                .data(data)
                .message(message)
                .build();
    }
}
