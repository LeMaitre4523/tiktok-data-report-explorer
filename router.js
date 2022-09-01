const fs = require('fs');

module.exports = async (app, options) => {

    app.get('/', async (req, res) => {
        console.log("[200]", `${req.method} ${req.url}`)
        let stream = fs.createReadStream("./public/index.html")
        res.type("text/html").send(stream)
    });

    app.get('/profil', async (req, res) => {
        res.redirect("/")
    });

    app.get('/activity', async (req, res) => {
        res.redirect("/")
    });

    app.get('/comments', async (req, res) => {
        res.redirect("/")
    });

    app.get('/posts', async (req, res) => {
        res.redirect("/")
    });

    app.get('/videos', async (req, res) => {
        res.redirect("/")
    });

    app.get('/settings', async (req, res) => {
        res.redirect("/")
    });

    app.get('/ads', async (req, res) => {
        res.redirect("/")
    });

    app.get('/about', async (req, res) => {
        res.redirect("/")
    });

    
}