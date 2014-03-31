Number.prototype.toMax=function(n){
    out=this.toPrecision(n);
    if(out.match(/[.,]/)) out=out.replace(/[.,]?0*$/,'');
    return out;
};
jQuery.fn.floatVal=function(){ 
    v=parseFloat(this.val());
    return isNaN(v)?0.0:v;
};
jQuery.fn.intVal=function(v){ 
    v=parseInt(this.val());
    return isNaN(v)?0:v;
};
jQuery.fn.fancyput=function(unit){
    var e=$('<div class="fancyputouter text ui-widget-content ui-corner-all"></div>');
    this.replaceWith(e).appendTo(e).css('display: inline');
    if(unit) $('<span></span>').addClass('unit').html(unit).appendTo(e);
    this.css('border-style: none;');
    return this;
}
jQuery.fn.fancyOutput=function(unit){
    if(!this.parent().hasClass('fancyputouter')){
        this.fancyput(unit).addClass('fancyoutput');
        this.parent().addClass('fancyoutputouter');
    }
    return this;
}
jQuery.fn.fancyInput=function(unit){
    if(!this.parent().hasClass('fancyputouter')){
        this.fancyput(unit).addClass('fancyinput text ui-widget-content');
        this.parent().addClass('fancyinputouter').click(function(){
            $('input',this).focus().setCursorPosition(-1);
        });
    }
    return this;
}
jQuery.fn.setCursorPosition=function(pos){
    if(pos<0) pos=$(this).val().length+pos+1;
    if($(this).get(0).setSelectionRange){
        $(this).get(0).setSelectionRange(pos,pos);
    }
    else if($(this).get(0).createTextRange){
        var range=$(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character',pos);
        range.moveStart('character',pos);
        range.select();
    }
    return this;
}

