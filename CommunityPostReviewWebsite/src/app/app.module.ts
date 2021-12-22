import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { ApprovedComponent } from './approved/approved.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductListComponent } from './product-list/product-list.component';
import { productDetailsComponent } from './Product-details/product-details.component';
import { AddReviewComponent } from './add-review/add-review.component';

@NgModule({
  declarations: [
    AppComponent,
    AddReviewComponent,
    ProductListComponent,
    ApprovedComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    productDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
