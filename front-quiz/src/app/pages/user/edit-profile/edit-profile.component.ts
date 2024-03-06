import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  competences: string[]= [];
  announcer = inject(LiveAnnouncer);

  formGroup!: FormGroup;
  user!: User;

  profile!: KeycloakProfile;

  selectedFile!: File;
  filename: string= '';
  
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private keycloakService: KeycloakService,
              private snackBar: MatSnackBar,
              private route: Router) {}

  ngOnInit(): void {
    this.user= this.userService.userTemp;
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
      firstname: this.formBuilder.control(this.user.firstname),
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
      this.filename= this.selectedFile.name;
    }
  }

  uploadProfileImage() {
    this.userService.uploadProfileImage(this.selectedFile, this.profile.email).subscribe({
      next: response=> {
        this.snackBar.open("Profile image uploaded!", "OK", {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 5000
        })
      }
    })
  }

  updateUser() {
    const userData: User= {
      firstname: this.formGroup.value.firstname,
      lastname: this.formGroup.value.lastname,
      username: this.profile.username,
      email: this.profile.email,
      competences: this.competences,
      description: this.formGroup.value.description,
      biography: this.formGroup.value.biography
    }

    this.userService.updateUser(userData).subscribe({
      next: response=> {
        Swal.fire("Updated", "Profile updated successfully!", "success");
        this.route.navigateByUrl('/user/profile')
      },
      error: err=> {
        console.log(err);
        
      }
    })

  }
}
