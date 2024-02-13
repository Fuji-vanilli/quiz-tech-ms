import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environnments/environments';

@Injectable({
  providedIn: 'root'
})
export class QuestionApiService {

  constructor(private httpClient: HttpClient) { }

  fetchAll(page: number, size: number): Observable<any> {
    let params= new HttpParams();
    params.set('page', page);
    params.set('size', size);

    return this.httpClient.get(environment.backEndQuestion+'/all', { params });
  }
}
