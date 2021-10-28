# pwa
PWA Rock Scissors Paper game

## Description

This is a progressive web app (PWA) based on the popular game "Rock Scissors Paper". This app has been made with pure Javascript combined with 
HTML and CSS without any framework but Bootstrap 4.

The app has two sides:

- In one hand we have the Back-end which consist on a app.js. Its only function is to serve our templates to render. Anything else.
- On the other hand we have the Front-end. Here's where all the game logic is. I used serviceWorkers to cache all the necessary files to use the app in offline mode. The app also uses indexdedDB to save and load all the data from the game (usernames and score). We can manage this data thanks to promises.

This application has three different pages:

- Main: Where the user has to type his/her nickname. Here we also find two button that allow us to navigate to Stats and Rules (not done).
- Play: Here where the fun is! Choose rock, paper or scissor and let's see how far you can go :)
- Stats: All the stats are shown here. You can check all the players stats.

## Usage


```sh
npm install
```

Go to the app folder and run:

```sh
npm run start
```

In your browser go to http://localhost:5000/

ENJOY!

