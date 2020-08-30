'use strict'

module.exports = app => {

    const tutorials = require('../controllers/tutorial.controller');

    var router = require('express').Router();

    // Create new tutorial
    router.post('/', tutorials.create);

    // Retrieve all tutorials
    router.get('/', tutorials.findAll);

    // Find all tutorial published
    router.get('/published', tutorials.findAllPublished);

    // Find tutorial by id
    router.get('/:id', tutorials.findOne);

    // Update tutorial by id
    router.put('/:id', tutorials.update);

    // Delete tutorial by id
    router.delete('/:id', tutorials.delete);

    // Delete all tutorials
    router.delete('/', tutorials.deleteAll);

    app.use('/api/tutorials', router);

};