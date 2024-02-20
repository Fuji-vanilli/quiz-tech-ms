import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultQuizService {

  dataResult: string[];

  constructor() { 
    this.dataResult= [];
  }
}
