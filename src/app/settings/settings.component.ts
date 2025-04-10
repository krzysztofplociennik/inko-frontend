import { Component } from '@angular/core';
import { ExportService } from '../shared/services/export.service';
import { ImportService } from '../shared/services/import.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  uploadedFiles: any[] = [];

  constructor(
    private exportService: ExportService,
    private importService: ImportService,
  ) {}

  exportWithHTML() {
    this.exportService.exportWithHTML();
  }

  exportWithoutHTML() {
    this.exportService.exportWithoutHTML();
  }

  onUpload(event: any) {
    const formData = new FormData();

    event.files.forEach((file: File) => {
        formData.append('files', file);
    });
    this.importFiles(formData);
  }

  importFiles(formData: FormData) {
    this.importService.importFiles(formData);
  }
}
