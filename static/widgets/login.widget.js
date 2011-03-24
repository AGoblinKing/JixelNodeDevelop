var ConnectingWidget = new Class({
   Extends: DialogWidget,
   intialize: function() {
      
   }
});
var LoginWidget = new Class({
   Extends: DialogWidget,
   initialize: function() {
      var self = this;
        this.parent({
            title: 'Login to Jixel',
            buttons: {
                'Login': function() {
                      //Send request, destroy self, render connecting
                      self.destroy();
                      self = new ConnectingWidget();
        $('#connecting').dialog('open').dialog({title:'Logging in.....'});
        var params = $('#login').params();
        params.password = $.sha1(params.password+config.salt);
        jxlNode.remote.login(params, function(iface){
            jxlNode.remote = iface;
            $('#connecting').dialog('close');
            $('#jixel, #toolbox, #project').dialog('open');
            $('#bar').show();
          }, function(err) {
          $('#connecting').dialog('close');
          $('#login').dialog('open');
          $('#login').prepend($('<div/>').addClass('msg').append(Err(err.message)));
        });
                },
                'Create': function() {
                    
                }
            }
        });
        this.members = {
            'name': new InputField({title: 'Name'}),
            'password': new InputField({title: 'Password', attri: {type:'password'}})
        };
   }
});
var CreateWidget = new Class({
   Extends: DialogWidget,
   initialize: function() {
      this.parent({
         title: 'Create Jixel Account',
         buttons: 
      });
   }
});