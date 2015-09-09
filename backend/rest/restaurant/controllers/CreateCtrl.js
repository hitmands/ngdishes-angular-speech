(function() {

  function CreatePostFoodCtrl(req, res) {

    return res.json({
      message: "under development",
      username: (req.credentials && req.credentials.username) || null
    });
  }

  module.exports = CreatePostFoodCtrl;
}).call(this);
