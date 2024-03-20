import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Quiz } from '../../models/quiz.model';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/category.model';
import { CategoryApiService } from 'src/app/services/category-api.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.scss']
})
export class LoadQuizComponent implements OnInit {

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  isOpen= false;

  colors: string[]= ['#FF4D4D', '#F18F01', '#2E8B57', '#FF6347', '#71c4ef'];
  selectedCategory!: string;

  categoryId!: string;
  quizzes: Quiz[] = [];
  filterQuizzes: Quiz[]= [];
  filterQuizzesBySearchTerm: Quiz[]= [{}];
  categories: Category[]= [];
  totalQuizzes!: number;


  searchterm: string= '';
  showList: boolean= false;

  constructor(private quizService: QuizApiService,
              private categoryService: CategoryApiService,
              private activeRoute: ActivatedRoute,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.categoryId = this.activeRoute.snapshot.params['categoryId'];
    this.loadQuizzes();
    this.loadCategory();
    this.filterQuizByCategory('all');
    console.log('all quizzes', this.filterQuizzes);
  }

  loadQuizzes() {
    this.quizService.fetchAll(0, 20).subscribe({
      next: response=> {
        this.quizzes= response.data.quizzes;
        this.totalQuizzes= response.data.totalQuizzes;
        this.filterQuizzes= this.quizzes;
        console.log(this.quizzes);
      },
      error: err=> {
        console.log(err); 
      }
    })
  }

  loadCategory() {
    this.categoryService.fetchAll(0, 20).subscribe({
      next: response=> {
        this.categories= response.data.categories;
        console.log('categories: ',this.categories);
        
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  filterQuizByCategory(categoryId: any) {
    this.selectedCategory= categoryId;

    if (categoryId=== 'all') {
      this.filterQuizzes= this.quizzes;  
    } else {
      this.filterQuizzes= this.quizzes.filter(quiz=> quiz.categoryId=== categoryId);
    }
  }

  filterBySearchTerm() {
    this.filterQuizzesBySearchTerm= this.quizzes.filter(
      quiz=> quiz.title?.toLocaleLowerCase().includes(this.searchterm.toLocaleLowerCase())
    );
  }

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollTo({
      left: this.scrollContainer.nativeElement.scrollLeft - 200,
      behavior: 'smooth'
    });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollTo({
      left: this.scrollContainer.nativeElement.scrollLeft + 200,
      behavior: 'smooth'
    });
  }

  sortedByName() {
    this.filterQuizzes.sort((a, b)=> a.title!.localeCompare(b.title!));
  }

  sortedByLevel() {
    this.filterQuizzes.sort((a, b)=> a.difficulty!.localeCompare(b.difficulty!));
  }

  toggleList() {
    this.isOpen= !this.isOpen;
  }
}