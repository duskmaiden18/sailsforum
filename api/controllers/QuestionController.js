/**
 * QuestionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

	add: function(req, res) {
    	res.view("question/add");
  	},

	create: function (req, res) {

    var name = req.body.name;
    var author = "test";

    Question.create({name: name, author: author}).exec(function(err) {
      if(err) {
        res.send(500, {error: "DB error"});
      }

      res.redirect("/welcome");
    })

  },


  // TODO
  delete: function (req, res) {
    var Id = req.param('id');
    Question.destroy(Id).exec(function (err) {
      if (err) return res.send(500);
      res.redirect('/question');
    });
  },


  index: function (req, res) {
    Question.find().sort('id DESC').limit(5).exec(function (err, questions) {
      if (err){ return res.send(500);}
      res.view('question/index',{
        questions: questions
      });
    });
  },

  watch: function (req, res) {
    var Id = req.param('id');
    Question.findOne(Id).exec(function (err, question) {
      if (!theme) return res.send(404);
      if (err) return res.send(500);
      res.view('question/watch/',{
        question: question
      });
    })
  },

  page: function (req, res) {
    var page = req.param('page');
    Question.find().sort('id DESC').paginate({
      page: page,
      limit: 5
    }).exec(function (err, questions) {
      if (err) return res.send(500);
      res.view({
        questions: questions
      });
    });

  }
};

