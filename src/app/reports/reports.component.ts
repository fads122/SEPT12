import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver'; // Import file-saver

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  results: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchExamResults();
  }

  fetchExamResults(): void {
    // Replace with your exam ID logic
    const examId = 1; // Example
    this.http.get<any[]>(`/api/exam-results/${examId}`).subscribe(data => {
      this.results = data;
    });
  }

  downloadCSV(): void {
    const csvData = this.results.map(result => ({
      'Student Name': result.studentName,
      'Score': result.score
    }));

    let csv = 'Student Name,Score\n';
    csvData.forEach(row => {
      csv += `${row['Student Name']},${row['Score']}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    FileSaver.saveAs(blob, 'exam_results.csv'); // Use FileSaver
  }

  printTable(): void {
    const printWindow = window.open('', '', 'height=600,width=800');
    const tableHTML = document.querySelector('table')?.outerHTML || '';

    printWindow?.document.write(`
      <html>
      <head>
        <title>Print Report</title>
        <style>
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
        </style>
      </head>
      <body>
        <h2>Exam Results Report</h2>
        ${tableHTML}
      </body>
      </html>
    `);

    printWindow?.document.close();
    printWindow?.focus();
    printWindow?.print();
  }
}
