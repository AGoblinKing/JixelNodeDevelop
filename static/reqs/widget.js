var Widget = new Class({
    initialize: function(options) {
        this.options = Object.merge(this.options, options);      
    },
    members: {},
    options: {},
    update: function() {
        this.destroy();
        this.render();
    },
    render: function() {
        var self = this;
        this.options.memberHTML = $('<div/>',{class:'memberHTML'});
        Object.each(this.members, function(member) {
            self.options.memberHTML.append(member.render());
        });
        this.html =$.tmpl('base', this.options).append(this.options.memberHTML);
        return this.html;
    },
    destroy: function() {
        Object.each(this.members, function(member) {
           member.destroy();
        });
        this.html.remove();
    }
});

var DialogWidget = new Class({
    Extends: Widget,
    initialize: function(options){
        this.parent(options);
    },
    options: {
        resizable: false,
        closeText: '',
        closeOnEscape: false,
        open: function() {
          $(this).find('.msg').remove();
        }
    },
    render: function() {
        this.parent();
        $('body').prepend(this.html);
        this.html.dialog(this.options);
    },
    destroy: function() {
        this.html.dialog('close');
        this.parent();
    }
});

var InputField = new Class({
    Extends: Widget,
    options: {
        attri: {
            type: 'text'
        }
    },
    render: function() {
        this.html = $.tmpl('input', this.options);
        return this.html;
    }
});