import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class Signup {

  signupForm: FormGroup;
  responseMessage: string = '';

  // ✅ show/hide password
  showPassword: boolean = false;

  // ✅ store selected file
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {

    this.signupForm = this.fb.group({

      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$')
      ]],

      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],

      gender: ['', Validators.required],

      country: ['', Validators.required],

      terms: [false, Validators.requiredTrue],

      file: [null, Validators.required]   // ✅ NEW FILE FIELD
    });
  }

  // ✅ toggle password visibility
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // ✅ handle file selection
  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      // ✅ update form value
      this.signupForm.patchValue({
        file: file
      });
    }
  }

  onSubmit() {

    this.signupForm.markAllAsTouched();

    if (this.signupForm.valid) {

      const data = this.signupForm.value;

      console.log("Form Data:", data);
      console.log("Uploaded File:", this.selectedFile);

      if (data.email === 'admin@gmail.com') {
        this.responseMessage = "Signup Failed ❌ Email already exists";
      } else {
        this.responseMessage = "Signup Successful ✅";
        this.signupForm.reset();

        // reset extras
        this.showPassword = false;
        this.selectedFile = null;
      }

    } else {
      this.responseMessage = "Please fill all fields correctly ❌";
    }
  }
}