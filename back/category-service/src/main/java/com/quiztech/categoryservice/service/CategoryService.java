package com.quiztech.categoryservice.service;

import com.quiztech.categoryservice.dto.CategoryRequest;
import com.quiztech.categoryservice.dto.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse add(CategoryRequest request);
    CategoryResponse get(String id);
    List<CategoryResponse> all(int page, int size);
    Boolean delete(String id);

}
