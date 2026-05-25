import { Component } from '@angular/core';
import { ExportService } from '../shared/services/export.service';
import { ImportService } from '../shared/services/import.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { getBaseUrl } from '../shared/utils/urlUtils';
import { JwtUtils } from '../shared/utils/jwtUtils';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { ResetService } from '../shared/services/reset.service';
import { ConfirmDialogModule } from "primeng/confirmdialog";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  providers: [
    ConfirmationService
  ],
  imports: [
    HeaderComponent,
    FooterComponent,
    ButtonModule,
    FileUploadModule,
    ProgressSpinnerModule,
    CommonModule,
    ConfirmDialogModule
  ],
})
export class SettingsComponent {

  isUploading = false;
  shouldSpinnerWork: boolean = false;

  uploadedFiles: any[] = [];

  constructor(
    private exportService: ExportService,
    private importService: ImportService,
    private messageService: MessageService,
    private resetService: ResetService,
    private confirmationService: ConfirmationService,
  ) { }

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

  async exportWithHTML() {
    this.shouldSpinnerWork = true;

    try {
      await this.exportService.exportWithHTML();
    } catch (error) {
      console.log('Error while exporting with HTML: ' + error);
    } finally {
      this.shouldSpinnerWork = false;
    }
  }

  async exportWithoutHTML() {
    this.shouldSpinnerWork = true;
    try {
      await this.exportService.exportWithoutHTML();
    } catch (error) {
      console.log('Error while exporting without HTML: ' + error);
    } finally {
      this.shouldSpinnerWork = false;
    }
  }

  async onUpload(event: any) {
    this.isUploading = true;
    this.shouldSpinnerWork = true;

    const token: string | null = JwtUtils.getToken();
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
      this.shouldSpinnerWork = false;
      this.uploadedFiles = [];
    }
  }

  showResetDialog(): void {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.reset();
      },
    });
  }

  reset() {
    this.shouldSpinnerWork = true;

    this.resetService.reset().subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Reset finished successfully.' });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Something happened during the reset.' });
        console.error('error:', err);
      },
      complete: () => {
        this.shouldSpinnerWork = false;
      }
    });
  }
}
