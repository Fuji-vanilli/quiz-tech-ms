package com.quiztech.categoryservice.service;

import com.quiztech.categoryservice.dto.CategoryRequest;
import com.quiztech.categoryservice.dto.CategoryResponse;
import com.quiztech.categoryservice.entities.Category;
import com.quiztech.categoryservice.mapper.CategoryMapper;
import com.quiztech.categoryservice.models.Quiz;
import com.quiztech.categoryservice.repository.CategoryRepository;
import com.quiztech.categoryservice.utils.Response;
import com.quiztech.categoryservice.validators.CategoryValidator;
import com.quiztech.categoryservice.webClient.WebClientGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final WebClientGetter webClient;
    @Override
    public Response add(CategoryRequest request) {
        List<String> errors= CategoryValidator.isValid(request);

        if (!errors.isEmpty()) {
            log.error("some field not valid!!! {}", errors);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "some field not valid!!! {} - "+errors
            );
        }

        if (categoryRepository.existsByTitle(request.getTitle())) {
            log.error("category already exist on the database!");
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "category already exist on the database!"
            );
        }

        Category category= categoryMapper.mapToCategory(request);
        category.setId(UUID.randomUUID().toString());
        category.setCreatedDate(new Date());
        category.setLastUpdateDate(new Date());

        List<Quiz> quizzes= new ArrayList<>();

        if (!Objects.isNull(request.getQuizsId())) {
            quizzes= request.getQuizsId().stream()
                    .map(webClient::getQuiz)
                    .toList();
        }

        URI location= ServletUriComponentsBuilder.fromCurrentContextPath()
                        .path("{id}")
                                .buildAndExpand("api/category/get/"+category.getId())
                                        .toUri();

        category.setQuizzes(quizzes);
        categoryRepository.save(category);
        log.info("new category added successfully!");

        return generateResponse(
                HttpStatus.OK,
                location,
                Map.of(
                        "category", categoryMapper.mapToCategoryResponse(category)
                ),
                "new category added successfully!"
        );
    }

    @Override
    public Response addQuizId(Map<String, String> patchRequest) {
        final String idCategory= patchRequest.get("idCategory");
        final String idQuiz= patchRequest.get("idQuiz");

        if (!categoryRepository.existsById(idCategory)) {
            log.error("sorry! the category with the id: {} doesn't exist on the database!", idCategory);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "sorry! the category with the id: "+idCategory+"+ doesn't exist on the database!"
            );
        }

        Category category= categoryRepository.findById(idCategory).orElseThrow(
                ()-> new IllegalArgumentException("Error to fetch the category with the id: "+idCategory)
        );

        if (category.getQuizsId().contains(idQuiz)) {
            log.error("quiz {} already exist on the category!!!",idQuiz);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "quiz with the id: "+idQuiz+" already exist on the category!!!"
            );
        }
        category.getQuizsId().add(idQuiz);
        //category.getQuizzes().add(webClient.getQuiz(idQuiz));
        categoryRepository.save(category);
        log.info("new Quiz added successfully to the category with id {}", idCategory);

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "category", categoryMapper.mapToCategoryResponse(category)
                ),
                "new Quiz added successfully to the category with id: "+idCategory
        );
    }

    @Override
    public Response get(String id) {
        if (!categoryRepository.existsById(id)) {
            log.error("sorry! the category with the id: {} doesn't exist on the database!", id);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "sorry! the category with the id: "+id+" doesn't exist on the database!"
            );
        }

        Category category= categoryRepository.findById(id).orElseThrow(
                ()-> new IllegalArgumentException("Error to fetch the category with the id: "+id)
        );

        List<Quiz> quizzes = webClient.quizzesByCategory(category.getId());

        category.setQuizzes(quizzes);
        log.info("category with the id: {} is getted successfully", id);

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "category", categoryMapper.mapToCategoryResponse(category)
                ),
                "category with the id: "+id+" is getted successfully"
        );
    }

    @Override
    public Response all(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        log.info("all category getted successfully!");

        return generateResponse(
                HttpStatus.OK,
                null,
                Map.of(
                        "categories", categoryRepository.findAll(pageable).stream()
                                .map(categoryMapper::mapToCategoryResponse)
                                .toList(),
                        "totalElement", categoryRepository.findAll(pageable).getTotalElements()
                ),
                "all category getted successfully!"
        );
    }

    @Override
    public Response delete(String id) {
        if (!categoryRepository.existsById(id)) {
            log.error("sorry! the category with the id: {} doesn't exist on the database!", id);
            return generateResponse(
                    HttpStatus.BAD_REQUEST,
                    null,
                    null,
                    "sorry! the category with the id: "+id+" doesn't exist on the database!"
            );
        }

        categoryRepository.deleteById(id);
        log.info("cateogry with the id: {} is deleted successfully", id);

        return generateResponse(
                HttpStatus.OK,
                null,
                null,
                "cateogry with the id: "+id+" is deleted successfully"
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
