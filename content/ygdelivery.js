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

include_dom('date.js');

function unhide(divID) {
  var item = document.getElementById(divID);
  if (item) { 
	var setting = GM_getValue(divID+"-vis","block");
	setting = (setting=="none")?'block':'none';
	GM_setValue(divID+"-vis",setting);
	item.style.display = setting;
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
	'//td[@class="ygrp-topic-title"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

	for (var i = 0; i < allLinks.snapshotLength; i++) {	
	    main = allLinks.snapshotItem(i);
		main.setAttribute('id', sprintf('singlemessage',i+1));
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
	srctxt = srctxt.replace(/<br>/ig,"\n");
    var start = srctxt.indexOf("source user")+14;
	srctxt = srctxt.substr(start);
	var lines = srctxt.split(/\n\n/);
	
	for (var i=0; i<lines.length; i++) {
		// GM_log("line: " + lines[i]);
		lines[i] = lines[i].replace('&#43;','+');
		if (lines[i] == "") { break; }
		if (header == "") {
			header = lines[i];
		} else {
			if (lines[i].match(/^[^ ]+: /)) {
				// GM_log(header);
				
				if (header.match(/(Date:|Received:|Approved-By:|From )/)) {
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
			// something clever here to sort
			// when the time is the same
			// Date < host < mta < mailer ... < From
			// newman, proxy, etc.
			
			ret = (hosttype(a) - hosttype(b));
		}
		return ret;
	}
	head = head.sort(hopsortfn);
	return [head, headstr];
}


var hostname = new String(window.location).replace(/\/group\/.*/,'');

// for a single message page, get the header info and update the bubble
if (new String(window.location).match(/message\//)) {
	
	var main = document.getElementById('singlemessage');	
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: window.location + '?source=1&var=1&l=1',	
	    onload: function(responseDetails) {
		
		    var ret = parse_header_info(responseDetails.responseText);
			var head = ret[0];
			var headstr = ret[1];
			
			var floater = document.createElement('div');
			//floater.style.width = '350px';
			floater.style.position = 'absolute';
			floater.style.border = "4px solid grey";
			
			floater.style.backgroundColor = 'white';
			var txt = document.createElement('table');
			txt.style.backgroundColor = 'white';
			txt.style.width = "750px";
			txt.style.opacity = 1.0;
			txt.style.textAlign = 'left';
			txt.style.border = 0;
			floater.appendChild(txt);
			
			floater.appendChild(document.createElement('hr'));
			
			var headbox = document.createElement('table');
			headbox.style.overflow = 'auto';
			headbox.style.maxHeight = '500px';
			headbox.style.maxWidth = "750px";
			floater.appendChild(headbox);
			
			
			// GM_log(txt.innerHTML);
			
			function row_append(row, text) {
				var td = document.createElement('td');
				row.appendChild(td);
				td.appendChild(document.createTextNode(text));
				td.style.padding = '3px';
				return td;
			}
			
			function row_append_header(row, text) {
				var td = document.createElement('th');
				td.style.alignText = 'center';
				td.style.padding = '5px';
				row.appendChild(td);
				td.appendChild(document.createTextNode(text));
				return td;
			}
			
			// hop inspector header row
			var r = document.createElement('tr');
			txt.appendChild(r);
			var top = document.createElement('td');
			r.appendChild(top);
			top.setAttribute('colspan', '5');
			top.style.textAlign = 'right';
			 
			var close = document.createElement('span');
			
			close.addEventListener('click', function () { unhide('floater'); }, true);
			var img = document.createElement('img');
			img.setAttribute('src', 'http://l.yimg.com/a/i/us/my/bn/x_d.gif');
			img.setAttribute('alt', '(X)');
			img.setAttribute('title', 'Close Header Inspector');
			close.appendChild(img);
			top.appendChild(close);
			
			var r = document.createElement('tr');
			txt.appendChild(r);
			r.style.border = 0;
			
			
			r.setAttribute('class','hop_table_header');
			r.style.backgroundColor = 'purple';
			r.style.color = 'white';
			r.style.margin = '3px';
			
		
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
			
			for (i=0;i<head.length;i++) {
				r = document.createElement('tr');
				
				var hopstr = sprintf('hop%02d',i);
				r.setAttribute('id', hopstr);
				var highlightstr = sprintf('header%02d',head[i][1]);
				
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
			}
			// GM_log(headbox.parentNode.innerHTML);
			
			var td = document.createElement('td');
			var div = document.createElement('div');
			var t = head[head.length-1][0] - last;
			div.setAttribute('class', 'ygperf');
			
			var color = 'LightGreen';
			if (t > 10) {
			    color = '#FEB6B7';  // Red
			}
			div.style.backgroundColor = color;
			td.setAttribute('width', '50px');
			td.setAttribute('align', 'center');
			div.setAttribute('id', 'bubble');
			// div is the bubble
			div.setAttribute('onMouseOver',
			"document.getElementById('bubble').style.backgroundColor = 'yellow';");
			div.setAttribute('onMouseOut',
			"document.getElementById('bubble').style.backgroundColor = '"+color+"';");
			

		    item.className=(item.className=='hidden')?'unhidden':'hidden';
					
			// crazy event click handler to make greasemonkey work 
			// see http://dunck.us/collab/GreaseMonkeyUserScripts details
			
			td.addEventListener('click', function () { unhide('floater'); }, true); 
			
			div.appendChild(document.createTextNode(t_to_hms(t)));
			td.appendChild(div);
			
			var rect = td.getBoundingClientRect();
			//floater.style.left = td.style.left - 100;
			
			floater.addEventListener('click', function () { unhide('headbox'); }, true);
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
			main.parentNode.insertBefore(td, main.nextSibling);
			
			
			var pos = getAbsolutePosition(td);
			// floater.style.top = pos.top + 30;
			main.parentNode.insertBefore(floater, main.nextSibling);
			GM_log(main.style.top);
			floater.style.marginTop = '24px';
			floater.style.left = (window.innerWidth - 750) / 2 + 'px';
			// floater.style.left = "300px";
			// floater.style.top = "400px";
			
			//GM_log(td.parentNode.innerHTML);
			
			// GM_log(main.parentNode.innerHTML);
			// GM_log('first: ' + first + '; last: ' + last + ';  diff: ' + (first - last));
 
			// GM_log(window.location);
		 	// headbox.style.display = 'none';
	    }
	});

} else {
	//    running this part when it's not a single message
	//  this is the index message listing
	function process_index(i) {
		function handleresponse(responseDetails) {
			// GM_log(responseDetails);
		    var ret = parse_header_info(responseDetails.responseText);
			var head = ret[0];
			var headstr = ret[1];
		
			var prev = 0;
			var last = head[0][0];
			for (var ii=0; ii<head.length; ii++) {
				if (head[ii][2].match(/^mod /)) {
					last = head[ii][0];
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
				GM_log(msgurl);
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
		var msgurl = [hostname, main.getAttribute('msgurl')].join('');
	    // GM_log('url ' + hostname);
	    
		GM_xmlhttpRequest({
	    	method: 'GET',
	    	url: msgurl + '?source=1&var=1&l=1',	
	    	onload: handleresponse,
	  		param: i});
	}
	process_index(1);
}

