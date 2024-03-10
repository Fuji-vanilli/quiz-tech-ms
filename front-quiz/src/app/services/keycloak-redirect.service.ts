import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeycloakRedirectService {
  private keycloakUrl = 'http://localhost:8080/realms/quiz-tech/protocol/openid-connect/auth';
  private clientId = 'quiz-front';
  private clientSecret = 'uOnNz6vJoA73EpzGi7CZIUbq4x9lKtJu'; // Assurez-vous de sécuriser ce secret
 
  constructor(private http: HttpClient) { }
 
  authenticateWithUsernameAndPassword(username: string, password: string): Observable<any> {
     const body = new URLSearchParams();
     body.set('grant_type', 'password');
     body.set('client_id', this.clientId);
     body.set('client_secret', this.clientSecret);
     body.set('username', username);
     body.set('password', password);
 
     return this.http.post(this.keycloakUrl, body.toString(), {
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       }
     });
  }
}
