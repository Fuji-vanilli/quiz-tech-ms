import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environnments/environments';
import { Question } from '../pages/models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService {

  constructor(private httpClient: HttpClient) { }

  fetchAll(page: number, size: number, quizId: string): Observable<any> {
    let params= new HttpParams();
    params.set('page', page);
    params.set('size', size);

    return this.httpClient.get(environment.backEndQuestion+'/byQuiz/'+quizId, { params });
  }

  addQuestion(question: Question): Observable<any> {
    return this.httpClient.post(environment.backEndQuestion+'/add', question);
  }

  updateQuestion(question: Question): Observable<any> {
    return this.httpClient.put(environment.backEndQuestion+'/update', question);
  }

  deleteQuestion(id: string): Observable<any> {
    return this.httpClient.delete(environment.backEndQuestion+'/delete/'+id);
  }

}
