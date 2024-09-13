import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { NgOptimizedImage } from '@angular/common';
import { TopbarComponent } from '../../../core/topbar/topbar.component';
import { environment } from 'environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'app/core/auth/auth.service';
import { Subscription } from 'rxjs';
import { team } from 'app/modules/landing/data/team';

@Component({
  selector: 'auth-sign-in',
  templateUrl: './sign-in.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    RouterLink,
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgOptimizedImage,
    TopbarComponent
  ]
})
export class AuthSignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  isLoading = false;
  error = null;
  team = team;
  private _authService = inject(AuthService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _subscription: Subscription | null = null;

  private resetState(): void {
    this.error = null;
    this.isLoading = false;
    this.signInForm.enable();
  }

  private enableLoading(): void {
    this.isLoading = true;
    this.signInForm.disable();
  }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      email: ['musanziwilfried@gmail.com', [Validators.required, Validators.email]],
      password: ['12345678', Validators.required]
    });
  }

  signIn(): void {
    if (this.signInForm.invalid) return;
    this.enableLoading();
    this._subscription = this._authService.signIn(this.signInForm.value).subscribe({
      next: ({ access_token }) => {
        this.resetState();
        this._authService.storeToken(access_token);
        window.location.replace(environment.accountUrl + 'sign-in?token=' + access_token);
      },
      error: (error: HttpErrorResponse) => {
        this.resetState();
        this.error = error.error.message;
        this.signInForm.enable();
      }
    });
  }

  signinWithGoogle(): void {
    window.location.replace(environment.apiUrl + 'auth/sign-in');
  }

  ngOnDestroy(): void {
    if (this._subscription) this._subscription.unsubscribe();
  }
}
