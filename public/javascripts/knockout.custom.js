/*
Knockout custom bindings and extensions shared between all view Models

    requires
        knockout.js 2.0.0+
*/

// Bindings

// fade in and out of visible
ko.bindingHandlers.fadeVisible = {
    init: function (element, valueAccessor) {
        // Start visible/invisible according to initial value
        var shouldDisplay = valueAccessor();
        $(element).toggle(shouldDisplay);
    },
    update: function (element, valueAccessor) {
        // On update, fade in/out
        var shouldDisplay = valueAccessor();
        shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
    }
};

// calendar binding for jquery UI
// - display inline with DIV placeholder
ko.bindingHandlers.jqueryUICalendar = {
    init: function (element, valueAccessor) {
        var observable = valueAccessor();
        $(element).datepicker(
            {
                'dateFormat': 'M dd yy',
                onSelect: function (dateText, inst) {
                    // on select pass the new value to the view model
                    observable($.datepicker.formatDate('M dd yy', new Date(dateText)));
                }
            }).datepicker("setDate", new Date(observable()));
    },
    update: function (element, valueAccessor) {
        var observable = valueAccessor();
        $(element).datepicker("setDate", new Date(observable()));
    }
};

// 
ko.bindingHandlers['submitWithValidate'] = {
    'init': function (element, valueAccessor, allBindingsAccessor, viewModel) {
        if (typeof valueAccessor() != "function")
            throw new Error("The value for a submit binding must be a function");
        
        // $(element).validate();
        ko.utils.registerEventHandler(element, "submit", function (event) {
            if ($(element).valid()) {
                var handlerReturnValue;
                var value = valueAccessor();
                try { handlerReturnValue = value.call(viewModel, element); }
                finally {
                    if (handlerReturnValue !== true) { // Normally we want to prevent default action. Developer can override this be explicitly returning true.
                        if (event.preventDefault)
                            event.preventDefault();
                        else
                            event.returnValue = false;
                    }
                }
            } else {
                event.preventDefault();
            }
        });
    }
};