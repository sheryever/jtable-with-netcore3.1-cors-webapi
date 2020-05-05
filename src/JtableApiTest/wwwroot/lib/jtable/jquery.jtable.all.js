/*! jQuery Validation Plugin - v1.17.0 - 7/29/2017
 * https://jqueryvalidation.org/
 * Copyright (c) 2017 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.on("click.validate",":submit",function(b){c.submitButton=b.currentTarget,a(this).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(this).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.on("submit.validate",function(b){function d(){var d,e;return c.submitButton&&(c.settings.submitHandler||c.formSubmitted)&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),!c.settings.submitHandler||(e=c.settings.submitHandler.call(c,c.currentForm,b),d&&d.remove(),void 0!==e&&e)}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c,d;return a(this[0]).is("form")?b=this.validate().form():(d=[],b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b,b||(d=d.concat(c.errorList))}),c.errorList=d),b},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(null!=j&&(!j.form&&j.hasAttribute("contenteditable")&&(j.form=this.closest("form")[0],j.name=this.attr("name")),null!=j.form)){if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(a,b){i[b]=f[b],delete f[b]}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g)),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}}),a.extend(a.expr.pseudos||a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){var c=a(b).val();return null!==c&&!!a.trim(""+c)},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:void 0===c?b:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",pendingClass:"pending",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(b,c){var d=[16,17,18,20,35,36,37,38,39,40,45,144,225];9===c.which&&""===this.elementValue(b)||a.inArray(c.keyCode,d)!==-1||(b.name in this.submitted||b.name in this.invalid)&&this.element(b)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}."),step:a.validator.format("Please enter a multiple of {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){!this.form&&this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0],this.name=a(this).attr("name"));var c=a.data(this.form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!a(this).is(e.ignore)&&e[d].call(c,this,b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).on("focusin.validate focusout.validate keyup.validate",":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",b).on("click.validate","select, option, [type='radio'], [type='checkbox']",b),this.settings.invalidHandler&&a(this.currentForm).on("invalid-form.validate",this.settings.invalidHandler)},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c,d,e=this.clean(b),f=this.validationTargetFor(e),g=this,h=!0;return void 0===f?delete this.invalid[e.name]:(this.prepareElement(f),this.currentElements=a(f),d=this.groups[f.name],d&&a.each(this.groups,function(a,b){b===d&&a!==f.name&&(e=g.validationTargetFor(g.clean(g.findByName(a))),e&&e.name in g.invalid&&(g.currentElements.push(e),h=g.check(e)&&h))}),c=this.check(f)!==!1,h=h&&c,c?this.invalid[f.name]=!1:this.invalid[f.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),a(b).attr("aria-invalid",!c)),h},showErrors:function(b){if(b){var c=this;a.extend(this.errorMap,b),this.errorList=a.map(this.errorMap,function(a,b){return{message:a,element:c.findByName(b)[0]}}),this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.invalid={},this.submitted={},this.prepareForm(),this.hideErrors();var b=this.elements().removeData("previousValue").removeAttr("aria-invalid");this.resetElements(b)},resetElements:function(a){var b;if(this.settings.unhighlight)for(b=0;a[b];b++)this.settings.unhighlight.call(this,a[b],this.settings.errorClass,""),this.findByName(a[b].name).removeClass(this.settings.validClass);else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)void 0!==a[b]&&null!==a[b]&&a[b]!==!1&&c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function(){var d=this.name||a(this).attr("name");return!d&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.hasAttribute("contenteditable")&&(this.form=a(this).closest("form")[0],this.name=d),!(d in c||!b.objectLength(a(this).rules()))&&(c[d]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},resetInternals:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([])},reset:function(){this.resetInternals(),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d,e=a(b),f=b.type;return"radio"===f||"checkbox"===f?this.findByName(b.name).filter(":checked").val():"number"===f&&"undefined"!=typeof b.validity?b.validity.badInput?"NaN":e.val():(c=b.hasAttribute("contenteditable")?e.text():e.val(),"file"===f?"C:\\fakepath\\"===c.substr(0,12)?c.substr(12):(d=c.lastIndexOf("/"),d>=0?c.substr(d+1):(d=c.lastIndexOf("\\"),d>=0?c.substr(d+1):c)):"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f,g=a(b).rules(),h=a.map(g,function(a,b){return b}).length,i=!1,j=this.elementValue(b);if("function"==typeof g.normalizer?f=g.normalizer:"function"==typeof this.settings.normalizer&&(f=this.settings.normalizer),f){if(j=f.call(b,j),"string"!=typeof j)throw new TypeError("The normalizer should return a string value.");delete g.normalizer}for(d in g){e={method:d,parameters:g[d]};try{if(c=a.validator.methods[d].call(this,j,b,e.parameters),"dependency-mismatch"===c&&1===h){i=!0;continue}if(i=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(k){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",k),k instanceof TypeError&&(k.message+=".  Exception occurred when checking element "+b.id+", check the '"+e.method+"' method."),k}}if(!i)return this.objectLength(g)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a]},defaultMessage:function(b,c){"string"==typeof c&&(c={method:c});var d=this.findDefined(this.customMessage(b.name,c.method),this.customDataMessage(b,c.method),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c.method],"<strong>Warning: No message defined for "+b.name+"</strong>"),e=/\$?\{(\d+)\}/g;return"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),d},formatAndAdd:function(a,b){var c=this.defaultMessage(a,b);this.errorList.push({message:c,element:a,method:b.method}),this.errorMap[a.name]=c,this.submitted[a.name]=c},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g,h=this.errorsFor(b),i=this.idOrName(b),j=a(b).attr("aria-describedby");h.length?(h.removeClass(this.settings.validClass).addClass(this.settings.errorClass),h.html(c)):(h=a("<"+this.settings.errorElement+">").attr("id",i+"-error").addClass(this.settings.errorClass).html(c||""),d=h,this.settings.wrapper&&(d=h.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement.call(this,d,a(b)):d.insertAfter(b),h.is("label")?h.attr("for",i):0===h.parents("label[for='"+this.escapeCssMeta(i)+"']").length&&(f=h.attr("id"),j?j.match(new RegExp("\\b"+this.escapeCssMeta(f)+"\\b"))||(j+=" "+f):j=f,a(b).attr("aria-describedby",j),e=this.groups[b.name],e&&(g=this,a.each(g.groups,function(b,c){c===e&&a("[name='"+g.escapeCssMeta(b)+"']",g.currentForm).attr("aria-describedby",h.attr("id"))})))),!c&&this.settings.success&&(h.text(""),"string"==typeof this.settings.success?h.addClass(this.settings.success):this.settings.success(h,b)),this.toShow=this.toShow.add(h)},errorsFor:function(b){var c=this.escapeCssMeta(this.idOrName(b)),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+this.escapeCssMeta(d).replace(/\s+/g,", #")),this.errors().filter(e)},escapeCssMeta:function(a){return a.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g,"\\$1")},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+this.escapeCssMeta(b)+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return!this.dependTypes[typeof a]||this.dependTypes[typeof a](a,b)},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(b){this.pending[b.name]||(this.pendingRequest++,a(b).addClass(this.settings.pendingClass),this.pending[b.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],a(b).removeClass(this.settings.pendingClass),c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.submitButton&&a("input:hidden[name='"+this.submitButton.name+"']",this.currentForm).remove(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b,c){return c="string"==typeof c&&c||"remote",a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,{method:c})})},destroy:function(){this.resetForm(),a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},normalizeAttributeRule:function(a,b,c,d){/min|max|step/.test(c)&&(null===b||/number|range|text/.test(b))&&(d=Number(d),isNaN(d)&&(d=void 0)),d||0===d?a[c]=d:b===c&&"range"!==b&&(a[c]=!0)},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),this.normalizeAttributeRule(e,g,c,d);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),this.normalizeAttributeRule(e,g,c,d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0===e.param||e.param:(a.data(c.form,"validator").resetElements(a(c)),delete b[d])}}),a.each(b,function(d,e){b[d]=a.isFunction(e)&&"normalizer"!==d?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:b.length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e<=d},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||a<=c},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},step:function(b,c,d){var e,f=a(c).attr("type"),g="Step attribute on input type "+f+" is not supported.",h=["text","number","range"],i=new RegExp("\\b"+f+"\\b"),j=f&&!i.test(h.join()),k=function(a){var b=(""+a).match(/(?:\.(\d+))?$/);return b&&b[1]?b[1].length:0},l=function(a){return Math.round(a*Math.pow(10,e))},m=!0;if(j)throw new Error(g);return e=k(d),(k(b)>e||l(b)%l(d)!==0)&&(m=!1),this.optional(c)||m},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.not(".validate-equalTo-blur").length&&e.addClass("validate-equalTo-blur").on("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d,e){if(this.optional(c))return"dependency-mismatch";e="string"==typeof e&&e||"remote";var f,g,h,i=this.previousValue(c,e);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),i.originalMessage=i.originalMessage||this.settings.messages[c.name][e],this.settings.messages[c.name][e]=i.message,d="string"==typeof d&&{url:d}||d,h=a.param(a.extend({data:b},d.data)),i.old===h?i.valid:(i.old=h,f=this,this.startRequest(c),g={},g[c.name]=b,a.ajax(a.extend(!0,{mode:"abort",port:"validate"+c.name,dataType:"json",data:g,context:f.currentForm,success:function(a){var d,g,h,j=a===!0||"true"===a;f.settings.messages[c.name][e]=i.originalMessage,j?(h=f.formSubmitted,f.resetInternals(),f.toHide=f.errorsFor(c),f.formSubmitted=h,f.successList.push(c),f.invalid[c.name]=!1,f.showErrors()):(d={},g=a||f.defaultMessage(c,{method:e,parameters:b}),d[c.name]=i.message=g,f.invalid[c.name]=!0,f.showErrors(d)),i.valid=j,f.stopRequest(c,j)}},d)),"pending")}}});var b,c={};return a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)}),a});
// Unobtrusive validation support library for jQuery and jQuery Validate
// Copyright (c) .NET Foundation. All rights reserved.
// Licensed under the Apache License, Version 2.0. See License.txt in the project root for license information.
// @version v3.2.11
!function(a){"function"==typeof define&&define.amd?define("jquery.validate.unobtrusive",["jquery-validation"],a):"object"==typeof module&&module.exports?module.exports=a(require("jquery-validation")):jQuery.validator.unobtrusive=a(jQuery)}(function(a){function e(a,e,n){a.rules[e]=n,a.message&&(a.messages[e]=a.message)}function n(a){return a.replace(/^\s+|\s+$/g,"").split(/\s*,\s*/g)}function t(a){return a.replace(/([!"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~])/g,"\\$1")}function r(a){return a.substr(0,a.lastIndexOf(".")+1)}function i(a,e){return 0===a.indexOf("*.")&&(a=a.replace("*.",e)),a}function o(e,n){var r=a(this).find("[data-valmsg-for='"+t(n[0].name)+"']"),i=r.attr("data-valmsg-replace"),o=i?a.parseJSON(i)!==!1:null;r.removeClass("field-validation-valid").addClass("field-validation-error"),e.data("unobtrusiveContainer",r),o?(r.empty(),e.removeClass("input-validation-error").appendTo(r)):e.hide()}function d(e,n){var t=a(this).find("[data-valmsg-summary=true]"),r=t.find("ul");r&&r.length&&n.errorList.length&&(r.empty(),t.addClass("validation-summary-errors").removeClass("validation-summary-valid"),a.each(n.errorList,function(){a("<li />").html(this.message).appendTo(r)}))}function s(e){var n=e.data("unobtrusiveContainer");if(n){var t=n.attr("data-valmsg-replace"),r=t?a.parseJSON(t):null;n.addClass("field-validation-valid").removeClass("field-validation-error"),e.removeData("unobtrusiveContainer"),r&&n.empty()}}function l(e){var n=a(this),t="__jquery_unobtrusive_validation_form_reset";if(!n.data(t)){n.data(t,!0);try{n.data("validator").resetForm()}finally{n.removeData(t)}n.find(".validation-summary-errors").addClass("validation-summary-valid").removeClass("validation-summary-errors"),n.find(".field-validation-error").addClass("field-validation-valid").removeClass("field-validation-error").removeData("unobtrusiveContainer").find(">*").removeData("unobtrusiveContainer")}}function u(e){var n=a(e),t=n.data(v),r=a.proxy(l,e),i=f.unobtrusive.options||{},u=function(n,t){var r=i[n];r&&a.isFunction(r)&&r.apply(e,t)};return t||(t={options:{errorClass:i.errorClass||"input-validation-error",errorElement:i.errorElement||"span",errorPlacement:function(){o.apply(e,arguments),u("errorPlacement",arguments)},invalidHandler:function(){d.apply(e,arguments),u("invalidHandler",arguments)},messages:{},rules:{},success:function(){s.apply(e,arguments),u("success",arguments)}},attachValidation:function(){n.off("reset."+v,r).on("reset."+v,r).validate(this.options)},validate:function(){return n.validate(),n.valid()}},n.data(v,t)),t}var m,f=a.validator,v="unobtrusiveValidation";return f.unobtrusive={adapters:[],parseElement:function(e,n){var t,r,i,o=a(e),d=o.parents("form")[0];d&&(t=u(d),t.options.rules[e.name]=r={},t.options.messages[e.name]=i={},a.each(this.adapters,function(){var n="data-val-"+this.name,t=o.attr(n),s={};void 0!==t&&(n+="-",a.each(this.params,function(){s[this]=o.attr(n+this)}),this.adapt({element:e,form:d,message:t,params:s,rules:r,messages:i}))}),a.extend(r,{__dummy__:!0}),n||t.attachValidation())},parse:function(e){var n=a(e),t=n.parents().addBack().filter("form").add(n.find("form")).has("[data-val=true]");n.find("[data-val=true]").each(function(){f.unobtrusive.parseElement(this,!0)}),t.each(function(){var a=u(this);a&&a.attachValidation()})}},m=f.unobtrusive.adapters,m.add=function(a,e,n){return n||(n=e,e=[]),this.push({name:a,params:e,adapt:n}),this},m.addBool=function(a,n){return this.add(a,function(t){e(t,n||a,!0)})},m.addMinMax=function(a,n,t,r,i,o){return this.add(a,[i||"min",o||"max"],function(a){var i=a.params.min,o=a.params.max;i&&o?e(a,r,[i,o]):i?e(a,n,i):o&&e(a,t,o)})},m.addSingleVal=function(a,n,t){return this.add(a,[n||"val"],function(r){e(r,t||a,r.params[n])})},f.addMethod("__dummy__",function(a,e,n){return!0}),f.addMethod("regex",function(a,e,n){var t;return!!this.optional(e)||(t=new RegExp(n).exec(a),t&&0===t.index&&t[0].length===a.length)}),f.addMethod("nonalphamin",function(a,e,n){var t;return n&&(t=a.match(/\W/g),t=t&&t.length>=n),t}),f.methods.extension?(m.addSingleVal("accept","mimtype"),m.addSingleVal("extension","extension")):m.addSingleVal("extension","extension","accept"),m.addSingleVal("regex","pattern"),m.addBool("creditcard").addBool("date").addBool("digits").addBool("email").addBool("number").addBool("url"),m.addMinMax("length","minlength","maxlength","rangelength").addMinMax("range","min","max","range"),m.addMinMax("minlength","minlength").addMinMax("maxlength","minlength","maxlength"),m.add("equalto",["other"],function(n){var o=r(n.element.name),d=n.params.other,s=i(d,o),l=a(n.form).find(":input").filter("[name='"+t(s)+"']")[0];e(n,"equalTo",l)}),m.add("required",function(a){"INPUT"===a.element.tagName.toUpperCase()&&"CHECKBOX"===a.element.type.toUpperCase()||e(a,"required",!0)}),m.add("remote",["url","type","additionalfields"],function(o){var d={url:o.params.url,type:o.params.type||"GET",data:{}},s=r(o.element.name);a.each(n(o.params.additionalfields||o.element.name),function(e,n){var r=i(n,s);d.data[r]=function(){var e=a(o.form).find(":input").filter("[name='"+t(r)+"']");return e.is(":checkbox")?e.filter(":checked").val()||e.filter(":hidden").val()||"":e.is(":radio")?e.filter(":checked").val()||"":e.val()}}),e(o,"remote",d)}),m.add("password",["min","nonalphamin","regex"],function(a){a.params.min&&e(a,"minlength",a.params.min),a.params.nonalphamin&&e(a,"nonalphamin",a.params.nonalphamin),a.params.regex&&e(a,"regex",a.params.regex)}),m.add("fileextensions",["extensions"],function(a){e(a,"extension",a.params.extensions)}),a(function(){f.unobtrusive.parse(document)}),f.unobtrusive});
/* 

jTable 2.4.0
http://www.jtable.org

---------------------------------------------------------------------------

Copyright (C) 2011-2014 by Halil İbrahim Kalkan (http://www.halilibrahimkalkan.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

/************************************************************************
* CORE jTable module                                                    *
*************************************************************************/
(function ($) {

    var unloadingPage;
    
    $(window).on('beforeunload', function () {
        unloadingPage = true;
    });
    $(window).on('unload', function () {
        unloadingPage = false;
    });

    $.widget("hik.jtable", {

        /************************************************************************
        * DEFAULT OPTIONS / EVENTS                                              *
        *************************************************************************/
        options: {

            //Options
            actions: {},
            fields: {},
            animationsEnabled: true,
            defaultDateFormat: 'yy-mm-dd',
            dialogShowEffect: 'fade',
            dialogHideEffect: 'fade',
            showCloseButton: false,
            loadingAnimationDelay: 500,
            saveUserPreferences: true,
            jqueryuiTheme: false,
            unAuthorizedRequestRedirectUrl: null,

            ajaxSettings: {
                type: 'POST',
                dataType: 'json'
            },

            toolbar: {
                hoverAnimation: true,
                hoverAnimationDuration: 60,
                hoverAnimationEasing: undefined,
                items: []
            },

            //Events
            closeRequested: function (event, data) { },
            formCreated: function (event, data) { },
            formSubmitting: function (event, data) { },
            formClosed: function (event, data) { },
            loadingRecords: function (event, data) { },
            recordsLoaded: function (event, data) { },
            rowInserted: function (event, data) { },
            rowsRemoved: function (event, data) { },

            //Localization
            messages: {
                serverCommunicationError: 'An error occured while communicating to the server.',
                loadingMessage: 'Loading records...',
                noDataAvailable: 'No data available!',
                areYouSure: 'Are you sure?',
                save: 'Save',
                saving: 'Saving',
                cancel: 'Cancel',
                error: 'Error',
                close: 'Close',
                cannotLoadOptionsFor: 'Can not load options for field {0}'
            }
        },

        /************************************************************************
        * PRIVATE FIELDS                                                        *
        *************************************************************************/

        _$mainContainer: null, //Reference to the main container of all elements that are created by this plug-in (jQuery object)

        _$titleDiv: null, //Reference to the title div (jQuery object)
        _$toolbarDiv: null, //Reference to the toolbar div (jQuery object)

        _$table: null, //Reference to the main <table> (jQuery object)
        _$tableBody: null, //Reference to <body> in the table (jQuery object)
        _$tableRows: null, //Array of all <tr> in the table (except "no data" row) (jQuery object array)

        _$busyDiv: null, //Reference to the div that is used to block UI while busy (jQuery object)
        _$busyMessageDiv: null, //Reference to the div that is used to show some message when UI is blocked (jQuery object)
        _$errorDialogDiv: null, //Reference to the error dialog div (jQuery object)

        _columnList: null, //Name of all data columns in the table (select column and command columns are not included) (string array)
        _fieldList: null, //Name of all fields of a record (defined in fields option) (string array)
        _keyField: null, //Name of the key field of a record (that is defined as 'key: true' in the fields option) (string)

        _firstDataColumnOffset: 0, //Start index of first record field in table columns (some columns can be placed before first data column, such as select checkbox column) (integer)
        _lastPostData: null, //Last posted data on load method (object)

        _cache: null, //General purpose cache dictionary (object)

        /************************************************************************
        * CONSTRUCTOR AND INITIALIZATION METHODS                                *
        *************************************************************************/

        /* Contructor.
        *************************************************************************/
        _create: function () {

            //Initialization
            this._normalizeFieldsOptions();
            this._initializeFields();
            this._createFieldAndColumnList();

            //Creating DOM elements
            this._createMainContainer();
            this._createTableTitle();
            this._createToolBar();
            this._createTable();
            this._createBusyPanel();
            this._createErrorDialogDiv();
            this._addNoDataRow();

            this._cookieKeyPrefix = this._generateCookieKeyPrefix();            
        },

        /* Normalizes some options for all fields (sets default values).
        *************************************************************************/
        _normalizeFieldsOptions: function () {
            var self = this;
            $.each(self.options.fields, function (fieldName, props) {
                self._normalizeFieldOptions(fieldName, props);
            });
        },

        /* Normalizes some options for a field (sets default values).
        *************************************************************************/
        _normalizeFieldOptions: function (fieldName, props) {
            if (props.listClass == undefined) {
                props.listClass = '';
            }
            if (props.inputClass == undefined) {
                props.inputClass = '';
            }

            //Convert dependsOn to array if it's a comma seperated lists
            if (props.dependsOn && $.type(props.dependsOn) === 'string') {
                var dependsOnArray = props.dependsOn.split(',');
                props.dependsOn = [];
                for (var i = 0; i < dependsOnArray.length; i++) {
                    props.dependsOn.push($.trim(dependsOnArray[i]));
                }
            }
        },

        /* Intializes some private variables.
        *************************************************************************/
        _initializeFields: function () {
            this._lastPostData = {};
            this._$tableRows = [];
            this._columnList = [];
            this._fieldList = [];
            this._cache = [];
        },

        /* Fills _fieldList, _columnList arrays and sets _keyField variable.
        *************************************************************************/
        _createFieldAndColumnList: function () {
            var self = this;

            $.each(self.options.fields, function (name, props) {

                //Add field to the field list
                self._fieldList.push(name);

                //Check if this field is the key field
                if (props.key == true) {
                    self._keyField = name;
                }

                //Add field to column list if it is shown in the table
                if (props.list != false && props.type != 'hidden') {
                    self._columnList.push(name);
                }
            });
        },

        /* Creates the main container div.
        *************************************************************************/
        _createMainContainer: function () {
            this._$mainContainer = $('<div />')
                .addClass('jtable-main-container')
                .appendTo(this.element);

            this._jqueryuiThemeAddClass(this._$mainContainer, 'ui-widget');
        },

        /* Creates title of the table if a title supplied in options.
        *************************************************************************/
        _createTableTitle: function () {
            var self = this;

            if (!self.options.title) {
                return;
            }

            var $titleDiv = $('<div />')
                .addClass('jtable-title')
                .appendTo(self._$mainContainer);

            self._jqueryuiThemeAddClass($titleDiv, 'ui-widget-header');

            $('<div />')
                .addClass('jtable-title-text')
                .appendTo($titleDiv)
                .append(self.options.title);

            if (self.options.showCloseButton) {

                var $textSpan = $('<span />')
                    .html(self.options.messages.close);

                $('<button></button>')
                    .addClass('jtable-command-button jtable-close-button')
                    .attr('title', self.options.messages.close)
                    .append($textSpan)
                    .appendTo($titleDiv)
                    .click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        self._onCloseRequested();
                    });
            }

            self._$titleDiv = $titleDiv;
        },

        /* Creates the table.
        *************************************************************************/
        _createTable: function () {
            this._$table = $('<table></table>')
                .addClass('jtable')
                .appendTo(this._$mainContainer);

            if (this.options.tableId) {
                this._$table.attr('id', this.options.tableId);
            }

            this._jqueryuiThemeAddClass(this._$table, 'ui-widget-content');

            this._createTableHead();
            this._createTableBody();
        },

        /* Creates header (all column headers) of the table.
        *************************************************************************/
        _createTableHead: function () {
            var $thead = $('<thead></thead>')
                .appendTo(this._$table);

            this._addRowToTableHead($thead);
        },

        /* Adds tr element to given thead element
        *************************************************************************/
        _addRowToTableHead: function ($thead) {
            var $tr = $('<tr></tr>')
                .appendTo($thead);

            this._addColumnsToHeaderRow($tr);
        },

        /* Adds column header cells to given tr element.
        *************************************************************************/
        _addColumnsToHeaderRow: function ($tr) {
            for (var i = 0; i < this._columnList.length; i++) {
                var fieldName = this._columnList[i];
                var $headerCell = this._createHeaderCellForField(fieldName, this.options.fields[fieldName]);
                $headerCell.appendTo($tr);
            }
        },

        /* Creates a header cell for given field.
        *  Returns th jQuery object.
        *************************************************************************/
        _createHeaderCellForField: function (fieldName, field) {
            field.width = field.width || '10%'; //default column width: 10%.

            var $headerTextSpan = $('<span />')
                .addClass('jtable-column-header-text')
                .html(field.title);

            var $headerContainerDiv = $('<div />')
                .addClass('jtable-column-header-container')
                .append($headerTextSpan);

            var $th = $('<th></th>')
                .addClass('jtable-column-header')
                .addClass(field.listClass)
                .css('width', field.width)
                .data('fieldName', fieldName)
                .append($headerContainerDiv);

            this._jqueryuiThemeAddClass($th, 'ui-state-default');

            return $th;
        },

        /* Creates an empty header cell that can be used as command column headers.
        *************************************************************************/
        _createEmptyCommandHeader: function () {
            var $th = $('<th></th>')
                .addClass('jtable-command-column-header')
                .css('width', '1%');

            this._jqueryuiThemeAddClass($th, 'ui-state-default');

            return $th;
        },

        /* Creates tbody tag and adds to the table.
        *************************************************************************/
        _createTableBody: function () {
            this._$tableBody = $('<tbody></tbody>').appendTo(this._$table);
        },

        /* Creates a div to block UI while jTable is busy.
        *************************************************************************/
        _createBusyPanel: function () {
            this._$busyMessageDiv = $('<div />').addClass('jtable-busy-message').prependTo(this._$mainContainer);
            this._$busyDiv = $('<div />').addClass('jtable-busy-panel-background').prependTo(this._$mainContainer);
            this._jqueryuiThemeAddClass(this._$busyMessageDiv, 'ui-widget-header');
            this._hideBusy();
        },

        /* Creates and prepares error dialog div.
        *************************************************************************/
        _createErrorDialogDiv: function () {
            var self = this;

            self._$errorDialogDiv = $('<div></div>').appendTo(self._$mainContainer);
            self._$errorDialogDiv.dialog({
                autoOpen: false,
                show: self.options.dialogShowEffect,
                hide: self.options.dialogHideEffect,
                modal: true,
                title: self.options.messages.error,
                buttons: [{
                    text: self.options.messages.close,
                    click: function () {
                        self._$errorDialogDiv.dialog('close');
                    }
                }]
            });
        },

        /************************************************************************
        * PUBLIC METHODS                                                        *
        *************************************************************************/

        /* Loads data using AJAX call, clears table and fills with new data.
        *************************************************************************/
        load: function (postData, completeCallback) {
            this._lastPostData = postData;
            this._reloadTable(completeCallback);
        },

        /* Refreshes (re-loads) table data with last postData.
        *************************************************************************/
        reload: function (completeCallback) {
            this._reloadTable(completeCallback);
        },

        /* Gets a jQuery row object according to given record key
        *************************************************************************/
        getRowByKey: function (key) {
            for (var i = 0; i < this._$tableRows.length; i++) {
                if (key == this._getKeyValueOfRecord(this._$tableRows[i].data('record'))) {
                    return this._$tableRows[i];
                }
            }

            return null;
        },

        /* Completely removes the table from it's container.
        *************************************************************************/
        destroy: function () {
            this.element.empty();
            $.Widget.prototype.destroy.call(this);
        },

        /************************************************************************
        * PRIVATE METHODS                                                       *
        *************************************************************************/

        /* Used to change options dynamically after initialization.
        *************************************************************************/
        _setOption: function (key, value) {

        },

        /* LOADING RECORDS  *****************************************************/

        /* Performs an AJAX call to reload data of the table.
        *************************************************************************/
        _reloadTable: function (completeCallback) {
            var self = this;

            var completeReload = function(data) {
                self._hideBusy();

                //Show the error message if server returns error
                if (data.Result != 'OK') {
                    self._showError(data.Message);
                    return;
                }

                //Re-generate table rows
                self._removeAllRows('reloading');
                self._addRecordsToTable(data.Records);

                self._onRecordsLoaded(data);

                //Call complete callback
                if (completeCallback) {
                    completeCallback();
                }
            };

            self._showBusy(self.options.messages.loadingMessage, self.options.loadingAnimationDelay); //Disable table since it's busy
            self._onLoadingRecords();

            //listAction may be a function, check if it is
            if ($.isFunction(self.options.actions.listAction)) {

                //Execute the function
                var funcResult = self.options.actions.listAction(self._lastPostData, self._createJtParamsForLoading());

                //Check if result is a jQuery Deferred object
                if (self._isDeferredObject(funcResult)) {
                    funcResult.done(function(data) {
                        completeReload(data);
                    }).fail(function() {
                        self._showError(self.options.messages.serverCommunicationError);
                    }).always(function() {
                        self._hideBusy();
                    });
                } else { //assume it's the data we're loading
                    completeReload(funcResult);
                }

            } else { //assume listAction as URL string.

                //Generate URL (with query string parameters) to load records
                var loadUrl = self._createRecordLoadUrl();

                //Load data from server using AJAX
                self._ajax({
                    url: loadUrl,
                    data: self._lastPostData,
                    success: function (data) {
                        completeReload(data);
                    },
                    error: function () {
                        self._hideBusy();
                        self._showError(self.options.messages.serverCommunicationError);
                    }
                });

            }
        },

        /* Creates URL to load records.
        *************************************************************************/
        _createRecordLoadUrl: function () {
            return this.options.actions.listAction;
        },

        _createJtParamsForLoading: function() {
            return {
                //Empty as default, paging, sorting or other extensions can override this method to add additional params to load request
            };
        },

        /* TABLE MANIPULATION METHODS *******************************************/

        /* Creates a row from given record
        *************************************************************************/
        _createRowFromRecord: function (record) {
            var $tr = $('<tr></tr>')
                .addClass('jtable-data-row')
                .attr('data-record-key', this._getKeyValueOfRecord(record))
                .data('record', record);

            this._addCellsToRowUsingRecord($tr);
            return $tr;
        },

        /* Adds all cells to given row.
        *************************************************************************/
        _addCellsToRowUsingRecord: function ($row) {
            var record = $row.data('record');
            for (var i = 0; i < this._columnList.length; i++) {
                this._createCellForRecordField(record, this._columnList[i])
                    .appendTo($row);
            }
        },

        /* Create a cell for given field.
        *************************************************************************/
        _createCellForRecordField: function (record, fieldName) {
            return $('<td></td>')
                .addClass(this.options.fields[fieldName].listClass)
                .append((this._getDisplayTextForRecordField(record, fieldName)));
        },

        /* Adds a list of records to the table.
        *************************************************************************/
        _addRecordsToTable: function (records) {
            var self = this;

            $.each(records, function (index, record) {
                self._addRow(self._createRowFromRecord(record));
            });

            self._refreshRowStyles();
        },

        /* Adds a single row to the table.
        * NOTE: THIS METHOD IS DEPRECATED AND WILL BE REMOVED FROM FEATURE RELEASES.
        * USE _addRow METHOD.
        *************************************************************************/
        _addRowToTable: function ($tableRow, index, isNewRow, animationsEnabled) {
            var options = {
                index: this._normalizeNumber(index, 0, this._$tableRows.length, this._$tableRows.length)
            };

            if (isNewRow == true) {
                options.isNewRow = true;
            }

            if (animationsEnabled == false) {
                options.animationsEnabled = false;
            }

            this._addRow($tableRow, options);
        },

        /* Adds a single row to the table.
        *************************************************************************/
        _addRow: function ($row, options) {
            //Set defaults
            options = $.extend({
                index: this._$tableRows.length,
                isNewRow: false,
                animationsEnabled: true
            }, options);

            //Remove 'no data' row if this is first row
            if (this._$tableRows.length <= 0) {
                this._removeNoDataRow();
            }

            //Add new row to the table according to it's index
            options.index = this._normalizeNumber(options.index, 0, this._$tableRows.length, this._$tableRows.length);
            if (options.index == this._$tableRows.length) {
                //add as last row
                this._$tableBody.append($row);
                this._$tableRows.push($row);
            } else if (options.index == 0) {
                //add as first row
                this._$tableBody.prepend($row);
                this._$tableRows.unshift($row);
            } else {
                //insert to specified index
                this._$tableRows[options.index - 1].after($row);
                this._$tableRows.splice(options.index, 0, $row);
            }

            this._onRowInserted($row, options.isNewRow);

            //Show animation if needed
            if (options.isNewRow) {
                this._refreshRowStyles();
                if (this.options.animationsEnabled && options.animationsEnabled) {
                    this._showNewRowAnimation($row);
                }
            }
        },

        /* Shows created animation for a table row
        * TODO: Make this animation cofigurable and changable
        *************************************************************************/
        _showNewRowAnimation: function ($tableRow) {
            var className = 'jtable-row-created';
            if (this.options.jqueryuiTheme) {
                className = className + ' ui-state-highlight';
            }

            $tableRow.addClass(className, 'slow', '', function () {
                $tableRow.removeClass(className, 5000);
            });
        },

        /* Removes a row or rows (jQuery selection) from table.
        *************************************************************************/
        _removeRowsFromTable: function ($rows, reason) {
            var self = this;

            //Check if any row specified
            if ($rows.length <= 0) {
                return;
            }

            //remove from DOM
            $rows.addClass('jtable-row-removed').remove();

            //remove from _$tableRows array
            $rows.each(function () {
                var index = self._findRowIndex($(this));
                if (index >= 0) {
                    self._$tableRows.splice(index, 1);
                }
            });

            self._onRowsRemoved($rows, reason);

            //Add 'no data' row if all rows removed from table
            if (self._$tableRows.length == 0) {
                self._addNoDataRow();
            }

            self._refreshRowStyles();
        },

        /* Finds index of a row in table.
        *************************************************************************/
        _findRowIndex: function ($row) {
            return this._findIndexInArray($row, this._$tableRows, function ($row1, $row2) {
                return $row1.data('record') == $row2.data('record');
            });
        },

        /* Removes all rows in the table and adds 'no data' row.
        *************************************************************************/
        _removeAllRows: function (reason) {
            //If no rows does exists, do nothing
            if (this._$tableRows.length <= 0) {
                return;
            }

            //Select all rows (to pass it on raising _onRowsRemoved event)
            var $rows = this._$tableBody.find('tr.jtable-data-row');

            //Remove all rows from DOM and the _$tableRows array
            this._$tableBody.empty();
            this._$tableRows = [];

            this._onRowsRemoved($rows, reason);

            //Add 'no data' row since we removed all rows
            this._addNoDataRow();
        },

        /* Adds "no data available" row to the table.
        *************************************************************************/
        _addNoDataRow: function () {
            if (this._$tableBody.find('>tr.jtable-no-data-row').length > 0) {
                return;
            }

            var $tr = $('<tr></tr>')
                .addClass('jtable-no-data-row')
                .appendTo(this._$tableBody);

            var totalColumnCount = this._$table.find('thead th').length;
            $('<td></td>')
                .attr('colspan', totalColumnCount)
                .html(this.options.messages.noDataAvailable)
                .appendTo($tr);
        },

        /* Removes "no data available" row from the table.
        *************************************************************************/
        _removeNoDataRow: function () {
            this._$tableBody.find('.jtable-no-data-row').remove();
        },

        /* Refreshes styles of all rows in the table
        *************************************************************************/
        _refreshRowStyles: function () {
            for (var i = 0; i < this._$tableRows.length; i++) {
                if (i % 2 == 0) {
                    this._$tableRows[i].addClass('jtable-row-even');
                } else {
                    this._$tableRows[i].removeClass('jtable-row-even');
                }
            }
        },

        /* RENDERING FIELD VALUES ***********************************************/

        /* Gets text for a field of a record according to it's type.
        *************************************************************************/
        _getDisplayTextForRecordField: function (record, fieldName) {
            var field = this.options.fields[fieldName];
            var fieldValue = record[fieldName];

            //if this is a custom field, call display function
            if (field.display) {
                return field.display({ record: record });
            }

            if (field.type == 'date') {
                return this._getDisplayTextForDateRecordField(field, fieldValue);
            } else if (field.type == 'checkbox') {
                return this._getCheckBoxTextForFieldByValue(fieldName, fieldValue);
            } else if (field.options) { //combobox or radio button list since there are options.
                var options = this._getOptionsForField(fieldName, {
                    record: record,
                    value: fieldValue,
                    source: 'list',
                    dependedValues: this._createDependedValuesUsingRecord(record, field.dependsOn)
                });
                return this._findOptionByValue(options, fieldValue).DisplayText;
            } else { //other types
                return fieldValue;
            }
        },

        /* Creates and returns an object that's properties are depended values of a record.
        *************************************************************************/
        _createDependedValuesUsingRecord: function (record, dependsOn) {
            if (!dependsOn) {
                return {};
            }

            var dependedValues = {};
            for (var i = 0; i < dependsOn.length; i++) {
                dependedValues[dependsOn[i]] = record[dependsOn[i]];
            }

            return dependedValues;
        },

        /* Finds an option object by given value.
        *************************************************************************/
        _findOptionByValue: function (options, value) {
            for (var i = 0; i < options.length; i++) {
                if (options[i].Value == value) {
                    return options[i];
                }
            }

            return {}; //no option found
        },

        /* Gets text for a date field.
        *************************************************************************/
        _getDisplayTextForDateRecordField: function (field, fieldValue) {
            if (!fieldValue) {
                return '';
            }

            var displayFormat = field.displayFormat || this.options.defaultDateFormat;
            var date = this._parseDate(fieldValue);
            return $.datepicker.formatDate(displayFormat, date);
        },

        /* Gets options for a field according to user preferences.
        *************************************************************************/
        _getOptionsForField: function (fieldName, funcParams) {
            var field = this.options.fields[fieldName];
            var optionsSource = field.options;

            if ($.isFunction(optionsSource)) {
                //prepare parameter to the function
                funcParams = $.extend(true, {
                    _cacheCleared: false,
                    dependedValues: {},
                    clearCache: function () {
                        this._cacheCleared = true;
                    }
                }, funcParams);

                //call function and get actual options source
                optionsSource = optionsSource(funcParams);
            }

            var options;

            //Build options according to it's source type
            if (typeof optionsSource == 'string') { //It is an Url to download options
                var cacheKey = 'options_' + fieldName + '_' + optionsSource; //create a unique cache key
                if (funcParams._cacheCleared || (!this._cache[cacheKey])) {
                    //if user calls clearCache() or options are not found in the cache, download options
                    this._cache[cacheKey] = this._buildOptionsFromArray(this._downloadOptions(fieldName, optionsSource));
                    this._sortFieldOptions(this._cache[cacheKey], field.optionsSorting);
                } else {
                    //found on cache..
                    //if this method (_getOptionsForField) is called to get option for a specific value (on funcParams.source == 'list')
                    //and this value is not in cached options, we need to re-download options to get the unfound (probably new) option.
                    if (funcParams.value != undefined) {
                        var optionForValue = this._findOptionByValue(this._cache[cacheKey], funcParams.value);
                        if (optionForValue.DisplayText == undefined) { //this value is not in cached options...
                            this._cache[cacheKey] = this._buildOptionsFromArray(this._downloadOptions(fieldName, optionsSource));
                            this._sortFieldOptions(this._cache[cacheKey], field.optionsSorting);
                        }
                    }
                }

                options = this._cache[cacheKey];
            } else if (jQuery.isArray(optionsSource)) { //It is an array of options
                options = this._buildOptionsFromArray(optionsSource);
                this._sortFieldOptions(options, field.optionsSorting);
            } else { //It is an object that it's properties are options
                options = this._buildOptionsArrayFromObject(optionsSource);
                this._sortFieldOptions(options, field.optionsSorting);
            }

            return options;
        },

        /* Download options for a field from server.
        *************************************************************************/
        _downloadOptions: function (fieldName, url) {
            var self = this;
            var options = [];

            self._ajax({
                url: url,
                async: false,
                success: function (data) {
                    if (data.Result != 'OK') {
                        self._showError(data.Message);
                        return;
                    }

                    options = data.Options;
                },
                error: function () {
                    var errMessage = self._formatString(self.options.messages.cannotLoadOptionsFor, fieldName);
                    self._showError(errMessage);
                }
            });

            return options;
        },

        /* Sorts given options according to sorting parameter.
        *  sorting can be: 'value', 'value-desc', 'text' or 'text-desc'.
        *************************************************************************/
        _sortFieldOptions: function (options, sorting) {

            if ((!options) || (!options.length) || (!sorting)) {
                return;
            }

            //Determine using value of text
            var dataSelector;
            if (sorting.indexOf('value') == 0) {
                dataSelector = function (option) {
                    return option.Value;
                };
            } else { //assume as text
                dataSelector = function (option) {
                    return option.DisplayText;
                };
            }

            var compareFunc;
            if ($.type(dataSelector(options[0])) == 'string') {
                compareFunc = function (option1, option2) {
                    return dataSelector(option1).localeCompare(dataSelector(option2));
                };
            } else { //asuume as numeric
                compareFunc = function (option1, option2) {
                    return dataSelector(option1) - dataSelector(option2);
                };
            }

            if (sorting.indexOf('desc') > 0) {
                options.sort(function (a, b) {
                    return compareFunc(b, a);
                });
            } else { //assume as asc
                options.sort(function (a, b) {
                    return compareFunc(a, b);
                });
            }
        },

        /* Creates an array of options from given object.
        *************************************************************************/
        _buildOptionsArrayFromObject: function (options) {
            var list = [];

            $.each(options, function (propName, propValue) {
                list.push({
                    Value: propName,
                    DisplayText: propValue
                });
            });

            return list;
        },

        /* Creates array of options from giving options array.
        *************************************************************************/
        _buildOptionsFromArray: function (optionsArray) {
            var list = [];

            for (var i = 0; i < optionsArray.length; i++) {
                if ($.isPlainObject(optionsArray[i])) {
                    list.push(optionsArray[i]);
                } else { //assumed as primitive type (int, string...)
                    list.push({
                        Value: optionsArray[i],
                        DisplayText: optionsArray[i]
                    });
                }
            }

            return list;
        },

        /* Parses given date string to a javascript Date object.
        *  Given string must be formatted one of the samples shown below:
        *  /Date(1320259705710)/
        *  2011-01-01 20:32:42 (YYYY-MM-DD HH:MM:SS)
        *  2011-01-01 (YYYY-MM-DD)
        *************************************************************************/
        _parseDate: function (dateString) {
            if (dateString.indexOf('Date') >= 0) { //Format: /Date(1320259705710)/
                return new Date(
                    parseInt(dateString.substr(6), 10)
                );
            } else if (dateString.length == 10) { //Format: 2011-01-01
                return new Date(
                    parseInt(dateString.substr(0, 4), 10),
                    parseInt(dateString.substr(5, 2), 10) - 1,
                    parseInt(dateString.substr(8, 2), 10)
                );
            } else if (dateString.length == 19) { //Format: 2011-01-01 20:32:42
                return new Date(
                    parseInt(dateString.substr(0, 4), 10),
                    parseInt(dateString.substr(5, 2), 10) - 1,
                    parseInt(dateString.substr(8, 2, 10)),
                    parseInt(dateString.substr(11, 2), 10),
                    parseInt(dateString.substr(14, 2), 10),
                    parseInt(dateString.substr(17, 2), 10)
                );
            } else {
                this._logWarn('Given date is not properly formatted: ' + dateString);
                return 'format error!';
            }
        },

        /* TOOL BAR *************************************************************/

        /* Creates the toolbar.
        *************************************************************************/
        _createToolBar: function () {
            this._$toolbarDiv = $('<div />')
            .addClass('jtable-toolbar')
            .appendTo(this._$titleDiv);

            for (var i = 0; i < this.options.toolbar.items.length; i++) {
                this._addToolBarItem(this.options.toolbar.items[i]);
            }
        },

        /* Adds a new item to the toolbar.
        *************************************************************************/
        _addToolBarItem: function (item) {

            //Check if item is valid
            if ((item == undefined) || (item.text == undefined && item.icon == undefined)) {
                this._logWarn('Can not add tool bar item since it is not valid!');
                this._logWarn(item);
                return null;
            }

            var $toolBarItem = $('<span></span>')
                .addClass('jtable-toolbar-item')
                .appendTo(this._$toolbarDiv);

            this._jqueryuiThemeAddClass($toolBarItem, 'ui-widget ui-state-default ui-corner-all', 'ui-state-hover');

            //cssClass property
            if (item.cssClass) {
                $toolBarItem
                    .addClass(item.cssClass);
            }

            //tooltip property
            if (item.tooltip) {
                $toolBarItem
                    .attr('title', item.tooltip);
            }

            //icon property
            if (item.icon) {
                var $icon = $('<span class="jtable-toolbar-item-icon"></span>').appendTo($toolBarItem);
                if (item.icon === true) {
                    //do nothing
                } else if ($.type(item.icon === 'string')) {
                    $icon.css('background', 'url("' + item.icon + '")');
                }
            }

            //text property
            if (item.text) {
                $('<span class=""></span>')
                    .html(item.text)
                    .addClass('jtable-toolbar-item-text').appendTo($toolBarItem);
            }

            //click event
            if (item.click) {
                $toolBarItem.click(function () {
                    item.click();
                });
            }

            //set hover animation parameters
            var hoverAnimationDuration = undefined;
            var hoverAnimationEasing = undefined;
            if (this.options.toolbar.hoverAnimation) {
                hoverAnimationDuration = this.options.toolbar.hoverAnimationDuration;
                hoverAnimationEasing = this.options.toolbar.hoverAnimationEasing;
            }

            //change class on hover
            $toolBarItem.hover(function () {
                $toolBarItem.addClass('jtable-toolbar-item-hover', hoverAnimationDuration, hoverAnimationEasing);
            }, function () {
                $toolBarItem.removeClass('jtable-toolbar-item-hover', hoverAnimationDuration, hoverAnimationEasing);
            });

            return $toolBarItem;
        },

        /* ERROR DIALOG *********************************************************/

        /* Shows error message dialog with given message.
        *************************************************************************/
        _showError: function (message) {
            this._$errorDialogDiv.html(message).dialog('open');
        },

        /* BUSY PANEL ***********************************************************/

        /* Shows busy indicator and blocks table UI.
        * TODO: Make this cofigurable and changable
        *************************************************************************/
        _setBusyTimer: null,
        _showBusy: function (message, delay) {
            var self = this;  //

            //Show a transparent overlay to prevent clicking to the table
            self._$busyDiv
                .width(self._$mainContainer.width())
                .height(self._$mainContainer.height())
                .addClass('jtable-busy-panel-background-invisible')
                .show();

            var makeVisible = function () {
                self._$busyDiv.removeClass('jtable-busy-panel-background-invisible');
                self._$busyMessageDiv.html(message).show();
            };

            if (delay) {
                if (self._setBusyTimer) {
                    return;
                }

                self._setBusyTimer = setTimeout(makeVisible, delay);
            } else {
                makeVisible();
            }
        },

        /* Hides busy indicator and unblocks table UI.
        *************************************************************************/
        _hideBusy: function () {
            clearTimeout(this._setBusyTimer);
            this._setBusyTimer = null;
            this._$busyDiv.hide();
            this._$busyMessageDiv.html('').hide();
        },

        /* Returns true if jTable is busy.
        *************************************************************************/
        _isBusy: function () {
            return this._$busyMessageDiv.is(':visible');
        },

        /* Adds jQueryUI class to an item.
        *************************************************************************/
        _jqueryuiThemeAddClass: function ($elm, className, hoverClassName) {
            if (!this.options.jqueryuiTheme) {
                return;
            }

            $elm.addClass(className);

            if (hoverClassName) {
                $elm.hover(function () {
                    $elm.addClass(hoverClassName);
                }, function () {
                    $elm.removeClass(hoverClassName);
                });
            }
        },

        /* COMMON METHODS *******************************************************/

        /* Performs an AJAX call to specified URL.
        * THIS METHOD IS DEPRECATED AND WILL BE REMOVED FROM FEATURE RELEASES.
        * USE _ajax METHOD.
        *************************************************************************/
        _performAjaxCall: function (url, postData, async, success, error) {
            this._ajax({
                url: url,
                data: postData,
                async: async,
                success: success,
                error: error
            });
        },

        _unAuthorizedRequestHandler: function() {
            if (this.options.unAuthorizedRequestRedirectUrl) {
                location.href = this.options.unAuthorizedRequestRedirectUrl;
            } else {
                location.reload(true);
            }
        },

        /* This method is used to perform AJAX calls in jTable instead of direct
        * usage of jQuery.ajax method.
        *************************************************************************/
        _ajax: function (options) {
            var self = this;

            //Handlers for HTTP status codes
            var opts = {
                statusCode: {
                    401: function () { //Unauthorized
                        self._unAuthorizedRequestHandler();
                    }
                }
            };

            opts = $.extend(opts, this.options.ajaxSettings, options);

            //Override success
            opts.success = function (data) {
                //Checking for Authorization error
                if (data && data.UnAuthorizedRequest == true) {
                    self._unAuthorizedRequestHandler();
                }

                if (options.success) {
                    options.success(data);
                }
            };

            //Override error
            opts.error = function (jqXHR, textStatus, errorThrown) {
                if (unloadingPage) {
                    jqXHR.abort();
                    return;
                }
                
                if (options.error) {
                    options.error(arguments);
                }
            };

            //Override complete
            opts.complete = function () {
                if (options.complete) {
                    options.complete();
                }
            };

            $.ajax(opts);
        },

        /* Gets value of key field of a record.
        *************************************************************************/
        _getKeyValueOfRecord: function (record) {
            return record[this._keyField];
        },

        /************************************************************************
        * COOKIE                                                                *
        *************************************************************************/

        /* Sets a cookie with given key.
        *************************************************************************/
        _setCookie: function (key, value) {
            key = this._cookieKeyPrefix + key;

            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 30);
            document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + "; expires=" + expireDate.toUTCString();
        },

        /* Gets a cookie with given key.
        *************************************************************************/
        _getCookie: function (key) {
            key = this._cookieKeyPrefix + key;

            var equalities = document.cookie.split('; ');
            for (var i = 0; i < equalities.length; i++) {
                if (!equalities[i]) {
                    continue;
                }

                var splitted = equalities[i].split('=');
                if (splitted.length != 2) {
                    continue;
                }

                if (decodeURIComponent(splitted[0]) === key) {
                    return decodeURIComponent(splitted[1] || '');
                }
            }

            return null;
        },

        /* Generates a hash key to be prefix for all cookies for this jtable instance.
        *************************************************************************/
        _generateCookieKeyPrefix: function () {

            var simpleHash = function (value) {
                var hash = 0;
                if (value.length == 0) {
                    return hash;
                }

                for (var i = 0; i < value.length; i++) {
                    var ch = value.charCodeAt(i);
                    hash = ((hash << 5) - hash) + ch;
                    hash = hash & hash;
                }

                return hash;
            };

            var strToHash = '';
            if (this.options.tableId) {
                strToHash = strToHash + this.options.tableId + '#';
            }

            strToHash = strToHash + this._columnList.join('$') + '#c' + this._$table.find('thead th').length;
            return 'jtable#' + simpleHash(strToHash);
        },

        /************************************************************************
        * EVENT RAISING METHODS                                                 *
        *************************************************************************/

        _onLoadingRecords: function () {
            this._trigger("loadingRecords", null, {});
        },

        _onRecordsLoaded: function (data) {
            this._trigger("recordsLoaded", null, { records: data.Records, serverResponse: data });
        },

        _onRowInserted: function ($row, isNewRow) {
            this._trigger("rowInserted", null, { row: $row, record: $row.data('record'), isNewRow: isNewRow });
        },

        _onRowsRemoved: function ($rows, reason) {
            this._trigger("rowsRemoved", null, { rows: $rows, reason: reason });
        },

        _onCloseRequested: function () {
            this._trigger("closeRequested", null, {});
        }

    });

}(jQuery));


/************************************************************************
* Some UTULITY methods used by jTable                                   *
*************************************************************************/
(function ($) {

    $.extend(true, $.hik.jtable.prototype, {

        /* Gets property value of an object recursively.
        *************************************************************************/
        _getPropertyOfObject: function (obj, propName) {
            if (propName.indexOf('.') < 0) {
                return obj[propName];
            } else {
                var preDot = propName.substring(0, propName.indexOf('.'));
                var postDot = propName.substring(propName.indexOf('.') + 1);
                return this._getPropertyOfObject(obj[preDot], postDot);
            }
        },

        /* Sets property value of an object recursively.
        *************************************************************************/
        _setPropertyOfObject: function (obj, propName, value) {
            if (propName.indexOf('.') < 0) {
                obj[propName] = value;
            } else {
                var preDot = propName.substring(0, propName.indexOf('.'));
                var postDot = propName.substring(propName.indexOf('.') + 1);
                this._setPropertyOfObject(obj[preDot], postDot, value);
            }
        },

        /* Inserts a value to an array if it does not exists in the array.
        *************************************************************************/
        _insertToArrayIfDoesNotExists: function (array, value) {
            if ($.inArray(value, array) < 0) {
                array.push(value);
            }
        },

        /* Finds index of an element in an array according to given comparision function
        *************************************************************************/
        _findIndexInArray: function (value, array, compareFunc) {

            //If not defined, use default comparision
            if (!compareFunc) {
                compareFunc = function (a, b) {
                    return a == b;
                };
            }

            for (var i = 0; i < array.length; i++) {
                if (compareFunc(value, array[i])) {
                    return i;
                }
            }

            return -1;
        },

        /* Normalizes a number between given bounds or sets to a defaultValue
        *  if it is undefined
        *************************************************************************/
        _normalizeNumber: function (number, min, max, defaultValue) {
            if (number == undefined || number == null || isNaN(number)) {
                return defaultValue;
            }

            if (number < min) {
                return min;
            }

            if (number > max) {
                return max;
            }

            return number;
        },

        /* Formats a string just like string.format in c#.
        *  Example:
        *  _formatString('Hello {0}','Halil') = 'Hello Halil'
        *************************************************************************/
        _formatString: function () {
            if (arguments.length == 0) {
                return null;
            }

            var str = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                var placeHolder = '{' + (i - 1) + '}';
                str = str.replace(placeHolder, arguments[i]);
            }

            return str;
        },

        /* Checks if given object is a jQuery Deferred object.
         */
        _isDeferredObject: function (obj) {
            return obj.then && obj.done && obj.fail;
        },

        //Logging methods ////////////////////////////////////////////////////////

        _logDebug: function (text) {
            if (!window.console) {
                return;
            }

            console.log('jTable DEBUG: ' + text);
        },

        _logInfo: function (text) {
            if (!window.console) {
                return;
            }

            console.log('jTable INFO: ' + text);
        },

        _logWarn: function (text) {
            if (!window.console) {
                return;
            }

            console.log('jTable WARNING: ' + text);
        },

        _logError: function (text) {
            if (!window.console) {
                return;
            }

            console.log('jTable ERROR: ' + text);
        }

    });

    /* Fix for array.indexOf method in IE7.
     * This code is taken from http://www.tutorialspoint.com/javascript/array_indexof.htm */
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (elt) {
            var len = this.length;
            var from = Number(arguments[1]) || 0;
            from = (from < 0)
                 ? Math.ceil(from)
                 : Math.floor(from);
            if (from < 0)
                from += len;
            for (; from < len; from++) {
                if (from in this &&
                    this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

})(jQuery);


/************************************************************************
* FORMS extension for jTable (base for edit/create forms)               *
*************************************************************************/
(function ($) {

    $.extend(true, $.hik.jtable.prototype, {

        /************************************************************************
        * PRIVATE METHODS                                                       *
        *************************************************************************/

        /* Submits a form asynchronously using AJAX.
        *  This method is needed, since form submitting logic can be overrided
        *  by extensions.
        *************************************************************************/
        _submitFormUsingAjax: function (url, formData, success, error) {
            this._ajax({
                url: url,
                data: formData,
                success: success,
                error: error
            });
        },

        /* Creates label for an input element.
        *************************************************************************/
        _createInputLabelForRecordField: function (fieldName) {
            //TODO: May create label tag instead of a div.
            return $('<div />')
                .addClass('jtable-input-label')
                .html(this.options.fields[fieldName].inputTitle || this.options.fields[fieldName].title);
        },

        /* Creates an input element according to field type.
        *************************************************************************/
        _createInputForRecordField: function (funcParams) {
            var fieldName = funcParams.fieldName,
                value = funcParams.value,
                record = funcParams.record,
                formType = funcParams.formType,
                form = funcParams.form;

            //Get the field
            var field = this.options.fields[fieldName];

            //If value if not supplied, use defaultValue of the field
            if (value == undefined || value == null) {
                value = field.defaultValue;
            }

            //Use custom function if supplied
            if (field.input) {
                var $input = $(field.input({
                    value: value,
                    record: record,
                    formType: formType,
                    form: form
                }));

                //Add id attribute if does not exists
                if (!$input.attr('id')) {
                    $input.attr('id', 'Edit-' + fieldName);
                }

                //Wrap input element with div
                return $('<div />')
                    .addClass('jtable-input jtable-custom-input')
                    .append($input);
            }

            //Create input according to field type
            if (field.type == 'date') {
                return this._createDateInputForField(field, fieldName, value);
            } else if (field.type == 'textarea') {
                return this._createTextAreaForField(field, fieldName, value);
            } else if (field.type == 'password') {
                return this._createPasswordInputForField(field, fieldName, value);
            } else if (field.type == 'checkbox') {
                return this._createCheckboxForField(field, fieldName, value);
            } else if (field.options) {
                if (field.type == 'radiobutton') {
                    return this._createRadioButtonListForField(field, fieldName, value, record, formType);
                } else {
                    return this._createDropDownListForField(field, fieldName, value, record, formType, form);
                }
            } else {
                return this._createTextInputForField(field, fieldName, value);
            }
        },

        //Creates a hidden input element with given name and value.
        _createInputForHidden: function (fieldName, value) {
            if (value == undefined) {
                value = "";
            }

            return $('<input type="hidden" name="' + fieldName + '" id="Edit-' + fieldName + '"></input>')
                .val(value);
        },

        /* Creates a date input for a field.
        *************************************************************************/
        _createDateInputForField: function (field, fieldName, value) {
            var $input = $('<input class="' + field.inputClass + '" id="Edit-' + fieldName + '" type="text" name="' + fieldName + '"></input>');
            if(value != undefined) {
                $input.val(value);
            }
            
            var displayFormat = field.displayFormat || this.options.defaultDateFormat;
            $input.datepicker({ dateFormat: displayFormat });
            return $('<div />')
                .addClass('jtable-input jtable-date-input')
                .append($input);
        },

        /* Creates a textarea element for a field.
        *************************************************************************/
        _createTextAreaForField: function (field, fieldName, value) {
            var $textArea = $('<textarea class="' + field.inputClass + '" id="Edit-' + fieldName + '" name="' + fieldName + '"></textarea>');
            if (value != undefined) {
                $textArea.val(value);
            }
            
            return $('<div />')
                .addClass('jtable-input jtable-textarea-input')
                .append($textArea);
        },

        /* Creates a standart textbox for a field.
        *************************************************************************/
        _createTextInputForField: function (field, fieldName, value) {
            var $input = $('<input class="' + field.inputClass + '" id="Edit-' + fieldName + '" type="text" name="' + fieldName + '"></input>');
            if (value != undefined) {
                $input.val(value);
            }
            
            return $('<div />')
                .addClass('jtable-input jtable-text-input')
                .append($input);
        },

        /* Creates a password input for a field.
        *************************************************************************/
        _createPasswordInputForField: function (field, fieldName, value) {
            var $input = $('<input class="' + field.inputClass + '" id="Edit-' + fieldName + '" type="password" name="' + fieldName + '"></input>');
            if (value != undefined) {
                $input.val(value);
            }
            
            return $('<div />')
                .addClass('jtable-input jtable-password-input')
                .append($input);
        },

        /* Creates a checkboxfor a field.
        *************************************************************************/
        _createCheckboxForField: function (field, fieldName, value) {
            var self = this;

            //If value is undefined, get unchecked state's value
            if (value == undefined) {
                value = self._getCheckBoxPropertiesForFieldByState(fieldName, false).Value;
            }

            //Create a container div
            var $containerDiv = $('<div />')
                .addClass('jtable-input jtable-checkbox-input');

            //Create checkbox and check if needed
            var $checkBox = $('<input class="' + field.inputClass + '" id="Edit-' + fieldName + '" type="checkbox" name="' + fieldName + '" />')
                .appendTo($containerDiv);
            if (value != undefined) {
                $checkBox.val(value);
            }

            //Create display text of checkbox for current state
            var $textSpan = $('<span>' + (field.formText || self._getCheckBoxTextForFieldByValue(fieldName, value)) + '</span>')
                .appendTo($containerDiv);

            //Check the checkbox if it's value is checked-value
            if (self._getIsCheckBoxSelectedForFieldByValue(fieldName, value)) {
                $checkBox.attr('checked', 'checked');
            }

            //This method sets checkbox's value and text according to state of the checkbox
            var refreshCheckBoxValueAndText = function () {
                var checkboxProps = self._getCheckBoxPropertiesForFieldByState(fieldName, $checkBox.is(':checked'));
                $checkBox.attr('value', checkboxProps.Value);
                $textSpan.html(field.formText || checkboxProps.DisplayText);
            };

            //Register to click event to change display text when state of checkbox is changed.
            $checkBox.click(function () {
                refreshCheckBoxValueAndText();
            });

            //Change checkbox state when clicked to text
            if (field.setOnTextClick != false) {
                $textSpan
                    .addClass('jtable-option-text-clickable')
                    .click(function () {
                        if ($checkBox.is(':checked')) {
                            $checkBox.attr('checked', false);
                        } else {
                            $checkBox.attr('checked', true);
                        }

                        refreshCheckBoxValueAndText();
                    });
            }

            return $containerDiv;
        },

        /* Creates a drop down list (combobox) input element for a field.
        *************************************************************************/
        _createDropDownListForField: function (field, fieldName, value, record, source, form) {

            //Create a container div
            var $containerDiv = $('<div />')
                .addClass('jtable-input jtable-dropdown-input');

            //Create select element
            var $select = $('<select class="' + field.inputClass + '" id="Edit-' + fieldName + '" name="' + fieldName + '"></select>')
                .appendTo($containerDiv);

            //add options
            var options = this._getOptionsForField(fieldName, {
                record: record,
                source: source,
                form: form,
                dependedValues: this._createDependedValuesUsingForm(form, field.dependsOn)
            });

            this._fillDropDownListWithOptions($select, options, value);

            return $containerDiv;
        },
        
        /* Fills a dropdown list with given options.
        *************************************************************************/
        _fillDropDownListWithOptions: function ($select, options, value) {
            $select.empty();
            for (var i = 0; i < options.length; i++) {
                $('<option' + (options[i].Value == value ? ' selected="selected"' : '') + '>' + options[i].DisplayText + '</option>')
                    .val(options[i].Value)
                    .appendTo($select);
            }
        },

        /* Creates depended values object from given form.
        *************************************************************************/
        _createDependedValuesUsingForm: function ($form, dependsOn) {
            if (!dependsOn) {
                return {};
            }

            var dependedValues = {};

            for (var i = 0; i < dependsOn.length; i++) {
                var dependedField = dependsOn[i];

                var $dependsOn = $form.find('select[name=' + dependedField + ']');
                if ($dependsOn.length <= 0) {
                    continue;
                }

                dependedValues[dependedField] = $dependsOn.val();
            }


            return dependedValues;
        },

        /* Creates a radio button list for a field.
        *************************************************************************/
        _createRadioButtonListForField: function (field, fieldName, value, record, source) {
            var $containerDiv = $('<div />')
                .addClass('jtable-input jtable-radiobuttonlist-input');

            var options = this._getOptionsForField(fieldName, {
                record: record,
                source: source
            });

            $.each(options, function(i, option) {
                var $radioButtonDiv = $('<div class=""></div>')
                    .addClass('jtable-radio-input')
                    .appendTo($containerDiv);

                var $radioButton = $('<input type="radio" id="Edit-' + fieldName + '-' + i + '" class="' + field.inputClass + '" name="' + fieldName + '"' + ((option.Value == (value + '')) ? ' checked="true"' : '') + ' />')
                    .val(option.Value)
                    .appendTo($radioButtonDiv);

                var $textSpan = $('<span></span>')
                    .html(option.DisplayText)
                    .appendTo($radioButtonDiv);

                if (field.setOnTextClick != false) {
                    $textSpan
                        .addClass('jtable-option-text-clickable')
                        .click(function () {
                            if (!$radioButton.is(':checked')) {
                                $radioButton.attr('checked', true);
                            }
                        });
                }
            });

            return $containerDiv;
        },

        /* Gets display text for a checkbox field.
        *************************************************************************/
        _getCheckBoxTextForFieldByValue: function (fieldName, value) {
            return this.options.fields[fieldName].values[value];
        },

        /* Returns true if given field's value must be checked state.
        *************************************************************************/
        _getIsCheckBoxSelectedForFieldByValue: function (fieldName, value) {
            return (this._createCheckBoxStateArrayForFieldWithCaching(fieldName)[1].Value.toString() == value.toString());
        },

        /* Gets an object for a checkbox field that has Value and DisplayText
        *  properties.
        *************************************************************************/
        _getCheckBoxPropertiesForFieldByState: function (fieldName, checked) {
            return this._createCheckBoxStateArrayForFieldWithCaching(fieldName)[(checked ? 1 : 0)];
        },

        /* Calls _createCheckBoxStateArrayForField with caching.
        *************************************************************************/
        _createCheckBoxStateArrayForFieldWithCaching: function (fieldName) {
            var cacheKey = 'checkbox_' + fieldName;
            if (!this._cache[cacheKey]) {

                this._cache[cacheKey] = this._createCheckBoxStateArrayForField(fieldName);
            }

            return this._cache[cacheKey];
        },

        /* Creates a two element array of objects for states of a checkbox field.
        *  First element for unchecked state, second for checked state.
        *  Each object has two properties: Value and DisplayText
        *************************************************************************/
        _createCheckBoxStateArrayForField: function (fieldName) {
            var stateArray = [];
            var currentIndex = 0;
            $.each(this.options.fields[fieldName].values, function (propName, propValue) {
                if (currentIndex++ < 2) {
                    stateArray.push({ 'Value': propName, 'DisplayText': propValue });
                }
            });

            return stateArray;
        },

        /* Searches a form for dependend dropdowns and makes them cascaded.
        */
        _makeCascadeDropDowns: function ($form, record, source) {
            var self = this;

            $form.find('select') //for each combobox
                .each(function () {
                    var $thisDropdown = $(this);

                    //get field name
                    var fieldName = $thisDropdown.attr('name');
                    if (!fieldName) {
                        return;
                    }

                    var field = self.options.fields[fieldName];
                    
                    //check if this combobox depends on others
                    if (!field.dependsOn) {
                        return;
                    }

                    //for each dependency
                    $.each(field.dependsOn, function (index, dependsOnField) {
                        //find the depended combobox
                        var $dependsOnDropdown = $form.find('select[name=' + dependsOnField + ']');
                        //when depended combobox changes
                        $dependsOnDropdown.change(function () {

                            //Refresh options
                            var funcParams = {
                                record: record,
                                source: source,
                                form: $form,
                                dependedValues: {}
                            };
                            funcParams.dependedValues = self._createDependedValuesUsingForm($form, field.dependsOn);
                            var options = self._getOptionsForField(fieldName, funcParams);

                            //Fill combobox with new options
                            self._fillDropDownListWithOptions($thisDropdown, options, undefined);

                            //Thigger change event to refresh multi cascade dropdowns.
                            $thisDropdown.change();
                        });
                    });
                });
        },

        /* Updates values of a record from given form
        *************************************************************************/
        _updateRecordValuesFromForm: function (record, $form) {
            for (var i = 0; i < this._fieldList.length; i++) {
                var fieldName = this._fieldList[i];
                var field = this.options.fields[fieldName];

                //Do not update non-editable fields
                if (field.edit == false) {
                    continue;
                }

                //Get field name and the input element of this field in the form
                var $inputElement = $form.find('[name="' + fieldName + '"]');
                if ($inputElement.length <= 0) {
                    continue;
                }

                //Update field in record according to it's type
                if (field.type == 'date') {
                    var dateVal = $inputElement.val();
                    if (dateVal) {
                        var displayFormat = field.displayFormat || this.options.defaultDateFormat;
                        try {
                            var date = $.datepicker.parseDate(displayFormat, dateVal);
                            record[fieldName] = '/Date(' + date.getTime() + ')/';
                        } catch (e) {
                            //TODO: Handle incorrect/different date formats
                            this._logWarn('Date format is incorrect for field ' + fieldName + ': ' + dateVal);
                            record[fieldName] = undefined;
                        }
                    } else {
                        this._logDebug('Date is empty for ' + fieldName);
                        record[fieldName] = undefined; //TODO: undefined, null or empty string?
                    }
                } else if (field.options && field.type == 'radiobutton') {
                    var $checkedElement = $inputElement.filter(':checked');
                    if ($checkedElement.length) {
                        record[fieldName] = $checkedElement.val();
                    } else {
                        record[fieldName] = undefined;
                    }
                } else {
                    record[fieldName] = $inputElement.val();
                }
            }
        },

        /* Sets enabled/disabled state of a dialog button.
        *************************************************************************/
        _setEnabledOfDialogButton: function ($button, enabled, buttonText) {
            if (!$button) {
                return;
            }

            if (enabled != false) {
                $button
                    .removeAttr('disabled')
                    .removeClass('ui-state-disabled');
            } else {
                $button
                    .attr('disabled', 'disabled')
                    .addClass('ui-state-disabled');
            }

            if (buttonText) {
                $button
                    .find('span')
                    .text(buttonText);
            }
        }

    });

})(jQuery);


/************************************************************************
* CREATE RECORD extension for jTable                                    *
*************************************************************************/
(function ($) {

    //Reference to base object members
    var base = {
        _create: $.hik.jtable.prototype._create
    };

    //extension members
    $.extend(true, $.hik.jtable.prototype, {

        /************************************************************************
        * DEFAULT OPTIONS / EVENTS                                              *
        *************************************************************************/
        options: {

            //Events
            recordAdded: function (event, data) { },

            //Localization
            messages: {
                addNewRecord: 'Add new record'
            }
        },

        /************************************************************************
        * PRIVATE FIELDS                                                        *
        *************************************************************************/

        _$addRecordDiv: null, //Reference to the adding new record dialog div (jQuery object)

        /************************************************************************
        * CONSTRUCTOR                                                           *
        *************************************************************************/

        /* Overrides base method to do create-specific constructions.
        *************************************************************************/
        _create: function () {
            base._create.apply(this, arguments);

            if (!this.options.actions.createAction) {
                return;
            }

            this._createAddRecordDialogDiv();
        },

        /* Creates and prepares add new record dialog div
        *************************************************************************/
        _createAddRecordDialogDiv: function () {
            var self = this;

            //Create a div for dialog and add to container element
            self._$addRecordDiv = $('<div />')
                .appendTo(self._$mainContainer);

            //Prepare dialog
            self._$addRecordDiv.dialog({
                autoOpen: false,
                show: self.options.dialogShowEffect,
                hide: self.options.dialogHideEffect,
                width: 'auto',
                minWidth: '300',
                modal: true,
                title: self.options.messages.addNewRecord,
                buttons:
                        [{ //Cancel button
                            text: self.options.messages.cancel,
                            click: function () {
                                self._$addRecordDiv.dialog('close');
                            }
                        }, { //Save button
                            id: 'AddRecordDialogSaveButton',
                            text: self.options.messages.save,
                            click: function () {
                                self._onSaveClickedOnCreateForm();
                            }
                        }],
                close: function () {
                    var $addRecordForm = self._$addRecordDiv.find('form').first();
                    var $saveButton = self._$addRecordDiv.parent().find('#AddRecordDialogSaveButton');
                    self._trigger("formClosed", null, { form: $addRecordForm, formType: 'create' });
                    self._setEnabledOfDialogButton($saveButton, true, self.options.messages.save);
                    $addRecordForm.remove();
                }
            });

            if (self.options.addRecordButton) {
                //If user supplied a button, bind the click event to show dialog form
                self.options.addRecordButton.click(function (e) {
                    e.preventDefault();
                    self._showAddRecordForm();
                });
            } else {
                //If user did not supplied a button, create a 'add record button' toolbar item.
                self._addToolBarItem({
                    icon: true,
                    cssClass: 'jtable-toolbar-item-add-record',
                    text: self.options.messages.addNewRecord,
                    click: function () {
                        self._showAddRecordForm();
                    }
                });
            }
        },

        _onSaveClickedOnCreateForm: function () {
            var self = this;

            var $saveButton = self._$addRecordDiv.parent().find('#AddRecordDialogSaveButton');
            var $addRecordForm = self._$addRecordDiv.find('form');

            if (self._trigger("formSubmitting", null, { form: $addRecordForm, formType: 'create' }) != false) {
                self._setEnabledOfDialogButton($saveButton, false, self.options.messages.saving);
                self._saveAddRecordForm($addRecordForm, $saveButton);
            }
        },

        /************************************************************************
        * PUBLIC METHODS                                                        *
        *************************************************************************/

        /* Shows add new record dialog form.
        *************************************************************************/
        showCreateForm: function () {
            this._showAddRecordForm();
        },

        /* Adds a new record to the table (optionally to the server also)
        *************************************************************************/
        addRecord: function (options) {
            var self = this;
            options = $.extend({
                clientOnly: false,
                animationsEnabled: self.options.animationsEnabled,
                success: function () { },
                error: function () { }
            }, options);

            if (!options.record) {
                self._logWarn('options parameter in addRecord method must contain a record property.');
                return;
            }

            if (options.clientOnly) {
                self._addRow(
                    self._createRowFromRecord(options.record), {
                        isNewRow: true,
                        animationsEnabled: options.animationsEnabled
                    });

                options.success();
                return;
            }

            var completeAddRecord = function (data) {
                if (data.Result != 'OK') {
                    self._showError(data.Message);
                    options.error(data);
                    return;
                }

                if (!data.Record) {
                    self._logError('Server must return the created Record object.');
                    options.error(data);
                    return;
                }

                self._onRecordAdded(data);
                self._addRow(
                    self._createRowFromRecord(data.Record), {
                        isNewRow: true,
                        animationsEnabled: options.animationsEnabled
                    });

                options.success(data);
            };

            //createAction may be a function, check if it is
            if (!options.url && $.isFunction(self.options.actions.createAction)) {

                //Execute the function
                var funcResult = self.options.actions.createAction($.param(options.record));

                //Check if result is a jQuery Deferred object
                if (self._isDeferredObject(funcResult)) {
                    //Wait promise
                    funcResult.done(function (data) {
                        completeAddRecord(data);
                    }).fail(function () {
                        self._showError(self.options.messages.serverCommunicationError);
                        options.error();
                    });
                } else { //assume it returned the creation result
                    completeAddRecord(funcResult);
                }

            } else { //Assume it's a URL string

                //Make an Ajax call to create record
                self._submitFormUsingAjax(
                    options.url || self.options.actions.createAction,
                    $.param(options.record),
                    function (data) {
                        completeAddRecord(data);
                    },
                    function () {
                        self._showError(self.options.messages.serverCommunicationError);
                        options.error();
                    });

            }
        },

        /************************************************************************
        * PRIVATE METHODS                                                       *
        *************************************************************************/

        /* Shows add new record dialog form.
        *************************************************************************/
        _showAddRecordForm: function () {
            var self = this;

            //Create add new record form
            var $addRecordForm = $('<form id="jtable-create-form" class="jtable-dialog-form jtable-create-form"></form>');

            //Create input elements
            for (var i = 0; i < self._fieldList.length; i++) {

                var fieldName = self._fieldList[i];
                var field = self.options.fields[fieldName];

                //Do not create input for fields that is key and not specially marked as creatable
                if (field.key == true && field.create != true) {
                    continue;
                }

                //Do not create input for fields that are not creatable
                if (field.create == false) {
                    continue;
                }

                if (field.type == 'hidden') {
                    $addRecordForm.append(self._createInputForHidden(fieldName, field.defaultValue));
                    continue;
                }

                //Create a container div for this input field and add to form
                var $fieldContainer = $('<div />')
                    .addClass('jtable-input-field-container')
                    .appendTo($addRecordForm);

                //Create a label for input
                $fieldContainer.append(self._createInputLabelForRecordField(fieldName));

                //Create input element
                $fieldContainer.append(
                    self._createInputForRecordField({
                        fieldName: fieldName,
                        formType: 'create',
                        form: $addRecordForm
                    }));
            }

            self._makeCascadeDropDowns($addRecordForm, undefined, 'create');

            $addRecordForm.submit(function () {
                self._onSaveClickedOnCreateForm();
                return false;
            });

            //Open the form
            self._$addRecordDiv.append($addRecordForm).dialog('open');
            self._trigger("formCreated", null, { form: $addRecordForm, formType: 'create' });
        },

        /* Saves new added record to the server and updates table.
        *************************************************************************/
        _saveAddRecordForm: function ($addRecordForm, $saveButton) {
            var self = this;

            var completeAddRecord = function (data) {
                if (data.Result != 'OK') {
                    self._showError(data.Message);
                    self._setEnabledOfDialogButton($saveButton, true, self.options.messages.save);
                    return;
                }

                if (!data.Record) {
                    self._logError('Server must return the created Record object.');
                    self._setEnabledOfDialogButton($saveButton, true, self.options.messages.save);
                    return;
                }

                self._onRecordAdded(data);
                self._addRow(
                    self._createRowFromRecord(data.Record), {
                        isNewRow: true
                    });
                self._$addRecordDiv.dialog("close");
            };

            $addRecordForm.data('submitting', true); //TODO: Why it's used, can remove? Check it.

            //createAction may be a function, check if it is
            if ($.isFunction(self.options.actions.createAction)) {

                //Execute the function
                var funcResult = self.options.actions.createAction($addRecordForm.serialize());

                //Check if result is a jQuery Deferred object
                if (self._isDeferredObject(funcResult)) {
                    //Wait promise
                    funcResult.done(function (data) {
                        completeAddRecord(data);
                    }).fail(function () {
                        self._showError(self.options.messages.serverCommunicationError);
                        self._setEnabledOfDialogButton($saveButton, true, self.options.messages.save);
                    });
                } else { //assume it returned the creation result
                    completeAddRecord(funcResult);
                }

            } else { //Assume it's a URL string

                //Make an Ajax call to create record
                self._submitFormUsingAjax(
                    self.options.actions.createAction,
                    $addRecordForm.serialize(),
                    function (data) {
                        completeAddRecord(data);
                    },
                    function () {
                        self._showError(self.options.messages.serverCommunicationError);
                        self._setEnabledOfDialogButton($saveButton, true, self.options.messages.save);
                    });
            }
        },

        _onRecordAdded: function (data) {
            this._trigger("recordAdded", null, { record: data.Record, serverResponse: data });
        }

    });

})(jQuery);


/************************************************************************
* EDIT RECORD extension for jTable                                      *
*************************************************************************/
(function ($) {

    //Reference to base object members
    var base = {
        _create: $.hik.jtable.prototype._create,
        _addColumnsToHeaderRow: $.hik.jtable.prototype._addColumnsToHeaderRow,
        _addCellsToRowUsingRecord: $.hik.jtable.prototype._addCellsToRowUsingRecord
    };

    //extension members
    $.extend(true, $.hik.jtable.prototype, {

        /************************************************************************
        * DEFAULT OPTIONS / EVENTS                                              *
        *************************************************************************/
        options: {

            //Events
            recordUpdated: function (event, data) { },
            rowUpdated: function (event, data) { },

            //Localization
            messages: {
                editRecord: 'Edit Record'
            }
        },

        /************************************************************************
        * PRIVATE FIELDS                                                        *
        *************************************************************************/

        _$editDiv: null, //Reference to the editing dialog div (jQuery object)
        _$editingRow: null, //Reference to currently editing row (jQuery object)

        /************************************************************************
        * CONSTRUCTOR AND INITIALIZATION METHODS                                *
        *************************************************************************/

        /* Overrides base method to do editing-specific constructions.
        *************************************************************************/
        _create: function () {
            base._create.apply(this, arguments);
            
            if (!this.options.actions.updateAction) {
                return;
            }
            
            this._createEditDialogDiv();
        },

        /* Creates and prepares edit dialog div
        *************************************************************************/
        _createEditDialogDiv: function () {
            var self = this;

            //Create a div for dialog and add to container element
            self._$editDiv = $('<div></div>')
                .appendTo(self._$mainContainer);

            //Prepare dialog
            self._$editDiv.dialog({
                autoOpen: false,
                show: self.options.dialogShowEffect,
                hide: self.options.dialogHideEffect,
                width: 'auto',
                minWidth: '300',
                modal: true,
                title: self.options.messages.editRecord,
                buttons:
                        [{  //cancel button
                            text: self.options.messages.cancel,
                            click: function () {
                                self._$editDiv.dialog('close');
                            }
                        }, { //save button
                            id: 'EditDialogSaveButton',
                            text: self.options.messages.save,
                            click: function () {
                                self._onSaveClickedOnEditForm();
                            }
                        }],
                close: function () {
                    var $editForm = self._$editDiv.find('form:first');
                    var $saveButton = self._$editDiv.parent().find('#EditDialogSaveButton');
                    self._trigger("formClosed", null, { form: $editForm, formType: 'edit', row: self._$editingRow });
                    self._setEnabledOfDialogButton($saveButton, true, self.options.messages.save);
                    $editForm.remove();
                }
            });
        },

        /* Saves editing form to server.
        *************************************************************************/
        _onSaveClickedOnEditForm: function () {
            var self = this;
            
            //row maybe removed by another source, if so, do nothing
            if (self._$editingRow.hasClass('jtable-row-removed')) {
                self._$editDiv.dialog('close');
                return;
            }

            var $saveButton = self._$editDiv.parent().find('#EditDialogSaveButton');
            var $editForm = self._$editDiv.find('form');
            if (self._trigger("formSubmitting", null, { form: $editForm, formType: 'edit', row: self._$editingRow }) != false) {
                self._setEnabledOfDialogButton($saveButton, false, self.options.messages.saving);
                self._saveEditForm($editForm, $saveButton);
            }
        },

        /************************************************************************
        * PUBLIC METHODS                                                        *
        *************************************************************************/

        /* Updates a record on the table (optionally on the server also)
        *************************************************************************/
        updateRecord: function (options) {
            var self = this;
            options = $.extend({
                clientOnly: false,
                animationsEnabled: self.options.animationsEnabled,
                success: function () { },
                error: function () { }
            }, options);

            if (!options.record) {
                self._logWarn('options parameter in updateRecord method must contain a record property.');
                return;
            }

            var key = self._getKeyValueOfRecord(options.record);
            if (key == undefined || key == null) {
                self._logWarn('options parameter in updateRecord method must contain a record that contains the key field property.');
                return;
            }

            var $updatingRow = self.getRowByKey(key);
            if ($updatingRow == null) {
                self._logWarn('Can not found any row by key "' + key + '" on the table. Updating row must be visible on the table.');
                return;
            }

            if (options.clientOnly) {
                $.extend($updatingRow.data('record'), options.record);
                self._updateRowTexts($updatingRow);
                self._onRecordUpdated($updatingRow, null);
                if (options.animationsEnabled) {
                    self._showUpdateAnimationForRow($updatingRow);
                }

                options.success();
                return;
            }

            var completeEdit = function (data) {
                if (data.Result != 'OK') {
                    self._showError(data.Message);
                    options.error(data);
                    return;
                }

                $.extend($updatingRow.data('record'), options.record);
                self._updateRecordValuesFromServerResponse($updatingRow.data('record'), data);

                self._updateRowTexts($updatingRow);
                self._onRecordUpdated($updatingRow, data);
                if (options.animationsEnabled) {
                    self._showUpdateAnimationForRow($updatingRow);
                }

                options.success(data);
            };

            //updateAction may be a function, check if it is
            if (!options.url && $.isFunction(self.options.actions.updateAction)) {

                //Execute the function
                var funcResult = self.options.actions.updateAction($.param(options.record));

                //Check if result is a jQuery Deferred object
                if (self._isDeferredObject(funcResult)) {
                    //Wait promise
                    funcResult.done(function (data) {
                        completeEdit(data);
                    }).fail(function () {
                        self._showError(self.options.messages.serverCommunicationError);
                        options.error();
                    });
                } else { //assume it returned the creation result
                    completeEdit(funcResult);
                }

            } else { //Assume it's a URL string

                //Make an Ajax call to create record
                self._submitFormUsingAjax(
                    options.url || self.options.actions.updateAction,
                    $.param(options.record),
                    function (data) {
                        completeEdit(data);
                    },
                    function () {
                        self._showError(self.options.messages.serverCommunicationError);
                        options.error();
                    });

            }
        },

        /************************************************************************
        * OVERRIDED METHODS                                                     *
        *************************************************************************/

        /* Overrides base method to add a 'editing column cell' to header row.
        *************************************************************************/
        _addColumnsToHeaderRow: function ($tr) {
            base._addColumnsToHeaderRow.apply(this, arguments);
            if (this.options.actions.updateAction != undefined) {
                $tr.append(this._createEmptyCommandHeader());
            }
        },

        /* Overrides base method to add a 'edit command cell' to a row.
        *************************************************************************/
        _addCellsToRowUsingRecord: function ($row) {
            var self = this;
            base._addCellsToRowUsingRecord.apply(this, arguments);

            if (self.options.actions.updateAction != undefined) {
                var $span = $('<span></span>').html(self.options.messages.editRecord);
                var $button = $('<button title="' + self.options.messages.editRecord + '"></button>')
                    .addClass('jtable-command-button jtable-edit-command-button')
                    .append($span)
                    .click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        self._showEditForm($row);
                    });
                $('<td></td>')
                    .addClass('jtable-command-column')
                    .append($button)
                    .appendTo($row);
            }
        },

        /************************************************************************
        * PRIVATE METHODS                                                       *
        *************************************************************************/

        /* Shows edit form for a row.
        *************************************************************************/
        _showEditForm: function ($tableRow) {
            var self = this;
            var record = $tableRow.data('record');

            //Create edit form
            var $editForm = $('<form id="jtable-edit-form" class="jtable-dialog-form jtable-edit-form"></form>');

            //Create input fields
            for (var i = 0; i < self._fieldList.length; i++) {

                var fieldName = self._fieldList[i];
                var field = self.options.fields[fieldName];
                var fieldValue = record[fieldName];

                if (field.key == true) {
                    if (field.edit != true) {
                        //Create hidden field for key
                        $editForm.append(self._createInputForHidden(fieldName, fieldValue));
                        continue;
                    } else {
                        //Create a special hidden field for key (since key is be editable)
                        $editForm.append(self._createInputForHidden('jtRecordKey', fieldValue));
                    }
                }

                //Do not create element for non-editable fields
                if (field.edit == false) {
                    continue;
                }

                //Hidden field
                if (field.type == 'hidden') {
                    $editForm.append(self._createInputForHidden(fieldName, fieldValue));
                    continue;
                }

                //Create a container div for this input field and add to form
                var $fieldContainer = $('<div class="jtable-input-field-container"></div>').appendTo($editForm);

                //Create a label for input
                $fieldContainer.append(self._createInputLabelForRecordField(fieldName));

                //Create input element with it's current value
                var currentValue = self._getValueForRecordField(record, fieldName);
                $fieldContainer.append(
                    self._createInputForRecordField({
                        fieldName: fieldName,
                        value: currentValue,
                        record: record,
                        formType: 'edit',
                        form: $editForm
                    }));
            }
            
            self._makeCascadeDropDowns($editForm, record, 'edit');

            $editForm.submit(function () {
                self._onSaveClickedOnEditForm();
                return false;
            });

            //Open dialog
            self._$editingRow = $tableRow;
            self._$editDiv.append($editForm).dialog('open');
            self._trigger("formCreated", null, { form: $editForm, formType: 'edit', record: record, row: $tableRow });
        },

        /* Saves editing form to the server and updates the record on the table.
        *************************************************************************/
        _saveEditForm: function ($editForm, $saveButton) {
            var self = this;
            
            var completeEdit = function (data) {
                if (data.Result != 'OK') {
                    self._showError(data.Message);
                    self._setEnabledOfDialogButton($saveButton, true, self.options.messages.save);
                    return;
                }

                var record = self._$editingRow.data('record');

                self._updateRecordValuesFromForm(record, $editForm);
                self._updateRecordValuesFromServerResponse(record, data);
                self._updateRowTexts(self._$editingRow);

                self._$editingRow.attr('data-record-key', self._getKeyValueOfRecord(record));

                self._onRecordUpdated(self._$editingRow, data);

                if (self.options.animationsEnabled) {
                    self._showUpdateAnimationForRow(self._$editingRow);
                }

                self._$editDiv.dialog("close");
            };


            //updateAction may be a function, check if it is
            if ($.isFunction(self.options.actions.updateAction)) {

                //Execute the function
                var funcResult = self.options.actions.updateAction($editForm.serialize());

                //Check if result is a jQuery Deferred object
                if (self._isDeferredObject(funcResult)) {
                    //Wait promise
                    funcResult.done(function (data) {
                        completeEdit(data);
                    }).fail(function () {
                        self._showError(self.options.messages.serverCommunicationError);
                        self._setEnabledOfDialogButton($saveButton, true, self.options.messages.save);
                    });
                } else { //assume it returned the creation result
                    completeEdit(funcResult);
                }

            } else { //Assume it's a URL string

                //Make an Ajax call to update record
                self._submitFormUsingAjax(
                    self.options.actions.updateAction,
                    $editForm.serialize(),
                    function(data) {
                        completeEdit(data);
                    },
                    function() {
                        self._showError(self.options.messages.serverCommunicationError);
                        self._setEnabledOfDialogButton($saveButton, true, self.options.messages.save);
                    });
            }

        },

        /* This method ensures updating of current record with server response,
        * if server sends a Record object as response to updateAction.
        *************************************************************************/
        _updateRecordValuesFromServerResponse: function (record, serverResponse) {
            if (!serverResponse || !serverResponse.Record) {
                return;
            }

            $.extend(true, record, serverResponse.Record);
        },

        /* Gets text for a field of a record according to it's type.
        *************************************************************************/
        _getValueForRecordField: function (record, fieldName) {
            var field = this.options.fields[fieldName];
            var fieldValue = record[fieldName];
            if (field.type == 'date') {
                return this._getDisplayTextForDateRecordField(field, fieldValue);
            } else {
                return fieldValue;
            }
        },

        /* Updates cells of a table row's text values from row's record values.
        *************************************************************************/
        _updateRowTexts: function ($tableRow) {
            var record = $tableRow.data('record');
            var $columns = $tableRow.find('td');
            for (var i = 0; i < this._columnList.length; i++) {
                var displayItem = this._getDisplayTextForRecordField(record, this._columnList[i]);
                if ((displayItem != "") && (displayItem == 0)) displayItem = "0";
                $columns.eq(this._firstDataColumnOffset + i).html(displayItem || '');
            }

            this._onRowUpdated($tableRow);
        },

        /* Shows 'updated' animation for a table row.
        *************************************************************************/
        _showUpdateAnimationForRow: function ($tableRow) {
            var className = 'jtable-row-updated';
            if (this.options.jqueryuiTheme) {
                className = className + ' ui-state-highlight';
            }

            $tableRow.stop(true, true).addClass(className, 'slow', '', function () {
                $tableRow.removeClass(className, 5000);
            });
        },

        /************************************************************************
        * EVENT RAISING METHODS                                                 *
        *************************************************************************/

        _onRowUpdated: function ($row) {
            this._trigger("rowUpdated", null, { row: $row, record: $row.data('record') });
        },

        _onRecordUpdated: function ($row, data) {
            this._trigger("recordUpdated", null, { record: $row.data('record'), row: $row, serverResponse: data });
        }

    });

})(jQuery);


/************************************************************************
* DELETION extension for jTable                                         *
*************************************************************************/
(function ($) {

    //Reference to base object members
    var base = {
        _create: $.hik.jtable.prototype._create,
        _addColumnsToHeaderRow: $.hik.jtable.prototype._addColumnsToHeaderRow,
        _addCellsToRowUsingRecord: $.hik.jtable.prototype._addCellsToRowUsingRecord
    };

    //extension members
    $.extend(true, $.hik.jtable.prototype, {

        /************************************************************************
        * DEFAULT OPTIONS / EVENTS                                              *
        *************************************************************************/
        options: {

            //Options
            deleteConfirmation: true,

            //Events
            recordDeleted: function (event, data) { },

            //Localization
            messages: {
                deleteConfirmation: 'This record will be deleted. Are you sure?',
                deleteText: 'Delete',
                deleting: 'Deleting',
                canNotDeletedRecords: 'Can not delete {0} of {1} records!',
                deleteProggress: 'Deleting {0} of {1} records, processing...'
            }
        },

        /************************************************************************
        * PRIVATE FIELDS                                                        *
        *************************************************************************/

        _$deleteRecordDiv: null, //Reference to the adding new record dialog div (jQuery object)
        _$deletingRow: null, //Reference to currently deleting row (jQuery object)

        /************************************************************************
        * CONSTRUCTOR                                                           *
        *************************************************************************/

        /* Overrides base method to do deletion-specific constructions.
        *************************************************************************/
        _create: function () {
            base._create.apply(this, arguments);
            this._createDeleteDialogDiv();
        },

        /* Creates and prepares delete record confirmation dialog div.
        *************************************************************************/
        _createDeleteDialogDiv: function () {
            var self = this;

            //Check if deleteAction is supplied
            if (!self.options.actions.deleteAction) {
                return;
            }

            //Create div element for delete confirmation dialog
            self._$deleteRecordDiv = $('<div><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span><span class="jtable-delete-confirm-message"></span></p></div>').appendTo(self._$mainContainer);

            //Prepare dialog
            self._$deleteRecordDiv.dialog({
                autoOpen: false,
                show: self.options.dialogShowEffect,
                hide: self.options.dialogHideEffect,
                modal: true,
                title: self.options.messages.areYouSure,
                buttons:
                        [{  //cancel button
                            text: self.options.messages.cancel,
                            click: function () {
                                self._$deleteRecordDiv.dialog("close");
                            }
                        }, {//delete button
                            id: 'DeleteDialogButton',
                            text: self.options.messages.deleteText,
                            click: function () {

                                //row maybe removed by another source, if so, do nothing
                                if (self._$deletingRow.hasClass('jtable-row-removed')) {
                                    self._$deleteRecordDiv.dialog('close');
                                    return;
                                }

                                var $deleteButton = self._$deleteRecordDiv.parent().find('#DeleteDialogButton');
                                self._setEnabledOfDialogButton($deleteButton, false, self.options.messages.deleting);
                                self._deleteRecordFromServer(
                                    self._$deletingRow,
                                    function () {
                                        self._removeRowsFromTableWithAnimation(self._$deletingRow);
                                        self._$deleteRecordDiv.dialog('close');
                                    },
                                    function (message) { //error
                                        self._showError(message);
                                        self._setEnabledOfDialogButton($deleteButton, true, self.options.messages.deleteText);
                                    }
                                );
                            }
                        }],
                close: function () {
                    var $deleteButton = self._$deleteRecordDiv.parent().find('#DeleteDialogButton');
                    self._setEnabledOfDialogButton($deleteButton, true, self.options.messages.deleteText);
                }
            });
        },

        /************************************************************************
        * PUBLIC METHODS                                                        *
        *************************************************************************/

        /* This method is used to delete one or more rows from server and the table.
        *************************************************************************/
        deleteRows: function ($rows) {
            var self = this;

            if ($rows.length <= 0) {
                self._logWarn('No rows specified to jTable deleteRows method.');
                return;
            }

            if (self._isBusy()) {
                self._logWarn('Can not delete rows since jTable is busy!');
                return;
            }

            //Deleting just one row
            if ($rows.length == 1) {
                self._deleteRecordFromServer(
                    $rows,
                    function () { //success
                        self._removeRowsFromTableWithAnimation($rows);
                    },
                    function (message) { //error
                        self._showError(message);
                    }
                );

                return;
            }

            //Deleting multiple rows
            self._showBusy(self._formatString(self.options.messages.deleteProggress, 0, $rows.length));

            //This method checks if deleting of all records is completed
            var completedCount = 0;
            var isCompleted = function () {
                return (completedCount >= $rows.length);
            };

            //This method is called when deleting of all records completed
            var completed = function () {
                var $deletedRows = $rows.filter('.jtable-row-ready-to-remove');
                if ($deletedRows.length < $rows.length) {
                    self._showError(self._formatString(self.options.messages.canNotDeletedRecords, $rows.length - $deletedRows.length, $rows.length));
                }

                if ($deletedRows.length > 0) {
                    self._removeRowsFromTableWithAnimation($deletedRows);
                }

                self._hideBusy();
            };

            //Delete all rows
            var deletedCount = 0;
            $rows.each(function () {
                var $row = $(this);
                self._deleteRecordFromServer(
                    $row,
                    function () { //success
                        ++deletedCount; ++completedCount;
                        $row.addClass('jtable-row-ready-to-remove');
                        self._showBusy(self._formatString(self.options.messages.deleteProggress, deletedCount, $rows.length));
                        if (isCompleted()) {
                            completed();
                        }
                    },
                    function () { //error
                        ++completedCount;
                        if (isCompleted()) {
                            completed();
                        }
                    }
                );
            });
        },

        /* Deletes a record from the table (optionally from the server also).
        *************************************************************************/
        deleteRecord: function (options) {
            var self = this;
            options = $.extend({
                clientOnly: false,
                animationsEnabled: self.options.animationsEnabled,
                url: self.options.actions.deleteAction,
                success: function () { },
                error: function () { }
            }, options);

            if (options.key == undefined) {
                self._logWarn('options parameter in deleteRecord method must contain a key property.');
                return;
            }

            var $deletingRow = self.getRowByKey(options.key);
            if ($deletingRow == null) {
                self._logWarn('Can not found any row by key: ' + options.key);
                return;
            }

            if (options.clientOnly) {
                self._removeRowsFromTableWithAnimation($deletingRow, options.animationsEnabled);
                options.success();
                return;
            }

            self._deleteRecordFromServer(
                    $deletingRow,
                    function (data) { //success
                        self._removeRowsFromTableWithAnimation($deletingRow, options.animationsEnabled);
                        options.success(data);
                    },
                    function (message) { //error
                        self._showError(message);
                        options.error(message);
                    },
                    options.url
                );
        },

        /************************************************************************
        * OVERRIDED METHODS                                                     *
        *************************************************************************/

        /* Overrides base method to add a 'deletion column cell' to header row.
        *************************************************************************/
        _addColumnsToHeaderRow: function ($tr) {
            base._addColumnsToHeaderRow.apply(this, arguments);
            if (this.options.actions.deleteAction != undefined) {
                $tr.append(this._createEmptyCommandHeader());
            }
        },

        /* Overrides base method to add a 'delete command cell' to a row.
        *************************************************************************/
        _addCellsToRowUsingRecord: function ($row) {
            base._addCellsToRowUsingRecord.apply(this, arguments);

            var self = this;
            if (self.options.actions.deleteAction != undefined) {
                var $span = $('<span></span>').html(self.options.messages.deleteText);
                var $button = $('<button title="' + self.options.messages.deleteText + '"></button>')
                    .addClass('jtable-command-button jtable-delete-command-button')
                    .append($span)
                    .click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        self._deleteButtonClickedForRow($row);
                    });
                $('<td></td>')
                    .addClass('jtable-command-column')
                    .append($button)
                    .appendTo($row);
            }
        },

        /************************************************************************
        * PRIVATE METHODS                                                       *
        *************************************************************************/

        /* This method is called when user clicks delete button on a row.
        *************************************************************************/
        _deleteButtonClickedForRow: function ($row) {
            var self = this;

            var deleteConfirm;
            var deleteConfirmMessage = self.options.messages.deleteConfirmation;

            //If options.deleteConfirmation is function then call it
            if ($.isFunction(self.options.deleteConfirmation)) {
                var data = { row: $row, record: $row.data('record'), deleteConfirm: true, deleteConfirmMessage: deleteConfirmMessage, cancel: false, cancelMessage: null };
                self.options.deleteConfirmation(data);

                //If delete progress is cancelled
                if (data.cancel) {

                    //If a canlellation reason is specified
                    if (data.cancelMessage) {
                        self._showError(data.cancelMessage); //TODO: show warning/stop message instead of error (also show warning/error ui icon)!
                    }

                    return;
                }

                deleteConfirmMessage = data.deleteConfirmMessage;
                deleteConfirm = data.deleteConfirm;
            } else {
                deleteConfirm = self.options.deleteConfirmation;
            }

            if (deleteConfirm != false) {
                //Confirmation
                self._$deleteRecordDiv.find('.jtable-delete-confirm-message').html(deleteConfirmMessage);
                self._showDeleteDialog($row);
            } else {
                //No confirmation
                self._deleteRecordFromServer(
                    $row,
                    function () { //success
                        self._removeRowsFromTableWithAnimation($row);
                    },
                    function (message) { //error
                        self._showError(message);
                    }
                );
            }
        },

        /* Shows delete comfirmation dialog.
        *************************************************************************/
        _showDeleteDialog: function ($row) {
            this._$deletingRow = $row;
            this._$deleteRecordDiv.dialog('open');
        },

        /* Performs an ajax call to server to delete record
        *  and removes row of the record from table if ajax call success.
        *************************************************************************/
        _deleteRecordFromServer: function ($row, success, error, url) {
            var self = this;

            var completeDelete = function(data) {
                if (data.Result != 'OK') {
                    $row.data('deleting', false);
                    if (error) {
                        error(data.Message);
                    }

                    return;
                }

                self._trigger("recordDeleted", null, { record: $row.data('record'), row: $row, serverResponse: data });

                if (success) {
                    success(data);
                }
            };

            //Check if it is already being deleted right now
            if ($row.data('deleting') == true) {
                return;
            }

            $row.data('deleting', true);

            var postData = {};
            postData[self._keyField] = self._getKeyValueOfRecord($row.data('record'));
            
            //deleteAction may be a function, check if it is
            if (!url && $.isFunction(self.options.actions.deleteAction)) {

                //Execute the function
                var funcResult = self.options.actions.deleteAction(postData);

                //Check if result is a jQuery Deferred object
                if (self._isDeferredObject(funcResult)) {
                    //Wait promise
                    funcResult.done(function (data) {
                        completeDelete(data);
                    }).fail(function () {
                        $row.data('deleting', false);
                        if (error) {
                            error(self.options.messages.serverCommunicationError);
                        }
                    });
                } else { //assume it returned the deletion result
                    completeDelete(funcResult);
                }

            } else { //Assume it's a URL string
                //Make ajax call to delete the record from server
                this._ajax({
                    url: (url || self.options.actions.deleteAction),
                    data: postData,
                    success: function (data) {
                        completeDelete(data);
                    },
                    error: function () {
                        $row.data('deleting', false);
                        if (error) {
                            error(self.options.messages.serverCommunicationError);
                        }
                    }
                });

            }
        },

        /* Removes a row from table after a 'deleting' animation.
        *************************************************************************/
        _removeRowsFromTableWithAnimation: function ($rows, animationsEnabled) {
            var self = this;

            if (animationsEnabled == undefined) {
                animationsEnabled = self.options.animationsEnabled;
            }

            if (animationsEnabled) {
                var className = 'jtable-row-deleting';
                if (this.options.jqueryuiTheme) {
                    className = className + ' ui-state-disabled';
                }

                //Stop current animation (if does exists) and begin 'deleting' animation.
                $rows.stop(true, true).addClass(className, 'slow', '').promise().done(function () {
                    self._removeRowsFromTable($rows, 'deleted');
                });
            } else {
                self._removeRowsFromTable($rows, 'deleted');
            }
        }

    });

})(jQuery);


