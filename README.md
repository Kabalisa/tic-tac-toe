# Tic-tac-toe api

## System process flow

an API that plays the game called tic-tac-toe in the US, and called naughts and crosses in some countries.

- Your server will be provided the current board in a GET request, using the ‘board’ parameter in the query string.
- If the board string doesn't represent a valid tic-tac-toe board, or it’s not plausibly o’s turn, your server should return an HTTP response code 400 (Bad Request)
- Your server always plays as o.
- Either player can go first.
- If the board is a valid tic-tac-toe board and it is plausibly o's turn, your server should return a string representation of the same board with one ‘o’ added.

## Tools used

- NodeJs/Express

## installation

- git clone https://github.com/Kabalisa/tic-tac-toe.git
- cd tic-tac-toe && npm i
- npm run dev
- you can then see the app at http://localhost:3000

you can play the game here. https://kabalisa-tic-tac-toe.netlify.app/
