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


  onFileSelected(event: Event) { 
    const target= event.target as HTMLInputElement;
    if (target.files && target.files.length> 0) {
      this.selectedFile= target.files[0];
    }
    this.selectedFileName= this.selectedFile.name;
    this.fileSelected= true;
  }

  onUpload() {
    

  }
}
