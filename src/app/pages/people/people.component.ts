import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Needed for directives like *ngFor
import { PeopleService } from '../../services/people.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditPersonDialogComponent } from '../../edit-person-dialog/edit-person-dialog.component';
import { Router } from '@angular/router'; // ✅ Import Router
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule],  // Ensure MatDialogModule is imported
})
export class PeopleComponent implements OnInit {
  people: any[] = [];

  constructor(private peopleService: PeopleService, private dialog: MatDialog, private router: Router) {}  // Inject MatDialog properly

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople() {
    this.peopleService.getPeople().subscribe((data) => {
      this.people = data;
    });
  }
  addPeople(person: any) {
    console.log('Add Person');
    this.openEditDialog(null);
  }

  editPeople(person: any) {
    console.log('Edit:', person);
    this.openEditDialog(person);
  }

  openEditDialog(person: any) {  // Fixed incorrect placement of method
    const dialogRef = this.dialog.open(EditPersonDialogComponent, {
      width: '400px',
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Person updated:', result);
        this.loadPeople();  // Refresh the list after update
      }
    });
  }

  deletePeople(person: any) {
    console.log('Delete:', person);
    this.peopleService.deletePeople(person);

    this.peopleService.deletePeople(person).subscribe((person) => {data: person});
    // Implement API call to delete the person
  }

  selectPeople(person: any) {
    console.log('Selected:', person);
    this.router.navigate(['/account', person.id]);
    // Implement logic for selection (e.g., pass data to another component)
  }
}