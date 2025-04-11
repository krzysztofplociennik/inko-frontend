import { Component } from '@angular/core';
import { ExportService } from '../shared/services/export.service';
import { ImportService } from '../shared/services/import.service';
import { MessageService } from 'primeng/api';
import { getBaseUrl } from '../shared/utils/urlUtils';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  isUploading = false;

  uploadedFiles: any[] = [];

  constructor(
    private exportService: ExportService,
    private importService: ImportService,
    private messageService: MessageService,
  ) {}

  ngOnChanges() {
    this.toggleBodyScroll(this.isUploading);
  }
  
  ngOnDestroy() {
    this.toggleBodyScroll(false);
  }

  toggleBodyScroll(disable: boolean) {
    const body = document.body;
    if (disable) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }

  exportWithHTML() {
    this.exportService.exportWithHTML();
  }

  exportWithoutHTML() {
    this.exportService.exportWithoutHTML();
  }
  
  async onUpload(event: any) {
    this.isUploading = true;

    const token: string | null = localStorage.getItem('token');
    const url: string = getBaseUrl() + '/import/single';

    try {
      for (const file of event.files) {
        const formData = new FormData();
        formData.append('file', file);
        const wasRequestSuccess = await this.importService.importFile(formData, token, url);
        if (!wasRequestSuccess) {
          return;
        }
      }
      this.messageService.add({ severity: 'success', summary: 'The files have been uploaded successfully!' });
    } finally {
      this.isUploading = false;
    }
  }
}
