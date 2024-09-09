import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  tables: string[] = [];
  error: string = '';
  records: any[] = [];
  editingRecord: any = null; // To track which record is being edited
  currentTable: string = ''; // To track the currently viewed table

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadTables();
  }

  loadTables(): void {
    this.adminService.fetchTables().subscribe(
      data => {
        this.tables = data;
      },
      error => {
        this.error = 'An error occurred while fetching tables';
        console.error('Error fetching tables:', error);
      }
    );
  }

  viewTable(tableName: string): void {
    this.currentTable = tableName;
    this.adminService.getAllRecords(tableName).subscribe(
      data => {
        console.log('Fetched records:', data); // Inspect the structure of fetched records
        this.records = data;
      },
      error => {
        this.error = 'An error occurred while fetching records';
        console.error('Error fetching records:', error);
      }
    );
  }



  updateRecord(record: any): void {
    // Exclude id and password from updates
    const { id, password, ...updatedData } = record;

    // Ensure the ID is not undefined
    if (id === undefined) {
      this.error = 'Record ID is missing';
      console.error('Error updating record: Record ID is missing');
      return;
    }

    this.adminService.updateRecord(this.currentTable, id, updatedData).subscribe(
      () => {
        console.log('Record updated successfully');
        // Refresh records to reflect the updated data
        this.viewTable(this.currentTable);
        this.editingRecord = null; // Stop editing after successful update
      },
      error => {
        this.error = 'An error occurred while updating the record';
        console.error('Error updating record:', error);
      }
    );
  }


  deleteRecord(id: any): void {
    console.log('Attempting to delete record with ID:', id); // Debugging statement
    if (id === undefined || id === null) {
      this.error = 'Record ID is missing';
      console.error('Error deleting record: Record ID is missing');
      return;
    }

    // Convert id to a number if necessary
    const numericId = Number(id);
    if (isNaN(numericId)) {
      this.error = 'Invalid Record ID';
      console.error('Error deleting record: Invalid Record ID');
      return;
    }

    this.adminService.deleteRecord(this.currentTable, numericId).subscribe(
      () => {
        this.records = this.records.filter(record => record.id !== numericId);
        console.log('Record deleted successfully');
      },
      error => {
        this.error = 'An error occurred while deleting the record';
        console.error('Error deleting record:', error);
      }
    );
  }




  toggleEdit(record: any): void {
    this.editingRecord = this.editingRecord === record ? null : record;
  }

  isEditing(record: any): boolean {
    return this.editingRecord === record;
  }

  getRecordKeys(record: any): string[] {
    return record ? Object.keys(record) : [];
  }
}
