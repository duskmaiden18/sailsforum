module.exports = {


  friendlyName: 'View welcome(themes) page',


  description: 'Display the dashboard "Welcome(themes)" page.',


  exits: {

    success: {
      statusCode: 200,
      description: 'Display the welcome page for authenticated users.',
      viewTemplatePath: 'pages/test-pages/themes'
    },


  },


  fn: async function () {

    console.log("This part works");
    await Theme.create({
      name: "test_05"
    });

    var themes = await Theme.find();
    console.log(themes);
    return {};

  }


};
