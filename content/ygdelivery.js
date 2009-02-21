// ==UserScript==
// @name           ygdelivery
// @namespace      http://groups.yahoo.com/
// @description    shows message delivery time info
// @include        http://*groups.yahoo.com/group/*/message/*
// @include        http://*groups.yahoo.com/group/*/messages
// @include        http://*groups.yahoo.com/group/*/messages/*
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function include_dom(script_filename) {
    var html_doc = document.getElementsByTagName('head').item(0);
    var js = document.createElement('script');
    js.setAttribute('language', 'javascript');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', script_filename);
    html_doc.appendChild(js);
    return false;
}

/**
 * Version: 1.0 Alpha-1 
 * Build Date: 13-Nov-2007
 * Copyright (c) 2006-2007, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * License: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/. 
 * Website: http://www.datejs.com/ or http://www.coolite.com/datejs/
 */
Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|after|from)/i,subtract:/^(\-|before|ago)/i,yesterday:/^yesterday/i,today:/^t(oday)?/i,tomorrow:/^tomorrow/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^min(ute)?s?/i,hour:/^h(ou)?rs?/i,week:/^w(ee)?k/i,month:/^m(o(nth)?s?)?/i,day:/^d(ays?)?/i,year:/^y((ea)?rs?)?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a|p)/i},abbreviatedTimeZoneStandard:{GMT:"-000",EST:"-0400",CST:"-0500",MST:"-0600",PST:"-0700"},abbreviatedTimeZoneDST:{GMT:"-000",EDT:"-0500",CDT:"-0600",MDT:"-0700",PDT:"-0800"}};
Date.getMonthNumberFromName=function(name){var n=Date.CultureInfo.monthNames,m=Date.CultureInfo.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};Date.getDayNumberFromName=function(name){var n=Date.CultureInfo.dayNames,m=Date.CultureInfo.abbreviatedDayNames,o=Date.CultureInfo.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};Date.isLeapYear=function(year){return(((year%4===0)&&(year%100!==0))||(year%400===0));};Date.getDaysInMonth=function(year,month){return[31,(Date.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};Date.getTimezoneOffset=function(s,dst){return(dst||false)?Date.CultureInfo.abbreviatedTimeZoneDST[s.toUpperCase()]:Date.CultureInfo.abbreviatedTimeZoneStandard[s.toUpperCase()];};Date.getTimezoneAbbreviation=function(offset,dst){var n=(dst||false)?Date.CultureInfo.abbreviatedTimeZoneDST:Date.CultureInfo.abbreviatedTimeZoneStandard,p;for(p in n){if(n[p]===offset){return p;}}
return null;};Date.prototype.clone=function(){return new Date(this.getTime());};Date.prototype.compareTo=function(date){if(isNaN(this)){throw new Error(this);}
if(date instanceof Date&&!isNaN(date)){return(this>date)?1:(this<date)?-1:0;}else{throw new TypeError(date);}};Date.prototype.equals=function(date){return(this.compareTo(date)===0);};Date.prototype.between=function(start,end){var t=this.getTime();return t>=start.getTime()&&t<=end.getTime();};Date.prototype.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};Date.prototype.addSeconds=function(value){return this.addMilliseconds(value*1000);};Date.prototype.addMinutes=function(value){return this.addMilliseconds(value*60000);};Date.prototype.addHours=function(value){return this.addMilliseconds(value*3600000);};Date.prototype.addDays=function(value){return this.addMilliseconds(value*86400000);};Date.prototype.addWeeks=function(value){return this.addMilliseconds(value*604800000);};Date.prototype.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,this.getDaysInMonth()));return this;};Date.prototype.addYears=function(value){return this.addMonths(value*12);};Date.prototype.add=function(config){if(typeof config=="number"){this._orient=config;return this;}
var x=config;if(x.millisecond||x.milliseconds){this.addMilliseconds(x.millisecond||x.milliseconds);}
if(x.second||x.seconds){this.addSeconds(x.second||x.seconds);}
if(x.minute||x.minutes){this.addMinutes(x.minute||x.minutes);}
if(x.hour||x.hours){this.addHours(x.hour||x.hours);}
if(x.month||x.months){this.addMonths(x.month||x.months);}
if(x.year||x.years){this.addYears(x.year||x.years);}
if(x.day||x.days){this.addDays(x.day||x.days);}
return this;};Date._validate=function(value,min,max,name){if(typeof value!="number"){throw new TypeError(value+" is not a Number.");}else if(value<min||value>max){throw new RangeError(value+" is not a valid value for "+name+".");}
return true;};Date.validateMillisecond=function(n){return Date._validate(n,0,999,"milliseconds");};Date.validateSecond=function(n){return Date._validate(n,0,59,"seconds");};Date.validateMinute=function(n){return Date._validate(n,0,59,"minutes");};Date.validateHour=function(n){return Date._validate(n,0,23,"hours");};Date.validateDay=function(n,year,month){return Date._validate(n,1,Date.getDaysInMonth(year,month),"days");};Date.validateMonth=function(n){return Date._validate(n,0,11,"months");};Date.validateYear=function(n){return Date._validate(n,1,9999,"seconds");};Date.prototype.set=function(config){var x=config;if(!x.millisecond&&x.millisecond!==0){x.millisecond=-1;}
if(!x.second&&x.second!==0){x.second=-1;}
if(!x.minute&&x.minute!==0){x.minute=-1;}
if(!x.hour&&x.hour!==0){x.hour=-1;}
if(!x.day&&x.day!==0){x.day=-1;}
if(!x.month&&x.month!==0){x.month=-1;}
if(!x.year&&x.year!==0){x.year=-1;}
if(x.millisecond!=-1&&Date.validateMillisecond(x.millisecond)){this.addMilliseconds(x.millisecond-this.getMilliseconds());}
if(x.second!=-1&&Date.validateSecond(x.second)){this.addSeconds(x.second-this.getSeconds());}
if(x.minute!=-1&&Date.validateMinute(x.minute)){this.addMinutes(x.minute-this.getMinutes());}
if(x.hour!=-1&&Date.validateHour(x.hour)){this.addHours(x.hour-this.getHours());}
if(x.month!==-1&&Date.validateMonth(x.month)){this.addMonths(x.month-this.getMonth());}
if(x.year!=-1&&Date.validateYear(x.year)){this.addYears(x.year-this.getFullYear());}
if(x.day!=-1&&Date.validateDay(x.day,this.getFullYear(),this.getMonth())){this.addDays(x.day-this.getDate());}
if(x.timezone){this.setTimezone(x.timezone);}
if(x.timezoneOffset){this.setTimezoneOffset(x.timezoneOffset);}
return this;};Date.prototype.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};Date.prototype.isLeapYear=function(){var y=this.getFullYear();return(((y%4===0)&&(y%100!==0))||(y%400===0));};Date.prototype.isWeekday=function(){return!(this.is().sat()||this.is().sun());};Date.prototype.getDaysInMonth=function(){return Date.getDaysInMonth(this.getFullYear(),this.getMonth());};Date.prototype.moveToFirstDayOfMonth=function(){return this.set({day:1});};Date.prototype.moveToLastDayOfMonth=function(){return this.set({day:this.getDaysInMonth()});};Date.prototype.moveToDayOfWeek=function(day,orient){var diff=(day-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};Date.prototype.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};Date.prototype.getDayOfYear=function(){return Math.floor((this-new Date(this.getFullYear(),0,1))/86400000);};Date.prototype.getWeekOfYear=function(firstDayOfWeek){var y=this.getFullYear(),m=this.getMonth(),d=this.getDate();var dow=firstDayOfWeek||Date.CultureInfo.firstDayOfWeek;var offset=7+1-new Date(y,0,1).getDay();if(offset==8){offset=1;}
var daynum=((Date.UTC(y,m,d,0,0,0)-Date.UTC(y,0,1,0,0,0))/86400000)+1;var w=Math.floor((daynum-offset+7)/7);if(w===dow){y--;var prevOffset=7+1-new Date(y,0,1).getDay();if(prevOffset==2||prevOffset==8){w=53;}else{w=52;}}
return w;};Date.prototype.isDST=function(){console.log('isDST');return this.toString().match(/(E|C|M|P)(S|D)T/)[2]=="D";};Date.prototype.getTimezone=function(){return Date.getTimezoneAbbreviation(this.getUTCOffset,this.isDST());};Date.prototype.setTimezoneOffset=function(s){var here=this.getTimezoneOffset(),there=Number(s)*-6/10;this.addMinutes(there-here);return this;};Date.prototype.setTimezone=function(s){return this.setTimezoneOffset(Date.getTimezoneOffset(s));};Date.prototype.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r[0]+r.substr(2);}else{r=(n+10000).toString();return"+"+r.substr(1);}};Date.prototype.getDayName=function(abbrev){return abbrev?Date.CultureInfo.abbreviatedDayNames[this.getDay()]:Date.CultureInfo.dayNames[this.getDay()];};Date.prototype.getMonthName=function(abbrev){return abbrev?Date.CultureInfo.abbreviatedMonthNames[this.getMonth()]:Date.CultureInfo.monthNames[this.getMonth()];};Date.prototype._toString=Date.prototype.toString;Date.prototype.toString=function(format){var self=this;var p=function p(s){return(s.toString().length==1)?"0"+s:s;};return format?format.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g,function(format){switch(format){case"hh":return p(self.getHours()<13?self.getHours():(self.getHours()-12));case"h":return self.getHours()<13?self.getHours():(self.getHours()-12);case"HH":return p(self.getHours());case"H":return self.getHours();case"mm":return p(self.getMinutes());case"m":return self.getMinutes();case"ss":return p(self.getSeconds());case"s":return self.getSeconds();case"yyyy":return self.getFullYear();case"yy":return self.getFullYear().toString().substring(2,4);case"dddd":return self.getDayName();case"ddd":return self.getDayName(true);case"dd":return p(self.getDate());case"d":return self.getDate().toString();case"MMMM":return self.getMonthName();case"MMM":return self.getMonthName(true);case"MM":return p((self.getMonth()+1));case"M":return self.getMonth()+1;case"t":return self.getHours()<12?Date.CultureInfo.amDesignator.substring(0,1):Date.CultureInfo.pmDesignator.substring(0,1);case"tt":return self.getHours()<12?Date.CultureInfo.amDesignator:Date.CultureInfo.pmDesignator;case"zzz":case"zz":case"z":return"";}}):this._toString();};
Date.now=function(){return new Date();};Date.today=function(){return Date.now().clearTime();};Date.prototype._orient=+1;Date.prototype.next=function(){this._orient=+1;return this;};Date.prototype.last=Date.prototype.prev=Date.prototype.previous=function(){this._orient=-1;return this;};Date.prototype._is=false;Date.prototype.is=function(){this._is=true;return this;};Number.prototype._dateElement="day";Number.prototype.fromNow=function(){var c={};c[this._dateElement]=this;return Date.now().add(c);};Number.prototype.ago=function(){var c={};c[this._dateElement]=this*-1;return Date.now().add(c);};(function(){var $D=Date.prototype,$N=Number.prototype;var dx=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),mx=("january february march april may june july august september october november december").split(/\s/),px=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),de;var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;}
return this.moveToDayOfWeek(n,this._orient);};};for(var i=0;i<dx.length;i++){$D[dx[i]]=$D[dx[i].substring(0,3)]=df(i);}
var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;}
return this.moveToMonth(n,this._orient);};};for(var j=0;j<mx.length;j++){$D[mx[j]]=$D[mx[j].substring(0,3)]=mf(j);}
var ef=function(j){return function(){if(j.substring(j.length-1)!="s"){j+="s";}
return this["add"+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$D[de]=$D[de+"s"]=ef(px[k]);$N[de]=$N[de+"s"]=nf(de);}}());Date.prototype.toJSONString=function(){return this.toString("yyyy-MM-ddThh:mm:ssZ");};Date.prototype.toShortDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortDatePattern);};Date.prototype.toLongDateString=function(){return this.toString(Date.CultureInfo.formatPatterns.longDatePattern);};Date.prototype.toShortTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.shortTimePattern);};Date.prototype.toLongTimeString=function(){return this.toString(Date.CultureInfo.formatPatterns.longTimePattern);};Date.prototype.getOrdinal=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};
(function(){Date.Parsing={Exception:function(s){this.message="Parse error at '"+s.substring(0,10)+" ...'";}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp("^\s*"+s+"\s*"))(s);};},stoken:function(s){return _.rtoken(new RegExp("^"+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;}
break;}
return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];}
rx.push(r[0]);s=r[1];}
return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];}
return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];}
throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));}
return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;}
if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){r=null;}
if(r){return r;}}
throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);}
rx.push(r[0]);s=r[1];}
return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;if(px.length==1){return px[0];}
return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;}
rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;}
s=q[1];}
if(!r){throw new $P.Exception(s);}
if(q){throw new $P.Exception(q[1]);}
if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}}
return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;}
rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;}
if(!last&&q[1].length===0){last=true;}
if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}}
p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}}
if(rx[1].length<best[1].length){best=rx;}
if(best[1].length===0){break;}}
if(best[0].length===0){return best;}
if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);}
best[1]=q[1];}
return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);}
return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];}
if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx="optional not ignore cache".split(/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);}
var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx="each any all".split(/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}}
return rx;};Date.Grammar={};Date.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(/[^\d\+\-]/g,"");if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(/\d+/)[0]);};},month:function(s){return function(){this.month=((s.length==3)?Date.getMonthNumberFromName(s):(Number(s)-1));};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<Date.CultureInfo.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];var now=new Date();this.year=now.getFullYear();this.month=now.getMonth();this.day=1;this.hour=0;this.minute=0;this.second=0;for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}}
this.hour=(this.meridian=="p"&&this.hour<13)?this.hour+12:this.hour;if(this.day>Date.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.");}
var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});}
return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;}
for(var i=0;i<x.length;i++){if(typeof x[i]=="function"){x[i].call(this);}}
if(this.now){return new Date();}
var today=Date.today();var method=null;var expression=!!(this.days!=null||this.orient||this.operator);if(expression){var gap,mod,orient;orient=((this.orient=="past"||this.operator=="subtract")?-1:1);if(this.weekday){this.unit="day";gap=(Date.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);}
if(this.month){this.unit="month";gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;}
if(!this.unit){this.unit="day";}
if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1;}
if(this.unit=="week"){this.unit="day";this.value=this.value*7;}
this[this.unit+"s"]=this.value*orient;}
return today.add(this);}else{if(this.meridian&&this.hour){this.hour=(this.hour<13&&this.meridian=="p")?this.hour+12:this.hour;}
if(this.weekday&&!this.day){this.day=(today.addDays((Date.getDayNumberFromName(this.weekday)-today.getDay()))).getDate();}
if(this.month&&!this.day){this.day=1;}
return today.set(this);}}};var _=Date.Parsing.Operators,g=Date.Grammar,t=Date.Translator,_fn;g.datePartDelimiter=_.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(":");g.whiteSpace=_.rtoken(/^\s*/);g.generalDelimiter=_.rtoken(/^(([\s\,]|at|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=Date.CultureInfo.regexPatterns;var kx=keys.split(/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));}
fn=_C[keys]=_.any.apply(null,px);}
return fn;};g.ctoken2=function(key){return _.rtoken(Date.CultureInfo.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.mm,g.ss],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2("shortMeridian"),t.meridian));g.tt=_.cache(_.process(g.ctoken2("longMeridian"),t.meridian));g.z=_.cache(_.process(_.rtoken(/^(\+|\-)?\s*\d\d\d\d?/),t.timezone));g.zz=_.cache(_.process(_.rtoken(/^(\+|\-)\s*\d\d\d\d/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2("timezone"),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken("T"))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),t.month));g.y=_.cache(_.process(_.rtoken(/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2("timeContext")));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken("past future"),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken("add subtract"),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken("yesterday tomorrow today now"),t.rday);g.unit=_.process(g.ctoken("minute hour day week month year"),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(/\D/g,"");};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[Date.CultureInfo.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw Date.Parsing.Exception(fmt);}}),_.process(_.rtoken(/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));}
return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats(["yyyy-MM-ddTHH:mm:ss","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","d"]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){}
return g._start.call({},s);};}());Date._parse=Date.parse;Date.parse=function(s){var r=null;if(!s){return null;}
try{r=Date.Grammar.start.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};Date.getParseFunction=function(fx){var fn=Date.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};};Date.parseExact=function(s,fx){return Date.getParseFunction(fx)(s);};

