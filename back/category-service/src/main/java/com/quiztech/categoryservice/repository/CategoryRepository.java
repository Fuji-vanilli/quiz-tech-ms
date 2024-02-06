package com.quiztech.categoryservice.repository;

import com.quiztech.categoryservice.entities.Category;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    boolean existsByTitle(String title);
}
