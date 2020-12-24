import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorDashboardComponent } from './layout/backend/instructor-dashboard/instructor-dashboard.component';

import { MainComponent } from './layout/frontend/main/main.component';
import { Main2Component } from './layout/frontend/main2/main2.component';
import { InstructorHomeComponent } from './pages/backend/instructor-home/instructor-home.component';
import { HomeComponent } from './pages/frontend/home/home.component';
import { ListTopicByCategoryComponent } from './pages/frontend/list-topic-by-category/list-topic-by-category.component';
import { TopicDescriptionComponent } from './pages/frontend/topic-description/topic-description.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'category/:id',
        component: ListTopicByCategoryComponent
      },
    ],
  },
  {
    path: '',
    component: Main2Component,
    children: [
      {
        path: 'topic/:id',
        component: TopicDescriptionComponent
      }
    ],
  },
  {
    path: 'instructor',
    component: InstructorDashboardComponent,
    children: [
      {
        path: '',
        component: InstructorHomeComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
