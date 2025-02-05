import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PeopleService } from '../services/people.service';
@Component({
  selector: 'app-edit-person-dialog',
  templateUrl: './edit-person-dialog.component.html',
  styleUrls: ['./edit-person-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule, // Import for formGroup
  ],
})
export class EditPersonDialogComponent {
  editForm: FormGroup;

  constructor(
   private peopleService:PeopleService,
    private dialogRef: MatDialogRef<EditPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      id: [data?.id || null], // Ensure ID is stored
      name: [data?.name || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],      
      surname: [data?.surname || '', Validators.required],
      idnumber: [data?.idNumber || '', Validators.required],
      accountnumber: [data?.accountNumber || '', Validators.required]
    });
  }

  onSubmit() {
    if (this.editForm.invalid) return;

    const personData = this.editForm.value; // Get form data
  
    if (this.data) {
      // Existing person, update
      this.updatePerson(personData);
    } else {
      // New person, add
      this.addPerson(personData);
    }
  }

  onCancel() {
    this.dialogRef.close(); // Close dialog without saving
    return false;
  }
  addPerson(person: any) {
    this.peopleService.addPerson(person.name,person.email,person.surname,person.idnumber,person.accountnumber).subscribe(response => {
      console.log('Person added:', response);
      this.dialogRef.close(response); // Close dialog and return data
    }, error => {
      console.error('Error adding person:', error);
    });
  }
  
  updatePerson(person: any) {
    this.peopleService.updatePerson(person.id,person.name,person.email,person.surname,person.idnumber,person.accountnumber).subscribe(response => {
      console.log('Person updated:', response);
      this.dialogRef.close(response); // Close dialog and return data
    }, error => {
      console.error('Error updating person:', error);
    });
  }
}