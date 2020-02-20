const express = require('express')
const Twitter = require('twitter')
const serverless = require('serverless-http')

const app = express()

const router = express.Router()

const client = new Twitter({
	consumer_key: process.env.CONSUMER_KEY,
	consumer_secret: process.env.CONSUMER_SECRET,
	access_token_key: process.env.ACCESS_TOKEN_KEY,
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})


router.get('/', (req,res) => {
    res.json({
        'hello': 'hi'
    })
})


router.get('/twitter/user/search', (req, res) => {
	const username = req.query.username

	client.get('/users/search', { q: username }, (error, users, response) => {
		if (error) {
			res.status(error.code).send({ error })
		} else {
			res.status(200).send({ users, response })
		}
	})
})

app.use('/.netlify/functions/api', router)




module.exports.handler = serverless(app)