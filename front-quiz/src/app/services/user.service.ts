import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environnments/environments';
import { User } from '../pages/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  fetchAll(): Observable<any> {
    return this.httpClient.get(environment.backEndUser+'/all');
  }

  addUser(user: User): Observable<any> {
    return this.httpClient.post(environment.backEndUser+'/add', user);
  }

  fetchByEmail(email: string): Observable<any> {
    return this.httpClient.get(environment.backEndUser+'/get/'+email);
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put(environment.backEndUser+'/update/', user);
  }

  deleteUser(email: string): Observable<any> {
    return this.httpClient.delete(environment.backEndUser+'/delete/'+email);
  }
}
