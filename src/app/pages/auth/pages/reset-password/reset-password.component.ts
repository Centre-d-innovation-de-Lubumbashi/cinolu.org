import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { team } from 'app/pages/landing/utils/data/team';
import { AuthService } from '../../auth.service';
import { MutationResult } from '@ngneat/query';
import { IUser } from '../../../../common/types/models.type';
import { TopbarComponent } from '../../../../common/components/topbar/topbar.component';
import { AuthCardComponent } from '../../slots/auth-card/auth-card.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  animations: fuseAnimations,
  standalone: true,
  imports: [
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    CommonModule,
    NgOptimizedImage,
    TopbarComponent,
    AuthCardComponent
  ]
})
export class AuthResetPasswordComponent {
  #token = inject(ActivatedRoute).snapshot.queryParams['token'];
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  resetPasswordForm: FormGroup;
  team = team;
  resetPassword: MutationResult<IUser, Error, unknown>;

  constructor() {
    this.resetPasswordForm = this.#formBuilder.group({
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
    this.resetPassword = this.#authService.resetPassword();
  }

  onResetPassword(): void {
    if (this.resetPasswordForm.invalid) return;
    this.resetPasswordForm.disable();
    const { password, password_confirm } = this.resetPasswordForm.value;
    const payload = { token: this.#token, password, password_confirm };
    this.resetPassword.mutate(payload);
    this.resetPasswordForm.enable();
  }
}