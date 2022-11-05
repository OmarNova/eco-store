import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorTailorModule } from '@ngneat/error-tailor'
//import { LoginComponent } from './views/login/login.component';
//import { RegisterComponent } from './views/register/register.component';
//import { IndexComponent } from './views/index/index.component';
//import { CartComponent } from './views/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,
    //LoginComponent,
    //RegisterComponent,
    //IndexComponent,
    //CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue:{
          required: 'Campo requerido',
          minlength: ({requiredLength, actualLength}) => 
          `Expect ${requiredLength} but got ${actualLength}`,
          invalidAddress: error => `Address isn't valid`
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