function unhide(divID) {
  var item = document.getElementById(divID);
  if (item) { 
	var setting = GM_getValue(divID+"-vis","block");
	setting = (setting=="none")?'block':'none';
	GM_setValue(divID+"-vis",setting);
	item.style.display = setting;
  }
}

function remove_div(divID) {
  var item = document.getElementById(divID);
  if (item) { 
	item.style.display = 'none';
  }

  var allLinks = document.evaluate(
	'//div[@class="'+divID+'"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

	for (var i = 0; i < allLinks.snapshotLength; i++) {	
	    allLinks.snapshotItem(i).style.display = 'none';
	}
}
/**
 * sprintf() for JavaScript v.0.4
 *
 * Copyright (c) 2007 Alexandru Marasteanu <http://alexei.417.ro/>
 * Thanks to David Baird (unit test and patch).
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program; if not, write to the Free Software Foundation, Inc., 59 Temple
 * Place, Suite 330, Boston, MA 02111-1307 USA
 */

function str_repeat(i, m) { for (var o = []; m > 0; o[--m] = i); return(o.join('')); }

function sprintf () {
  var i = 0, a, f = arguments[i++], o = [], m, p, c, x;
  while (f) {
    if (m = /^[^\x25]+/.exec(f)) o.push(m[0]);
    else if (m = /^\x25{2}/.exec(f)) o.push('%');
    else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
      if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) throw("Too few arguments.");
      if (/[^s]/.test(m[7]) && (typeof(a) != 'number'))
        throw("Expecting number but found " + typeof(a));
      switch (m[7]) {
        case 'b': a = a.toString(2); break;
        case 'c': a = String.fromCharCode(a); break;
        case 'd': a = parseInt(a); break;
        case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
        case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
        case 'o': a = a.toString(8); break;
        case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
        case 'u': a = Math.abs(a); break;
        case 'x': a = a.toString(16); break;
        case 'X': a = a.toString(16).toUpperCase(); break;
      }
      a = (/[def]/.test(m[7]) && m[2] && a > 0 ? '+' + a : a);
      c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
      x = m[5] - String(a).length;
      p = m[5] ? str_repeat(c, x) : '';
      o.push(m[4] ? a + p : p + a);
    }
    else throw ("Huh ?!");
    f = f.substring(m[0].length);
  }
  return o.join('');
}

