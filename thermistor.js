function Thermistor(r0,t0,beta,r1,r2){
    //Class to do the thermistor maths
    this.r0=r0;                    //stated resistance, e.g. 10K
    this.t0=t0+273.15;                //temperature at stated resistance, e.g. 25C
    this.beta=beta;                    //stated beta, e.g. 3500
    this.vadc=5.0;                    //ADC reference
    this.vcc=5.0;                    //supply voltage to potential divider
    this.k=r0*Math.exp(-beta/this.t0);        //constant part of calculation

    if(r1>0){
        this.vs=r1*this.vcc/(r1+r2);    //effective bias voltage
        this.rs=r1*r2/(r1+r2);        //effective bias impedance
    }
    else{
        this.vs=this.vcc;    //effective bias voltage
        this.rs=r2;        //effective bias impedance
    }

    this.temp=function(adc){
        //Convert ADC reading into a temperature in Celcius
        v=adc*this.vadc/1024;                //convert the 10bit ADC value to a voltage
        r=this.rs*v/(this.vs-v);            //resistance of thermistor
        return (this.beta/Math.log(r/this.k))-273.15;    //temperature
    }
    this.setting=function(t){
        //Convert a temperature into a ADC value
        r=this.r0*Math.exp(this.beta*(1/(t+273.15)-1/this.t0));    //resistance of the thermistor
        v=this.vs*r/(this.rs+r);                //the voltage at the potential divider
        return Math.round(v/this.vadc*1024);            //the ADC reading
    }
    return this;
}
