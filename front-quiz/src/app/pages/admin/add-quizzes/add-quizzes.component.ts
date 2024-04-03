import { Component, HostListener, OnInit } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import { Category } from '../../models/category.model';
import { CategoryApiService } from 'src/app/services/category-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.scss']
})
export class AddQuizzesComponent implements OnInit{

  quizzes: Quiz[]= [];
  categories: Category[]= [];
  durations: number[]= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  languages: string[]= ['French', 'English', 'Espagnol'];
  levels: string[]= ['Easy', 'Medium', 'Hard'];
  activeSteps: boolean[]= [false, false, false, false];
  activestepCount: number= 0;

  formGroupCourse!: FormGroup;
  formGroupQuiz!: FormGroup;
  formGroupQuestion!: FormGroup;

  searchTerm: string= '';
  filterCategoryBySearchTerm: Category[]= [];

  currentQuestionAdd: number= 0;

  selectCategory= {
    open: false,
    cateogryId: '',
    value: 'Select Category'
  }

  selectLevel= {
    open: false,
    value: 'Easy'
  }

  selectDuration= {
    open: false,
    value: 2
  }

  selectLanguage= {
    open: false,
    value: 'En'
  }

  constructor(private quizService: QuizApiService,
              private categoryService: CategoryApiService,
              private formBuilder: FormBuilder,
              private route: Router) {}

  ngOnInit(): void {
    this.loadFormGroupCourse();
    this.loadFormGoupQuiz();
    this.loadFormGroupQuestion();

    this.loadCategory();
    
   window.scrollTo({top: 0, behavior: 'smooth'});

  }

  loadFormGroupCourse() {
    this.formGroupCourse= this.formBuilder.group({
      title: this.formBuilder.control(''),
      description: this.formBuilder.control('')
    })
  }

  loadFormGoupQuiz() {
    this.formGroupQuiz= this.formBuilder.group({
      title: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control(''),
      categoryId: this.formBuilder.control('', Validators.required),
      difficulty: this.formBuilder.control('', Validators.required),
      language: this.formBuilder.control('', Validators.required),
      duration: this.formBuilder.control(5, Validators.required),
      marks: this.formBuilder.control(0, Validators.required),
      numberOfQuestions: this.formBuilder.control(0, Validators.required)
    })
  }

  loadFormGroupQuestion() {
    this.formGroupCourse= this.formBuilder.group({
      content: this.formBuilder.control('', Validators.required),
      option1: this.formBuilder.control('', Validators.required),
      option2: this.formBuilder.control('', Validators.required),
      option3: this.formBuilder.control('', Validators.required),
      option4: this.formBuilder.control('', Validators.required),
      answer: this.formBuilder.control('', Validators.required)
    })
  }

  loadCategory() {
    this.categoryService.fetchAll(0, 10).subscribe({
      next: response=> {
        console.log(response.data.categories);
        this.categories= response.data.categories;
        this.filterCategoryBySearchTerm= response.data.categories;
      }
     })
  
  }

  addQuiz() {
    const quiz: Quiz= {
      title: this.formGroupQuiz.value.title,
      description: this.formGroupQuiz.value.description,
      categoryId: this.formGroupQuiz.value.categoryId,
      active: this.formGroupQuiz.value.active,
      marks: this.formGroupQuiz.value.marks,
      imageUrl: this.formGroupQuiz.value.imageUrl,
      language: this.formGroupQuiz.value.language,
      duration: this.formGroupQuiz.value.duration,
      difficulty: this.formGroupQuiz.value.duration,
      numberOfQuestions: this.formGroupQuiz.value.numberOfQuestions 
      
    }

    this.quizService.addQuiz(quiz).subscribe({
      next: response=> {

        
        if (response.statusCode== 400) {
          Swal.fire('Error', 'Quiz already exist...Try again!!!', 'error')
          this.route.navigateByUrl('/admin/add-quiz')
        } else {
          Swal.fire('Success', 'new Quiz added successfully!', 'success')
          this.route.navigateByUrl('/admin/quizzes');        
  
          console.log('duration: ',quiz.duration);
          console.log('status', response.statusCode);
        }
      
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  filterBySearchTerm() {
    this.filterCategoryBySearchTerm= this.categories.filter(category=> category.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    console.log('search: '+this.searchTerm);
    
  }

  nextStep() {
    this.activeSteps[this.activestepCount]= true;
    this.activestepCount++;

    if (this.activestepCount=== 4) {
      window.location.reload();
    }
  }

  backStep() {
    this.activestepCount--;
    this.activeSteps[this.activestepCount]= false;
  }

  toggleCategorySelect() {
    this.selectCategory.open= !this.selectCategory.open;
  }

  toggleLevel() {
    this.selectLevel.open= !this.selectLevel.open;
  }

  toggleDuration() {
    this.selectDuration.open= !this.selectDuration.open;
  }

  toggleLanguage() {
    this.selectLanguage.open= !this.selectLanguage.open;
  }

  selectOptionCategory(category: Category) {
    this.selectCategory.cateogryId= category.id!;
    this.selectCategory.value= category.title;

    this.selectCategory.open= false;
  }

  selectOptionLevel(level: any) {
    this.selectLevel.open= false;
    this.selectLevel.value= level;
  }

  selectOptionDuration(duration: number) {
    this.selectDuration.open= false;
    this.selectDuration.value= duration;
  }

  selectOptionLanguage(language: any) {
    this.selectLanguage.open= false;
    this.selectLanguage.value= language;
  }

  showNextQuestionAdd() {
    this.currentQuestionAdd++;
  }

  @HostListener('document:click', ['$event'])
  click(event: any) {
    if (!event.target.closest('.select-container.category')) {
      this.selectCategory.open= false
    }

    if (!event.target.closest('.select-container.level')) {
      this.selectLevel.open= false;
    }

    if (!event.target.closest('.select-container.duration')) {
      this.selectDuration.open= false;
    }

    if (!event.target.closest('.select-container.language')) {
      this.selectLanguage.open= false;
    }
  }

}
