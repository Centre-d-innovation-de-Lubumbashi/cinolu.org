import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IUser } from 'app/common/types/models.type';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from '@core/auth/auth.reducers';
import { authLinks, commonLinks } from './links';
import { APIImgPipe } from '../../pipes/api-img.pipe';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, RouterModule, FormsModule, APIImgPipe, NgOptimizedImage],
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  isOpen = signal(false);
  accountUrl = environment.accountUrl;
  commonLinks = commonLinks;
  authLinks = authLinks;
  user$: Observable<IUser>;
  #store = inject(Store);

  ngOnInit(): void {
    this.user$ = this.#store.pipe(select(selectUser));
  }

  toogleMenu(): void {
    this.isOpen.update((value) => !value);
  }

  trimName(name: string): string {
    return name.length > 15 ? name.substring(0, 15) + '...' : name;
  }
}
