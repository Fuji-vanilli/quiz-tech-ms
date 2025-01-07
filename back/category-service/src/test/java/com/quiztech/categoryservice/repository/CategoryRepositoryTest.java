package com.quiztech.categoryservice.repository;

import com.quiztech.categoryservice.entities.Category;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataMongoTest
class CategoryRepositoryTest {
    @Autowired
    CategoryRepository categoryRepository;

    @AfterEach
    void clearDatabase_afterUse() {
        categoryRepository.deleteAll();
    }

    @Test
    void it_shouldCheck_ifCategoryExist() {
        //GIVEN
        String id= UUID.randomUUID().toString();
        String title = "Operating system";
        Category category= Category.builder()
                .id(id)
                .title(title)
                .description("all about operating System")
                .build();

        //WHEN
        categoryRepository.save(category);
        boolean expectedExist = categoryRepository.existsById(id);

        //THEN
        assertThat(expectedExist).isTrue();
    }

    @Test
    void it_shouldCheck_ifCategory_doesNotExist() {
        //GIVEN
        String title = "Operating system";

        //WHEN
        boolean expectedExist = categoryRepository.existsByTitle(title);

        //THEN
        assertThat(expectedExist).isFalse();
    }

}