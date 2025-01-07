package com.quiztech.categoryservice.service;

import com.quiztech.categoryservice.mapper.CategoryMapper;
import com.quiztech.categoryservice.repository.CategoryRepository;
import com.quiztech.categoryservice.webClient.WebClientGetter;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.TestExecutionListeners;


import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
@DataMongoTest
class CategoryServiceImplTest {
    @Mock
    private CategoryRepository categoryRepository;
    @Mock
    private CategoryMapper categoryMapper;
    @Mock
    private WebClientGetter webClientGetter;
    @InjectMocks
    private CategoryService categoryServiceTest;
    private AutoCloseable autoCloseable;

    @BeforeEach
    void setUp() {
        //categoryServiceTest= new CategoryServiceImpl(categoryRepository, null,  null);
        autoCloseable = MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void can_getCategoryById() {
        categoryServiceTest.allCategories();

        verify(categoryRepository).findAll();
    }

    @Test
    @Disabled
    void add() {
    }

    @Test
    @Disabled
    void can_getAllCategories() {

    }

    @Test
    @Disabled
    void delete() {
    }
}