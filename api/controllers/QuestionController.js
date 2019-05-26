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
    var author = req.session.userId;
    var theme = req.session.themeId;
    Question.create({name: name, author: author, answersNumber: 0, relatedtotheme: theme}).exec(function(err) {
      if(err) {
        res.send(500, {error: "DB error"});
      }
      res.redirect("/theme/watch/?id=" + req.session.themeId);
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


  // index: function (req, res) {
  //   Question.find().sort('id DESC').limit(5).exec(function (err, questions) {
  //     if (err){ return res.send(500);}
  //     res.view('question/index',{
  //       questions: questions
  //     });
  //   });
  // },

  watch: async function (req, res) {
    var Id = req.param('id');

    var discussions = await Discussion.find();

    var questionRec = await Question.find(Id).limit(1);
    req.session.questionId = questionRec[0].id;

    Question.findOne(Id).populate("discussions").exec(function (err, question, discussions) {
      if (!question) return res.send(404);
      if (err) return res.send(500);
      res.view('question/watch/',{
        question: question,
        discussions: discussions
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

