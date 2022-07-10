import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { AppComponent } from './app.component';
import { ExamplePageComponent } from './components/example-page/example-page.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PostComponent } from './components/post/post.component';
import { AddPostComponent } from './components/add-post/add-post.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'example',
    pathMatch: 'full',
    component: ExamplePageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'post-view',
    pathMatch: 'full',
    component: AddPostComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExamplePageComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'app-root' }),
    CommonModule,
    NgtUniversalModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { enableTracing: false, initialNavigation: 'enabled' }),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
