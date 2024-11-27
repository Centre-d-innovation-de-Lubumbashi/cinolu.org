import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IEvent } from 'app/shared/utils/types/models.type';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { APIImgPipe } from 'app/shared/pipes/api-img.pipe';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { EventsService } from '../../data-access/events.service';

@Component({
  selector: 'app-program',
  imports: [CommonModule, MatIconModule, MatButtonModule, NgOptimizedImage, APIImgPipe],
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {
  event$: Observable<IAPIResponse<IEvent>>;
  #eventsService = inject(EventsService);
  #activatedRoute = inject(ActivatedRoute);
  #location = inject(Location);

  ngOnInit(): void {
    const id = this.#activatedRoute.snapshot.paramMap.get('id');
    this.event$ = this.#eventsService.getEvent(id);
  }

  back(): void {
    this.#location.back();
  }
}