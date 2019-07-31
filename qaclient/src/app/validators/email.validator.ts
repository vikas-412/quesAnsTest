import { AbstractControl } from '@angular/forms';

export function ValidateEmail(control : AbstractControl){
    const emailRegex = new RegExp("^.+\@.+\..+$");
    const email = control.value;
    // console.log(email, emailRegex.test(email));
    if (emailRegex.test(email)){
        return null
    } else {
        return {
            emailError : {
                providedEmail : email
            }
        }
    }
}