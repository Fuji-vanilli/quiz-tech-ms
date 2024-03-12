package com.quiztech.categoryservice.controller;

import com.quiztech.categoryservice.dto.CategoryRequest;
import com.quiztech.categoryservice.dto.CategoryResponse;
import com.quiztech.categoryservice.models.Quiz;
import com.quiztech.categoryservice.service.CategoryService;
import com.quiztech.categoryservice.utils.Response;
import com.quiztech.categoryservice.webClient.WebClientGetter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import static com.quiztech.categoryservice.utils.Root.APP_ROOT;

@RestController
@RequestMapping(APP_ROOT)
@RequiredArgsConstructor
@CrossOrigin("*")
public class CategoryApi implements CategoryController{
    private final CategoryService categoryService;
    private final WebClientGetter webClient;

    @Override
    public ResponseEntity<Response> add(CategoryRequest request) {
        return ResponseEntity.ok(categoryService.add(request));
    }

    @Override
    public ResponseEntity<Response> addQuizId(Map<String, String> patchRequest) {
        return ResponseEntity.ok(categoryService.addQuizId(patchRequest));
    }

    @Override
    public ResponseEntity<Response> update(CategoryRequest request) {
        return ResponseEntity.ok(categoryService.update(request));
    }

    @Override
    public ResponseEntity<Response> get(String id) {
        return ResponseEntity.ok(categoryService.get(id));
    }

    @Override
    public ResponseEntity<Response> all(int page, int size) {
        return ResponseEntity.ok(categoryService.all(page, size));
    }

    @Override
    public ResponseEntity<Response> delete(String id) {
        return ResponseEntity.ok(categoryService.delete(id));
    }

    @Override
    public ResponseEntity<String> roles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        return ResponseEntity.ok(authorities.toString());
    }

}
