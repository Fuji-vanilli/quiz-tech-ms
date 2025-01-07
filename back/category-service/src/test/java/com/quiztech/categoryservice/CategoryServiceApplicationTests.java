package com.quiztech.categoryservice;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

class CategoryServiceApplicationTests {
	Calculator calculator;

	@BeforeEach
	public void initCalculator() {
		calculator= new Calculator();
	}
	@Test
	void it_ShouldReturn_Add_Numbers() {
		//GIVEN
		int a= 5, b= 9;

		//WHEN
		int result= calculator.add(a, b);

		//THEN
		assertThat(result).isEqualTo(13);
	}

	class Calculator {
		int add(int a, int b) {
			return a+ b;
		}
	}

}
