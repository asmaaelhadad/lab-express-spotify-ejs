require('dotenv').config()

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const SpotifyWebApi = require('spotify-web-api-node')
// require spotify-web-api-node package here:

const app = express()

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  })
 // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error))
// Our routes go here:
app.get('/', (req, res) => {
    res.render('index')
  })


  app.get('/artist-search', (req,res)=> {
    console.log(req.query.Artist)
    spotifyApi
    .searchArtists(req.query.Artist)
    .then(data => {
     console.log('The received data from the API: ', data.body.artists.items)

    
     const artistdata = data.body.artists.items 
     res.render('artist-search-results',{ artistdata})
   
    })
    .catch(err => console.log('The error while searching artists occurred: ', err))
} )
  


app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'))
