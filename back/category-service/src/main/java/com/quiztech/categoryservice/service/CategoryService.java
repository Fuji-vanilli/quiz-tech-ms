package com.quiztech.categoryservice.service;

import com.quiztech.categoryservice.dto.CategoryRequest;
import com.quiztech.categoryservice.dto.CategoryResponse;
import com.quiztech.categoryservice.utils.Response;

import java.util.List;
import java.util.Map;

public interface CategoryService {
    Response add(CategoryRequest request);
    Response addQuizId(Map<String, String> patchRequest);
    Response update(CategoryRequest request);
    Response get(String id);
    Response all(int page, int size);
    Response delete(String id);

}
