const request = require("request");
const mongoose = require('mongoose');
const cheerio = require("cheerio");
const db = require("../models");

module.exports = function (app) {

    app.get('/articles', function (req, res) {
        request("https://www.nytimes.com/section/sports/soccer", function (error, response, html) {

            const $ = cheerio.load(html);

            const results = [];

            $("a.story-link").each(function (i, element) {

                const link = $(element).attr("href");
                const title = $($(element).find("h2.headline")[0]).text().trim();
                const summary = $($(element).find("p.summary")[0]).text().trim();
                results.push({
                    link: link,
                    title: title,
                    summary: summary
                });
            });

            db.Article.create(results)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });

            db.Article.find({}).then(function (data) {
                res.json(data);
            });
        });

    });

    app.put("/articles/saved/:articleId", function (req, res) {
        db.Article.findByIdAndUpdate(req.params.articleId, {
            $set: { saved: true }
        }).then(function (data) {
            res.json(data);
        });
    });

    app.get("/articles/saved/show", function (req, res) {
        db.Article.find(
            { saved: true }
        ).then(function (data) {
            res.json(data);
        });
    });

    //"unsave" used since article not being deleted, only removed from saved category
    app.put("/articles/unsave/:articleId", function (req, res) {
        db.Article.findByIdAndUpdate(req.params.articleId, {
            $set: { saved: false }
        }).then(function (data) {
            res.json(data);
        });
    });

    app.post("/notes/save/:articleId", function (req, res) {
        console.log(req.body);
        db.Note.create(req.body)
            .then(function (dbNote) {
                console.log(dbNote._id)
                return db.Article.findOneAndUpdate({ _id: req.params.articleId }, { $push: { note: dbNote._id } }, { new: true });
            }).then(function (dbArticle) {
                res.json(dbArticle);
            }).catch(function (err) {
                res.json(err);
            });
    });

    app.get("/notes/show/:articleId", function (req, res) {
        db.Article.findById(req.params.articleId)
            .populate("note")
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });

    });

    app.delete("/notes/delete/:noteId", function (req, res) {
        db.Note.findByIdAndRemove(req.params.noteId, (err, note) => {
            if (err) 
                return res.status(500).send(err);
            return res.status(200).send();
        });

    });


};