/************************************************************************
* SELECTING extension for jTable                                        *
*************************************************************************/
(function ($) {

    //Reference to base object members
    var base = {
        _create: $.hik.jtable.prototype._create,
        _addColumnsToHeaderRow: $.hik.jtable.prototype._addColumnsToHeaderRow,
        _addCellsToRowUsingRecord: $.hik.jtable.prototype._addCellsToRowUsingRecord,
        _onLoadingRecords: $.hik.jtable.prototype._onLoadingRecords,
        _onRecordsLoaded: $.hik.jtable.prototype._onRecordsLoaded,
        _onRowsRemoved: $.hik.jtable.prototype._onRowsRemoved
    };

    //extension members
    $.extend(true, $.hik.jtable.prototype, {

        /************************************************************************
        * DEFAULT OPTIONS / EVENTS                                              *
        *************************************************************************/
        options: {

            //Options
            selecting: false,
            multiselect: false,
            selectingCheckboxes: false,
            selectOnRowClick: true,

            //Events
            selectionChanged: function (event, data) { }
        },

        /************************************************************************
        * PRIVATE FIELDS                                                        *
        *************************************************************************/

        _selectedRecordIdsBeforeLoad: null, //This array is used to store selected row Id's to restore them after a page refresh (string array).
        _$selectAllCheckbox: null, //Reference to the 'select/deselect all' checkbox (jQuery object)
        _shiftKeyDown: false, //True, if shift key is currently down.

        /************************************************************************
        * CONSTRUCTOR                                                           *
        *************************************************************************/

        /* Overrides base method to do selecting-specific constructions.
        *************************************************************************/
        _create: function () {
            if (this.options.selecting && this.options.selectingCheckboxes) {
                ++this._firstDataColumnOffset;
                this._bindKeyboardEvents();
            }

            //Call base method
            base._create.apply(this, arguments);
        },

        /* Registers to keyboard events those are needed for selection
        *************************************************************************/
        _bindKeyboardEvents: function () {
            var self = this;
            //Register to events to set _shiftKeyDown value
            $(document)
                .keydown(function (event) {
                    switch (event.which) {
                        case 16:
                            self._shiftKeyDown = true;
                            break;
                    }
                })
                .keyup(function (event) {
                    switch (event.which) {
                        case 16:
                            self._shiftKeyDown = false;
                            break;
                    }
                });
        },

        /************************************************************************
        * PUBLIC METHODS                                                        *
        *************************************************************************/

        /* Gets jQuery selection for currently selected rows.
        *************************************************************************/
        selectedRows: function () {
            return this._getSelectedRows();
        },

        /* Makes row/rows 'selected'.
        *************************************************************************/
        selectRows: function ($rows) {
            this._selectRows($rows);
            this._onSelectionChanged(); //TODO: trigger only if selected rows changes?
        },

        /************************************************************************
        * OVERRIDED METHODS                                                     *
        *************************************************************************/

        /* Overrides base method to add a 'select column' to header row.
        *************************************************************************/
        _addColumnsToHeaderRow: function ($tr) {
            if (this.options.selecting && this.options.selectingCheckboxes) {
                if (this.options.multiselect) {
                    $tr.append(this._createSelectAllHeader());
                } else {
                    $tr.append(this._createEmptyCommandHeader());
                }
            }

            base._addColumnsToHeaderRow.apply(this, arguments);
        },

        /* Overrides base method to add a 'delete command cell' to a row.
        *************************************************************************/
        _addCellsToRowUsingRecord: function ($row) {
            if (this.options.selecting) {
                this._makeRowSelectable($row);
            }

            base._addCellsToRowUsingRecord.apply(this, arguments);
        },

        /* Overrides base event to store selection list
        *************************************************************************/
        _onLoadingRecords: function () {
            if (this.options.selecting) {
                this._storeSelectionList();
            }

            base._onLoadingRecords.apply(this, arguments);
        },

        /* Overrides base event to restore selection list
        *************************************************************************/
        _onRecordsLoaded: function () {
            if (this.options.selecting) {
                this._restoreSelectionList();
            }

            base._onRecordsLoaded.apply(this, arguments);
        },

        /* Overrides base event to check is any selected row is being removed.
        *************************************************************************/
        _onRowsRemoved: function ($rows, reason) {
            if (this.options.selecting && (reason != 'reloading') && ($rows.filter('.jtable-row-selected').length > 0)) {
                this._onSelectionChanged();
            }

            base._onRowsRemoved.apply(this, arguments);
        },

        /************************************************************************
        * PRIVATE METHODS                                                       *
        *************************************************************************/

        /* Creates a header column to select/deselect all rows.
        *************************************************************************/
        _createSelectAllHeader: function () {
            var self = this;

            var $columnHeader = $('<th class=""></th>')
                .addClass('jtable-command-column-header jtable-column-header-selecting');
            this._jqueryuiThemeAddClass($columnHeader, 'ui-state-default');

            var $headerContainer = $('<div />')
                .addClass('jtable-column-header-container')
                .appendTo($columnHeader);

            self._$selectAllCheckbox = $('<input type="checkbox" />')
                .appendTo($headerContainer)
                .click(function () {
                    if (self._$tableRows.length <= 0) {
                        self._$selectAllCheckbox.attr('checked', false);
                        return;
                    }

                    var allRows = self._$tableBody.find('>tr.jtable-data-row');
                    if (self._$selectAllCheckbox.is(':checked')) {
                        self._selectRows(allRows);
                    } else {
                        self._deselectRows(allRows);
                    }

                    self._onSelectionChanged();
                });

            return $columnHeader;
        },

        /* Stores Id's of currently selected records to _selectedRecordIdsBeforeLoad.
        *************************************************************************/
        _storeSelectionList: function () {
            var self = this;

            if (!self.options.selecting) {
                return;
            }

            self._selectedRecordIdsBeforeLoad = [];
            self._getSelectedRows().each(function () {
                self._selectedRecordIdsBeforeLoad.push(self._getKeyValueOfRecord($(this).data('record')));
            });
        },

        /* Selects rows whose Id is in _selectedRecordIdsBeforeLoad;
        *************************************************************************/
        _restoreSelectionList: function () {
            var self = this;

            if (!self.options.selecting) {
                return;
            }

            var selectedRowCount = 0;
            for (var i = 0; i < self._$tableRows.length; ++i) {
                var recordId = self._getKeyValueOfRecord(self._$tableRows[i].data('record'));
                if ($.inArray(recordId, self._selectedRecordIdsBeforeLoad) > -1) {
                    self._selectRows(self._$tableRows[i]);
                    ++selectedRowCount;
                }
            }

            if (self._selectedRecordIdsBeforeLoad.length > 0 && self._selectedRecordIdsBeforeLoad.length != selectedRowCount) {
                self._onSelectionChanged();
            }

            self._selectedRecordIdsBeforeLoad = [];
            self._refreshSelectAllCheckboxState();
        },

        /* Gets all selected rows.
        *************************************************************************/
        _getSelectedRows: function () {
            return this._$tableBody
                .find('>tr.jtable-row-selected');
        },

        /* Adds selectable feature to a row.
        *************************************************************************/
        _makeRowSelectable: function ($row) {
            var self = this;

            //Select/deselect on row click
            if (self.options.selectOnRowClick) {
                $row.click(function () {
                    self._invertRowSelection($row);
                });
            }

            //'select/deselect' checkbox column
            if (self.options.selectingCheckboxes) {
                var $cell = $('<td></td>').addClass('jtable-selecting-column');
                var $selectCheckbox = $('<input type="checkbox" />').appendTo($cell);
                if (!self.options.selectOnRowClick) {
                    $selectCheckbox.click(function () {
                        self._invertRowSelection($row);
                    });
                }

                $row.append($cell);
            }
        },

        /* Inverts selection state of a single row.
        *************************************************************************/
        _invertRowSelection: function ($row) {
            if ($row.hasClass('jtable-row-selected')) {
                this._deselectRows($row);
            } else {
                //Shift key?
                if (this._shiftKeyDown) {
                    var rowIndex = this._findRowIndex($row);
                    //try to select row and above rows until first selected row
                    var beforeIndex = this._findFirstSelectedRowIndexBeforeIndex(rowIndex) + 1;
                    if (beforeIndex > 0 && beforeIndex < rowIndex) {
                        this._selectRows(this._$tableBody.find('tr').slice(beforeIndex, rowIndex + 1));
                    } else {
                        //try to select row and below rows until first selected row
                        var afterIndex = this._findFirstSelectedRowIndexAfterIndex(rowIndex) - 1;
                        if (afterIndex > rowIndex) {
                            this._selectRows(this._$tableBody.find('tr').slice(rowIndex, afterIndex + 1));
                        } else {
                            //just select this row
                            this._selectRows($row);
                        }
                    }
                } else {
                    this._selectRows($row);
                }
            }

            this._onSelectionChanged();
        },

        /* Search for a selected row (that is before given row index) to up and returns it's index 
        *************************************************************************/
        _findFirstSelectedRowIndexBeforeIndex: function (rowIndex) {
            for (var i = rowIndex - 1; i >= 0; --i) {
                if (this._$tableRows[i].hasClass('jtable-row-selected')) {
                    return i;
                }
            }

            return -1;
        },

        /* Search for a selected row (that is after given row index) to down and returns it's index 
        *************************************************************************/
        _findFirstSelectedRowIndexAfterIndex: function (rowIndex) {
            for (var i = rowIndex + 1; i < this._$tableRows.length; ++i) {
                if (this._$tableRows[i].hasClass('jtable-row-selected')) {
                    return i;
                }
            }

            return -1;
        },

        /* Makes row/rows 'selected'.
        *************************************************************************/
        _selectRows: function ($rows) {
            if (!this.options.multiselect) {
                this._deselectRows(this._getSelectedRows());
            }

            $rows.addClass('jtable-row-selected');
            this._jqueryuiThemeAddClass($rows, 'ui-state-highlight');

            if (this.options.selectingCheckboxes) {
                $rows.find('>td.jtable-selecting-column >input').prop('checked', true);
            }

            this._refreshSelectAllCheckboxState();
        },

        /* Makes row/rows 'non selected'.
        *************************************************************************/
        _deselectRows: function ($rows) {
            $rows.removeClass('jtable-row-selected ui-state-highlight');
            if (this.options.selectingCheckboxes) {
                $rows.find('>td.jtable-selecting-column >input').prop('checked', false);
            }

            this._refreshSelectAllCheckboxState();
        },

        /* Updates state of the 'select/deselect' all checkbox according to count of selected rows.
        *************************************************************************/
        _refreshSelectAllCheckboxState: function () {
            if (!this.options.selectingCheckboxes || !this.options.multiselect) {
                return;
            }

            var totalRowCount = this._$tableRows.length;
            var selectedRowCount = this._getSelectedRows().length;

            if (selectedRowCount == 0) {
                this._$selectAllCheckbox.prop('indeterminate', false);
                this._$selectAllCheckbox.attr('checked', false);
            } else if (selectedRowCount == totalRowCount) {
                this._$selectAllCheckbox.prop('indeterminate', false);
                this._$selectAllCheckbox.attr('checked', true);
            } else {
                this._$selectAllCheckbox.attr('checked', false);
                this._$selectAllCheckbox.prop('indeterminate', true);
            }
        },

        /************************************************************************
        * EVENT RAISING METHODS                                                 *
        *************************************************************************/

        _onSelectionChanged: function () {
            this._trigger("selectionChanged", null, {});
        }

    });

})(jQuery);


