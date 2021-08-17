const scapper = require('./scrapper')
const express = require('express')
const { env } = require('process')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/', (req, res) => {
    res.send('ok')
})

app.get('/api/Popular/:page', async (req, res) => {
    const result = await scapper.popular(req.params.page)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

app.get('/api/NewSeasons/:page', async (req, res) => {
    const result = await scapper.newSeason(req.params.page)
    console.log(result)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

app.get('/api/search/:query/:page', async (req, res) => {

    const result = await scapper.search(req.params.query, req.params.page)
    console.log('results  ', result)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

app.get('/api/getAnime/:query', async (req, res) => {
    const result = await scapper.anime(req.params.query)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

app.get('/api/getEpisode/:query', async (req, res) => {
    console.log('req.params.query  ', req.params.query)
    const result = await scapper.watchAnime(req.params.query)
    console.log('resule ', result)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

app.get('/api/recent/:page', async (req, res) => {
    const result = await scapper.recentRelease(req.params.page)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

app.get('/api/tag/:quary/:page', async (req, res) => {
    console.log('222', req.params.quary, req.params.page)
    const result = await scapper.tags(req.params.quary, req.params.page)
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(result, null, 4))
})

port = env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})
