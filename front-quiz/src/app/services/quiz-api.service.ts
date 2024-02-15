import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environnments/environments';
import { Quiz } from '../pages/models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizApiService {

  constructor(private httpClient: HttpClient) { }

  fetchAll(page: number, size: number): Observable<any> {
    let params= new HttpParams();
    params.set('page', page);
    params.set('size', size);

    return this.httpClient.get(environment.backEndQuiz+'/all', {params});
  }

  addQuiz(quiz: Quiz): Observable<any> {
    return this.httpClient.post(environment.backEndQuiz+'/add', quiz);
  }

  updateQuiz(quiz: Quiz): Observable<any> {
    return this.httpClient.put(environment.backEndQuiz+'/update', quiz);
  }

  getQuiz(id: string): Observable<any> {
    return this.httpClient.get(environment.backEndQuiz+'/get/'+id);
  }

  deleteQuiz(id: string): Observable<any> {
    return this.httpClient.delete(environment.backEndQuiz+'/delete/'+id);
  }
}
