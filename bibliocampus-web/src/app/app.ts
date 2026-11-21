import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Entete } from './layout/entete/entete';
import { PiedDePage } from './layout/pied-de-page/pied-de-page';
import { ToastContainer } from './core/toast-container/toast-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Entete, PiedDePage, ToastContainer],
  template: `
    <app-entete />
    <main class="min-h-[70vh]"><router-outlet /></main>
    <app-pied-de-page />
    <app-toast-container />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
