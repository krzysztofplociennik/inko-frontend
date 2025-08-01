import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [
      HeaderComponent,
      FooterComponent,
      CommonModule,
      ProgressSpinnerModule,
      ButtonModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    providers: [
      AuthService,
      MessageService,
      
    ]
    // standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  shouldSpinnerWork: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    this.errorMessage = '';
    if (this.loginForm.valid) {

      this.shouldSpinnerWork = true;      
      try {
        await this.login();
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        this.shouldSpinnerWork = false;
      }
    }
  }

  private async login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response: AuthResponse) => {
        this.messageService.add({severity:'success', summary:'Success', detail:'You are logged in!'});
        this.authService.setToken(response.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Wrong credentials, try again.'});
        this.errorMessage = 'Login failed: ' + err.error;
        this.clearFormInputs();
      },
    });
  }

  clearFormInputs() {
    this.loginForm.reset();
  }
}
