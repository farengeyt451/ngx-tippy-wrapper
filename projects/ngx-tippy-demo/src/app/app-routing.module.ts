import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DemoPageComponent } from '@pages/demo-page';
import { GroupedTooltipsComponent } from '@pages/grouped-tooltips';
import { MultipleTooltipsComponent } from '@pages/multiple-tooltips';
import { PlaygroundComponent } from '@pages/playground';
import { ServiceComponent } from '@pages/service';
import { SingletonComponent } from '@pages/singleton';
import { AppContentComponent } from 'projects/ngx-tippy-demo/src/app/pages/app-content';
import { GettingStartedComponent } from 'projects/ngx-tippy-demo/src/app/pages/getting-started';
import { PropsComponent } from 'projects/ngx-tippy-demo/src/app/pages/props';
import { UsageComponent } from 'projects/ngx-tippy-demo/src/app/pages/usage';

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
  {
    path: 'applying-props',
    component: PropsComponent,
  },
  {
    path: 'applying-content',
    component: AppContentComponent,
  },
  {
    path: 'working-with-service',
    component: ServiceComponent,
  },
  {
    path: 'demo',
    component: DemoPageComponent,
  },
  {
    path: 'grouped-tooltips',
    component: GroupedTooltipsComponent,
  },
  {
    path: 'multiple-tooltips',
    component: MultipleTooltipsComponent,
  },
  {
    path: 'singleton',
    component: SingletonComponent,
  },
  {
    path: 'playground',
    component: PlaygroundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      scrollOffset: [0, 100],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
