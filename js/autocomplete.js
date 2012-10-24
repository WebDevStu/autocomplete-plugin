
/**
 *  Autocomplete Plugin
 * 
 */


(function ($) {
    $.fn.autocomplete = function () {
        'use_strict';

        //  cache some variables
        var data = [],
            matched = [];

        //  create the initial array of objects - containing all values and text 
        //  of each child option of the select, we'll use this to scan for 
        //  matches later
        this.children().each(function (index) {
            data[index] = {
                value: $(this).attr('value'),
                text: $(this).text()
            }
        });

        //  re-write select element with two ipputs, one hidden and the other 
        //  to be used to accept user inputs
        $("<input/>", {
            id: this.attr('id'),
            name: this.attr('name'),
            type: 'hidden'
        }).appendTo(this.parent());
        return this;
    };
}(jQuery));