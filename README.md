# SASE-Url-Shortener
URL Shortener for SASE Externship Interview

## How to run:
1. git clone https://github.com/AleJim1216/SASE-Url-Shortener/
2. npm install
3. npm dev start
  - Custom package.json script that will run nodemon paired with debug logs
4. Use API tester, such as cURL, Postman, etc. to POST requests and GET responses.
  - Ensure that responses are in the form of JSON.

## Design Choices:
### Stack
- Javascript as programming language
- Express.js for sending and receiving data
- MongoDB/Mongoose for storing originalUrl and shortId.
  - Create a "Shortener" schema with originalUrl, shortId, and count fields. 
### Routes
#### POST '/shorten/'
- Uses the originalUrl and create a new Shortener document.
- Used a custom hash function to convert url to a short Id.
  - Combines murmur to hash the url into a 32-bit integer.
  - Uses Base62 conversion to turn that 32-bit integer into a short character sequence.
- Allows the creation of custom aliases instead of hashing a unique ID.
  - Checks database to see if alias is in use instead of duplicating aliases. 
#### GET '/:code/'
- Searches for the shortId in the database and redirect to the originalUrl if it exsists. It also increments a counter that signifies how many times the link has been clicked.
#### GET '/:code/stats'
- Searches for the shortId in the database and returns the number of clicks.
