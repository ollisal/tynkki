/**
 * Implementation for the /api/posts REST API
 */

var _ = require('lodash');
var express = require('express');
var slug = require('slug');

var posts = express.Router();

var PERSISTENT_POST_IDS = [
  'schedule',
  'people',
  'network',
  'laundry',
  'baywatch',
  'links'
];

var storedPosts = [
  {
    id: 'schedule',
    subject: 'Lukujärjestys',
    text: 'Ajalle 14.11.2015 - 30.1.2016',
    pizzas: [
      {text: '14.11.2015 Angular-kurssin esittely perinnepäivillä'},
      {text: '16.11.-22.11. CS: Angularin perusteet: templatet, kontrollerit, direktiivit'},
      {text: '23.11.-29.11. CS: Filtterit, lisää direktiiveistä'},
      {text: '30.11.-6.12. CS: Lomakkeet'},
      {text: '7.12.-13.12. CS: Itse tehdyt direktiivit ja perusteet palveluista'},
      {text: '14.12.-21.12. Tynkki: Harrasta odottelua että Olli ehtii laatia Tynkki-pohjan ja harkat'},
      {text: '21.12.-10.1. Joululoma'},
      {text: '11.1.-17.1. Tynkki: Tutustuminen ja refaktorointi + ui-router esittely + Bootstrap'},
      {text: '18.1.-24.1. Tynkki: Lisää ui-routerista + Promiset tarkemmin + $resource'},
      {text: '25.1.-31.1. Harkkatyön tekoa'},
      {text: '1.2.2016 Harkkatyön DL'}
    ]
  },
  {
    id: 'people',
    subject: 'Ihmiset',
    text: 'Tärkeimmät päivöliinit kautta aikain',
    pizzas: [
      {text: 'Jarmo Jaakkola (Hiukkanen) - Angular-assari'},
      {text: 'Olli Salli (X), Jari Huilla (X) - Angular-kurssin vetäjät'},
      {text: 'Neliöt ja ventit - 40 webbigurua'}
    ]
  },
  {
    id: 'network',
    subject: 'Verkko',
    text: 'Älä wareta (ainakaan liikaa, kaistan täydeltä). Älä heitä verkkolaitteita rantapallolla. Vikailmoitukset alle:',
    pizzas: []
  },
  {
    id: 'laundry',
    subject: 'Pyykit',
    text: 'Pyykkikone on rikki. Vie pyykit äidille.',
    pizzas: []
  },
  {
    id: 'baywatch',
    subject: 'Uimavalvojat',
    text: 'Uimavalvonta on tärkeää. Joka saunavuorolla tulee olla nimetty uimavalvoja. Nimetyt valvojat vuodesta 2006 alla:',
    pizzas: [
      {text: '24.12.2015 - Joulupukki'}
    ]
  },
  {
    id: 'links',
    subject: 'Linkit',
    text: 'Alla linkkejä laadukkaisiin Angular-tutoriaaleihin:',
    pizzas: [/* TODO enable links */]
  },
  {
    id: 'majavakisa',
    subject: 'Majavakisa neliöt klo 9.30',
    createdOn: '2015-11-10 17:14:34',
    creator: 'jk',
    text: 'Be there or be late.',
    pizzas: []
  },
  {
    id: 'liikuntakyydit',
    subject: 'Venttien liikuntakyydit ke 11.11.',
    createdOn: '2015-11-10 15:01:04',
    creator: 'Timo p',
    text: 'Kirjoittakaa pitsalistaan nimi ja kyyti. Ensimmäinen kyyti lähtee 8:30. Ilmoittaudu alla.',
    pizzas: []
  },
  {
    id: 'pyykkikone-rikki',
    subject: 'Kuivausrummun alapuolella oleva pyykinpesukone rikki',
    createdOn: '2015-11-10 14:57:01',
    creator: 'Timo p',
    text: 'Kuului kova ääni ja savu haisi. Älkää siis toistaiseksi käyttäkö sitä. Talonmies tarkistaa tilanteen huomenna.',
    pizzas: []
  },
  {
    id: 'amazon',
    subject: 'Amazon.de - kimppatilaus',
    createdOn: '2015-11-10 17:14:34',
    creator: 'Joksu ja Poksu',
    text: 'Ah, aina välillä muistelemme kuka suomalainen loi 1900-luvun kauneinta musiikkia. Joku voisi sanoa sen olleen Sibelius. Joku voisi sanoa sen olleen Michael Monroe. Joku voisi jopa sanoa sen olleen K. Olli Jarvan musiikkimaku on monipuolinen.',
    pizzas: []
  }
];

function postIsPersistent(post) {
  return _.contains(PERSISTENT_POST_IDS, post.id);
}

posts.route('/')
  .get(function getPosts(req, res) {
    var nonpersistentPostsWithoutPizzas = _(storedPosts)
      .reject(postIsPersistent)
      .map(function omitPizzas(post) {
        return _.omit(post, 'pizzas');
      })
      .value();

    res.status(200).json(nonpersistentPostsWithoutPizzas);
  })
  .post(function addPost(req, res) {
    var newPost = req.body;
    newPost.id = slug(newPost.subject).toLowerCase();

    if (_.any(storedPosts, 'id', newPost.id)) {
      res.status(409).json({message: 'Post already exists'});
      return;
    }

    var now = new Date();
    newPost.createdOn = now.toString();

    storedPosts.push(newPost);
    res.status(201).json(newPost);
  });

posts.route('/:postId')
  .all(function findRequestedPost(req, res, next) {
    var post = _.find(storedPosts, 'id', req.params.postId);

    if (!post) {
      res.status(404).json({message: 'Post not found'});
      return;
    }

    req.post = post;
    next();
  })
  .get(function getPost(req, res) {
    res.status(200).json(req.post);
  })
  .put(function modifyPost(req, res) {
    var postData = req.body;
    postData.id = req.params.postId;

    _.assign(req.post, postData);
    res.status(200).json(req.post);
  })
  .delete(function deletePost(req, res) {
    if (postIsPersistent(req.post)) {
      res.status(403).json({message: 'Cannot delete persistent posts'});
    } else {
      _.pull(storedPosts, req.post);
      res.status(200).json({id: req.post.id});
    }
  });

module.exports = posts;
