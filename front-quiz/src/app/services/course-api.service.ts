import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../pages/models/course.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environnments/environments';

@Injectable({
  providedIn: 'root'
})
export class CourseApiService {

  constructor(private httpClient: HttpClient) { }

  addCourse(course: Course): Observable<any> {
    return this.httpClient.post(environment.backEndCourse+'/add', course);
  }

  fetchAll(): Observable<any> {
    return this.httpClient.get(environment.backEndCourse+'/all');
  }

  getById(courseId: string): Observable<any> {
    return this.httpClient.get(environment.backEndCourse+'/get/'+courseId);
  }

  delete(courseId: string): Observable<any> {
    return this.httpClient.delete(environment.backEndCourse+'/delete/'+courseId);
  }
}
