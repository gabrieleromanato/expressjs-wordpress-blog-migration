'use strict';

const express = require('express');
const router = express.Router();
const {query} = require('../db');

router.get('/', async (req, res, next) => {
    const { s } = req.query;
    let queryString = "SELECT * FROM wp_posts WHERE post_type = ? AND post_status = ? ORDER BY post_date DESC LIMIT 3";
    let values = ['post', 'publish'];
    if(s) {
        let like = `%${s}%`;
        queryString = "SELECT * FROM wp_posts WHERE post_type = ? AND post_status = ? AND post_title LIKE N? ORDER BY post_date DESC LIMIT 3";
        values = ['post', 'publish', like];
    }
    try {
        const results = await query(queryString, values);
        const { siteName, siteDescription } = req.app.locals;
        const title = s ? `Search Results | ${siteName}` : `${siteName} | ${siteDescription}`;
        res.render('themes/twentytwenty/index', {
            title,
            posts: results
        });
    } catch(err) {
        res.sendStatus(500);
    }
});

router.get('/:slug', async (req, res, next) => {
    const { slug } = req.params;
    try {
        const results = await query('SELECT * FROM wp_posts WHERE post_name = ?', [slug]);
        const { siteName } = req.app.locals;
        const post = results[0];
        res.render(
            `themes/twentytwenty/single-${post.post_type}`,
        {
            title: `${post.post_title} | ${siteName} `,
            post
        });
    } catch(err) {
        res.sendStatus(500);
    }
});

module.exports = router;