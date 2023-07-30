import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GettingStartedComponent } from 'projects/ngx-tippy-demo/src/pages/getting-started';
import { UsageComponent } from 'projects/ngx-tippy-demo/src/pages/usage';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'getting-started',
    pathMatch: 'full',
  },
  {
    path: 'getting-started',
    component: GettingStartedComponent,
  },
  {
    path: 'usage',
    component: UsageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
