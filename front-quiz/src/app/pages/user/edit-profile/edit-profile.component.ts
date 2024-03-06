import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  selectedFile!: File;
  
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private keycloakService: KeycloakService,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.keycloakService.loadUserProfile().then(
      profile=> {
        this.profile= profile;
        this.loadUser();
      }
    )

    this.initFormGroup();
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

  initFormGroup() {
    this.formGroup= this.formBuilder.group({
      firstname: this.formBuilder.control(''),
      lastname: this.formBuilder.control(''),
      username: this.formBuilder.control(''),
      email: this.formBuilder.control(''),
      competences: this.formBuilder.control(''),
      biography: this.formBuilder.control(''),
      description: this.formBuilder.control('')
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

  onFileSelected(event: Event) {
    const target= event.target as HTMLInputElement;
    if (target.files && target.files.length> 0) {
      this.selectedFile= target.files[0];
    }
  }

  uploadProfileImage() {
    this.userService.uploadProfileImage(this.selectedFile, this.profile.email).subscribe({
      next: response=> {
        this.snackBar.open("Profile image uploaded!", "OK")
      }
    })
  }

  update() {

  }
  
}
