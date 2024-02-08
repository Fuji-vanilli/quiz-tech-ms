package com.quiztech.categoryservice.service;

import com.quiztech.categoryservice.dto.CategoryRequest;
import com.quiztech.categoryservice.dto.CategoryResponse;
import com.quiztech.categoryservice.entities.Category;
import com.quiztech.categoryservice.mapper.CategoryMapper;
import com.quiztech.categoryservice.models.Quiz;
import com.quiztech.categoryservice.repository.CategoryRepository;
import com.quiztech.categoryservice.validators.CategoryValidator;
import com.quiztech.categoryservice.webClient.WebClientGetter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public CategoryResponse add(CategoryRequest request) {
        List<String> errors= CategoryValidator.isValid(request);

        if (!errors.isEmpty()) {
            log.error("some field not valid!!! {}", errors);
            return null;
        }

        if (categoryRepository.existsByTitle(request.getTitle())) {
            log.error("category already exist on the database:");
            return null;
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

        category.setQuizzes(quizzes);
        categoryRepository.save(category);

        return categoryMapper.mapToCategoryResponse(category);
    }

    @Override
    public CategoryResponse addQuizId(Map<String, String> patchRequest) {
        final String idCategory= patchRequest.get("idCategory");
        final String idQuiz= patchRequest.get("idQuiz");

        if (!categoryRepository.existsById(idCategory)) {
            log.error("sorry! the category with the id: {} doesn't exist on the database!", idCategory);
            return null;
        }

        Category category= categoryRepository.findById(idCategory).orElseThrow(
                ()-> new IllegalArgumentException("Error to fetch the category with the id: "+idCategory)
        );

        if (category.getQuizsId().contains(idQuiz)) {
            log.error("quiz {} already exist on the category!!!",idQuiz);
        }
        category.getQuizsId().add(patchRequest.get("idQuiz"));
        categoryRepository.save(category);
        log.info("new Quiz added successfully to the category with id {}", idCategory);

        return categoryMapper.mapToCategoryResponse(category);
    }

    @Override
    public CategoryResponse get(String id) {
        if (!categoryRepository.existsById(id)) {
            log.error("sorry! the category with the id: {} doesn't exist on the database!", id);
            return null;
        }

        Category category= categoryRepository.findById(id).orElseThrow(
                ()-> new IllegalArgumentException("Error to fetch the category with the id: "+id)
        );

        List<Quiz> quizzes = webClient.quizzesByCategory(category.getId());

        category.setQuizzes(quizzes);
        log.info("category with the id: {} is getted successfully", id);
        return categoryMapper.mapToCategoryResponse(category);
    }

    @Override
    public List<CategoryResponse> all(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        log.info("all category getted successfully!");

        return categoryRepository.findAll(pageable).stream()
                .map(categoryMapper::mapToCategoryResponse)
                .toList();
    }

    @Override
    public Boolean delete(String id) {
        if (!categoryRepository.existsById(id)) {
            log.error("sorry! the category with the id: {} doesn't exist on the database!", id);
            return false;
        }

        categoryRepository.deleteById(id);
        log.info("cateogry with the id: {} is deleted successfully", id);

        return true;
    }

}
