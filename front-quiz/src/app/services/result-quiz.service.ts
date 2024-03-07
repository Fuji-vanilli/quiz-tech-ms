import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environnments/environments';
import { Result } from '../pages/models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultQuizService {

  dataResult: string[];

  constructor(private httpClient: HttpClient) { 
    this.dataResult= [];
  }
  
  fetchAll(): Observable<any> {
    return this.httpClient.get(environment.backEndResultQuiz+'/all');
  }

  addResult(result: Result): Observable<any> {
    return this.httpClient.post(environment.backEndResultQuiz+'/add', result);
  }

  fetchResult(id: any): Observable<any> {
    return this.httpClient.get(environment.backEndResultQuiz+'/get/'+id);
  }

  fetchByEmailUser(emailUser: any): Observable<any> {
    return this.httpClient.get(environment.backEndResultQuiz+'/getByEmailUser/'+emailUser);
  } 

  updateRate(rate: any): Observable<any> {
    return this.httpClient.patch(environment.backEndResultQuiz+'/update', rate);
  }

  deleteResult(quizId: any, emailUser: any, frequency: any): Observable<any> {
    return this.httpClient.delete(environment.backEndResultQuiz+'/delete/'+quizId+'/'+emailUser+'/'+frequency);
  }

  getResultSummary(emailUser: any): Observable<any> {
    return this.httpClient.get(environment.backEndResultQuiz+'/resultSummary/'+emailUser);
  }

}
