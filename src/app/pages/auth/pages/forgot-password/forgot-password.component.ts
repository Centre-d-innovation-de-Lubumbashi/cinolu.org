import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { Animations } from '@core/animations';
import { AlertComponent } from '@core/components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@core/auth/auth.service';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { Observable } from 'rxjs';
import { IAPIResponse } from '@core/services/api/types/api-response.type';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: Animations,
  imports: [
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule,
    CommonModule,
    AuthCardComponent
  ]
})
export class AuthForgotPasswordComponent {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  forgotPasswordForm: FormGroup;
  forgotPassword$: Observable<IAPIResponse<void>>;

  constructor() {
    this.forgotPasswordForm = this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  disbleForm(isSucess: boolean): void {
    if (isSucess) this.forgotPasswordForm.disable();
  }

  submitForgotPassword(): void {
    if (!this.forgotPasswordForm.invalid) {
      this.forgotPassword$ = this.#authService.forgotPassword(this.forgotPasswordForm.value);
    }
  }
}
