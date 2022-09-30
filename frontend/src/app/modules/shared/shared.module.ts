import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalComponent } from './components/modal/modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, ModalComponent, ErrorMessageComponent,],
  imports: [CommonModule, FontAwesomeModule,],
  exports: [HeaderComponent, FooterComponent, ModalComponent, ErrorMessageComponent,],
})
export class SharedModule { }
