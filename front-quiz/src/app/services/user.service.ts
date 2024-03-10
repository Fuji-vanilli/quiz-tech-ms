import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environnments/environments';
import { User } from '../pages/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userTemp!: User;

  constructor(private httpClient: HttpClient) { }

  fetchAll(): Observable<any> {
    return this.httpClient.get(environment.backEndUser+'/all');
  }

  addUser(user: User): Observable<any> {
    return this.httpClient.post(environment.backEndUser+'/add', user);
  }

  fetchByEmail(email: any): Observable<any> {
    return this.httpClient.get(environment.backEndUser+'/get/'+email);
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put(environment.backEndUser+'/update', user);
  }

  deleteUser(email: any): Observable<any> {
    return this.httpClient.delete(environment.backEndUser+'/delete/'+email);
  }

  uploadProfileImage(file: File, emailUser: any): Observable<any> {
    const formData= new FormData();
    formData.append('file', file, file.name);
    formData.append('emailUser', emailUser)

    return this.httpClient.patch(environment.backEndUser+'/add-image-profile', formData)
  }

  subscribe(emailToSubscribe: any, emailSubscriber: any): Observable<any> {
    const body= {
      emailSubscriber: emailSubscriber,
      emailToSubscribe: emailToSubscribe
    }
    return this.httpClient.patch(environment.backEndUser+'/subscribe', body)
  }

  unsubscribe(emailToSubscribe: any, emailSubscriber: any): Observable<any> {
    const body= {
      emailSubscriber: emailSubscriber,
      emailToSubscribe: emailToSubscribe
    }
    return this.httpClient.patch(environment.backEndUser+'/unsubscribe', body)
  }

  addRole(email: any, role: any): Observable<any> {
    const body= {
      email: email,
      role: role
    };

    return this.httpClient.patch(environment.backEndUser+'/add-role', body);
  }

  removeRole(email: any, role: any): Observable<any> {
    const body= {
      email: email,
      role: role
    };

    return this.httpClient.patch(environment.backEndUser+'/remove-role', body);
  }
}