/************************************************************************
* PAGING extension for jTable                                           *
*************************************************************************/
(function ($) {

    //Reference to base object members
    var base = {
        load: $.hik.jtable.prototype.load,
        _create: $.hik.jtable.prototype._create,
        _setOption: $.hik.jtable.prototype._setOption,
        _createRecordLoadUrl: $.hik.jtable.prototype._createRecordLoadUrl,
        _createJtParamsForLoading: $.hik.jtable.prototype._createJtParamsForLoading,
        _addRowToTable: $.hik.jtable.prototype._addRowToTable,
        _addRow: $.hik.jtable.prototype._addRow,
        _removeRowsFromTable: $.hik.jtable.prototype._removeRowsFromTable,
        _onRecordsLoaded: $.hik.jtable.prototype._onRecordsLoaded
    };

    //extension members
    $.extend(true, $.hik.jtable.prototype, {

        /************************************************************************
        * DEFAULT OPTIONS / EVENTS                                              *
        *************************************************************************/
        options: {
            paging: false,
            pageList: 'normal', //possible values: 'minimal', 'normal'
            pageSize: 10,
            pageSizes: [10, 25, 50, 100, 250, 500],
            pageSizeChangeArea: true,
            gotoPageArea: 'combobox', //possible values: 'textbox', 'combobox', 'none'

            messages: {
                pagingInfo: 'Showing {0}-{1} of {2}',
                pageSizeChangeLabel: 'Row count',
                gotoPageLabel: 'Go to page'
            }
        },

        /************************************************************************
        * PRIVATE FIELDS                                                        *
        *************************************************************************/

        _$bottomPanel: null, //Reference to the panel at the bottom of the table (jQuery object)
        _$pagingListArea: null, //Reference to the page list area in to bottom panel (jQuery object)
        _$pageSizeChangeArea: null, //Reference to the page size change area in to bottom panel (jQuery object)
        _$pageInfoSpan: null, //Reference to the paging info area in to bottom panel (jQuery object)
        _$gotoPageArea: null, //Reference to 'Go to page' input area in to bottom panel (jQuery object)
        _$gotoPageInput: null, //Reference to 'Go to page' input in to bottom panel (jQuery object)
        _totalRecordCount: 0, //Total count of records on all pages
        _currentPageNo: 1, //Current page number

        /************************************************************************
        * CONSTRUCTOR AND INITIALIZING METHODS                                  *
        *************************************************************************/

        /* Overrides base method to do paging-specific constructions.
        *************************************************************************/
        _create: function() {
            base._create.apply(this, arguments);
            if (this.options.paging) {
                this._loadPagingSettings();
                this._createBottomPanel();
                this._createPageListArea();
                this._createGotoPageInput();
                this._createPageSizeSelection();
            }
        },

        /* Loads user preferences for paging.
        *************************************************************************/
        _loadPagingSettings: function() {
            if (!this.options.saveUserPreferences) {
                return;
            }

            var pageSize = this._getCookie('page-size');
            if (pageSize) {
                this.options.pageSize = this._normalizeNumber(pageSize, 1, 1000000, this.options.pageSize);
            }
        },

        /* Creates bottom panel and adds to the page.
        *************************************************************************/
        _createBottomPanel: function() {
            this._$bottomPanel = $('<div />')
                .addClass('jtable-bottom-panel')
                .insertAfter(this._$table);

            this._jqueryuiThemeAddClass(this._$bottomPanel, 'ui-state-default');

            $('<div />').addClass('jtable-left-area').appendTo(this._$bottomPanel);
            $('<div />').addClass('jtable-right-area').appendTo(this._$bottomPanel);
        },

        /* Creates page list area.
        *************************************************************************/
        _createPageListArea: function() {
            this._$pagingListArea = $('<span></span>')
                .addClass('jtable-page-list')
                .appendTo(this._$bottomPanel.find('.jtable-left-area'));

            this._$pageInfoSpan = $('<span></span>')
                .addClass('jtable-page-info')
                .appendTo(this._$bottomPanel.find('.jtable-right-area'));
        },

        /* Creates page list change area.
        *************************************************************************/
        _createPageSizeSelection: function() {
            var self = this;

            if (!self.options.pageSizeChangeArea) {
                return;
            }

            //Add current page size to page sizes list if not contains it
            if (self._findIndexInArray(self.options.pageSize, self.options.pageSizes) < 0) {
                self.options.pageSizes.push(parseInt(self.options.pageSize));
                self.options.pageSizes.sort(function(a, b) { return a - b; });
            }

            //Add a span to contain page size change items
            self._$pageSizeChangeArea = $('<span></span>')
                .addClass('jtable-page-size-change')
                .appendTo(self._$bottomPanel.find('.jtable-left-area'));

            //Page size label
            self._$pageSizeChangeArea.append('<span>' + self.options.messages.pageSizeChangeLabel + ': </span>');

            //Page size change combobox
            var $pageSizeChangeCombobox = $('<select></select>').appendTo(self._$pageSizeChangeArea);

            //Add page sizes to the combobox
            for (var i = 0; i < self.options.pageSizes.length; i++) {
                $pageSizeChangeCombobox.append('<option value="' + self.options.pageSizes[i] + '">' + self.options.pageSizes[i] + '</option>');
            }

            //Select current page size
            $pageSizeChangeCombobox.val(self.options.pageSize);

            //Change page size on combobox change
            $pageSizeChangeCombobox.change(function() {
                self._changePageSize(parseInt($(this).val()));
            });
        },

        /* Creates go to page area.
        *************************************************************************/
        _createGotoPageInput: function() {
            var self = this;

            if (!self.options.gotoPageArea || self.options.gotoPageArea == 'none') {
                return;
            }

            //Add a span to contain goto page items
            this._$gotoPageArea = $('<span></span>')
                .addClass('jtable-goto-page')
                .appendTo(self._$bottomPanel.find('.jtable-left-area'));

            //Goto page label
            this._$gotoPageArea.append('<span>' + self.options.messages.gotoPageLabel + ': </span>');

            //Goto page input
            if (self.options.gotoPageArea == 'combobox') {

                self._$gotoPageInput = $('<select></select>')
                    .appendTo(this._$gotoPageArea)
                    .data('pageCount', 1)
                    .change(function() {
                        self._changePage(parseInt($(this).val()));
                    });
                self._$gotoPageInput.append('<option value="1">1</option>');

            } else { //textbox

                self._$gotoPageInput = $('<input type="text" maxlength="10" value="' + self._currentPageNo + '" />')
                    .appendTo(this._$gotoPageArea)
                    .keypress(function(event) {
                        if (event.which == 13) { //enter
                            event.preventDefault();
                            self._changePage(parseInt(self._$gotoPageInput.val()));
                        } else if (event.which == 43) { // +
                            event.preventDefault();
                            self._changePage(parseInt(self._$gotoPageInput.val()) + 1);
                        } else if (event.which == 45) { // -
                            event.preventDefault();
                            self._changePage(parseInt(self._$gotoPageInput.val()) - 1);
                        } else {
                            //Allow only digits
                            var isValid = (
                                (47 < event.keyCode && event.keyCode < 58 && event.shiftKey == false && event.altKey == false)
                                    || (event.keyCode == 8)
                                    || (event.keyCode == 9)
                            );

                            if (!isValid) {
                                event.preventDefault();
                            }
                        }
                    });

            }
        },

        /* Refreshes the 'go to page' input.
        *************************************************************************/
        _refreshGotoPageInput: function() {
            if (!this.options.gotoPageArea || this.options.gotoPageArea == 'none') {
                return;
            }

            if (this._totalRecordCount <= 0) {
                this._$gotoPageArea.hide();
            } else {
                this._$gotoPageArea.show();
            }

            if (this.options.gotoPageArea == 'combobox') {
                var oldPageCount = this._$gotoPageInput.data('pageCount');
                var currentPageCount = this._calculatePageCount();
                if (oldPageCount != currentPageCount) {
                    this._$gotoPageInput.empty();

                    //Skip some pages is there are too many pages
                    var pageStep = 1;
                    if (currentPageCount > 10000) {
                        pageStep = 100;
                    } else if (currentPageCount > 5000) {
                        pageStep = 10;
                    } else if (currentPageCount > 2000) {
                        pageStep = 5;
                    } else if (currentPageCount > 1000) {
                        pageStep = 2;
                    }

                    for (var i = pageStep; i <= currentPageCount; i += pageStep) {
                        this._$gotoPageInput.append('<option value="' + i + '">' + i + '</option>');
                    }

                    this._$gotoPageInput.data('pageCount', currentPageCount);
                }
            }

            //same for 'textbox' and 'combobox'
            this._$gotoPageInput.val(this._currentPageNo);
        },

        /************************************************************************
        * OVERRIDED METHODS                                                     *
        *************************************************************************/

        /* Overrides load method to set current page to 1.
        *************************************************************************/
        load: function() {
            this._currentPageNo = 1;

            base.load.apply(this, arguments);
        },

        /* Used to change options dynamically after initialization.
        *************************************************************************/
        _setOption: function(key, value) {
            base._setOption.apply(this, arguments);

            if (key == 'pageSize') {
                this._changePageSize(parseInt(value));
            }
        },

        /* Changes current page size with given value.
        *************************************************************************/
        _changePageSize: function(pageSize) {
            if (pageSize == this.options.pageSize) {
                return;
            }

            this.options.pageSize = pageSize;

            //Normalize current page
            var pageCount = this._calculatePageCount();
            if (this._currentPageNo > pageCount) {
                this._currentPageNo = pageCount;
            }
            if (this._currentPageNo <= 0) {
                this._currentPageNo = 1;
            }

            //if user sets one of the options on the combobox, then select it.
            var $pageSizeChangeCombobox = this._$bottomPanel.find('.jtable-page-size-change select');
            if ($pageSizeChangeCombobox.length > 0) {
                if (parseInt($pageSizeChangeCombobox.val()) != pageSize) {
                    var selectedOption = $pageSizeChangeCombobox.find('option[value=' + pageSize + ']');
                    if (selectedOption.length > 0) {
                        $pageSizeChangeCombobox.val(pageSize);
                    }
                }
            }

            this._savePagingSettings();
            this._reloadTable();
        },

        /* Saves user preferences for paging
        *************************************************************************/
        _savePagingSettings: function() {
            if (!this.options.saveUserPreferences) {
                return;
            }

            this._setCookie('page-size', this.options.pageSize);
        },

        /* Overrides _createRecordLoadUrl method to add paging info to URL.
        *************************************************************************/
        _createRecordLoadUrl: function() {
            var loadUrl = base._createRecordLoadUrl.apply(this, arguments);
            loadUrl = this._addPagingInfoToUrl(loadUrl, this._currentPageNo);
            return loadUrl;
        },

        /* Overrides _createJtParamsForLoading method to add paging parameters to jtParams object.
        *************************************************************************/
        _createJtParamsForLoading: function () {
            var jtParams = base._createJtParamsForLoading.apply(this, arguments);
            
            if (this.options.paging) {
                jtParams.jtStartIndex = (this._currentPageNo - 1) * this.options.pageSize;
                jtParams.jtPageSize = this.options.pageSize;
            }

            return jtParams;
        },

        /* Overrides _addRowToTable method to re-load table when a new row is created.
        * NOTE: THIS METHOD IS DEPRECATED AND WILL BE REMOVED FROM FEATURE RELEASES.
        * USE _addRow METHOD.
        *************************************************************************/
        _addRowToTable: function ($tableRow, index, isNewRow) {
            if (isNewRow && this.options.paging) {
                this._reloadTable();
                return;
            }

            base._addRowToTable.apply(this, arguments);
        },

        /* Overrides _addRow method to re-load table when a new row is created.
        *************************************************************************/
        _addRow: function ($row, options) {
            if (options && options.isNewRow && this.options.paging) {
                this._reloadTable();
                return;
            }

            base._addRow.apply(this, arguments);
        },

        /* Overrides _removeRowsFromTable method to re-load table when a row is removed from table.
        *************************************************************************/
        _removeRowsFromTable: function ($rows, reason) {
            base._removeRowsFromTable.apply(this, arguments);

            if (this.options.paging) {
                if (this._$tableRows.length <= 0 && this._currentPageNo > 1) {
                    --this._currentPageNo;
                }

                this._reloadTable();
            }
        },

        /* Overrides _onRecordsLoaded method to to do paging specific tasks.
        *************************************************************************/
        _onRecordsLoaded: function (data) {
            if (this.options.paging) {
                this._totalRecordCount = data.TotalRecordCount;
                this._createPagingList();
                this._createPagingInfo();
                this._refreshGotoPageInput();
            }

            base._onRecordsLoaded.apply(this, arguments);
        },

        /************************************************************************
        * PRIVATE METHODS                                                       *
        *************************************************************************/

        /* Adds jtStartIndex and jtPageSize parameters to a URL as query string.
        *************************************************************************/
        _addPagingInfoToUrl: function (url, pageNumber) {
            if (!this.options.paging) {
                return url;
            }

            var jtStartIndex = (pageNumber - 1) * this.options.pageSize;
            var jtPageSize = this.options.pageSize;

            return (url + (url.indexOf('?') < 0 ? '?' : '&') + 'jtStartIndex=' + jtStartIndex + '&jtPageSize=' + jtPageSize);
        },

        /* Creates and shows the page list.
        *************************************************************************/
        _createPagingList: function () {
            if (this.options.pageSize <= 0) {
                return;
            }

            this._$pagingListArea.empty();
            if (this._totalRecordCount <= 0) {
                return;
            }

            var pageCount = this._calculatePageCount();

            this._createFirstAndPreviousPageButtons();
            if (this.options.pageList == 'normal') {
                this._createPageNumberButtons(this._calculatePageNumbers(pageCount));
            }
            this._createLastAndNextPageButtons(pageCount);
            this._bindClickEventsToPageNumberButtons();
        },

        /* Creates and shows previous and first page links.
        *************************************************************************/
        _createFirstAndPreviousPageButtons: function () {
            var $first = $('<span></span>')
                .addClass('jtable-page-number-first')
                .html('&lt&lt')
                .data('pageNumber', 1)
                .appendTo(this._$pagingListArea);

            var $previous = $('<span></span>')
                .addClass('jtable-page-number-previous')
                .html('&lt')
                .data('pageNumber', this._currentPageNo - 1)
                .appendTo(this._$pagingListArea);

            this._jqueryuiThemeAddClass($first, 'ui-button ui-state-default', 'ui-state-hover');
            this._jqueryuiThemeAddClass($previous, 'ui-button ui-state-default', 'ui-state-hover');

            if (this._currentPageNo <= 1) {
                $first.addClass('jtable-page-number-disabled');
                $previous.addClass('jtable-page-number-disabled');
                this._jqueryuiThemeAddClass($first, 'ui-state-disabled');
                this._jqueryuiThemeAddClass($previous, 'ui-state-disabled');
            }
        },

        /* Creates and shows next and last page links.
        *************************************************************************/
        _createLastAndNextPageButtons: function (pageCount) {
            var $next = $('<span></span>')
                .addClass('jtable-page-number-next')
                .html('&gt')
                .data('pageNumber', this._currentPageNo + 1)
                .appendTo(this._$pagingListArea);
            var $last = $('<span></span>')
                .addClass('jtable-page-number-last')
                .html('&gt&gt')
                .data('pageNumber', pageCount)
                .appendTo(this._$pagingListArea);

            this._jqueryuiThemeAddClass($next, 'ui-button ui-state-default', 'ui-state-hover');
            this._jqueryuiThemeAddClass($last, 'ui-button ui-state-default', 'ui-state-hover');

            if (this._currentPageNo >= pageCount) {
                $next.addClass('jtable-page-number-disabled');
                $last.addClass('jtable-page-number-disabled');
                this._jqueryuiThemeAddClass($next, 'ui-state-disabled');
                this._jqueryuiThemeAddClass($last, 'ui-state-disabled');
            }
        },

        /* Creates and shows page number links for given number array.
        *************************************************************************/
        _createPageNumberButtons: function (pageNumbers) {
            var previousNumber = 0;
            for (var i = 0; i < pageNumbers.length; i++) {
                //Create "..." between page numbers if needed
                if ((pageNumbers[i] - previousNumber) > 1) {
                    $('<span></span>')
                        .addClass('jtable-page-number-space')
                        .html('...')
                        .appendTo(this._$pagingListArea);
                }

                this._createPageNumberButton(pageNumbers[i]);
                previousNumber = pageNumbers[i];
            }
        },

        /* Creates a page number link and adds to paging area.
        *************************************************************************/
        _createPageNumberButton: function (pageNumber) {
            var $pageNumber = $('<span></span>')
                .addClass('jtable-page-number')
                .html(pageNumber)
                .data('pageNumber', pageNumber)
                .appendTo(this._$pagingListArea);

            this._jqueryuiThemeAddClass($pageNumber, 'ui-button ui-state-default', 'ui-state-hover');
            
            if (this._currentPageNo == pageNumber) {
                $pageNumber.addClass('jtable-page-number-active jtable-page-number-disabled');
                this._jqueryuiThemeAddClass($pageNumber, 'ui-state-active');
            }
        },

        /* Calculates total page count according to page size and total record count.
        *************************************************************************/
        _calculatePageCount: function () {
            var pageCount = Math.floor(this._totalRecordCount / this.options.pageSize);
            if (this._totalRecordCount % this.options.pageSize != 0) {
                ++pageCount;
            }

            return pageCount;
        },

        /* Calculates page numbers and returns an array of these numbers.
        *************************************************************************/
        _calculatePageNumbers: function (pageCount) {
            if (pageCount <= 4) {
                //Show all pages
                var pageNumbers = [];
                for (var i = 1; i <= pageCount; ++i) {
                    pageNumbers.push(i);
                }

                return pageNumbers;
            } else {
                //show first three, last three, current, previous and next page numbers
                var shownPageNumbers = [1, 2, pageCount - 1, pageCount];
                var previousPageNo = this._normalizeNumber(this._currentPageNo - 1, 1, pageCount, 1);
                var nextPageNo = this._normalizeNumber(this._currentPageNo + 1, 1, pageCount, 1);

                this._insertToArrayIfDoesNotExists(shownPageNumbers, previousPageNo);
                this._insertToArrayIfDoesNotExists(shownPageNumbers, this._currentPageNo);
                this._insertToArrayIfDoesNotExists(shownPageNumbers, nextPageNo);

                shownPageNumbers.sort(function (a, b) { return a - b; });
                return shownPageNumbers;
            }
        },

        /* Creates and shows paging informations.
        *************************************************************************/
        _createPagingInfo: function () {
            if (this._totalRecordCount <= 0) {
                this._$pageInfoSpan.empty();
                return;
            }

            var startNo = (this._currentPageNo - 1) * this.options.pageSize + 1;
            var endNo = this._currentPageNo * this.options.pageSize;
            endNo = this._normalizeNumber(endNo, startNo, this._totalRecordCount, 0);

            if (endNo >= startNo) {
                var pagingInfoMessage = this._formatString(this.options.messages.pagingInfo, startNo, endNo, this._totalRecordCount);
                this._$pageInfoSpan.html(pagingInfoMessage);
            }
        },

        /* Binds click events of all page links to change the page.
        *************************************************************************/
        _bindClickEventsToPageNumberButtons: function () {
            var self = this;
            self._$pagingListArea
                .find('.jtable-page-number,.jtable-page-number-previous,.jtable-page-number-next,.jtable-page-number-first,.jtable-page-number-last')
                .not('.jtable-page-number-disabled')
                .click(function (e) {
                    e.preventDefault();
                    self._changePage($(this).data('pageNumber'));
                });
        },

        /* Changes current page to given value.
        *************************************************************************/
        _changePage: function (pageNo) {
            pageNo = this._normalizeNumber(pageNo, 1, this._calculatePageCount(), 1);
            if (pageNo == this._currentPageNo) {
                this._refreshGotoPageInput();
                return;
            }

            this._currentPageNo = pageNo;
            this._reloadTable();
        }

    });

})(jQuery);


