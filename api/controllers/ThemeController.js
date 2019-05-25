/**
 * ThemeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  add: function(req, res) {
    res.view("theme/add");
  },

	create: function (req, res) {

    var name = req.body.name;

    Theme.create({name: name}).exec(function(err) {
      if(err) {
        res.send(500, {error: "DB error"});
      }

      res.redirect("/welcome");
    })

  },

  delete: function (req, res) {
    var Id = req.param('id');
    Theme.destroy(Id).exec(function (err) {
      if (err) return res.send(500);
      res.redirect('/theme');
    });
  },

  index: function (req, res) {

    
    Theme.find().sort('id DESC').limit(5).exec(function (err, themes) {
      if (err){ return res.send(500);}
      res.view('theme/index',{
        themes: themes
      });
    });
  },

  watch: async function (req, res) {
    var Id = req.param('id');

    // Question.find().sort('id DESC').limit(5).exec(function (err, questions) {
    //   if (err){ return res.send(500);}
    //   res.view('question/index',{
    //     questions: questions
    //   });
    // });

    var questions = await Question.find();
    sails.log(questions);

    Theme.findOne(Id).populate('questions').exec(function (err, theme, questions) {
      if (!theme) return res.send(404);
      if (err) return res.send(500);
      res.view('theme/watch/',{
        theme: theme,
        questions: questions
      });
    })
  },

  page: function (req, res) {
    var page = req.param('page');
    Theme.find().sort('id DESC').paginate({
      page: page,
      limit: 5
    }).exec(function (err, themes) {
      if (err) return res.send(500);
      res.view({
        themes: themes
      });
    });

  }
  

};

