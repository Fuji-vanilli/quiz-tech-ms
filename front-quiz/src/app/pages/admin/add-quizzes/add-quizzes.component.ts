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

  formGroup!: FormGroup;

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
    value: 'Select Level'
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
    this.loadFormGoup();
    this.categoryService.fetchAll(0, 10).subscribe({
    next: response=> {
      console.log(response.data.categories);
      this.categories= response.data.categories;
      this.filterCategoryBySearchTerm= response.data.categories;
    }
   })

   window.scrollTo({top: 0, behavior: 'smooth'});
  }

  loadFormGoup() {
    this.formGroup= this.formBuilder.group({
      title: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control(''),
      categoryId: this.formBuilder.control(''),
      difficulty: this.formBuilder.control(''),
      language: this.formBuilder.control(''),
      duration: this.formBuilder.control(5, Validators.required),
      marks: this.formBuilder.control(0, Validators.required),
      imageUrl: this.formBuilder.control(''),
      numberOfQuestions: this.formBuilder.control(0, Validators.required),
      active: this.formBuilder.control(false)
    })
  }

  addQuiz() {
    const quiz: Quiz= {
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
      categoryId: this.formGroup.value.categoryId,
      active: this.formGroup.value.active,
      marks: this.formGroup.value.marks,
      imageUrl: this.formGroup.value.imageUrl,
      language: this.formGroup.value.language,
      duration: this.formGroup.value.duration,
      difficulty: this.formGroup.value.duration,
      numberOfQuestions: this.formGroup.value.numberOfQuestions 
      
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
