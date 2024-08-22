import { Component, HostListener, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ILink } from './types/link.interface';
import { FormsModule } from '@angular/forms';
import { IUser } from '../types/models.interface';
import { selectUser } from '../auth/data-access/auth.reducers';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, FormsModule],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {
  user$: Observable<IUser | null>;
  isOpen = false;
  private _store: Store = inject(Store);
  private _router: Router = inject(Router);

  constructor() {
    this.user$ = this._store.pipe(select(selectUser));
  }

  commonLinks: ILink[] = [
    {
      name: 'Accueil',
      path: '/',
      type: 'normal'
    }
  ];

  authLinks: ILink[] = [
    {
      name: 'Connexion',
      path: '/sign-in',
      type: 'normal'
    },
    {
      name: 'Inscription',
      path: '/sign-up',
      type: 'primary'
    }
  ];

  unAuthenticatedUserLinks: ILink[] = [...this.commonLinks, ...this.authLinks];

  trimName(name: string): string {
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  }

  openNavbar(): void {
    this.isOpen = true;
  }

  signOut(): void {
    this._router.navigate(['/sign-out']);
  }

  closeNavbar(): void {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const isNavbar = target.closest('.navbar');
    if (!isNavbar) this.isOpen = false;
  }
}
