/**
 * DiscussionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	add: function(req, res) {
    	res.view("discussion/add");
  	},

	create: async function (req, res) {
    var body = req.body.body;
    var author = req.session.userId;
    var question = req.session.questionId;

    var currentNumber = await Question.findOne({id:question});
    await Question.updateOne({id : currentNumber.id}).set({answersNumber : currentNumber.answersNumber + 1})

    Discussion.create({body : body, author: author, relatedtoquestion: question}).exec(function(err) {
      if(err) {
        res.send(500, {error: "DB error"});
      }
      res.redirect("/question/watch/?id=" + req.session.questionId);
    })

  },


  // TODO
  // delete: function (req, res) {
  //   var Id = req.param('id');
  //   Discussion.destroy(Id).exec(function (err) {
  //     if (err) return res.send(500);
  //     res.redirect('/s');
  //   });
  // },


  // index: function (req, res) {
  //   Question.find().sort('id DESC').limit(5).exec(function (err, questions) {
  //     if (err){ return res.send(500);}
  //     res.view('question/index',{
  //       questions: questions
  //     });
  //   });
  // },

  // watch: async function (req, res) {
  //   var Id = req.param('id');

  //   Discussion.findOne(Id).exec(function (err, discussion) {
  //     if (!discussion) return res.send(404);
  //     if (err) return res.send(500);
  //     res.view('question/watch/',{
  //       question: question,
  //       discussions: discussions
  //     });
  //   })
  // },

  // page: function (req, res) {
  //   var page = req.param('page');
  //   Question.find().sort('id DESC').paginate({
  //     page: page,
  //     limit: 5
  //   }).exec(function (err, questions) {
  //     if (err) return res.send(500);
  //     res.view({
  //       questions: questions
  //     });
  //   });

  // }
  

};

