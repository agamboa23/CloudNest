/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * @override
   */
  create: function (req, res, next) {
    var passportRecieved = req.param('passports');
    if(passportRecieved && passportRecieved[0].password){
      var length = passportRecieved[0].password.length;
      if (length<8){
        res.send("Password need to have at least 8 characters")
        return;
      }
    }
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err) return res.negotiate(err);

      res.ok(user);
    });
  },

  me: function (req, res) {
    res.ok(req.user);
  }
};

