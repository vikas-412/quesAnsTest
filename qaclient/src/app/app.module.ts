import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ServerService } from "./services/server.service"
import { CheckRoleService } from "./services/check-role.service";
import { AddEditQuesAnsService } from "./services/add-edit-ques-ans.service";

import { AppComponent } from './app.component';
import { AddQuesAnsComponent } from './components/add-ques-ans/add-ques-ans.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';

import appRoutes from './app.routing';
import { TestPaperComponent } from './components/test-paper/test-paper.component';
import { ScoreDisplayComponent } from './components/score-display/score-display.component';

import { AuthGuard } from './services/guards/AuthorizationGuard/auth.guard';
import { TestStartedGuard } from './services/guards/TestStartedGuard/test-started.guard';
import { httpInterceptorProviders } from './services/interceptor';
import { StartTestComponent } from './components/start-test/start-test.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    AddQuesAnsComponent,
    TestPaperComponent,
    ScoreDisplayComponent,
    StartTestComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutes
  ],
  providers: [
    ServerService,
    CheckRoleService,
    AddEditQuesAnsService,
    httpInterceptorProviders,
    AuthGuard,
    TestStartedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
