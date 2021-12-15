# Recipe Planner

The Recipe Planner website is a tool for finding recipes from a list of ingredients and equipment (pantry) the user already has. This tool will solve problems involved in the planning of home cooking. 


## Installation

npm, node, django, angular, postgresql

1.) Make sure you have `npm` and `node` installed on your machine. Download NodeJS [here](https://nodejs.org/en/download/) and follow these [instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install npm.

2.) Install the Javascript framework, **AngularJS** by running `npm install -g @angular/cli`

3.) Install **Django** by following [instructions here](https://docs.djangoproject.com/en/4.0/topics/install/)

// instructions for setting up postgresql and database
    
## Run Locally

1.) Clone the project

```bash
git clone https://github.com/cynthiacheng1/RecipePlanner.git
```

2.) Go to the Django project directory

```bash
  cd recipe
```

3.) Install required Python dependencies

```bash
  pip install -r requirements.txt
```
4.) Start Django server

```bash
  python manage.py runserver
```

5.) Install required Angular dependencies

  Go to the Angular project folder
```bash
  cd ../AngularRecipePlanner/recipe-planner
```
  Install the necessary Angular packages
  Install node.js (Make sure npm path is in your system's environment variables)
  Install Angular using the following command
```bash
  npm install -g @angular/cli
```
  Make sure ng path is in your system's environment variables (Usually C:\Users\user\AppData\Roaming\npm\node_modules\@angular\cli\bin)
  Install toastr using the following commands
  ```bash
  npm install ngx-toastr --save
  npm install @angular/animations --save
```
  Install JQuery
  ```bash
  npm install jquery -- save
  ```

6.) Start the Angular server

```bash
  ng serve
```
7.) Navigate to the website page

  http://localhost:4200/

## Tech Stack

**Client:** Angular, Bootstrap, toastr, JQuery

**Server:** Node, Django

**Database:** PostgreSQL

## Authors

- [@rachelombok](https://www.github.com/rachelombok)
- [@AshokaShringla](https://www.github.com/AshokaShringla)
- [@RainaKim](https://www.github.com/RainaKim)
- [@cynthiacheng1](https://www.github.com/cynthiacheng1)