;(function () {

if (Meteor.isClient) {

  Session.set('timeout', null);

  Template.hello.events({
    'click button': function (event) {
      event.preventDefault();

      Meteor.call('getResponse', function (error, response) {
        var $res,
            timeout;

        if (error) {

          alert(JSON.stringify(error));

        } else {

          if (!Session.equals('timeout', null)) {
            Meteor.clearTimeout(Session.get('timeout'));
          }

          $res = $('#response');
          $res.text('Response from server: ' + response);
          $res.show();
          timeout = Meteor.setTimeout(function () {
            $res.fadeOut('slow');
          }, 2000);
          Session.set('timeout', timeout);

        }
      });
    }
  });

  Template.hello.connectionStatus = function () {
    var status = Meteor.status();

    if (status.retryTime) {
      status.time = new Date(status.retryTime);
    }

    return status;
  };
}

if (Meteor.isServer) {
  Meteor.methods({
    getResponse: function () {
      return new Date();
    }
  });
}

}());
