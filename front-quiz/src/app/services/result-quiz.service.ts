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

  addResult(result: Result): Observable<any> {
    return this.httpClient.post(environment.backEndResultQuiz+'/add', result);
  }

}
