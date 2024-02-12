import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environnments/environments';
import { Category } from '../pages/models/category.model';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  constructor(private httpClient: HttpClient) { }

  fetchAll(page: number, size: number): Observable<any> {
    let params= new HttpParams();
    params.set('page', page);
    params.set('size', size);
    
    return this.httpClient.get(environment.backEndCategory+'/all', { params });
  }

  addCategory(category: Category): Observable<any> {
    return this.httpClient.post(environment.backEndCategory+'/add', category)
  }

  updateCategory(category: Category): Observable<any> {
    return this.httpClient.put(environment.backEndCategory+'/update', category)
  }

  deleteCategory(id: string) : Observable<any> {
    return this.httpClient.delete(environment.backEndCategory+'/delete/'+id);
  }
}
