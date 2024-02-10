import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environnments/environments';
import { Category } from '../pages/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  constructor(private httpClient: HttpClient) { }

  fetchAll(): Observable<any> {
    return this.httpClient.get(environment.backEndCategory+'/all');
  }

  addCategory(category: Category): Observable<any> {
    return this.httpClient.post(environment.backEndCategory+'/add', category)
  }
}
