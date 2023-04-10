import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';

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
    private route: ActivatedRoute,
    private fb: FormBuilder ) {


    this.route.params.subscribe(params => {
      this.resetToken = params['token'];
      console.log(this.resetToken);
      this.VerifyToken();
    });
  }


  ngOnInit() {

    this.Init();
  }

  VerifyToken() {
    this.userService
    .ValidPasswordToken({resetToken: this.resetToken})
    .subscribe((res) => {
   if(!res==null){
    this.CurrentState = 'Verified';
   }
   else{
    this.CurrentState = 'noVerified';
   }

  }
    )
  }

  //   this.userService.ValidPasswordToken({ resetToken: this.resetToken }).subscribe(
  //    (res) => {
  //       this.CurrentState = 'Verified';
  //     },
  //     err => {
  //       this.CurrentState = 'NotVerified';
  //     }
  //   );
  // }

  Init() {
    this.ResponseResetForm = this.fb.group(
      {
        resettoken: [this.resetToken],
        newPassword: ['', [Validators.required, Validators.minLength(7)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4)]]

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
    console.log(form.get('confirmPassword'));
    if (form.valid) {
      this.IsResetFormValid = true;
      this.userService.newPassword(this.ResponseResetForm.value).subscribe(
        data => {
          this.ResponseResetForm.reset();

          setTimeout(() => {

            this.router.navigate(['register']);
          }, 3000);
        },

      );
    } else { this.IsResetFormValid = false; }
  }
}

