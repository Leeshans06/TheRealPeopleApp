import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TransactionsService } from '../../services/transactions.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-transactions',
  templateUrl: './add-transactions.component.html',
  styleUrls: ['./add-transactions.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AddTransactionsComponent implements OnInit {
  addTransactionForm!: FormGroup;
  accountId!: number;
  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    // Get the person ID from the URL
    this.accountId = +this.route.snapshot.paramMap.get('id')!;

    this.addTransactionForm = this.fb.group({
      transactionId: [{ value: '', disabled: true }], // Read-only field
      transactionType: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: [''],
      transactionDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
  
      const formData = this.addTransactionForm.getRawValue(); // Get form data including disabled fields

      this.transactionService.addTransaction(this.accountId, formData.transactionType, formData.amount, formData.description ).subscribe({
        next: (response) => {
          console.log('Transaction added successfully', response);
          this.router.navigate(['/transactions']); // Navigate to transaction list page
        },
        error: (error) => {
          console.error('Error adding transaction:', error);
        }
      });
    
  }
}
