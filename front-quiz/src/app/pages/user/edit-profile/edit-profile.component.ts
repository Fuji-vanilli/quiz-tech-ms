import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  competences: string[]= [];
  announcer = inject(LiveAnnouncer);
  
  constructor() {}

  ngOnInit(): void {

  }


  removeComptence(competence: string) {
    const index = this.competences.indexOf(competence);
    if (index >= 0) {
      this.competences.splice(index, 1);

      this.announcer.announce(`removed ${competence}`);
    }
  }

  addCompetence(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.competences.push(value);
    }

    event.chipInput!.clear();
  }

  removeOrganisation(competence: string) {
    const index = this.competences.indexOf(competence);
    if (index >= 0) {
      this.competences.splice(index, 1);

      this.announcer.announce(`removed ${competence}`);
    }
  }
  
}