/************************************************************************
* SORTING extension for jTable                                          *
*************************************************************************/
(function ($) {

    //Reference to base object members
    var base = {
        _initializeFields: $.hik.jtable.prototype._initializeFields,
        _normalizeFieldOptions: $.hik.jtable.prototype._normalizeFieldOptions,
        _createHeaderCellForField: $.hik.jtable.prototype._createHeaderCellForField,
        _createRecordLoadUrl: $.hik.jtable.prototype._createRecordLoadUrl,
        _createJtParamsForLoading: $.hik.jtable.prototype._createJtParamsForLoading
    };

    //extension members
    $.extend(true, $.hik.jtable.prototype, {

        /************************************************************************
        * DEFAULT OPTIONS / EVENTS                                              *
        *************************************************************************/
        options: {
            sorting: false,
            multiSorting: false,
            defaultSorting: ''
        },

        /************************************************************************
        * PRIVATE FIELDS                                                        *
        *************************************************************************/

        _lastSorting: null, //Last sorting of the table

        /************************************************************************
        * OVERRIDED METHODS                                                     *
        *************************************************************************/

        /* Overrides base method to create sorting array.
        *************************************************************************/
        _initializeFields: function () {
            base._initializeFields.apply(this, arguments);

            this._lastSorting = [];
            if (this.options.sorting) {
                this._buildDefaultSortingArray();
            }
        },

        /* Overrides _normalizeFieldOptions method to normalize sorting option for fields.
        *************************************************************************/
        _normalizeFieldOptions: function (fieldName, props) {
            base._normalizeFieldOptions.apply(this, arguments);
            props.sorting = (props.sorting != false);
        },

        /* Overrides _createHeaderCellForField to make columns sortable.
        *************************************************************************/
        _createHeaderCellForField: function (fieldName, field) {
            var $headerCell = base._createHeaderCellForField.apply(this, arguments);
            if (this.options.sorting && field.sorting) {
                this._makeColumnSortable($headerCell, fieldName);
            }

            return $headerCell;
        },

        /* Overrides _createRecordLoadUrl to add sorting specific info to URL.
        *************************************************************************/
        _createRecordLoadUrl: function () {
            var loadUrl = base._createRecordLoadUrl.apply(this, arguments);
            loadUrl = this._addSortingInfoToUrl(loadUrl);
            return loadUrl;
        },

        /************************************************************************
        * PRIVATE METHODS                                                       *
        *************************************************************************/

        /* Builds the sorting array according to defaultSorting string
        *************************************************************************/
        _buildDefaultSortingArray: function () {
            var self = this;

            $.each(self.options.defaultSorting.split(","), function (orderIndex, orderValue) {
                $.each(self.options.fields, function (fieldName, fieldProps) {
                    if (fieldProps.sorting) {
                        var colOffset = orderValue.indexOf(fieldName);
                        if (colOffset > -1) {
                            if (orderValue.toUpperCase().indexOf(' DESC', colOffset) > -1) {
                                self._lastSorting.push({
                                    fieldName: fieldName,
                                    sortOrder: 'DESC'
                                });
                            } else {
                                self._lastSorting.push({
                                    fieldName: fieldName,
                                    sortOrder: 'ASC'
                                });
                            }
                        }
                    }
                });
            });
        },

        /* Makes a column sortable.
        *************************************************************************/
        _makeColumnSortable: function ($columnHeader, fieldName) {
            var self = this;
            
            $columnHeader
                .addClass('jtable-column-header-sortable')
                .click(function (e) {
                    e.preventDefault();

                    if (!self.options.multiSorting || !e.ctrlKey) {
                        self._lastSorting = []; //clear previous sorting
                    }
                    
                    self._sortTableByColumn($columnHeader);
                });

            //Set default sorting
            $.each(this._lastSorting, function (sortIndex, sortField) {
                if (sortField.fieldName == fieldName) {
                    if (sortField.sortOrder == 'DESC') {
                        $columnHeader.addClass('jtable-column-header-sorted-desc');
                    } else {
                        $columnHeader.addClass('jtable-column-header-sorted-asc');
                    }
                }
            });
        },

        /* Sorts table according to a column header.
        *************************************************************************/
        _sortTableByColumn: function ($columnHeader) {
            //Remove sorting styles from all columns except this one
            if (this._lastSorting.length == 0) {
                $columnHeader.siblings().removeClass('jtable-column-header-sorted-asc jtable-column-header-sorted-desc');
            }

            //If current sorting list includes this column, remove it from the list
            for (var i = 0; i < this._lastSorting.length; i++) {
                if (this._lastSorting[i].fieldName == $columnHeader.data('fieldName')) {
                    this._lastSorting.splice(i--, 1);
                }
            }

            //Sort ASC or DESC according to current sorting state
            if ($columnHeader.hasClass('jtable-column-header-sorted-asc')) {
                $columnHeader.removeClass('jtable-column-header-sorted-asc').addClass('jtable-column-header-sorted-desc');
                this._lastSorting.push({
                    'fieldName': $columnHeader.data('fieldName'),
                    sortOrder: 'DESC'
                });
            } else {
                $columnHeader.removeClass('jtable-column-header-sorted-desc').addClass('jtable-column-header-sorted-asc');
                this._lastSorting.push({
                    'fieldName': $columnHeader.data('fieldName'),
                    sortOrder: 'ASC'
                });
            }

            //Load current page again
            this._reloadTable();
        },

        /* Adds jtSorting parameter to a URL as query string.
        *************************************************************************/
        _addSortingInfoToUrl: function (url) {
            if (!this.options.sorting || this._lastSorting.length == 0) {
                return url;
            }

            var sorting = [];
            $.each(this._lastSorting, function (idx, value) {
                sorting.push(value.fieldName + ' ' + value.sortOrder);
            });

            return (url + (url.indexOf('?') < 0 ? '?' : '&') + 'jtSorting=' + sorting.join(","));
        },

        /* Overrides _createJtParamsForLoading method to add sorging parameters to jtParams object.
        *************************************************************************/
        _createJtParamsForLoading: function () {
            var jtParams = base._createJtParamsForLoading.apply(this, arguments);

            if (this.options.sorting && this._lastSorting.length) {
                var sorting = [];
                $.each(this._lastSorting, function (idx, value) {
                    sorting.push(value.fieldName + ' ' + value.sortOrder);
                });

                jtParams.jtSorting = sorting.join(",");
            }

            return jtParams;
        }

    });

})(jQuery);

