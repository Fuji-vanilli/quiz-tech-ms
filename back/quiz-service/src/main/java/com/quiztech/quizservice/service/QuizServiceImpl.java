package com.quiztech.quizservice.service;

import com.quiztech.quizservice.dto.QuizRequest;
import com.quiztech.quizservice.dto.QuizResponse;
import com.quiztech.quizservice.entities.Quiz;
import com.quiztech.quizservice.mapper.QuizMapper;
import com.quiztech.quizservice.repository.QuizRepository;
import com.quiztech.quizservice.validators.QuizValidator;
import com.quiztech.quizservice.webClient.WebClientGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        webClient.addQuizToCategory(Map.of(
                "idCategory", quiz.getCategoryId(),
                "idQuiz", quiz.getId()
        ));

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
    public List<QuizResponse> quizByCategory(String idCategory) {
        return quizRepository.findByCategoryId(idCategory).stream()
                .map(quizMapper::mapToQuizResponse)
                .toList();
    }

    @Override
    public Collection<QuizResponse> all(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return quizRepository.findAll(pageable).stream()
                .map(quizMapper::mapToQuizResponse)
                .collect(Collectors.toSet());
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
}
