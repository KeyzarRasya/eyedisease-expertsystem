const express = require('express')
const question = require('./system/question')
const {cfExpert} = require('./system/certainty')
const {findCfHE, calculatePosibility, findHighest, conclusion} = require('./test')

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('views'))

app.get('/', (req, res) => {
    res.render('index', {question})
})

app.get('/conc', (req, res) => {
    res.render('conclusion')
})

app.post('/scan', (req, res) => {
    const answers = req.body
    const scoreMap = {
        ya: 1,
        mungkinya: 0.75,
        mungkin: 0.5,
        mungkintidak: 0.25,
        tidak: 0,
    };

    const resp = Object.entries(answers).map(([id, value]) => [id, scoreMap[value]]);
    let cfhe = findCfHE(resp, cfExpert);
    const dataCombine = calculatePosibility(cfhe);
    let {highest, index} = findHighest(dataCombine)
    let {penyakit, percent} = conclusion(highest, index, cfExpert)
    console.log(percent)
    res.render('conclusion', {penyakit, percent})
})

app.listen(3000, () => {
    console.log('Connected to server')
})