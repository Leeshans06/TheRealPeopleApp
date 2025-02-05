import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { AccountsService } from '../../services/accounts.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css'],
  imports: [
   
     MatFormFieldModule,
     MatInputModule,
     MatButtonModule,
     ReactiveFormsModule,
     CommonModule
  ]
})
export class AddAccountComponent implements OnInit {
  personId!: number;
  addAccountForm!: FormGroup;

  constructor(
      

    private route: ActivatedRoute,
    private router: Router,
    private accountsService: AccountsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    // Get the person ID from the URL
    this.personId = +this.route.snapshot.paramMap.get('id')!;

    // Initialize the form with validation
    this.addAccountForm = this.fb.group({
      accountnumber: ['', Validators.required],
      accounttype: ['', Validators.required],
      balance: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]]  // Ensure balance is a valid number format
    });
  }

  onSubmit() {
    if (this.addAccountForm.valid) {
      const { accountnumber, accounttype, balance } = this.addAccountForm.value;

      // Call the addAccount method from AccountsService
      this.accountsService.addAccount(this.personId, accountnumber, accounttype, balance).subscribe({
        next: (response) => {
          console.log('Account added successfully', response);
          // Optionally navigate back or show a success message
          this.router.navigate([`/Accounts/${this.personId}`]);  // Navigate to the accounts page for the person
        },
        error: (error) => {
          console.error('Error adding account:', error);
          // Handle error case, e.g., show error message to user
        }
      });
    }
  }
}
