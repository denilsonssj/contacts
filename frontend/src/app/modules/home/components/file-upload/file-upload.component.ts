import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    },
  ],
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {

  @Input()
  progress!: any;

  onChange!: Function;

  private file: File | null;

  constructor(private host: ElementRef<HTMLInputElement>) {
    this.file = null;
  }

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList): void {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  writeValue(value: null): void {
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    
  }

  ngOnInit(): void {
  }

  private requiredFileType(type: string): Function | null  {
    return function (control: FormControl) {
      const file = control.value;
      if (file) {
        const extension = file.name.split('.')[1].toLowerCase();
        if (type.toLowerCase() !== extension.toLowerCase()) {
          return {
            requiredFileType: true,
          };
        }
      }
      return null;
    }
  }

  /*
  private toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return FormData;
  }

  */

}
