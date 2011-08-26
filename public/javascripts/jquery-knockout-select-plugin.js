/*

Custom jQuery plugins
    
Dependencies
- knockout.js

*/

(function ($) {

    /* 
    load the option values for a combobox and preserve the current selection by adding it to the list if the option
    is not available in the new list
    */
    $.fn.koGetJsonOptionValues = function (actionName, optionValues, selectedOptionValue, isLoading, onCompare, onComplete) {
        var currentValue = selectedOptionValue();
        isLoading(true);
        $.getJSON(actionName, function (result) {
            isLoading(false);
            optionValues.removeAll();
            if (result.success) {
                var found = false;
                // push the values into the array
                for (var i = 0; i < result.data.length; i++) {
                    var item = result.data[i];
                    optionValues.push(item);
                    // if a comparison function is passed in use it to maintain the current selection in the list
                    if (typeof onCompare == 'function') {
                        if (onCompare(item, currentValue)) {
                            found = true;
                            currentValue = item;
                        }
                    }
                }

                if (found === false) {
                    optionValues.push(currentValue);
                }
                selectedOptionValue(currentValue);
                if (typeof onComplete == 'function') {
                    onComplete();
                }
            }
        });
    };


})(jQuery);