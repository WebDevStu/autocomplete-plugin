
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
            };
        });

        //  re-write select element with two ipputs, one hidden and the other 
        //  to be used to accept user inputs

        $("<input/>", {
            id: this.attr('id'),
            name: this.attr('name'),
            type: 'hidden'
        }).appendTo(this.parent());

        $("<input/>", {
            id: 'AC_' + this.attr('id'),
            type: 'text'
        }).appendTo(this.parent());

        //  now bind any key events on the new input
        $("#AC_" + this.attr('id')).keyup(function (event) {
            var value = $(this).val();
            switch (event.keyCode) {
            case 9:     //  tab key
                //  hide the ac results
                break;
            case 13:    //  enter key
                //  hide the ac results
                break;
            case 38:    //  up arrow key
                //  up a record
                break;
            case 40:    //  down arrow key
                //  down a record
                break;
            //  if none of the targeted keys are hit, we're safe to assume the 
            //  user is waiting for a list of matches to be returned
            default:
                //  strip out any funky chars
                value = value.replace(/[^\w\s]/gi, '');
                $(this).val(value);
                //  call autocomplete function
                break;
            }
        });
        //  remove the first instance of the select now we have all the info
        return this.remove();
    };
}(jQuery));