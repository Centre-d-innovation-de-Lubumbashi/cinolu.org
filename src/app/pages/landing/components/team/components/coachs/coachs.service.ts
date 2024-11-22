import { inject, Injectable } from '@angular/core';
import { IUser } from 'app/common/types/models.type';
import { Observable } from 'rxjs';
import { APIService } from '@core/services/api/api.service';
import { IAPIResponse } from '@core/services/api/types/api-response.type';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  #apiService = inject(APIService);

  getCoachs(): Observable<IAPIResponse<IUser[]>> {
    return this.#apiService.fetchData<IUser[]>('users/coachs');
  }
}
