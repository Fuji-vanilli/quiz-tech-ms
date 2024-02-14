import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionApiService } from 'src/app/services/question-api.service';
import { QuizApiService } from 'src/app/services/quiz-api.service';
import { Question } from '../../models/question.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent implements OnInit{
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  quizId!: string;
  quizTitle!: string;

  questions: Question[]= [];

  constructor(private activeRoute: ActivatedRoute,
              private quizService: QuizApiService,
              private questionService: QuestionApiService) {}

  ngOnInit(): void {
    this.quizId= this.activeRoute.snapshot.params['id'];
    this.quizTitle= this.activeRoute.snapshot.params['title'];

    this.loadQuestionByQuizId();
  }

  loadQuestionByQuizId() {
    this.questionService.fetchAll(0, 10, this.quizId).subscribe({
      next: response=> {
        this.questions= response.data.questions,
        console.table(this.questions);
      }
    })
  }

  updateQuestion(question: Question) {
    this.questionService.updateQuestion(question).subscribe({
      next: response=> {
        Swal.fire('Updated', 'Question updated successfully!', 'success');
        console.log('question updated: ', response.data.question);
        this.loadQuestionByQuizId();        
      }, 
      error: err=> {
        console.log(err);
        
      }
    })
  }

  deleteQuestion(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure to delete this Question?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#2563eb',
      confirmButtonText: 'Yes, Delete!',
      cancelButtonText: 'Cancel'
    }).then((result)=> {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(id).subscribe({
          next: response=> {
            if (response.statusCode== 200) {
              Swal.fire('Deleted', 'Question deleted successfully!', 'success');
              this.loadQuestionByQuizId();
            }
          },
          error: err=> {
            console.log(err);
            
          }
        })
      }
    })

  }

}
