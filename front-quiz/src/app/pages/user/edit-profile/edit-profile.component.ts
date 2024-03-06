import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  competences: string[]= [];
  announcer = inject(LiveAnnouncer);

  formGroup!: FormGroup;
  user!: User;

  profile!: KeycloakProfile;
  
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    this.keycloakService.loadUserProfile().then(
      profile=> {
        this.profile= profile;
        this.loadUser();
      }
    )

    this.loadFormBuilder();
  }

  loadUser() {
    this.userService.fetchByEmail(this.profile.email).subscribe({
      next: response=> {
        this.user= response.data.user
        console.log('user: ', this.user);
        
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }

  loadFormBuilder() {
    this.formGroup= this.formBuilder.group({
      firstname: this.formBuilder.control(this.user.firstname),
      lastname: this.formBuilder.control(this.user.lastname),
      username: this.formBuilder.control(this.user.username),
      email: this.formBuilder.control(this.user.email),
      competences: this.formBuilder.control(this.user.competences),
      biography: this.formBuilder.control(this.user.biography),
      description: this.formBuilder.control(this.user.description)
    })
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

  update() {
    
  }
  
}
