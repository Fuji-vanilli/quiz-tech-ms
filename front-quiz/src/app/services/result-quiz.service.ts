import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultQuizService {

  dataResult: Map<any, string>;
  
  constructor() { 
    this.dataResult= new Map<any, string>();
  }
}
