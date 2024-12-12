import { Route } from '@angular/router';
import { auhtRoutes } from './auth/auth.routes';
import { eventsRoutes } from './events/events.routes';
import { landingRoutes } from './landing/landing.routes';
import { programsRoutes } from './programs/programs.routes';
import { profileRoutes } from './profile/profile.routes';
import { ventureRoutes } from './ventures/ventures.routes';

export const appRoutes: Route[] = [
  { path: 'programs', loadChildren: () => programsRoutes },
  { path: 'events', loadChildren: () => eventsRoutes },
  { path: 'ventures', loadChildren: () => ventureRoutes },
  { path: 'me', loadChildren: () => profileRoutes },
  { path: '', loadChildren: () => landingRoutes },
  { path: '', loadChildren: () => auhtRoutes },
  { path: '**', loadChildren: () => landingRoutes }
];
