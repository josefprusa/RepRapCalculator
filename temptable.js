String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined'
      ? args[number]
      : '{' + number + '}'
    ;
  });
};
function createTemperatureLookup(arg,hash){
/*    sensible defaults:
    r0=10000;
    t0=25;
    beta=3947;
    r1=680;
    r2=1600;
    num_temps=20;
*/
    r0=arg[0];
    t0=arg[1];
    beta=arg[2];
    r1=arg[3];
    r2=arg[4];
    num_temps=arg[5];
    if(r1)
        max_adc=Math.round(1023*r1/(r1+r2));
    else
        max_adc=1023;

    increment=Math.round(max_adc/(num_temps-1));
    adcs=new Array();
    for(var i=1;i<max_adc;i+=increment)
        adcs.push(i);
    first=1;

    url=window.location.toString().substring(0,window.location.toString().length-window.location.hash.length)+(hash?('#'+hash):'');
    out ="// Thermistor lookup table for RepRap Temperature Sensor Boards (http://reprap.org/wiki/Thermistor)\n";
    out+="// Made with the online thermistor table generator by nathan7 at "+url+"\n"
    out+="// r0: {0}\n".format(r0);
    out+="// t0: {0}\n".format(t0);
    out+="// r1: {0}\n".format(r1);
    out+="// r2: {0}\n".format(r2);
    out+="// beta: {0}\n" .format(beta);
    out+="// max adc: {0}\n".format(max_adc);
    out+="#define NUMTEMPS {0}\n".format(adcs.length);
    out+="short temptable[NUMTEMPS][2] = {\n";

    var t=Thermistor(r0,t0,beta,r1,r2);
    counter=0;
    for(i=0;i<adcs.length;i++){
        adc=adcs[i];
        counter++;
        if(counter==adcs.length)
            out+="   {{0}, {1}}\n".format(adc,Math.floor(t.temp(adc)));
        else
            out+="   {{0}, {1}},\n".format(adc,Math.floor(t.temp(adc)));
    }
    out+="};";
    return out;
}

