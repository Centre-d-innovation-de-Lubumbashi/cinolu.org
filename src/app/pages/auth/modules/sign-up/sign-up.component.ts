import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { NgOptimizedImage } from '@angular/common';
import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';
import { AuthService } from 'app/pages/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { team } from 'app/pages/landing/data/team';

@Component({
  standalone: true,
  selector: 'auth-sign-up',
  templateUrl: './sign-up.component.html',
  animations: fuseAnimations,
  imports: [
    RouterLink,
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    NgOptimizedImage
  ]
})
export class AuthSignUpComponent implements OnInit, OnDestroy {
  signUpForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  team = team;
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _subscription: Subscription | null = null;

  private resetState(): void {
    this.error = null;
    this.isLoading = false;
    this.signUpForm.enable();
  }

  private enableLoading(): void {
    this.isLoading = true;
    this.signUpForm.disable();
  }

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', [Validators.required]]
    });
  }

  signUp(): void {
    if (this.signUpForm.invalid) return;
    this.enableLoading();
    this._subscription = this._authService.signUp(this.signUpForm.value).subscribe({
      next: () => {
        this.resetState();
        this._router.navigate(['/confirmation-required'], {
          queryParams: { email: this.signUpForm.value.email }
        });
      },
      error: (error: HttpErrorResponse) => {
        this.resetState();
        this.error = error.error.message;
        this.signUpForm.enable();
      }
    });
  }

  signUpWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-up');
  }

  ngOnDestroy(): void {
    if (this._subscription) this._subscription.unsubscribe();
  }
}