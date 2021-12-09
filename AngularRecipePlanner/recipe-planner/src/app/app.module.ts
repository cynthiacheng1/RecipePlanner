import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { PantryComponent } from './pantry/pantry.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    AboutComponent,
    AddrecipeComponent,
    PantryComponent,
    SearchComponent,
    ListComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
