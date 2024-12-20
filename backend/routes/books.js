var express = require('express');
var router = express.Router();

var Book = require('../models/books');
const { Sequelize, where } = require('sequelize');

/* GET books listing. */
router.get('/', function(req, res, next) {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.count) || 30
    const orderKey = req.query.sortKey || 'id'
    const orderValue = req.query.sortValue || 'asc'
    if (Number(req.query.count) > 50) {
        return next({message: 'Limit is to heigh', status: 400})
    }
    Book.findAll({
        offset: (page -1) * limit,
        limit: (limit),
        order: [ [orderKey, orderValue] ]
    })
      .then((books) => {
        res.send(books);
      });
  });


   router.get('/:id', function(req, res) {
     Book.findByPk(Number(req.params.id)).then((book) => {
       res.send(book);
     });
   })

  router.post('/', function(req, res) {
    Book.create({ author:  req.body.author, year: req.body.year, title: req.body.title }).then(function(book) { res.send(book); })
    });
  
    router.delete('/:bookId', function(req, res) {     
      Book.destroy({    where:         {[Sequelize.Op.or]: [
          { id: req.params.bookId }
        ]}
       
       }).then(function(count) {        
        if (count > 0) {
            res.send('ok')
        }   
        else {
            res.send('no book found')
        }
    }) 
      })

    router.put('/:id', function(req, res, next) {
        Book.update({
            author: req.body.author,
            year: Number(req.body.year),
            title: req.body.title
        },{
            where: {
                id: req.params.id
            }
        }).then(function() { res.send('ok')})
    }
)


  module.exports = router;