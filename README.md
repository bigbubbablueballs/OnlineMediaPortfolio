# Students application
Basic web application for demonstrating core client/server architecture concepts as well as the main technologies involved.

> Not supposed to be used in any production environment, only for educational purposes

## Project structure
GENERAL:
All pages of the website are set up the same way. At the top there is a navigation bar which has links to all the different pages.
The links are named after the pages they lead to except the Home Page and the TikTok page which have symbols. When visiting a pge the link is highlighted.
The navigation bars position is fixed to the top of the screen and remains there when scrolling down.
The <main> section is split into to parts. The left section labled <aside> contains the title of the page and a brief explenaition of the content on the page.
The other section is just named <section> and contains the exercises and content.

Home Page:
The Home Page is the introduction to the site.

ABOUT ME:
The About Me page displays the basic resume we made early in the semster. 
For this Portfolio I decided to add a "mailto:" link to my email, and a link to my adress.

TIMETABLE:
This page contains a reconstruction of the timetable i created and a link to the original CodeSandbox file.
The table covers my entire week of lectures. Using CSS code highlighted each subject with its own colour and used those highlights to show how long each subject lasts. I later updated the timetable with nicer colours and added a box shadow whenever the user hovers over any given cell.

CALCULATOR:
This was our second CodeSandbox exercise. Here i decided to add the the code sandbox website directly into my site using the <iframe> tag. I adjusted the window to fit nicely onto the site and on top of that I added a link to the website.

TIKTOK:
On this page I compiled all the Information from our Analysis of TikTok. 
The coding aspect here was relativly simple. I added the images we used for our presentation and wrote out the text associated with each slide. I stylised this page with a black background and white text to fit the TikTok asthetic.

MY CLASS:
This was the most challenging part of the portfolio. I initially struggled with the setup of this page but after some research i got it to work. 
With the setup commands at the end of this file node is able to access the json file and the frontend application is set up to be able to complete the commands in the JavaScript file.
At first the json file is fetched and put into a table alongside a edit and a remove button. the addOrUpdateStudent function recieves the input from the user and adds the student to the end of the list. If the student already exists the alterations are saved. This method is also utilised my the editUser function which fills the input area with the students data that has been selected, allowing the user to edit the students information. The removeUser function executes the delete method and reloads the list after the user confirms the deltion via a pop up.

### backend
Simple node application `backend/index.js` with a CRUD (Create, Read, Update, and Delete) operations exposed as a HTTP service. Manipulating a dummy file based data storage `backend/students.json`

### frontend
Plain HTML / CSS / Javascript project for creating an interface to manipulate the students API.

## Set up

Make sure you have [node.js](https://nodejs.org/en) installed.

Install project dependencies
```
npm install;
```

Starts backend service on port 3000
```
node backend/index.js
```

Start frontend application on port 8080 [open a new terminal instance]
```
npx http-server frontend

```
