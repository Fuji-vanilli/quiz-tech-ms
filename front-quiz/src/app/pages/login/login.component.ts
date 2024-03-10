import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakRedirectService } from 'src/app/services/keycloak-redirect.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  @ViewChild('container') container!: ElementRef;
  formGroup!: FormGroup;

  constructor(private keycloakService: KeycloakRedirectService,
              private formBuilder: FormBuilder,
              private route: Router) {}

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.formGroup= this.formBuilder.group({
      username: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required)
    })
  }

  toggleSignUpMode() {
     this.container.nativeElement.classList.add('sign-up-mode');
  }
 
  toggleSignInMode() {
     this.container.nativeElement.classList.remove('sign-up-mode');
  }

  login() {
    const username= this.formGroup.value.username;
    const password= this.formGroup.value.password;

    this.keycloakService.authenticateWithUsernameAndPassword(username, password).subscribe({
      next: response=>{
        this.route.navigateByUrl('/user');
      },
      error: err=> {
        console.log(err);
        
      }
    })
  }
}
