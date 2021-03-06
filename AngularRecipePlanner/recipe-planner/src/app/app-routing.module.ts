import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddrecipeComponent } from './addrecipe/addrecipe.component';
import { LoginComponent } from './login/login.component';
import { PantryComponent } from './pantry/pantry.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchComponent } from './search/search.component';
import { RecipeComponent } from './recipe/recipe.component';
import { BananapancakesComponent } from './bananapancakes/bananapancakes.component';
import { VegetablesoupComponent } from './vegetablesoup/vegetablesoup.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'addrecipe', component: AddrecipeComponent, pathMatch: 'full' },
  { path: 'home', component: HomepageComponent, pathMatch: 'full' },
  { path: 'pantry', component: PantryComponent, pathMatch: 'full'},
  { path: 'search', component: SearchComponent, pathMatch: 'full'},
  { path: 'profile', component: ProfileComponent, pathMatch: 'full'},
  { path: 'recipe', component: RecipeComponent, pathMatch: 'full'},
  { path: 'bananapancakes', component: BananapancakesComponent, pathMatch: 'full'},
  { path: 'vegetablesoup', component: VegetablesoupComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
