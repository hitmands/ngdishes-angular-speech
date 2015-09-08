(function() {

  function DeletePostFoodCtrl(req, res) {

    return res.json({
      message: "under development",
      username: (req.auth && req.auth.credentials && req.auth.credentials.username) || null
    });
  }

  module.exports = DeletePostFoodCtrl;
}).call(this);
