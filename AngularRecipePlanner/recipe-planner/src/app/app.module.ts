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
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { HomepageComponent } from './homepage/homepage.component'; 
import { FooterComponent } from './footer/footer.component'; 

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
    ProfileComponent,
    RecipePageComponent,
    HomepageComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass :'toast-top-right'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
