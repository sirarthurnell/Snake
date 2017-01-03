"use strict";
var $ = require('jquery');
$(function () {
    var $body = $('body'), $div = $('<div/>'), state = 'WORKING!';
    $div.html("Hello, I'm still " + state);
    $body.append($div);
});
//# sourceMappingURL=main.js.map