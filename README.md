# Welcome to **Starter**!
### A full-stack site devoted to sourdough bread. Inspired by [seriouseats.com](https://www.seriouseats.com)

### *Built for your beginner bread-head, **Starter** is geared towards helping sourdough noobies explore recipes, recieve feedback on their own recipes, and have an easy to use refernce of common sourdough questions.*

### Check out the live site [here](https://starter-bread.herokuapp.com/)!

## Technologies used
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Features
#### [Users](https://github.com/angMaidt/Starter/wiki/Features#1-users)
#### [Recipes](https://github.com/angMaidt/Starter/wiki/Features#2-recipes)
#### [Comments](https://github.com/angMaidt/Starter/wiki/Features#2-recipes)

## Local Setup
1. Clone this repository

   ```bash
   git clone https://github.com/angMaidt/Starter
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
   
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```
6. Open a new terminal and cd into the react-app folder

7. Install front-end dependencies and start the server

      ```bash
   npm install
   ```
   
      ```bash
   npm start
   ```
8. If browser does not open right away, navigate to localhost:3000 in your browser and enjoy!