/************************************************************************
* DYNAMIC COLUMNS extension for jTable                                  *
* (Show/hide/resize columns)                                            *
*************************************************************************/
(function ($) {

    //Reference to base object members
    var base = {
        _create: $.hik.jtable.prototype._create,
        _normalizeFieldOptions: $.hik.jtable.prototype._normalizeFieldOptions,
        _createHeaderCellForField: $.hik.jtable.prototype._createHeaderCellForField,
        _createCellForRecordField: $.hik.jtable.prototype._createCellForRecordField
    };

    //extension members
    $.extend(true, $.hik.jtable.prototype, {

        /************************************************************************
        * DEFAULT OPTIONS / EVENTS                                              *
        *************************************************************************/

        options: {
            tableId: undefined,
            columnResizable: true,
            columnSelectable: true
        },

        /************************************************************************
        * PRIVATE FIELDS                                                        *
        *************************************************************************/

        _$columnSelectionDiv: null,
        _$columnResizeBar: null,
        _cookieKeyPrefix: null,
        _currentResizeArgs: null,

        /************************************************************************
        * OVERRIDED METHODS                                                     *
        *************************************************************************/

        /* Overrides _addRowToTableHead method.
        *************************************************************************/

        _create: function () {
            base._create.apply(this, arguments);

            this._createColumnResizeBar();
            this._createColumnSelection();

            if (this.options.saveUserPreferences) {
                this._loadColumnSettings();
            }

            this._normalizeColumnWidths();
        },

        /* Normalizes some options for a field (sets default values).
        *************************************************************************/
        _normalizeFieldOptions: function (fieldName, props) {
            base._normalizeFieldOptions.apply(this, arguments);

            //columnResizable
            if (this.options.columnResizable) {
                props.columnResizable = (props.columnResizable != false);
            }

            //visibility
            if (!props.visibility) {
                props.visibility = 'visible';
            }
        },

        /* Overrides _createHeaderCellForField to make columns dynamic.
        *************************************************************************/
        _createHeaderCellForField: function (fieldName, field) {
            var $headerCell = base._createHeaderCellForField.apply(this, arguments);

            //Make data columns resizable except the last one
            if (this.options.columnResizable && field.columnResizable && (fieldName != this._columnList[this._columnList.length - 1])) {
                this._makeColumnResizable($headerCell);
            }

            //Hide column if needed
            if (field.visibility == 'hidden') {
                $headerCell.hide();
            }

            return $headerCell;
        },

        /* Overrides _createHeaderCellForField to decide show or hide a column.
        *************************************************************************/
        _createCellForRecordField: function (record, fieldName) {
            var $column = base._createCellForRecordField.apply(this, arguments);

            var field = this.options.fields[fieldName];
            if (field.visibility == 'hidden') {
                $column.hide();
            }

            return $column;
        },

        /************************************************************************
        * PUBLIC METHODS                                                        *
        *************************************************************************/

        /* Changes visibility of a column.
        *************************************************************************/
        changeColumnVisibility: function (columnName, visibility) {
            this._changeColumnVisibilityInternal(columnName, visibility);
            this._normalizeColumnWidths();
            if (this.options.saveUserPreferences) {
                this._saveColumnSettings();
            }
        },

        /************************************************************************
        * PRIVATE METHODS                                                       *
        *************************************************************************/

        /* Changes visibility of a column.
        *************************************************************************/
        _changeColumnVisibilityInternal: function (columnName, visibility) {
            //Check if there is a column with given name
            var columnIndex = this._columnList.indexOf(columnName);
            if (columnIndex < 0) {
                this._logWarn('Column "' + columnName + '" does not exist in fields!');
                return;
            }

            //Check if visibility value is valid
            if (['visible', 'hidden', 'fixed'].indexOf(visibility) < 0) {
                this._logWarn('Visibility value is not valid: "' + visibility + '"! Options are: visible, hidden, fixed.');
                return;
            }

            //Get the field
            var field = this.options.fields[columnName];
            if (field.visibility == visibility) {
                return; //No action if new value is same as old one.
            }

            //Hide or show the column if needed
            var columnIndexInTable = this._firstDataColumnOffset + columnIndex + 1;
            if (field.visibility != 'hidden' && visibility == 'hidden') {
                this._$table
                    .find('>thead >tr >th:nth-child(' + columnIndexInTable + '),>tbody >tr >td:nth-child(' + columnIndexInTable + ')')
                    .hide();
            } else if (field.visibility == 'hidden' && visibility != 'hidden') {
                this._$table
                    .find('>thead >tr >th:nth-child(' + columnIndexInTable + '),>tbody >tr >td:nth-child(' + columnIndexInTable + ')')
                    .show()
                    .css('display', 'table-cell');
            }

            field.visibility = visibility;
        },

        /* Prepares dialog to change settings.
        *************************************************************************/
        _createColumnSelection: function () {
            var self = this;

            //Create a div for dialog and add to container element
            this._$columnSelectionDiv = $('<div />')
                .addClass('jtable-column-selection-container')
                .appendTo(self._$mainContainer);
            
            this._$table.children('thead').bind('contextmenu', function (e) {
                if (!self.options.columnSelectable) {
                    return;
                }
                
                e.preventDefault();

                //Make an overlay div to disable page clicks
                $('<div />')
                    .addClass('jtable-contextmenu-overlay')
                    .click(function() {
                        $(this).remove();
                        self._$columnSelectionDiv.hide();
                    })
                    .bind('contextmenu', function() { return false; })
                    //.appendTo(document.body);
                    .insertBefore(self._$columnSelectionDiv);

                self._fillColumnSelection();
                
                //Calculate position of column selection list and show it

                var containerOffset = self._$mainContainer.offset();
                var selectionDivTop = e.pageY - containerOffset.top;
                var selectionDivLeft = e.pageX - containerOffset.left;
                
                var selectionDivMinWidth = 100; //in pixels
                var containerWidth = self._$mainContainer.width();

                //If user clicks right area of header of the table, show list at a little left
                if ((containerWidth > selectionDivMinWidth) && (selectionDivLeft > (containerWidth - selectionDivMinWidth))) {
                    selectionDivLeft = containerWidth - selectionDivMinWidth;
                }

                self._$columnSelectionDiv.css({
                    left: selectionDivLeft,
                    top: selectionDivTop,
                    'min-width': selectionDivMinWidth + 'px'
                }).show();
            });
        },
        
        /* Prepares content of settings dialog.
        *************************************************************************/
        _fillColumnSelection: function () {
            var self = this;

            var $columnsUl = $('<ul></ul>')
                .addClass('jtable-column-select-list');
            for (var i = 0; i < this._columnList.length; i++) {
                var columnName = this._columnList[i];
                var field = this.options.fields[columnName];

                //Crete li element
                var $columnLi = $('<li></li>').appendTo($columnsUl);

                //Create label for the checkbox
                var $label = $('<label for="jt-mi-' + columnName + '"></label>')
                    .append($('<span>' + (field.title || columnName) + '</span>'))
                    .appendTo($columnLi);

                //Create checkbox
                var $checkbox = $('<input type="checkbox" id="jt-mi-' + columnName+ '" name="' + columnName + '">')
                    .prependTo($label)
                    .click(function () {
                        var $clickedCheckbox = $(this);
                        var clickedColumnName = $clickedCheckbox.attr('name');
                        var clickedField = self.options.fields[clickedColumnName];
                        if (clickedField.visibility == 'fixed') {
                            return;
                        }

                        self.changeColumnVisibility(clickedColumnName, $clickedCheckbox.is(':checked') ? 'visible' : 'hidden');
                    });

                //Check, if column if shown
                if (field.visibility != 'hidden') {
                    $checkbox.attr('checked', 'checked');
                }

                //Disable, if column is fixed
                if (field.visibility == 'fixed') {
                    $checkbox.attr('disabled', 'disabled');
                }
            }

            this._$columnSelectionDiv.html($columnsUl);
        },

        /* creates a vertical bar that is shown while resizing columns.
        *************************************************************************/
        _createColumnResizeBar: function () {
            this._$columnResizeBar = $('<div />')
                .addClass('jtable-column-resize-bar')
                .appendTo(this._$mainContainer)
                .hide();
        },

        /* Makes a column sortable.
        *************************************************************************/
        _makeColumnResizable: function ($columnHeader) {
            var self = this;

            //Create a handler to handle mouse click event
            $('<div />')
                .addClass('jtable-column-resize-handler')
                .appendTo($columnHeader.find('.jtable-column-header-container')) //Append the handler to the column
                .mousedown(function (downevent) { //handle mousedown event for the handler
                    downevent.preventDefault();
                    downevent.stopPropagation();

                    var mainContainerOffset = self._$mainContainer.offset();

                    //Get a reference to the next column
                    var $nextColumnHeader = $columnHeader.nextAll('th.jtable-column-header:visible:first');
                    if (!$nextColumnHeader.length) {
                        return;
                    }

                    //Store some information to be used on resizing
                    var minimumColumnWidth = 10; //A column's width can not be smaller than 10 pixel.
                    self._currentResizeArgs = {
                        currentColumnStartWidth: $columnHeader.outerWidth(),
                        minWidth: minimumColumnWidth,
                        maxWidth: $columnHeader.outerWidth() + $nextColumnHeader.outerWidth() - minimumColumnWidth,
                        mouseStartX: downevent.pageX,
                        minResizeX: function () { return this.mouseStartX - (this.currentColumnStartWidth - this.minWidth); },
                        maxResizeX: function () { return this.mouseStartX + (this.maxWidth - this.currentColumnStartWidth); }
                    };

                    //Handle mouse move event to move resizing bar
                    var resizeonmousemove = function (moveevent) {
                        if (!self._currentResizeArgs) {
                            return;
                        }

                        var resizeBarX = self._normalizeNumber(moveevent.pageX, self._currentResizeArgs.minResizeX(), self._currentResizeArgs.maxResizeX());
                        self._$columnResizeBar.css('left', (resizeBarX - mainContainerOffset.left) + 'px');
                    };

                    //Handle mouse up event to finish resizing of the column
                    var resizeonmouseup = function (upevent) {
                        if (!self._currentResizeArgs) {
                            return;
                        }

                        $(document).unbind('mousemove', resizeonmousemove);
                        $(document).unbind('mouseup', resizeonmouseup);

                        self._$columnResizeBar.hide();

                        //Calculate new widths in pixels
                        var mouseChangeX = upevent.pageX - self._currentResizeArgs.mouseStartX;
                        var currentColumnFinalWidth = self._normalizeNumber(self._currentResizeArgs.currentColumnStartWidth + mouseChangeX, self._currentResizeArgs.minWidth, self._currentResizeArgs.maxWidth);
                        var nextColumnFinalWidth = $nextColumnHeader.outerWidth() + (self._currentResizeArgs.currentColumnStartWidth - currentColumnFinalWidth);

                        //Calculate widths as percent
                        var pixelToPercentRatio = $columnHeader.data('width-in-percent') / self._currentResizeArgs.currentColumnStartWidth;
                        $columnHeader.data('width-in-percent', currentColumnFinalWidth * pixelToPercentRatio);
                        $nextColumnHeader.data('width-in-percent', nextColumnFinalWidth * pixelToPercentRatio);

                        //Set new widths to columns (resize!)
                        $columnHeader.css('width', $columnHeader.data('width-in-percent') + '%');
                        $nextColumnHeader.css('width', $nextColumnHeader.data('width-in-percent') + '%');

                        //Normalize all column widths
                        self._normalizeColumnWidths();

                        //Finish resizing
                        self._currentResizeArgs = null;

                        //Save current preferences
                        if (self.options.saveUserPreferences) {
                            self._saveColumnSettings();
                        }
                    };

                    //Show vertical resize bar
                    self._$columnResizeBar
                        .show()
                        .css({
                            top: ($columnHeader.offset().top - mainContainerOffset.top) + 'px',
                            left: (downevent.pageX - mainContainerOffset.left) + 'px',
                            height: (self._$table.outerHeight()) + 'px'
                        });

                    //Bind events
                    $(document).bind('mousemove', resizeonmousemove);
                    $(document).bind('mouseup', resizeonmouseup);
                });
        },

        /* Normalizes column widths as percent for current view.
        *************************************************************************/
        _normalizeColumnWidths: function () {

            //Set command column width
            var commandColumnHeaders = this._$table
                .find('>thead th.jtable-command-column-header')
                .data('width-in-percent', 1)
                .css('width', '1%');

            //Find data columns
            var headerCells = this._$table.find('>thead th.jtable-column-header');

            //Calculate total width of data columns
            var totalWidthInPixel = 0;
            headerCells.each(function () {
                var $cell = $(this);
                if ($cell.is(':visible')) {
                    totalWidthInPixel += $cell.outerWidth();
                }
            });

            //Calculate width of each column
            var columnWidhts = {};
            var availableWidthInPercent = 100.0 - commandColumnHeaders.length;
            headerCells.each(function () {
                var $cell = $(this);
                if ($cell.is(':visible')) {
                    var fieldName = $cell.data('fieldName');
                    var widthInPercent = $cell.outerWidth() * availableWidthInPercent / totalWidthInPixel;
                    columnWidhts[fieldName] = widthInPercent;
                }
            });

            //Set width of each column
            headerCells.each(function () {
                var $cell = $(this);
                if ($cell.is(':visible')) {
                    var fieldName = $cell.data('fieldName');
                    $cell.data('width-in-percent', columnWidhts[fieldName]).css('width', columnWidhts[fieldName] + '%');
                }
            });
        },

        /* Saves field setting to cookie.
        *  Saved setting will be a string like that:
        * fieldName1=visible;23|fieldName2=hidden;17|...
        *************************************************************************/
        _saveColumnSettings: function () {
            var self = this;
            var fieldSettings = '';
            this._$table.find('>thead >tr >th.jtable-column-header').each(function () {
                var $cell = $(this);
                var fieldName = $cell.data('fieldName');
                var columnWidth = $cell.data('width-in-percent');
                var fieldVisibility = self.options.fields[fieldName].visibility;
                var fieldSetting = fieldName + "=" + fieldVisibility + ';' + columnWidth;
                fieldSettings = fieldSettings + fieldSetting + '|';
            });

            this._setCookie('column-settings', fieldSettings.substr(0, fieldSettings.length - 1));
        },

        /* Loads field settings from cookie that is saved by _saveFieldSettings method.
        *************************************************************************/
        _loadColumnSettings: function () {
            var self = this;
            var columnSettingsCookie = this._getCookie('column-settings');
            if (!columnSettingsCookie) {
                return;
            }

            var columnSettings = {};
            $.each(columnSettingsCookie.split('|'), function (inx, fieldSetting) {
                var splitted = fieldSetting.split('=');
                var fieldName = splitted[0];
                var settings = splitted[1].split(';');
                columnSettings[fieldName] = {
                    columnVisibility: settings[0],
                    columnWidth: settings[1]
                };
            });

            var headerCells = this._$table.find('>thead >tr >th.jtable-column-header');
            headerCells.each(function () {
                var $cell = $(this);
                var fieldName = $cell.data('fieldName');
                var field = self.options.fields[fieldName];
                if (columnSettings[fieldName]) {
                    if (field.visibility != 'fixed') {
                        self._changeColumnVisibilityInternal(fieldName, columnSettings[fieldName].columnVisibility);
                    }

                    $cell.data('width-in-percent', columnSettings[fieldName].columnWidth).css('width', columnSettings[fieldName].columnWidth + '%');
                }
            });
        }

    });

})(jQuery);


