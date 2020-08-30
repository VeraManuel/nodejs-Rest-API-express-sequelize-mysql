'user strict'

var db = require('../models');
var Tutorial = db.tutorials;
var Op = db.Sequelize.Op;

// Paginate

var getPagination = (page, size) => {
    var limit = size ? +size : 3;
    var offset = page ? page * limit : 0;

    return { limit, offset} ;
};

var getPagingData = (data, page, limit) => {
    var { count: totalItems, rows: tutorials } = data;
    var currentPage = page ? +page : 1;
    var totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
};

// create and save a new tutorial

exports.create = (req, res) => {

    //validate req
    if(!req.body.title) {
        res.status(400).send({
            message: 'Content can not be empty'
        });
        return;
    }

    //create tutorial
    let tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    //Save tutorial info in DB
    Tutorial.create(tutorial)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: 
                        err.message || "Some error occurred while creating the tutorial"
                });
            });
};

// retrieve all tutorial from DB

exports.findAll = (req, res) => {
    var { page, size, title } = req.query;
    var condition = title ? { title: { [Op.like]: `%${title}%` } }: null;

    var { limit, offset } = getPagination(page, size);

    Tutorial.findAndCountAll({ where: condition, limit, offset })
            .then(data => {
                var response = getPagingData(data, page, limit);
                res.send(response);
            })
            .catch(err => {
                res.status(500).send({
                    message: 
                        err.message || "Some error occurred while retriving tutorials"
                });
            });
};

// find one tutorial given an id

exports.findOne = (req, res) => {
    var id = req.params.id;

    Tutorial.findByPk(id)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: 
                        err.message || 'Can not fin the tutorial with id: '+id
                });
            });
};

// update a Tutorial given an id in the req

exports.update = (req, res) => {
    var id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    })
            .then(num => {
                if(num == 1) {
                    res.send({
                        message: "Tutorial updated successfully"
                    });
                } else {
                    res.send({
                        message: `Tutorial with  id=${id}. Tutorial not found or req.body empty`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Tutorial with the id= "+id
                });
            });
};

// Delete a Tutorial given an id in the req

exports.delete = (req, res) => {
    var id = req.params.id;

    Tutorial.destroy({
        where: { id: id }
    })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Tutorial deleted successfully"
                    });
                } else {
                    res.send({
                        message: `Error deleting the Tutorial with id=${id}. Or the Tutorial was not found`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error deleting the Tutorial with id= "+id
                });
            });
};

// Delete all Tutorials from the DB

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {},
        truncate: false
    })
            .then(nums => {
                res.send({
                    message: `${nums} Tutorials were deleted successfully!`
                });
            })
            .catch(err =>{
                res.status(500).send({
                    message:
                        err.message || "Error occurred while removing the Tutorials"
                });
            });
};

// Find all published tutorials

exports.findAllPublished = (req, res) => {
    var { page, size } = req.query;

    var { limit, offset } = getPagination(page, size);

    Tutorial.findAndCountAll({ where: { published: true }, limit, offset })
            .then(data =>{
                var response = getPagingData(data, page, limit);
                res.send(response);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Error while retriving tutorials"
                });
            });
};