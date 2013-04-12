;(function () {

if (Meteor.isClient) {

  Template.hello.connectionStatus = function () {
    var status = Meteor.status();

    if (status.retryTime) {
      status.time = new Date(status.retryTime);
    }

    return status;
  };
}

}());
