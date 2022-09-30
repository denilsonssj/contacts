import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { NewPersonComponent } from './components/new-person/new-person.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DeletePersonComponent } from './components/delete-person/delete-person.component';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

const maskConfig: Partial<IConfig> = {
  validation: false,
  showMaskTyped: true,
};

@NgModule({
  declarations: [HomeComponent, NewPersonComponent, EditPersonComponent, FileUploadComponent, DeletePersonComponent,],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot(maskConfig),
    SharedModule,
  ],
  providers: [],
  exports: [HomeComponent,],
})
export class HomeModule { }
