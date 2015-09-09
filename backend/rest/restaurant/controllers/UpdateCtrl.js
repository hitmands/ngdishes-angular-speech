(function() {

  function UpdatePostFoodCtrl(req, res) {

    return res.json({
      message: "under development",
      username: (req.credentials && req.credentials.username) || null
    });
  }

  module.exports = UpdatePostFoodCtrl;
}).call(this);
