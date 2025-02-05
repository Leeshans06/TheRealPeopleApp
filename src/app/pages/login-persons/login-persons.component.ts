import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // ✅ Import Router

@Component({
  selector: 'app-login-persons',
  standalone: true, // ✅ Standalone component
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login-persons.component.html',
  styleUrls: ['./login-persons.component.css']
})
export class LoginPersonsComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loginSuccessful: boolean = false;

  constructor(private userService: UserService, private router: Router) {} 

  login() {
    this.errorMessage = ''; 
    this.loginSuccessful = false; 

    this.userService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        if(response == true){
          this.loginSuccessful = true; 
          localStorage.setItem('user', JSON.stringify(response));
          // ✅ Redirect to the account page
          this.router.navigate(['/people']);
        }
        else{
          this.errorMessage = 'Invalid username or password.';
        }
      },
      error: (error) => {
        console.error('Login failed:', error);

        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else if (error.status === 0) {
          this.errorMessage = 'Unable to connect to server. Please check your network connection.';
        } else if (error.error && error.error.message) { 
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }
}
