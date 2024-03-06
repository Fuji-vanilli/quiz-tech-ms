import { Component } from '@angular/core';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent {
  
  addOnBlur = true;
  tags: string[] = [];
  selectedFile!: File;
  selectedFileName= '';
  videoId= '';
  fileSelected: boolean= false;
  videoUrl: string= '';
  thumbnailUrl: string= '';

}
