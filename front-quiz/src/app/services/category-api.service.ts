import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environnments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  constructor(private httpClient: HttpClient) { }

  fetchAll(): Observable<any> {
    return this.httpClient.get(environment.backEndCategory+"/all");
  }
}
