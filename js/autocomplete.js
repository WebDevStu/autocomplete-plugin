
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
        //  of each child option of the select
        this.children().each(function (index) {
            data[index] = {
                value: $(this).attr('value'),
                text: $(this).text()
            }
        });

        
        return this;
    };
}(jQuery));