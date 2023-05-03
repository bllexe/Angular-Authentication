import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css'],
})
export class UpdatepopupComponent implements OnInit {
  rolelist: any;

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog:MatDialogRef<UpdatepopupComponent>
  ) {}

  editData: any;

  ngOnInit(): void {
    this.service.getAllRole().subscribe((res) => {
      this.rolelist = res;
    });

    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.getByCode(this.data.usercode).subscribe((res) => {
        this.editData = res;
        this.registerForm.setValue({
          id: this.editData.id,
          name: this.editData.name,
          email: this.editData.email,
          password: this.editData.password,
          role: this.editData.role,
          gender: this.editData.gender,
          isactive: this.editData.isactive,
        });
      });
    }
  }

  registerForm = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
  });

  updateUser() {
    if (this.registerForm.valid) {
      this.service
        .updateUser(this.registerForm.value.id, this.registerForm.value)
        .subscribe((res) => {
          this.toastr.success('Updated successfully.');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please Select Role');
    }
  }
}
