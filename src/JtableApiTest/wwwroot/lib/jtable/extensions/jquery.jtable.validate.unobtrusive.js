/************************************************************************
* DATETIME extension for jTable       
* Author: Abu Ali Muhammad Sharjeel 
* Requied: jquery.jtable.fieldattributes.js
*************************************************************************/
var debugDate;
(function ($) {


    //Reference to base object members
    var base = {
        _createInputForRecordField: $.hik.jtable.prototype._createInputForRecordField
    };
    //extension members
    $.extend(true, $.hik.jtable.prototype, {

        options: {
            otherAttributes: false
        },

        _createInputForRecordField: function(funcParams) {
            var fieldHtml = base._createInputForRecordField.apply(this, arguments);
            //fieldHtml.find('#'+)

            if (!this.options.otherAttributes)
                return fieldHtml;

            var otherAttributes = this.options.fields[funcParams.fieldName].otherAttributes;
            if (otherAttributes) {
                fieldHtml.find('#Edit-' + funcParams.fieldName).after('<span class="text-danger" data-valmsg-for="' +
                    funcParams.fieldName +
                    '" data-valmsg-replace="true"></span>');
            }
                

            return fieldHtml;
            //funcParams.fieldName
        }

    });

})(jQuery);