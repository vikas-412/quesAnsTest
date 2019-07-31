import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {SendInterceptor} from './send.interceptor';
import { ReceiveInterceptor} from './receive.interceptor';

export const httpInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS, useClass : SendInterceptor, multi : true
    },
    {
        provide: HTTP_INTERCEPTORS, useClass: ReceiveInterceptor, multi: true
        
    }
]