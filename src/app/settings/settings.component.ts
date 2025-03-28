import { Component } from '@angular/core';
import { ExportService } from '../shared/services/export.service';
import { ImportService } from '../shared/services/import.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  constructor(
    private exportService: ExportService,
    private importService: ImportService
  ) {}

  exportWithHTML() {
    this.exportService.exportWithHTML();
  }

  exportWithoutHTML() {
    this.exportService.exportWithoutHTML();
  }

  importFiles() {
    this.importService.importFiles();
  }
}
