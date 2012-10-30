
/**
 *  Autocomplete Plugin
 *  
 *  @overview jQuery Plugin that is bound to a select element, takes the values 
 *  of each of it's children to generate an autocomplete style helper for users
 *  @author Stewart Anderson <git@stewart-anderson.co.uk>
 *  @copyright Stewart Anderson
 */


(function ($) {
    $.fn.autocomplete = function () {
        'use_strict';

        //  cache some variables

        var data = [],
            matched = [],
            matchValues;

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
        
        /**
         *  Macth Values function called each time the user keys down within the 
         *  target input, matches their input against the original options text
         *  @method matchValues
         *  @param input {string} - users typed input
         *  @returns {array} an array of matched values to be pushed to the view
         */
        matchValues = function (input) {

            var dataLength = data.length,
                match,
                resultsInt = 0,
                resultsIndex,
                i,
                whitespace;

            //  make sure the match array is empty each time

            matched = [];

            //  loop through the original <options>

            for (i = 0; i <= dataLength; i += 1) {

                //  match the users input to the text value

                match = new RegExp(input, 'i');
                match = match.test(data[i].text);

                //  if there is a match

                if (match) {

                    //  confirm that the current original <option> has a value
                    //  i.e not the 'Please select option'

                    if (data[i].values) {

                        //  get index of the matched user input string to the 
                        //  matched text

                        resultsIndex = data[i].values.toLowerCase().indexOf(input);

                        //  check the <option> text for whitespace

                        whitespace = data[i].values.indexOf(' ');

                        //  if the match is at the start of a second word (after 
                        //  a whitespace) we want this to feature higher in the
                        //  results list

                        if (whitespace >= 0 && resultsIndex > whitespace) {
                            resultsIndex = resultsIndex - whitespace;
                        }

                        //  if user input is null (they've deleted what they 
                        //  typed, then resort to original sorting of the 
                        //  results

                        if (input === '') {
                            resultsIndex = i;
                        }

                        //  populate the results array - [int, {obj}]

                        matched[resultsInt] = [resultsIndex, {
                            value: data[i].value,
                            text: data[i].text
                        }];
                        //  increase results integer only on match
                        resultsInt += 1;
                    }
                }
            }

            //  sort the results - will do so by the first integer in each array (the 
            //  index of where the match is)

            matched.sort();

            return matched;
        }

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
                matchValues(value);

                break;
            }
        });


        //  remove the first instance of the select now we have all the info
        this.remove();
    };
}(jQuery));