/************************************************************************
* MASTER/CHILD tables extension for jTable                              *
*************************************************************************/
(function ($) {

    //Reference to base object members
    var base = {
        _removeRowsFromTable: $.hik.jtable.prototype._removeRowsFromTable
    };

    //extension members
    $.extend(true, $.hik.jtable.prototype, {

        /************************************************************************
        * DEFAULT OPTIONS / EVENTS                                              *
        *************************************************************************/
        options: {
            openChildAsAccordion: false
        },

        /************************************************************************
        * PUBLIC METHODS                                                        *
        *************************************************************************/

        /* Creates and opens a new child table for given row.
        *************************************************************************/
        openChildTable: function ($row, tableOptions, opened) {
            var self = this;

            //Apply theming as same as parent table unless explicitily set
            if (tableOptions.jqueryuiTheme == undefined) {
                tableOptions.jqueryuiTheme = self.options.jqueryuiTheme;
            }

            //Show close button as default
            tableOptions.showCloseButton = (tableOptions.showCloseButton != false);

            //Close child table when close button is clicked (default behavior)
            if (tableOptions.showCloseButton && !tableOptions.closeRequested) {
                tableOptions.closeRequested = function () {
                    self.closeChildTable($row);
                };
            }

            //If accordion style, close open child table (if it does exists)
            if (self.options.openChildAsAccordion) {
                $row.siblings('.jtable-data-row').each(function () {
                    self.closeChildTable($(this));
                });
            }

            //Close child table for this row and open new one for child table
            self.closeChildTable($row, function () {
                var $childRowColumn = self.getChildRow($row).children('td').empty();
                var $childTableContainer = $('<div />')
                    .addClass('jtable-child-table-container')
                    .appendTo($childRowColumn);
                $childRowColumn.data('childTable', $childTableContainer);
                $childTableContainer.jtable(tableOptions);
                self.openChildRow($row);
                $childTableContainer.hide().slideDown('fast', function () {
                    if (opened) {
                        opened({
                             childTable: $childTableContainer
                        });
                    }
                });
            });
        },

        /* Closes child table for given row.
        *************************************************************************/
        closeChildTable: function ($row, closed) {
            var self = this;
            
            var $childRowColumn = this.getChildRow($row).children('td');
            var $childTable = $childRowColumn.data('childTable');
            if (!$childTable) {
                if (closed) {
                    closed();
                }

                return;
            }

            $childRowColumn.data('childTable', null);
            $childTable.slideUp('fast', function () {
                $childTable.jtable('destroy');
                $childTable.remove();
                self.closeChildRow($row);
                if (closed) {
                    closed();
                }
            });
        },

        /* Returns a boolean value indicates that if a child row is open for given row.
        *************************************************************************/
        isChildRowOpen: function ($row) {
            return (this.getChildRow($row).is(':visible'));
        },

        /* Gets child row for given row, opens it if it's closed (Creates if needed).
        *************************************************************************/
        getChildRow: function ($row) {
            return $row.data('childRow') || this._createChildRow($row);
        },

        /* Creates and opens child row for given row.
        *************************************************************************/
        openChildRow: function ($row) {
            var $childRow = this.getChildRow($row);
            if (!$childRow.is(':visible')) {
                $childRow.show();
            }

            return $childRow;
        },

        /* Closes child row if it's open.
        *************************************************************************/
        closeChildRow: function ($row) {
            var $childRow = this.getChildRow($row);
            if ($childRow.is(':visible')) {
                $childRow.hide();
            }
        },

        /************************************************************************
        * OVERRIDED METHODS                                                     *
        *************************************************************************/

        /* Overrides _removeRowsFromTable method to remove child rows of deleted rows.
        *************************************************************************/
        _removeRowsFromTable: function ($rows, reason) {
            //var self = this;

            if (reason == 'deleted') {
                $rows.each(function () {
                    var $row = $(this);
                    var $childRow = $row.data('childRow');
                    if ($childRow) {
                        //self.closeChildTable($row); //Removed since it causes "Uncaught Error: cannot call methods on jtable prior to initialization; attempted to call method 'destroy'"
                        $childRow.remove();
                    }
                });
            }

            base._removeRowsFromTable.apply(this, arguments);
        },

        /************************************************************************
        * PRIVATE METHODS                                                       *
        *************************************************************************/

        /* Creates a child row for a row, hides and returns it.
        *************************************************************************/
        _createChildRow: function ($row) {
            var totalColumnCount = this._$table.find('thead th').length;
            var $childRow = $('<tr></tr>')
                .addClass('jtable-child-row')
                .append('<td colspan="' + totalColumnCount + '"></td>');
            $row.after($childRow);
            $row.data('childRow', $childRow);
            $childRow.hide();
            return $childRow;
        }

    });

})(jQuery);


