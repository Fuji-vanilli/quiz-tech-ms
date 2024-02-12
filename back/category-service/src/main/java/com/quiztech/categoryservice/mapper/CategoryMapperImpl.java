package com.quiztech.categoryservice.mapper;

import com.quiztech.categoryservice.dto.CategoryRequest;
import com.quiztech.categoryservice.dto.CategoryResponse;
import com.quiztech.categoryservice.entities.Category;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CategoryMapperImpl implements CategoryMapper{
    @Override
    public Category mapToCategory(CategoryRequest request) {
        return Category.builder()
                .id(request.getId())
                .title(request.getTitle())
                .description(request.getDescription())
                .quizsId(request.getQuizsId())
                .build();
    }

    @Override
    public CategoryResponse mapToCategoryResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .title(category.getTitle())
                .description(category.getDescription())
                .createdDate(category.getCreatedDate())
                .lastUpdateDate(category.getLastUpdateDate())
                .quizsId(category.getQuizsId())
                .quizzes(category.getQuizzes())
                .build();
    }
}
