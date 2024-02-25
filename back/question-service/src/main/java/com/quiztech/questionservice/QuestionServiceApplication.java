package com.quiztech.questionservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QuestionServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuestionServiceApplication.class, args);
	}
	public int reverse(int x) {
		StringBuilder builder= new StringBuilder(String.valueOf(x));

		return Integer.parseInt(builder.reverse().toString());
	}
}