/************************************************************************
* DATETIME extension for jTable       
* Author: Abu Ali Muhammad Sharjeel 
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
                fieldHtml.find('#Edit-' + funcParams.fieldName).attr(otherAttributes);
            }
                

            return fieldHtml;
            //funcParams.fieldName
        }

    });

})(jQuery);
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
/*
    jTable localization file for 'Arabic' language.
    Author: Ahmad Elsafty
*/
(function ($) {
    if ($('body').hasClass('rtls'))
    {
        $.extend(true, $.hik.jtable.prototype.options.messages, {
            serverCommunicationError: 'حدث خطأ عند محاولة الاتصال بالخادم(السيرفر(',
            loadingMessage: 'جاري التحميل',
            noDataAvailable: 'لا يوجد بيانات',
            addNewRecord: 'أضافة سجل جديد',
            editRecord: 'تعديل سجل',
            areYouSure: 'هل أنت متاكد؟',
            deleteConfirmation: 'هذا السجل سوف يتم حذفه. هل تريد بالتاكيد حذف هذا السجل؟',
            save: 'حفظ',
            saving: 'جاري الحفظ',
            cancel: 'إلغاء',
            deleteText: 'حذف',
            deleting: 'جاري الحذف',
            error: 'خطأ',
            close: 'اغلاق',
            detail: 'عرض التفاصيل',
            cannotLoadOptionsFor: 'لا يمكن تحميل الخيارات للحقل {0}',
            pagingInfo: 'إظهار {0}-{1} من {2}',
            pageSizeChangeLabel: 'عدد السجلات في الصفحة',
            gotoPageLabel: 'الانتقال إلى صفحة',
            canNotDeletedRecords: 'لا يمكن حذف {0} من {1} السجلات!',
            deleteProggress: 'حذف {0} من {1} السجلات , جاري الحذف'
        });

    }

})(jQuery);