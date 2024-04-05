import { AbstractControl, ValidatorFn } from "@angular/forms";


// export function MatchValidation(controlName: string, matchingControlName: string): ValidatorFn{
//     return (absControl:AbstractControl)=>{
//         const control = absControl.get(controlName);
//         const matchingControl = absControl.get(matchingControlName);

//         if(matchingControl!.errors && !matchingControl!.errors['confirmedValidator']){
//             return null;
//         }
//         if (control!.value !== matchingControl!.value){
//             const error = { confirmedValidator:'Passwords do not match'};
//             matchingControl!.setErrors(error);
//             return error;
//         }else{
//             matchingControl!.setErrors(null);
//             return null;                               
//         }
//     }

// }
    
export function passwordValidator(control:AbstractControl) : {[key:string]:boolean} | null{
    const password = control.get('password');
    const confirmpassword = control.get('confirmpassword');
    if(password?.pristine || confirmpassword?.pristine) {
        return null;
    }
    return password && confirmpassword && password.value != confirmpassword.value ? 
    {'misMatch' : true}:
    null;
}