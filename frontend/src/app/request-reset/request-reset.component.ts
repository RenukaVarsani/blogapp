import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent {
  RequestResetForm!: FormGroup;
  forbiddenEmails: any;
  IsvalidForm = true;

  constructor(
    private userService: UsersService,
    private router: Router,
   ) {

  }


  ngOnInit() {

    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }


  RequestResetUser(form:any) {

    console.log(form)

    if (form.valid) {

      this.IsvalidForm = true;
      this.userService.requestReset(this.RequestResetForm.value).subscribe(
        data => {
          this.RequestResetForm.reset();
          //  this.router.navigate(['register']);
          })


        }
        else{
          this.IsvalidForm = false;
        }
    }
    }

