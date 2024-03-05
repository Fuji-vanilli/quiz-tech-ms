package com.quiztech.resultquizservice.service;

import com.quiztech.resultquizservice.dto.ResultQuizRequest;
import com.quiztech.resultquizservice.entities.ResultQuiz;
import com.quiztech.resultquizservice.mapper.ResultQuizMapper;
import com.quiztech.resultquizservice.models.Quiz;
import com.quiztech.resultquizservice.repository.ResultQuizRepository;
import com.quiztech.resultquizservice.utils.Response;
import com.quiztech.resultquizservice.validators.ResultQuizValidators;
import com.quiztech.resultquizservice.webClient.WebClientGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.math.BigDecimal;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class ResultQuizServiceImpl implements ResultQuizService {

    private final ResultQuizRepository resultQuizRepository;
    private final ResultQuizMapper resultQuizMapper;
    private final WebClientGetter webClient;
    @Override
    public Response add(ResultQuizRequest request) {
        List<String> errors= ResultQuizValidators.isValid(request);

        if (!errors.isEmpty()) {
            log.error("some field don't match!!!");
            generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    Map.of(
                            "errors", errors
                    ),
                    "Some field required"
            );
        }

        ResultQuiz resultQuiz = resultQuizMapper.mapToResultQuiz(request);
        Quiz quiz = webClient.getQuiz(resultQuiz.getQuizId());

        resultQuiz.setCreatedDate(new Date());
        resultQuiz.setId(UUID.randomUUID().toString());
        resultQuiz.setQuiz(quiz);

        BigDecimal frequency= new BigDecimal(1);

        if (resultQuizRepository.existsByQuizIdAndEmailUser(request.getQuizId(), request.getEmailUser())){
            ResultQuiz byQuizIdAndEmailUser = resultQuizRepository.findFirstByQuizIdAndEmailUserOrderByCreatedDateDesc(request.getQuizId(), request.getEmailUser());
            log.info("frequency: {}", byQuizIdAndEmailUser.getFrequency());
            frequency= frequency.add(byQuizIdAndEmailUser.getFrequency());
        }

        resultQuiz.setFrequency(frequency);

        resultQuizRepository.save(resultQuiz);
        log.info("new result  of the quiz {} added successfully", resultQuiz.getQuizId());

        URI location= ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("{id}")
                .buildAndExpand("api/result/get/"+resultQuiz.getId())
                .toUri();

        return generateResponse(
                HttpStatus.OK,
                location,
                Map.of(
                        "resultQuiz", resultQuizMapper.mapToResultQuizResponse(resultQuiz)
                ),
                "new result of the quiz: "+resultQuiz.getQuizId()+" added successfully!"
        );
    }

    @Override
    public Response get(String id) {
        if (!resultQuizRepository.existsById(id)) {
            log.error("result with the id: {} doesn't exist on the database!", id);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "result with the id: "+id+" doesn't exist on the database!"
            );
        }

        ResultQuiz resultQuiz = resultQuizRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("error to fetch into the database!")
        );

        log.info("result quiz id: {} getted successfully:", id);

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "resultQuiz", resultQuizMapper.mapToResultQuizResponse(resultQuiz)
                ),
                "result quiz : "+id+" getted successfully!"
        );
    }

    @Override
    public Response getByUserEmail(String emailUser) {
        log.info("all result with the user : {} getted successfully!", emailUser);

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "resultQuizzes", resultQuizRepository.findByEmailUser(emailUser).stream()
                                .map(resultQuizMapper::mapToResultQuizResponse)
                                .toList()
                ),
                "all result with the user: "+emailUser+" getted successfully!"
        );
    }

    @Override
    public Response updateRate(Map<String, Object> rate) {
        final String resultQuizId= (String) rate.get("resultQuizId");
        final double newRate= (double) rate.get("rate");

        if (!resultQuizRepository.existsById(resultQuizId)) {
            log.error("result with the id: {} doesn't exist on the database!", resultQuizId);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "result with the id: "+resultQuizId+" doesn't exist on the database!"
            );
        }

        ResultQuiz resultQuiz = resultQuizRepository.findById(resultQuizId).orElseThrow(
                () -> new IllegalArgumentException("error to fetch into the database!")
        );

        resultQuiz.setRate(newRate);
        resultQuiz.getFrequency().add(new BigDecimal(1));
        resultQuiz.setLastUpdateDate(new Date());

        resultQuizRepository.save(resultQuiz);
        log.info("rate updated successfully for result quiz: {}", resultQuizId);

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "resultQuiz", resultQuizMapper.mapToResultQuizResponse(resultQuiz)
                ),
                "rate updated successfully for result quiz: "+resultQuizId
        );
    }

    @Override
    public Response all() {
        log.info("all result quiz getted successfully!");

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "resultQuizzes", resultQuizRepository.findAll().stream()
                                .map(resultQuizMapper::mapToResultQuizResponse)
                ),
                "all result quiz getted successfully!"
        );
    }

    @Override
    public Response delete(String quizId, String emailUser, BigDecimal frequency) {
        if (!resultQuizRepository.existsByQuizIdAndEmailUser(quizId, emailUser)) {
            log.error("result with the id: {} doesn't exist on the database!", quizId);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "result with the id: "+quizId+" doesn't exist on the database!"
            );
        }

        resultQuizRepository.deleteByQuizIdAndEmailUserAndFrequency(quizId, emailUser, frequency);
        log.info("result quiz {} deleted successfully!", quizId);

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "is deleted", true
                ),
                "result quiz: "+quizId+" deleted successfully!"
        );
    }

    @Override
    public Response getResultQuizSummary(String emailUser) {
        Map<String, List<Double>> resultSummary= new HashMap<>();
        List<ResultQuiz> results = resultQuizRepository.findByEmailUser(emailUser);

        Map<String, List<ResultQuiz>> groupingByQuizTitle = results.stream()
                .collect(Collectors.groupingBy(result -> result.getQuiz().getTitle()));

        resultSummary= groupingByQuizTitle.entrySet().stream()
                .collect(Collectors.toMap(
                                Map.Entry::getKey,
                                entry -> entry.getValue().stream()
                                        .map(ResultQuiz::getRate)
                                        .toList()
                        )

                );

        log.info("result summary getted successfully!");
        return generateResponse(
                HttpStatus.OK,
                null,
                resultSummary,
                "result summary getted successfully!"
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
