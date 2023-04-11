import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent {

  ResponseResetForm!: FormGroup;
  resetToken!: null;
  IsResetFormValid = true;
  CurrentState: any;
  data:any;

  constructor(
    private userService: UsersService,
    private router: Router,
    private Toast:ToastrService,
    private route: ActivatedRoute,
    private fb: FormBuilder ) {


    this.route.params.subscribe(params => {
      this.resetToken = params['token'];
      console.log(this.resetToken);
      this.VerifyToken(this.resetToken);
    });
  }


  ngOnInit() {
    this.Init();

  }

  VerifyToken(token : any) {
    this.userService.ValidPasswordToken(token).subscribe((res) => {
      console.log([res].length);


   if([res].length >= 1){
    this.CurrentState = 'Verified';
   }
   else{
    this.CurrentState = 'noVerified';
   }

  }
    )
  }

  Init() {
    this.ResponseResetForm = this.fb.group(
      {
        resettoken: [this.resetToken],
        newPassword: ['', [Validators.required, Validators.minLength(7)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(7)]]

      }
    );
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls['newPassword'].value;
    const confirm_password = passwordFormGroup.controls['confirmPassword'].value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true
      };
    }
    return null;
  }


  ResetPassword(form:any) {
    if (form.valid) {
      this.IsResetFormValid = true;
      this.userService.newPassword(this.ResponseResetForm.value,this.resetToken).subscribe(
        res => {
          console.log(res);
          this.Toast.info('','Password Updated' ,{
            timeOut: 1000,
          });

        },

      );
    } else { this.IsResetFormValid = false; }
  }
}

