import { RouterModule, CanActivate } from '@angular/router';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { AddQuesAnsComponent } from './components/add-ques-ans/add-ques-ans.component';
import { TestPaperComponent } from './components/test-paper/test-paper.component';
import { StartTestComponent } from './components/start-test/start-test.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

import { AuthGuard } from './services/guards/AuthorizationGuard/auth.guard';
import { TestStartedGuard } from './services/guards/TestStartedGuard/test-started.guard';

const appRoutes = RouterModule.forRoot([
    {
        path : '',
        redirectTo : 'login',
        pathMatch: 'full'
    },
    {
        path: 'signup',
        component: SignUpComponent,
        canActivate: [TestStartedGuard]        
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [TestStartedGuard]                
    },
    {
        path: 'admin',
        component: AdminPageComponent,
        canActivate: [AuthGuard, TestStartedGuard],
    },
    {
        path: 'add',
        component: AddQuesAnsComponent,
        canActivate: [AuthGuard, TestStartedGuard]        
    },
    {
        path: 'start',
        component: StartTestComponent,
        canActivate: [AuthGuard, TestStartedGuard]        
    },
    {
        path : 'test',
        component: TestPaperComponent,
        canActivate: [AuthGuard]        
    }
])

export default appRoutes;
