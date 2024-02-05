package com.quiztech.categoryservice.mapper;

import com.quiztech.categoryservice.dto.CategoryRequest;
import com.quiztech.categoryservice.dto.CategoryResponse;
import com.quiztech.categoryservice.entities.Category;

public interface CategoryMapper {
    Category mapToCategory(CategoryRequest request);
    CategoryResponse mapToCategoryResponse(Category category);
}