addGlobalStyle('.ygperf { padding: 0px 5px 0px 5px; border: 2px solid black; -moz-border-radius: 5px;}');

	
	var t = Math.random() * (120) +  8;   // seconds in message delivery -- find in message headers


// really, there is some way to get just the one matching div instead of pretending to loop through them

var allLinks, thisLink, txt, msg, myregexp, better, rep, main;

allLinks = document.evaluate(
	'//div[@class="smalltype ygrp-nowrap"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

	for (var i = 0; i < allLinks.snapshotLength; i++) {	
	    main = allLinks.snapshotItem(i);
		main.setAttribute('id', 'singlemessage');
	} 
	
allLinks = document.evaluate(
	'//div[@class="msgarea"]',
	document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
	var msgbody;
	for (var i = 0; i < allLinks.snapshotLength; i++) {	
	    msgbody = allLinks.snapshotItem(i);
		msgbody.setAttribute('id', 'msgbody')
	}
	
	

allLinks = document.evaluate(
	'//td[@class="date selected"]',
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);

var item = new Array();
var msgnum = 1;
var indexmsgurl = new Array();

for (var i = 0; i < allLinks.snapshotLength; i++) {	
    main = allLinks.snapshotItem(i);
	main.setAttribute('id',sprintf('msg%03d',msgnum++));
	var url = main.parentNode.innerHTML.match(/document.writeln\((.*)\);/);
	url = url[1].match(/href=\\"(.*)\\"/);
	main.setAttribute('msgurl',url[1]);
	indexmsgurl.push(url[1]);
}
  
function t_to_hms(t) {
	var neg = "";
	if (t<0) {
		neg = "-";
		t = t * -1;
	}
	var d = parseInt(t/(24*60*60));
	if (d>0) {
		t = t - d * 24 * 60 * 60;
	}
	var h = parseInt(t/60/60);
	var m = (t/60)%60;
	var s = t % 60;
	var str;

 	if (h > 0) { 
		str = sprintf("%d:%02d:%02d",h,m,s); 
	} else {
		str = sprintf('%d:%02d',m, s);
	}
	if (d > 0) {
		str = sprintf("%dd %s",d, str);
	}
	
	return neg + str;
}

var last = new Date();

function parse_header_info(srctxt) {
	var header = "";
	var j = 0;
	var head = new Array();
	var first = 0;
	var mod = 0;
	var wasmod = 0;
	var headstr = new Array();
	var headline = 0;

	var lines = srctxt.split(/\n/);
	
	for (var i=0; i<lines.length; i++) {
		//GM_log("line: " + lines[i]);
		lines[i] = lines[i].replace('&#43;','+');

		if (lines[i] == "") { break; }
		if (header == "") {
			header = lines[i];
		} else {
			if (lines[i].match(/^[^ ]+\: /)) {
				// GM_log(header);
				
				if (header.match(/(Date:|Received:|Approved-By:|From )/)) {
					header = header.replace(/ id [^ ]+$/,'');
					res = header.match(/by ([^ ]+) .*; (.*)$/);
					header = header.replace('(envelope-from yahoo)','');
					
					if (! res) { res = header.match(/(From).*\/a> (.*)$/); }
					if (! res) { res = header.match(/(Date): (.*)$/); }
					
					if (res && res[1] != 'uid') {
						res[1] = res[1].replace(".yahoo.com","");
						d = Date.parse(res[2])/1000; // gives milliseconds
						if (first == 0) { first = d; }
						if (last > d && wasmod == 0) { last = d;}
						head[j] = [d, headline, res[1]];
						// GM_log(head[j]);
						// GM_log('head['+j+'] '+head[j]);
						// GM_log('res[1] ' + res[1]);
						// GM_log('res[2] ' + res[2]);
				    	j++;
					}
				}
				headstr[headline] = header;
				// GM_log(headstr[headline]);
				headline++;
				header = lines[i];
			} else {	
				header = header + ' ' + lines[i];
			}
		}
		// GM_log(header);
		mod = header.match(/X-eGroups-Approved-By: ([^ ]+) .* via web; (.*)/);
		if (mod) { 
			// GM_log('mod: ' + mod[2]);
			last = Date.parse(mod[2])/1000;
			headstr[headline] = header;
			head [j] = [last, headline, ('mod ' + mod[1]).substr(0,20)]	;
			j++;
			headline++;
		}
	}
	
	var hostorder = [/Date/, 'outsidehosts', /^mta\d+\.grp/,
		/^m\d+\.grp/, /^t\d+\.bullet/, /n\d+.bullet/, /From/];
	function hosttype(name) {
		for (var i=0; i<hostorder.length; i++) {
			if (name[2].match(hostorder[i])) {
				return i;
			}
		}
		return 1;  // default is a non-yahoo host type
	}	
	
	function hopsortfn(a,b) {
		var ret = (a[0] - b[0]);
		if (ret == 0) {
			ret = (b[1] - a[1]); // use position in the message if the time is the same
		
			if (ret == 0) {
				ret = (hosttype(a) - hosttype(b));
			}
			if (ret == 0) {
				ret = (b[1] - a[1]);
			}
		}
		
		// GM_log (a[2] + ' ' + b[2] + ' ' + ret);
		// special case when Date or From header
		if (a[2].match(/Date/)) { return -1; }
		if (b[2].match(/Date/)) { return 1; }
		if (a[2].match(/From/)) { return 1; }
		if (b[2].match(/From/)) { return -1; }
		
		return ret;
	}
	head = head.sort(hopsortfn);
	return [head, headstr];
}


var hostname = new String(window.location).replace(/\/group\/.*/,'');

// for a single message page, get the header info and update the bubble
if (new String(window.location).match(/message\//)) {
	function process_single() {
		var main = document.getElementById('singlemessage');	

        if (main) 
        {
            var summary_lines = new Array();

            function paste_in_msg() {
                // put up a form with a blank text area
                // when the button is pressed, feed it to the header parser and show results
                // can probably use most of the current code and factor out some parts

                  var bg = document.getElementById('rawhead');
                  var msgtxt = "";

                  if (bg) { 
                    bg.parentNode.removeChild(bg);
                  }
                      bg = document.createElement('div');
                      bg.setAttribute('id', 'rawhead');
                      bg.style.position = 'absolute';
                      bg.style.backgroundColor = 'LightGreen';
                      bg.style.top = '60px';
                      bg.style.left = '30px';
                      bg.style.border = "5px solid black";
                      var title = document.createElement("h3");
                      title.style.textAlign = 'center';
                      title.style.color = 'Black';
                      var form = document.createElement('input');
                      form.setAttribute('type','submit');
                      form.setAttribute('id', 'subbutton');
                      form.addEventListener('click', function () { process_pasted_msg(); }, true);

                      form.appendChild(document.createTextNode('Submit'));
                      title.appendChild(document.createTextNode("Message Header Summary Input"));
                      title.appendChild(document.createElement('br'));
                      title.appendChild(form);

                      bg.appendChild(title);

                      var img = document.createElement('img');
                      img.align = 'right';
                      img.setAttribute('src', 'http://l.yimg.com/a/i/us/my/bn/x_d.gif');
                      img.setAttribute('alt', '(X)');
                      img.setAttribute('title', 'Close');
                      img.style.backgroundColor = 'white';
                      img.addEventListener('click', function () { remove_div('rawhead'); }, true);
                      bg.appendChild(img);
                      bg.appendChild(document.createElement('br'));
                      var res = document.createElement('div');
                      bg.appendChild(res);
                      res.setAttribute('id', 'result');
                        var msg = document.createElement('form');
                        bg.appendChild(msg);
                        var sumtxt = document.createElement('textarea');
                        sumtxt.setAttribute('id', 'textbox');
                        sumtxt.cols = 90;
                        sumtxt.rows = 15;
                        sumtxt.appendChild(document.createTextNode(msgtxt));
                        msg.appendChild(sumtxt);
                        document.getElementsByTagName('body')[0].appendChild(bg);
                        bg.style.left = (window.innerWidth - 750) / 2 + 'px'; 
                    GM_log(bg.innerHTML);
                }			

            function process_pasted_msg() {
                // handler for the button when a message is pasted in.
                // find the object
                var res = document.getElementById('result');
                res.style.backgroundColor = 'LightBlue';
                var pasted = document.getElementById('textbox');
                // process the message headers

                var ret = parse_header_info(pasted.value);
                var head = ret[0];
                var headstr = ret[1];

                // delete the submit button
                var sub = document.getElementById('subbutton');
                sub.parentNode.removeChild(sub); 

                // insert the hop analysis table
                var last = head[0][0];


                var txt = document.createElement('table');
                //txt.style.backgroundColor = 'purple';
                // txt.style.width = "750px";
                txt.style.opacity = 1.0;
                txt.style.textAlign = 'left';
                txt.style.border = 0;
                txt.style.width = '100%';
                txt.style.height = '95px';

                    function row_append(row, text) {
                        var td = document.createElement('td');
                        row.appendChild(td);
                        td.appendChild(document.createTextNode(text));
                        // td.style.padding = '1px';
                        return td;
                    }

                    function row_append_header(row, text) {
                        var td = document.createElement('th');
                        td.style.alignText = 'center';
                        td.style.padding = '5px';
                        row.appendChild(td);
                        var strong = td.appendChild(document.createElement('strong'));
                        td.appendChild(strong);
                        strong.appendChild(document.createTextNode(text));
                        return td;
                    }

                    var r = document.createElement('tr');
                    txt.appendChild(r);
                    r.style.border = 0;


                    //r.setAttribute('class','hop_table_header');
                    r.style.backgroundColor = 'purple';
                    r.style.color = 'white';
                    r.style.margin = '3px';
                    r.style.width = '100%';
                    // r.setAttribute('class', 'ygrp-menu');
                    //r.setAttribute('id', 'ygrp-menu');

                    row_append_header(r, "Hop");
                    row_append_header(r, "Description");
                    row_append_header(r, "Delta");
                    row_append_header(r, "Total");
                    row_append_header(r, "Date");

                    var prev = 0;
                    var str;

                    for (i=0;i<head.length;i++) {
                        r = document.createElement('tr');

                        var hopstr = sprintf('hop%02d',i);
                        r.setAttribute('id', hopstr);
                        var highlightstr = sprintf('header%02d',head[i][1]);
                        r.style.backgroundColor = 'white';
                        r.style.borderColor = 'white';						
                        txt.appendChild(r);
                        d = head[i][0];
                        host = head[i][2].replace(/\(.*/,'');
                        var hopcol = row_append(r, i+1);
                        hopcol.style.textAlign = 'center';
                        if (prev == 0) {
                            prev = d;  // time of the hop
                        } 
                        row_append(r, host);
                        row_append(r, t_to_hms(d - prev)).style.textAlign = 'right';
                        row_append(r, t_to_hms(d - last)).style.textAlign = 'right';
                        row_append(r, new Date(d*1000));
                        summary_lines.push(sprintf("%-20s %10s %10s %s", host,
                        t_to_hms(d - prev), t_to_hms(d - last), new Date(d*1000)));
                        prev = d;

                    } 
                res.appendChild(txt);
            }



           // decorate up the hidden pop up windows for the cut-n-paste and msg analyzer
            function popup_summary() {


              var bg = document.getElementById('rawhead');
              var msgtxt = '\n\nsummary: \nUrl: ' + window.location + '\n\n' + summary_lines.join("\n");

              if (bg) { 
                bg.parentNode.removeChild(bg);
              }

                  bg = document.createElement('div');
                  bg.setAttribute('id', 'rawhead');
                  bg.style.position = 'absolute';
                  bg.style.backgroundColor = 'LightBlue';
                  bg.style.top = '60px';
                  bg.style.left = '30px';
                  bg.style.border = "5px solid black";
                  var title = document.createElement("h3");
                  title.style.textAlign = 'center';
                  title.style.color = 'Black';
                  var titletxt = document.createTextNode("Message Header Summary")
                  title.appendChild(titletxt);
                  bg.appendChild(title);

                    var img = document.createElement('img');
                    img.align = 'right';
                    img.setAttribute('src', 'http://l.yimg.com/a/i/us/my/bn/x_d.gif');
                    img.setAttribute('alt', '(X)');
                    img.setAttribute('title', 'Close');
                    img.style.backgroundColor = 'white';
                    img.addEventListener('click', function () { remove_div('rawhead'); }, true);
                    bg.appendChild(img);
                    bg.appendChild(document.createElement('br'));

                    var msg = document.createElement('form');
                    bg.appendChild(msg);
                    var sumtxt = document.createElement('textarea');
                    sumtxt.setAttribute('id', 'textbox');
                    sumtxt.cols = 90;
                    sumtxt.rows = summary_lines.length + 6;
                    sumtxt.appendChild(document.createTextNode(msgtxt));
                    sumtxt.setAttribute('onfocus',
                        "if(window.fCopyToClipboard){if(window.fCopyToClipboard(this)) alert('Example has been copied into your clipboard. \nNow paste it in the sample area below and view the HTML rendering test.') }");

                    msg.appendChild(sumtxt);
                    document.getElementsByTagName('body')[0].appendChild(bg);
                    bg.style.left = (window.innerWidth - 750) / 2 + 'px';

                GM_log(bg.innerHTML);
            }

            GM_xmlhttpRequest({
                method: 'GET',
                url: window.location + '?source=1&var=1&l=1',	
                onload: function(responseDetails) {

                    var srctxt = responseDetails.responseText;
                    srctxt = srctxt.replace(/<br>/ig,"\n");
                    var start = srctxt.indexOf("source user")+12;
                    srctxt = srctxt.substr(start);
                    var ret = parse_header_info(srctxt);
                    var head = ret[0];
                    var headstr = ret[1];

                    var floater = document.createElement('div');
                    //floater.style.width = '350px';
                    // floater.style.position = 'absolute';
                    //floater.style.border = "4px solid grey";
                    floater.style.border = "1px dashed black";

                    floater.style.backgroundColor = 'white';
                    var txt = document.createElement('table');
                    //txt.style.backgroundColor = 'purple';
                    // txt.style.width = "750px";
                    txt.style.opacity = 1.0;
                    txt.style.textAlign = 'left';
                    txt.style.border = 0;
                    txt.style.width = '100%';
                    txt.style.height = '95px';

                    var headbox = document.createElement('table');
                    headbox.style.overflow = 'auto';
                    headbox.style.maxHeight = '500px';
                    headbox.setAttribute('border', '0');
                    headbox.style.maxWidth = "650px";

                    floater.appendChild(txt);

                    floater.appendChild(headbox);


                    //GM_log(headbox.innerHTML);

                    function row_append(row, text) {
                        var td = document.createElement('td');
                        row.appendChild(td);
                        td.appendChild(document.createTextNode(text));
                        // td.style.padding = '1px';
                        return td;
                    }

                    function row_append_header(row, text) {
                        var td = document.createElement('th');
                        td.style.alignText = 'center';
                        td.style.padding = '5px';
                        row.appendChild(td);
                        var strong = td.appendChild(document.createElement('strong'));
                        td.appendChild(strong);
                        strong.appendChild(document.createTextNode(text));
                        return td;
                    }

                    // hop inspector header row
                    var r = document.createElement('tr');
                    headbox.style.spacing = 0;
                    txt.appendChild(r);
                    var top = document.createElement('td');
                    var top2 = document.createElement('td');
                    top.style.align = 'left'
                    r.appendChild(top);
                    r.appendChild(top2);
                    top.style.backgroundColor = 'white';
                    top.style.color = 'white';
                    top.setAttribute('colspan', '4');
                    top2.style.textAlign = 'right';
                    top.style.verticalAlign = 'center';
                    top.style.padding = 0;



                    var img = document.createElement('img');
                    img.style.margin = "1px";
                    img.setAttribute('src', 'http://www.famfamfam.com/lab/icons/silk/icons/email_go.png');
                    img.setAttribute('alt', 'Compose');
                    img.setAttribute('title', 'Compose Message with Summary Info');
                    img.style.backgroundColor = 'white';
                    img.addEventListener('click', function () { popup_summary(); }, true);
                    top.appendChild(img);


                    var img = document.createElement('img');
                    img.style.margin = "1px";
                    img.setAttribute('src', 'http://www.famfamfam.com/lab/icons/silk/icons/email_edit.png');
                    img.setAttribute('alt', 'Paste');
                    img.setAttribute('title', 'Paste in Message Text to Analyze');
                    img.style.backgroundColor = 'white';
                    img.addEventListener('click', function () { paste_in_msg(); }, true);
                    top.appendChild(img);

                    var img = document.createElement('img');
                    img.style.margin = "1px";

                    img.setAttribute('src', 'http://www.famfamfam.com/lab/icons/silk/icons/text_align_left.png');
                    img.setAttribute('alt', 'Show Headers');
                    img.setAttribute('title', 'Show/Hide Headers');
                    img.style.backgroundColor = 'white';
                    img.addEventListener('click', function () { unhide('headbox'); }, true);
                    top2.appendChild(img);

                    // close button to close the header window entirely
                    var img = document.createElement('img');
                    img.style.margin = "1px";

                    img.setAttribute('src', 'http://www.famfamfam.com/lab/icons/silk/icons/cross.png');
                    img.setAttribute('alt', '(X)');
                    img.setAttribute('title', 'Close Header Inspector');
                    img.style.backgroundColor = 'white';
                    img.addEventListener('click', function () { unhide('floater'); }, true);
                    top2.appendChild(img);


                    var r = document.createElement('tr');
                    txt.appendChild(r);
                    r.style.border = 0;


                    //r.setAttribute('class','hop_table_header');
                    r.style.backgroundColor = 'purple';
                    r.style.color = 'white';
                    r.style.margin = '3px';
                    r.style.width = '100%';
                    // r.setAttribute('class', 'ygrp-menu');
                    //r.setAttribute('id', 'ygrp-menu');

                    row_append_header(r, "Hop");
                    row_append_header(r, "Description");
                    row_append_header(r, "Delta");
                    row_append_header(r, "Total");
                    row_append_header(r, "Date");

                    var prev = 0;
                    var str;

                    function decorate(id, hop, color) {
                        var dec = "";
                        dec = dec + "document.getElementById('" + id + "').style.backgroundColor = '" + color + "'; ";
                        dec = dec + "document.getElementById('" + hop + "').style.backgroundColor = '" + color + "'; ";
                        return dec;
                    }

                    summary_lines.push(sprintf("%-20s %10s %10s %s","Hop Description","Delta", "Total", "Date"));
                    for (i=0;i<head.length;i++) {
                        r = document.createElement('tr');

                        var hopstr = sprintf('hop%02d',i);
                        r.setAttribute('id', hopstr);
                        var highlightstr = sprintf('header%02d',head[i][1]);
                        r.style.backgroundColor = 'white';
                        r.style.borderColor = 'white';


                        r.setAttribute('onMouseOver', decorate(highlightstr, hopstr, 'yellow')); 
                        r.setAttribute('onMouseOut', decorate(highlightstr, hopstr, 'white'));

                        txt.appendChild(r);
                        d = head[i][0];
                        host = head[i][2].replace(/\(.*/,'');
                        var hopcol = row_append(r, i+1);
                        hopcol.style.textAlign = 'center';
                        if (prev == 0) {
                            prev = d;  // time of the hop
                        } 
                        row_append(r, host);
                        row_append(r, t_to_hms(d - prev)).style.textAlign = 'right';
                        row_append(r, t_to_hms(d - last)).style.textAlign = 'right';
                        row_append(r, new Date(d*1000));
                        summary_lines.push(sprintf("%-20s %10s %10s %s", host,
                        t_to_hms(d - prev), t_to_hms(d - last), new Date(d*1000)));
                        prev = d;

                    } 

                    function find_hopstr(headerline) {
                        var ret = false;
                        for (var ii=0;ii<head.length;ii++) {
                            if (head[ii][1] == headerline) {
                                ret = sprintf("hop%02d",ii);
                            }
                        }
                        return ret;
                    }

                    //  header lines

                    var r = document.createElement('tr');
                    var d = document.createElement('td');
                    d.setAttribute('colspan',5);
                    d.appendChild(document.createElement('hr'));
                    r.appendChild(d);
                    headbox.appendChild(r);
                    summary_lines.push("\nOriginal Message Headers\n-----");
                    for (i=0;i<headstr.length;i++) {
                        d = document.createElement('td');
                        d.setAttribute('id',sprintf('header%02d',i));
                        t = document.createTextNode(' '+headstr[i].replace(/postID=.*">/,'postID=xxx"> '));
                        d.appendChild(t);
                        var r = document.createElement('tr');
                        r.style.maxWidth = '750px';
                        r.style.textAlign = 'left';
                        var highlightstr = sprintf('header%02d',i);
                        var hopstr = find_hopstr(i);
                        if (hopstr) {
                            r.setAttribute('onMouseOver', decorate(highlightstr, hopstr, 'yellow')); 
                            r.setAttribute('onMouseOut', decorate(highlightstr, hopstr, 'white'));
                        }
                        r.appendChild(d);
                        headbox.appendChild(r);
                        summary_lines.push(headstr[i]);

                    }
                    GM_log('headbox: \n' + headbox.innerHTML);

                    var td = document.createElement('p');
                    td.style.margin = "0";
                    td.style.padding = "1px";
                    td.style.width = "50px";

                    var t = head.length > 0 ? head[head.length-1][0] - last : 0;
                    td.setAttribute('class', 'ygperf');

                    var color = 'LightGreen';
                    if (t > 10) {
                        color = '#FEB6B7';  // Red
                    }
                    td.style.backgroundColor = color;
                    //td.setAttribute('width', '50px');
                    td.setAttribute('align', 'center');
                    td.setAttribute('id', 'bubble');
                    // div is the bubble
                    td.setAttribute('onMouseOver',
                    "document.getElementById('bubble').style.backgroundColor = 'yellow';");
                    td.setAttribute('onMouseOut',
                    "document.getElementById('bubble').style.backgroundColor = '"+color+"';");


                    item.className=(item.className=='hidden')?'unhidden':'hidden';

                    // crazy event click handler to make greasemonkey work 
                    // see http://dunck.us/collab/GreaseMonkeyUserScripts details

                    td.addEventListener('click', function () { unhide('floater'); }, true); 

                    td.appendChild(document.createTextNode(t_to_hms(t)));

                    var rect = td.getBoundingClientRect();
                    //floater.style.left = td.style.left - 100;

                    //floater.addEventListener('click', function () { unhide('headbox'); }, true);
                    headbox.style.display =  GM_getValue('headbox-vis', 'none');
                    floater.style.display =  GM_getValue('floater-vis', 'none');
                    floater.setAttribute('id', 'floater');
                    headbox.setAttribute('id', 'headbox');

                    function getAbsolutePosition(node) {
                      var top = node.offsetTop;
                      var left = node.offsetLeft;

                      for (var parent = node.offsetParent; parent; parent = parent.offsetParent) {
                        top += parent.offsetTop;
                        left += parent.offsetLeft;
                      }

                      return {top: top, left: left};
                    }

                    main = document.getElementById('singlemessage');

                    var msgbody = document.getElementById('msgbody');
                    msgbody.parentNode.insertBefore(floater, msgbody);
                    main.parentNode.insertBefore(td, main.nextSibling);
                    msgbody.parentNode.insertBefore(document.createElement('p'), msgbody);

                    // GM_log(main.parentNode.innerHTML);


                    //var pos = getAbsolutePosition(td);
                    // floater.style.top = pos.top + 30;
                    // main.parentNode.insertBefore(floater, main.nextSibling);
                    //GM_log(main.style.top);
                    //floater.style.marginTop = '24px';
                    //floater.style.left = (window.innerWidth - 750) / 2 + 'px';
                    // floater.style.left = "300px";
                    // floater.style.top = "400px";

                    //GM_log(td.parentNode.innerHTML);

                    // GM_log(main.parentNode.innerHTML);
                    // GM_log('first: ' + first + '; last: ' + last + ';  diff: ' + (first - last));

                    // ``(window.location);
                    // headbox.style.display = 'none';
                }
            });
        }
	}
	process_single();   // closure trickery to make the call backs work 
} else {
	//    running this part when it's not a single message
	//  this is the index message listing
	function process_index(i) {
		function handleresponse(responseDetails) {
		    var srctxt = responseDetails.responseText;
			srctxt = srctxt.replace(/<br>/ig,"");
		    var start = srctxt.indexOf("source user")+14;
			srctxt = srctxt.substr(start);
		    var ret = parse_header_info(srctxt);
			var head = ret[0];
			var headstr = ret[1];
		
			var prev = 0;

            var last = 0;

            if (head[0]) 
            {
                last = head[0][0];
                for (var ii=0; ii<head.length; ii++) {
                    if (head[ii][2].match(/^mod /)) {
                        last = head[ii][0];
                    }
                }
            }
			var str;
		
			var td = document.createElement('div');
			var div = document.createElement('div');
			var t = head[head.length-1][0] - last ;
			div.setAttribute('class', 'ygperf');
		
			var color = 'LightGreen';
			if (t > 10) {
			    color = '#FEB6B7';  // Red
			}
			div.style.backgroundColor = color;
			td.setAttribute('minWidth', '50px');
			var bstr = sprintf("bubble%03d", i);
			div.setAttribute('id', bstr);
			// div is the bubble
			div.setAttribute('onMouseOver',
			"document.getElementById('"+bstr+"').style.backgroundColor = 'yellow';");
			div.setAttribute('onMouseOut',
			"document.getElementById('"+bstr+"').style.backgroundColor = '"+color+"';");
		
		    item.className=(item.className=='hidden')?'unhidden':'hidden';
				 
			td.addEventListener('click', function () { 
				// GM_log(msgurl);
				window.location.href = msgurl;
			 }, true); 
		
			div.appendChild(document.createTextNode(t_to_hms(t)));
			td.appendChild(div);
			td.style.width = "50px";
			main.appendChild(td);
			// GM_log(main.innerHTML);
			i++;;
			if (i < indexmsgurl.length + 1) {
					process_index(i);
			}
	    }
		var main = document.getElementById(sprintf('msg%03d',i));

        if (main) 
        {
            var msgurl = [hostname, main.getAttribute('msgurl')].join('');
            // GM_log('url ' + hostname);

            GM_xmlhttpRequest({
                method: 'GET',
                url: msgurl + '?source=1&var=1&l=1',	
                onload: handleresponse,
                param: i});
        }
	}
	process_index(1);
}

//   --- http://www.harrymaugans.com/wp-content/uploads/2007/03/motionpack.js ---
//       http://www.harrymaugans.com/2007/03/06/how-to-create-an-animated-sliding-collapsible-div-with-javascript-and-css/


var timerlen = 5;
var slideAniLen = 250;

var timerID = new Array();
var startTime = new Array();
var obj = new Array();
var endHeight = new Array();
var moving = new Array();
var dir = new Array();

function slidedown(objname){
        if(moving[objname])
                return;

        if(document.getElementById(objname).style.display != "none")
                return; // cannot slide down something that is already visible

        moving[objname] = true;
        dir[objname] = "down";
        startslide(objname);
}

function slideup(objname){
        if(moving[objname])
                return;

        if(document.getElementById(objname).style.display == "none")
                return; // cannot slide up something that is already hidden

        moving[objname] = true;
        dir[objname] = "up";
        startslide(objname);
}

function startslide(objname){
        obj[objname] = document.getElementById(objname);

        endHeight[objname] = parseInt(obj[objname].style.height);
        startTime[objname] = (new Date()).getTime();

        if(dir[objname] == "down"){
                obj[objname].style.height = "1px";
        }

        obj[objname].style.display = "block";

        timerID[objname] = setInterval('slidetick(\'' + objname + '\');',timerlen);
}

function slidetick(objname){
        var elapsed = (new Date()).getTime() - startTime[objname];

        if (elapsed > slideAniLen)
                endSlide(objname)
        else {
                var d =Math.round(elapsed / slideAniLen * endHeight[objname]);
                if(dir[objname] == "up")
                        d = endHeight[objname] - d;

                obj[objname].style.height = d + "px";
        }

        return;
}

function endSlide(objname){
        clearInterval(timerID[objname]);

        if(dir[objname] == "up")
                obj[objname].style.display = "none";

        obj[objname].style.height = endHeight[objname] + "px";

        delete(moving[objname]);
        delete(timerID[objname]);
        delete(startTime[objname]);
        delete(endHeight[objname]);
        delete(obj[objname]);
        delete(dir[objname]);

        return;
}