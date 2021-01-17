/*! jQuery v3.1.1 | (c) jQuery Foundation | jquery.org/license */

!function(a,b){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){"use strict";var c=[],d=a.document,e=Object.getPrototypeOf,f=c.slice,g=c.concat,h=c.push,i=c.indexOf,j={},k=j.toString,l=j.hasOwnProperty,m=l.toString,n=m.call(Object),o={};function p(a,b){b=b||d;var c=b.createElement("script");c.text=a,b.head.appendChild(c).parentNode.removeChild(c)}var q="3.1.1",r=function(a,b){return new r.fn.init(a,b)},s=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,t=/^-ms-/,u=/-([a-z])/g,v=function(a,b){return b.toUpperCase()};r.fn=r.prototype={jquery:q,constructor:r,length:0,toArray:function(){return f.call(this)},get:function(a){return null==a?f.call(this):a<0?this[a+this.length]:this[a]},pushStack:function(a){var b=r.merge(this.constructor(),a);return b.prevObject=this,b},each:function(a){return r.each(this,a)},map:function(a){return this.pushStack(r.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(f.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(a<0?b:0);return this.pushStack(c>=0&&c<b?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:h,sort:c.sort,splice:c.splice},r.extend=r.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||r.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(r.isPlainObject(d)||(e=r.isArray(d)))?(e?(e=!1,f=c&&r.isArray(c)?c:[]):f=c&&r.isPlainObject(c)?c:{},g[b]=r.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},r.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===r.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=r.type(a);return("number"===b||"string"===b)&&!isNaN(a-parseFloat(a))},isPlainObject:function(a){var b,c;return!(!a||"[object Object]"!==k.call(a))&&(!(b=e(a))||(c=l.call(b,"constructor")&&b.constructor,"function"==typeof c&&m.call(c)===n))},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?j[k.call(a)]||"object":typeof a},globalEval:function(a){p(a)},camelCase:function(a){return a.replace(t,"ms-").replace(u,v)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(w(a)){for(c=a.length;d<c;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(s,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(w(Object(a))?r.merge(c,"string"==typeof a?[a]:a):h.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:i.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;d<c;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;f<g;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,f=0,h=[];if(w(a))for(d=a.length;f<d;f++)e=b(a[f],f,c),null!=e&&h.push(e);else for(f in a)e=b(a[f],f,c),null!=e&&h.push(e);return g.apply([],h)},guid:1,proxy:function(a,b){var c,d,e;if("string"==typeof b&&(c=a[b],b=a,a=c),r.isFunction(a))return d=f.call(arguments,2),e=function(){return a.apply(b||this,d.concat(f.call(arguments)))},e.guid=a.guid=a.guid||r.guid++,e},now:Date.now,support:o}),"function"==typeof Symbol&&(r.fn[Symbol.iterator]=c[Symbol.iterator]),r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){j["[object "+b+"]"]=b.toLowerCase()});function w(a){var b=!!a&&"length"in a&&a.length,c=r.type(a);return"function"!==c&&!r.isWindow(a)&&("array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a)}var x=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=function(a,b){for(var c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\0-\\xa0])+",M="\\["+K+"*("+L+")(?:"+K+"*([*^$|!~]?=)"+K+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+L+"))|)"+K+"*\\]",N=":("+L+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+M+")*)|.*)\\)|)",O=new RegExp(K+"+","g"),P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(N),U=new RegExp("^"+L+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L+"|[*])"),ATTR:new RegExp("^"+M),PSEUDO:new RegExp("^"+N),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),aa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ba=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,ca=function(a,b){return b?"\0"===a?"\ufffd":a.slice(0,-1)+"\\"+a.charCodeAt(a.length-1).toString(16)+" ":"\\"+a},da=function(){m()},ea=ta(function(a){return a.disabled===!0&&("form"in a||"label"in a)},{dir:"parentNode",next:"legend"});try{G.apply(D=H.call(v.childNodes),v.childNodes),D[v.childNodes.length].nodeType}catch(fa){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s=b&&b.ownerDocument,w=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==w&&9!==w&&11!==w)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==w&&(l=Z.exec(a)))if(f=l[1]){if(9===w){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(s&&(j=s.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(l[2])return G.apply(d,b.getElementsByTagName(a)),d;if((f=l[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==w)s=b,r=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(ba,ca):b.setAttribute("id",k=u),o=g(a),h=o.length;while(h--)o[h]="#"+k+" "+sa(o[h]);r=o.join(","),s=$.test(a)&&qa(b.parentNode)||b}if(r)try{return G.apply(d,s.querySelectorAll(r)),d}catch(x){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(P,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("fieldset");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&a.sourceIndex-b.sourceIndex;if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return function(b){return"form"in b?b.parentNode&&b.disabled===!1?"label"in b?"label"in b.parentNode?b.parentNode.disabled===a:b.disabled===a:b.isDisabled===a||b.isDisabled!==!a&&ea(b)===a:b.disabled===a:"label"in b&&b.disabled===a}}function pa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function qa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),v!==n&&(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(n.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){return a.getAttribute("id")===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}}):(d.filter.ID=function(a){var b=a.replace(_,aa);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}},d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c,d,e,f=b.getElementById(a);if(f){if(c=f.getAttributeNode("id"),c&&c.value===a)return[f];e=b.getElementsByName(a),d=0;while(f=e[d++])if(c=f.getAttributeNode("id"),c&&c.value===a)return[f]}return[]}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){if("undefined"!=typeof b.getElementsByClassName&&p)return b.getElementsByClassName(a)},r=[],q=[],(c.qsa=Y.test(n.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){a.innerHTML="<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+K+"*[*^$|!~]?="),2!==a.querySelectorAll(":enabled").length&&q.push(":enabled",":disabled"),o.appendChild(a).disabled=!0,2!==a.querySelectorAll(":disabled").length&&q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Y.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"*"),s.call(a,"[s!='']:x"),r.push("!=",N)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Y.test(o.compareDocumentPosition),t=b||Y.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?I(k,a)-I(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?I(k,a)-I(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?la(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(S,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.escape=function(a){return(a+"").replace(ba,ca)},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(_,aa),a[3]=(a[3]||a[4]||a[5]||"").replace(_,aa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return V.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&T.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(_,aa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:!b||(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(O," ")+" ").indexOf(c)>-1:"|="===b&&(e===c||e.slice(0,c.length+1)===c+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(P,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(_,aa),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return U.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(_,aa).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:oa(!1),disabled:oa(!0),checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:pa(function(){return[0]}),last:pa(function(a,b){return[b-1]}),eq:pa(function(a,b,c){return[c<0?c+b:c]}),even:pa(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:pa(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:pa(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:pa(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function ra(){}ra.prototype=d.filters=d.pseudos,d.setFilters=new ra,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=Q.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function sa(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function ta(a,b,c){var d=b.dir,e=b.next,f=e||d,g=c&&"parentNode"===f,h=x++;return b.first?function(b,c,e){while(b=b[d])if(1===b.nodeType||g)return a(b,c,e);return!1}:function(b,c,i){var j,k,l,m=[w,h];if(i){while(b=b[d])if((1===b.nodeType||g)&&a(b,c,i))return!0}else while(b=b[d])if(1===b.nodeType||g)if(l=b[u]||(b[u]={}),k=l[b.uniqueID]||(l[b.uniqueID]={}),e&&e===b.nodeName.toLowerCase())b=b[d]||b;else{if((j=k[f])&&j[0]===w&&j[1]===h)return m[2]=j[2];if(k[f]=m,m[2]=a(b,c,i))return!0}return!1}}function ua(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function va(a,b,c){for(var d=0,e=b.length;d<e;d++)ga(a,b[d],c);return c}function wa(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function xa(a,b,c,d,e,f){return d&&!d[u]&&(d=xa(d)),e&&!e[u]&&(e=xa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||va(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:wa(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=wa(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=wa(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ya(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ta(function(a){return a===b},h,!0),l=ta(function(a){return I(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];i<f;i++)if(c=d.relative[a[i].type])m=[ta(ua(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;e<f;e++)if(d.relative[a[e].type])break;return xa(i>1&&ua(m),i>1&&sa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(P,"$1"),c,i<e&&ya(a.slice(i,e)),e<f&&ya(a=a.slice(e)),e<f&&sa(a))}m.push(c)}return ua(m)}function za(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=E.call(i));u=wa(u)}G.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&ga.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=ya(b[c]),f[u]?d.push(f):e.push(f);f=A(a,za(e,d)),f.selector=a}return f},i=ga.select=function(a,b,c,e){var f,i,j,k,l,m="function"==typeof a&&a,n=!e&&g(a=m.selector||a);if(c=c||[],1===n.length){if(i=n[0]=n[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&9===b.nodeType&&p&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(_,aa),b)||[])[0],!b)return c;m&&(b=b.parentNode),a=a.slice(i.shift().value.length)}f=V.needsContext.test(a)?0:i.length;while(f--){if(j=i[f],d.relative[k=j.type])break;if((l=d.find[k])&&(e=l(j.matches[0].replace(_,aa),$.test(i[0].type)&&qa(b.parentNode)||b))){if(i.splice(f,1),a=e.length&&sa(i),!a)return G.apply(c,e),c;break}}}return(m||h(a,n))(e,b,!p,c,!b||$.test(a)&&qa(b.parentNode)||b),c},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("fieldset"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){if(!c)return a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){if(!c&&"input"===a.nodeName.toLowerCase())return a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(J,function(a,b,c){var d;if(!c)return a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);r.find=x,r.expr=x.selectors,r.expr[":"]=r.expr.pseudos,r.uniqueSort=r.unique=x.uniqueSort,r.text=x.getText,r.isXMLDoc=x.isXML,r.contains=x.contains,r.escapeSelector=x.escape;var y=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&r(a).is(c))break;d.push(a)}return d},z=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},A=r.expr.match.needsContext,B=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,C=/^.[^:#\[\.,]*$/;function D(a,b,c){return r.isFunction(b)?r.grep(a,function(a,d){return!!b.call(a,d,a)!==c}):b.nodeType?r.grep(a,function(a){return a===b!==c}):"string"!=typeof b?r.grep(a,function(a){return i.call(b,a)>-1!==c}):C.test(b)?r.filter(b,a,c):(b=r.filter(b,a),r.grep(a,function(a){return i.call(b,a)>-1!==c&&1===a.nodeType}))}r.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?r.find.matchesSelector(d,a)?[d]:[]:r.find.matches(a,r.grep(b,function(a){return 1===a.nodeType}))},r.fn.extend({find:function(a){var b,c,d=this.length,e=this;if("string"!=typeof a)return this.pushStack(r(a).filter(function(){for(b=0;b<d;b++)if(r.contains(e[b],this))return!0}));for(c=this.pushStack([]),b=0;b<d;b++)r.find(a,e[b],c);return d>1?r.uniqueSort(c):c},filter:function(a){return this.pushStack(D(this,a||[],!1))},not:function(a){return this.pushStack(D(this,a||[],!0))},is:function(a){return!!D(this,"string"==typeof a&&A.test(a)?r(a):a||[],!1).length}});var E,F=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,G=r.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||E,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:F.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof r?b[0]:b,r.merge(this,r.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),B.test(e[1])&&r.isPlainObject(b))for(e in b)r.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&(this[0]=f,this.length=1),this}return a.nodeType?(this[0]=a,this.length=1,this):r.isFunction(a)?void 0!==c.ready?c.ready(a):a(r):r.makeArray(a,this)};G.prototype=r.fn,E=r(d);var H=/^(?:parents|prev(?:Until|All))/,I={children:!0,contents:!0,next:!0,prev:!0};r.fn.extend({has:function(a){var b=r(a,this),c=b.length;return this.filter(function(){for(var a=0;a<c;a++)if(r.contains(this,b[a]))return!0})},closest:function(a,b){var c,d=0,e=this.length,f=[],g="string"!=typeof a&&r(a);if(!A.test(a))for(;d<e;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&r.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?r.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?i.call(r(a),this[0]):i.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(r.uniqueSort(r.merge(this.get(),r(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function J(a,b){while((a=a[b])&&1!==a.nodeType);return a}r.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return y(a,"parentNode")},parentsUntil:function(a,b,c){return y(a,"parentNode",c)},next:function(a){return J(a,"nextSibling")},prev:function(a){return J(a,"previousSibling")},nextAll:function(a){return y(a,"nextSibling")},prevAll:function(a){return y(a,"previousSibling")},nextUntil:function(a,b,c){return y(a,"nextSibling",c)},prevUntil:function(a,b,c){return y(a,"previousSibling",c)},siblings:function(a){return z((a.parentNode||{}).firstChild,a)},children:function(a){return z(a.firstChild)},contents:function(a){return a.contentDocument||r.merge([],a.childNodes)}},function(a,b){r.fn[a]=function(c,d){var e=r.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=r.filter(d,e)),this.length>1&&(I[a]||r.uniqueSort(e),H.test(a)&&e.reverse()),this.pushStack(e)}});var K=/[^\x20\t\r\n\f]+/g;function L(a){var b={};return r.each(a.match(K)||[],function(a,c){b[c]=!0}),b}r.Callbacks=function(a){a="string"==typeof a?L(a):r.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){r.each(b,function(b,c){r.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==r.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return r.each(arguments,function(a,b){var c;while((c=r.inArray(b,f,c))>-1)f.splice(c,1),c<=h&&h--}),this},has:function(a){return a?r.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||b||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j};function M(a){return a}function N(a){throw a}function O(a,b,c){var d;try{a&&r.isFunction(d=a.promise)?d.call(a).done(b).fail(c):a&&r.isFunction(d=a.then)?d.call(a,b,c):b.call(void 0,a)}catch(a){c.call(void 0,a)}}r.extend({Deferred:function(b){var c=[["notify","progress",r.Callbacks("memory"),r.Callbacks("memory"),2],["resolve","done",r.Callbacks("once memory"),r.Callbacks("once memory"),0,"resolved"],["reject","fail",r.Callbacks("once memory"),r.Callbacks("once memory"),1,"rejected"]],d="pending",e={state:function(){return d},always:function(){return f.done(arguments).fail(arguments),this},"catch":function(a){return e.then(null,a)},pipe:function(){var a=arguments;return r.Deferred(function(b){r.each(c,function(c,d){var e=r.isFunction(a[d[4]])&&a[d[4]];f[d[1]](function(){var a=e&&e.apply(this,arguments);a&&r.isFunction(a.promise)?a.promise().progress(b.notify).done(b.resolve).fail(b.reject):b[d[0]+"With"](this,e?[a]:arguments)})}),a=null}).promise()},then:function(b,d,e){var f=0;function g(b,c,d,e){return function(){var h=this,i=arguments,j=function(){var a,j;if(!(b<f)){if(a=d.apply(h,i),a===c.promise())throw new TypeError("Thenable self-resolution");j=a&&("object"==typeof a||"function"==typeof a)&&a.then,r.isFunction(j)?e?j.call(a,g(f,c,M,e),g(f,c,N,e)):(f++,j.call(a,g(f,c,M,e),g(f,c,N,e),g(f,c,M,c.notifyWith))):(d!==M&&(h=void 0,i=[a]),(e||c.resolveWith)(h,i))}},k=e?j:function(){try{j()}catch(a){r.Deferred.exceptionHook&&r.Deferred.exceptionHook(a,k.stackTrace),b+1>=f&&(d!==N&&(h=void 0,i=[a]),c.rejectWith(h,i))}};b?k():(r.Deferred.getStackHook&&(k.stackTrace=r.Deferred.getStackHook()),a.setTimeout(k))}}return r.Deferred(function(a){c[0][3].add(g(0,a,r.isFunction(e)?e:M,a.notifyWith)),c[1][3].add(g(0,a,r.isFunction(b)?b:M)),c[2][3].add(g(0,a,r.isFunction(d)?d:N))}).promise()},promise:function(a){return null!=a?r.extend(a,e):e}},f={};return r.each(c,function(a,b){var g=b[2],h=b[5];e[b[1]]=g.add,h&&g.add(function(){d=h},c[3-a][2].disable,c[0][2].lock),g.add(b[3].fire),f[b[0]]=function(){return f[b[0]+"With"](this===f?void 0:this,arguments),this},f[b[0]+"With"]=g.fireWith}),e.promise(f),b&&b.call(f,f),f},when:function(a){var b=arguments.length,c=b,d=Array(c),e=f.call(arguments),g=r.Deferred(),h=function(a){return function(c){d[a]=this,e[a]=arguments.length>1?f.call(arguments):c,--b||g.resolveWith(d,e)}};if(b<=1&&(O(a,g.done(h(c)).resolve,g.reject),"pending"===g.state()||r.isFunction(e[c]&&e[c].then)))return g.then();while(c--)O(e[c],h(c),g.reject);return g.promise()}});var P=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook=function(b,c){a.console&&a.console.warn&&b&&P.test(b.name)&&a.console.warn("jQuery.Deferred exception: "+b.message,b.stack,c)},r.readyException=function(b){a.setTimeout(function(){throw b})};var Q=r.Deferred();r.fn.ready=function(a){return Q.then(a)["catch"](function(a){r.readyException(a)}),this},r.extend({isReady:!1,readyWait:1,holdReady:function(a){a?r.readyWait++:r.ready(!0)},ready:function(a){(a===!0?--r.readyWait:r.isReady)||(r.isReady=!0,a!==!0&&--r.readyWait>0||Q.resolveWith(d,[r]))}}),r.ready.then=Q.then;function R(){d.removeEventListener("DOMContentLoaded",R),
a.removeEventListener("load",R),r.ready()}"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(r.ready):(d.addEventListener("DOMContentLoaded",R),a.addEventListener("load",R));var S=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===r.type(c)){e=!0;for(h in c)S(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,r.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(r(a),c)})),b))for(;h<i;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},T=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function U(){this.expando=r.expando+U.uid++}U.uid=1,U.prototype={cache:function(a){var b=a[this.expando];return b||(b={},T(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[r.camelCase(b)]=c;else for(d in b)e[r.camelCase(d)]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][r.camelCase(b)]},access:function(a,b,c){return void 0===b||b&&"string"==typeof b&&void 0===c?this.get(a,b):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d=a[this.expando];if(void 0!==d){if(void 0!==b){r.isArray(b)?b=b.map(r.camelCase):(b=r.camelCase(b),b=b in d?[b]:b.match(K)||[]),c=b.length;while(c--)delete d[b[c]]}(void 0===b||r.isEmptyObject(d))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!r.isEmptyObject(b)}};var V=new U,W=new U,X=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Y=/[A-Z]/g;function Z(a){return"true"===a||"false"!==a&&("null"===a?null:a===+a+""?+a:X.test(a)?JSON.parse(a):a)}function $(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Y,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c=Z(c)}catch(e){}W.set(a,b,c)}else c=void 0;return c}r.extend({hasData:function(a){return W.hasData(a)||V.hasData(a)},data:function(a,b,c){return W.access(a,b,c)},removeData:function(a,b){W.remove(a,b)},_data:function(a,b,c){return V.access(a,b,c)},_removeData:function(a,b){V.remove(a,b)}}),r.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=W.get(f),1===f.nodeType&&!V.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=r.camelCase(d.slice(5)),$(f,d,e[d])));V.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){W.set(this,a)}):S(this,function(b){var c;if(f&&void 0===b){if(c=W.get(f,a),void 0!==c)return c;if(c=$(f,a),void 0!==c)return c}else this.each(function(){W.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){W.remove(this,a)})}}),r.extend({queue:function(a,b,c){var d;if(a)return b=(b||"fx")+"queue",d=V.get(a,b),c&&(!d||r.isArray(c)?d=V.access(a,b,r.makeArray(c)):d.push(c)),d||[]},dequeue:function(a,b){b=b||"fx";var c=r.queue(a,b),d=c.length,e=c.shift(),f=r._queueHooks(a,b),g=function(){r.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return V.get(a,c)||V.access(a,c,{empty:r.Callbacks("once memory").add(function(){V.remove(a,[b+"queue",c])})})}}),r.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?r.queue(this[0],a):void 0===b?this:this.each(function(){var c=r.queue(this,a,b);r._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&r.dequeue(this,a)})},dequeue:function(a){return this.each(function(){r.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=r.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=V.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var _=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,aa=new RegExp("^(?:([+-])=|)("+_+")([a-z%]*)$","i"),ba=["Top","Right","Bottom","Left"],ca=function(a,b){return a=b||a,"none"===a.style.display||""===a.style.display&&r.contains(a.ownerDocument,a)&&"none"===r.css(a,"display")},da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};function ea(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return r.css(a,b,"")},i=h(),j=c&&c[3]||(r.cssNumber[b]?"":"px"),k=(r.cssNumber[b]||"px"!==j&&+i)&&aa.exec(r.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,r.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var fa={};function ga(a){var b,c=a.ownerDocument,d=a.nodeName,e=fa[d];return e?e:(b=c.body.appendChild(c.createElement(d)),e=r.css(b,"display"),b.parentNode.removeChild(b),"none"===e&&(e="block"),fa[d]=e,e)}function ha(a,b){for(var c,d,e=[],f=0,g=a.length;f<g;f++)d=a[f],d.style&&(c=d.style.display,b?("none"===c&&(e[f]=V.get(d,"display")||null,e[f]||(d.style.display="")),""===d.style.display&&ca(d)&&(e[f]=ga(d))):"none"!==c&&(e[f]="none",V.set(d,"display",c)));for(f=0;f<g;f++)null!=e[f]&&(a[f].style.display=e[f]);return a}r.fn.extend({show:function(){return ha(this,!0)},hide:function(){return ha(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){ca(this)?r(this).show():r(this).hide()})}});var ia=/^(?:checkbox|radio)$/i,ja=/<([a-z][^\/\0>\x20\t\r\n\f]+)/i,ka=/^$|\/(?:java|ecma)script/i,la={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};la.optgroup=la.option,la.tbody=la.tfoot=la.colgroup=la.caption=la.thead,la.th=la.td;function ma(a,b){var c;return c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[],void 0===b||b&&r.nodeName(a,b)?r.merge([a],c):c}function na(a,b){for(var c=0,d=a.length;c<d;c++)V.set(a[c],"globalEval",!b||V.get(b[c],"globalEval"))}var oa=/<|&#?\w+;/;function pa(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],n=0,o=a.length;n<o;n++)if(f=a[n],f||0===f)if("object"===r.type(f))r.merge(m,f.nodeType?[f]:f);else if(oa.test(f)){g=g||l.appendChild(b.createElement("div")),h=(ja.exec(f)||["",""])[1].toLowerCase(),i=la[h]||la._default,g.innerHTML=i[1]+r.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;r.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",n=0;while(f=m[n++])if(d&&r.inArray(f,d)>-1)e&&e.push(f);else if(j=r.contains(f.ownerDocument,f),g=ma(l.appendChild(f),"script"),j&&na(g),c){k=0;while(f=g[k++])ka.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),o.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",o.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var qa=d.documentElement,ra=/^key/,sa=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,ta=/^([^.]*)(?:\.(.+)|)/;function ua(){return!0}function va(){return!1}function wa(){try{return d.activeElement}catch(a){}}function xa(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)xa(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=va;else if(!e)return a;return 1===f&&(g=e,e=function(a){return r().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=r.guid++)),a.each(function(){r.event.add(this,b,e,d,c)})}r.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.get(a);if(q){c.handler&&(f=c,c=f.handler,e=f.selector),e&&r.find.matchesSelector(qa,e),c.guid||(c.guid=r.guid++),(i=q.events)||(i=q.events={}),(g=q.handle)||(g=q.handle=function(b){return"undefined"!=typeof r&&r.event.triggered!==b.type?r.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(K)||[""],j=b.length;while(j--)h=ta.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n&&(l=r.event.special[n]||{},n=(e?l.delegateType:l.bindType)||n,l=r.event.special[n]||{},k=r.extend({type:n,origType:p,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&r.expr.match.needsContext.test(e),namespace:o.join(".")},f),(m=i[n])||(m=i[n]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,o,g)!==!1||a.addEventListener&&a.addEventListener(n,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),r.event.global[n]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q=V.hasData(a)&&V.get(a);if(q&&(i=q.events)){b=(b||"").match(K)||[""],j=b.length;while(j--)if(h=ta.exec(b[j])||[],n=p=h[1],o=(h[2]||"").split(".").sort(),n){l=r.event.special[n]||{},n=(d?l.delegateType:l.bindType)||n,m=i[n]||[],h=h[2]&&new RegExp("(^|\\.)"+o.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&p!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,o,q.handle)!==!1||r.removeEvent(a,n,q.handle),delete i[n])}else for(n in i)r.event.remove(a,n+b[j],c,d,!0);r.isEmptyObject(i)&&V.remove(a,"handle events")}},dispatch:function(a){var b=r.event.fix(a),c,d,e,f,g,h,i=new Array(arguments.length),j=(V.get(this,"events")||{})[b.type]||[],k=r.event.special[b.type]||{};for(i[0]=b,c=1;c<arguments.length;c++)i[c]=arguments[c];if(b.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,b)!==!1){h=r.event.handlers.call(this,b,j),c=0;while((f=h[c++])&&!b.isPropagationStopped()){b.currentTarget=f.elem,d=0;while((g=f.handlers[d++])&&!b.isImmediatePropagationStopped())b.rnamespace&&!b.rnamespace.test(g.namespace)||(b.handleObj=g,b.data=g.data,e=((r.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(b.result=e)===!1&&(b.preventDefault(),b.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,b),b.result}},handlers:function(a,b){var c,d,e,f,g,h=[],i=b.delegateCount,j=a.target;if(i&&j.nodeType&&!("click"===a.type&&a.button>=1))for(;j!==this;j=j.parentNode||this)if(1===j.nodeType&&("click"!==a.type||j.disabled!==!0)){for(f=[],g={},c=0;c<i;c++)d=b[c],e=d.selector+" ",void 0===g[e]&&(g[e]=d.needsContext?r(e,this).index(j)>-1:r.find(e,this,null,[j]).length),g[e]&&f.push(d);f.length&&h.push({elem:j,handlers:f})}return j=this,i<b.length&&h.push({elem:j,handlers:b.slice(i)}),h},addProp:function(a,b){Object.defineProperty(r.Event.prototype,a,{enumerable:!0,configurable:!0,get:r.isFunction(b)?function(){if(this.originalEvent)return b(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[a]},set:function(b){Object.defineProperty(this,a,{enumerable:!0,configurable:!0,writable:!0,value:b})}})},fix:function(a){return a[r.expando]?a:new r.Event(a)},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==wa()&&this.focus)return this.focus(),!1},delegateType:"focusin"},blur:{trigger:function(){if(this===wa()&&this.blur)return this.blur(),!1},delegateType:"focusout"},click:{trigger:function(){if("checkbox"===this.type&&this.click&&r.nodeName(this,"input"))return this.click(),!1},_default:function(a){return r.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},r.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},r.Event=function(a,b){return this instanceof r.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ua:va,this.target=a.target&&3===a.target.nodeType?a.target.parentNode:a.target,this.currentTarget=a.currentTarget,this.relatedTarget=a.relatedTarget):this.type=a,b&&r.extend(this,b),this.timeStamp=a&&a.timeStamp||r.now(),void(this[r.expando]=!0)):new r.Event(a,b)},r.Event.prototype={constructor:r.Event,isDefaultPrevented:va,isPropagationStopped:va,isImmediatePropagationStopped:va,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ua,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ua,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ua,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},r.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,"char":!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:function(a){var b=a.button;return null==a.which&&ra.test(a.type)?null!=a.charCode?a.charCode:a.keyCode:!a.which&&void 0!==b&&sa.test(a.type)?1&b?1:2&b?3:4&b?2:0:a.which}},r.event.addProp),r.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){r.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||r.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),r.fn.extend({on:function(a,b,c,d){return xa(this,a,b,c,d)},one:function(a,b,c,d){return xa(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,r(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=va),this.each(function(){r.event.remove(this,a,c,b)})}});var ya=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,za=/<script|<style|<link/i,Aa=/checked\s*(?:[^=]|=\s*.checked.)/i,Ba=/^true\/(.*)/,Ca=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Da(a,b){return r.nodeName(a,"table")&&r.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a:a}function Ea(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function Fa(a){var b=Ba.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function Ga(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(V.hasData(a)&&(f=V.access(a),g=V.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;c<d;c++)r.event.add(b,e,j[e][c])}W.hasData(a)&&(h=W.access(a),i=r.extend({},h),W.set(b,i))}}function Ha(a,b){var c=b.nodeName.toLowerCase();"input"===c&&ia.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function Ia(a,b,c,d){b=g.apply([],b);var e,f,h,i,j,k,l=0,m=a.length,n=m-1,q=b[0],s=r.isFunction(q);if(s||m>1&&"string"==typeof q&&!o.checkClone&&Aa.test(q))return a.each(function(e){var f=a.eq(e);s&&(b[0]=q.call(this,e,f.html())),Ia(f,b,c,d)});if(m&&(e=pa(b,a[0].ownerDocument,!1,a,d),f=e.firstChild,1===e.childNodes.length&&(e=f),f||d)){for(h=r.map(ma(e,"script"),Ea),i=h.length;l<m;l++)j=e,l!==n&&(j=r.clone(j,!0,!0),i&&r.merge(h,ma(j,"script"))),c.call(a[l],j,l);if(i)for(k=h[h.length-1].ownerDocument,r.map(h,Fa),l=0;l<i;l++)j=h[l],ka.test(j.type||"")&&!V.access(j,"globalEval")&&r.contains(k,j)&&(j.src?r._evalUrl&&r._evalUrl(j.src):p(j.textContent.replace(Ca,""),k))}return a}function Ja(a,b,c){for(var d,e=b?r.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||r.cleanData(ma(d)),d.parentNode&&(c&&r.contains(d.ownerDocument,d)&&na(ma(d,"script")),d.parentNode.removeChild(d));return a}r.extend({htmlPrefilter:function(a){return a.replace(ya,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=r.contains(a.ownerDocument,a);if(!(o.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||r.isXMLDoc(a)))for(g=ma(h),f=ma(a),d=0,e=f.length;d<e;d++)Ha(f[d],g[d]);if(b)if(c)for(f=f||ma(a),g=g||ma(h),d=0,e=f.length;d<e;d++)Ga(f[d],g[d]);else Ga(a,h);return g=ma(h,"script"),g.length>0&&na(g,!i&&ma(a,"script")),h},cleanData:function(a){for(var b,c,d,e=r.event.special,f=0;void 0!==(c=a[f]);f++)if(T(c)){if(b=c[V.expando]){if(b.events)for(d in b.events)e[d]?r.event.remove(c,d):r.removeEvent(c,d,b.handle);c[V.expando]=void 0}c[W.expando]&&(c[W.expando]=void 0)}}}),r.fn.extend({detach:function(a){return Ja(this,a,!0)},remove:function(a){return Ja(this,a)},text:function(a){return S(this,function(a){return void 0===a?r.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return Ia(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Da(this,a);b.appendChild(a)}})},prepend:function(){return Ia(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=Da(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return Ia(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return Ia(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(r.cleanData(ma(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null!=a&&a,b=null==b?a:b,this.map(function(){return r.clone(this,a,b)})},html:function(a){return S(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!za.test(a)&&!la[(ja.exec(a)||["",""])[1].toLowerCase()]){a=r.htmlPrefilter(a);try{for(;c<d;c++)b=this[c]||{},1===b.nodeType&&(r.cleanData(ma(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return Ia(this,arguments,function(b){var c=this.parentNode;r.inArray(this,a)<0&&(r.cleanData(ma(this)),c&&c.replaceChild(b,this))},a)}}),r.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){r.fn[a]=function(a){for(var c,d=[],e=r(a),f=e.length-1,g=0;g<=f;g++)c=g===f?this:this.clone(!0),r(e[g])[b](c),h.apply(d,c.get());return this.pushStack(d)}});var Ka=/^margin/,La=new RegExp("^("+_+")(?!px)[a-z%]+$","i"),Ma=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)};!function(){function b(){if(i){i.style.cssText="box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",i.innerHTML="",qa.appendChild(h);var b=a.getComputedStyle(i);c="1%"!==b.top,g="2px"===b.marginLeft,e="4px"===b.width,i.style.marginRight="50%",f="4px"===b.marginRight,qa.removeChild(h),i=null}}var c,e,f,g,h=d.createElement("div"),i=d.createElement("div");i.style&&(i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",o.clearCloneStyle="content-box"===i.style.backgroundClip,h.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",h.appendChild(i),r.extend(o,{pixelPosition:function(){return b(),c},boxSizingReliable:function(){return b(),e},pixelMarginRight:function(){return b(),f},reliableMarginLeft:function(){return b(),g}}))}();function Na(a,b,c){var d,e,f,g,h=a.style;return c=c||Ma(a),c&&(g=c.getPropertyValue(b)||c[b],""!==g||r.contains(a.ownerDocument,a)||(g=r.style(a,b)),!o.pixelMarginRight()&&La.test(g)&&Ka.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function Oa(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Pa=/^(none|table(?!-c[ea]).+)/,Qa={position:"absolute",visibility:"hidden",display:"block"},Ra={letterSpacing:"0",fontWeight:"400"},Sa=["Webkit","Moz","ms"],Ta=d.createElement("div").style;function Ua(a){if(a in Ta)return a;var b=a[0].toUpperCase()+a.slice(1),c=Sa.length;while(c--)if(a=Sa[c]+b,a in Ta)return a}function Va(a,b,c){var d=aa.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Wa(a,b,c,d,e){var f,g=0;for(f=c===(d?"border":"content")?4:"width"===b?1:0;f<4;f+=2)"margin"===c&&(g+=r.css(a,c+ba[f],!0,e)),d?("content"===c&&(g-=r.css(a,"padding"+ba[f],!0,e)),"margin"!==c&&(g-=r.css(a,"border"+ba[f]+"Width",!0,e))):(g+=r.css(a,"padding"+ba[f],!0,e),"padding"!==c&&(g+=r.css(a,"border"+ba[f]+"Width",!0,e)));return g}function Xa(a,b,c){var d,e=!0,f=Ma(a),g="border-box"===r.css(a,"boxSizing",!1,f);if(a.getClientRects().length&&(d=a.getBoundingClientRect()[b]),d<=0||null==d){if(d=Na(a,b,f),(d<0||null==d)&&(d=a.style[b]),La.test(d))return d;e=g&&(o.boxSizingReliable()||d===a.style[b]),d=parseFloat(d)||0}return d+Wa(a,b,c||(g?"border":"content"),e,f)+"px"}r.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Na(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=r.camelCase(b),i=a.style;return b=r.cssProps[h]||(r.cssProps[h]=Ua(h)||h),g=r.cssHooks[b]||r.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=aa.exec(c))&&e[1]&&(c=ea(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(r.cssNumber[h]?"":"px")),o.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=r.camelCase(b);return b=r.cssProps[h]||(r.cssProps[h]=Ua(h)||h),g=r.cssHooks[b]||r.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Na(a,b,d)),"normal"===e&&b in Ra&&(e=Ra[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),r.each(["height","width"],function(a,b){r.cssHooks[b]={get:function(a,c,d){if(c)return!Pa.test(r.css(a,"display"))||a.getClientRects().length&&a.getBoundingClientRect().width?Xa(a,b,d):da(a,Qa,function(){return Xa(a,b,d)})},set:function(a,c,d){var e,f=d&&Ma(a),g=d&&Wa(a,b,d,"border-box"===r.css(a,"boxSizing",!1,f),f);return g&&(e=aa.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=r.css(a,b)),Va(a,c,g)}}}),r.cssHooks.marginLeft=Oa(o.reliableMarginLeft,function(a,b){if(b)return(parseFloat(Na(a,"marginLeft"))||a.getBoundingClientRect().left-da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px"}),r.each({margin:"",padding:"",border:"Width"},function(a,b){r.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];d<4;d++)e[a+ba[d]+b]=f[d]||f[d-2]||f[0];return e}},Ka.test(a)||(r.cssHooks[a+b].set=Va)}),r.fn.extend({css:function(a,b){return S(this,function(a,b,c){var d,e,f={},g=0;if(r.isArray(b)){for(d=Ma(a),e=b.length;g<e;g++)f[b[g]]=r.css(a,b[g],!1,d);return f}return void 0!==c?r.style(a,b,c):r.css(a,b)},a,b,arguments.length>1)}});function Ya(a,b,c,d,e){return new Ya.prototype.init(a,b,c,d,e)}r.Tween=Ya,Ya.prototype={constructor:Ya,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||r.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(r.cssNumber[c]?"":"px")},cur:function(){var a=Ya.propHooks[this.prop];return a&&a.get?a.get(this):Ya.propHooks._default.get(this)},run:function(a){var b,c=Ya.propHooks[this.prop];return this.options.duration?this.pos=b=r.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ya.propHooks._default.set(this),this}},Ya.prototype.init.prototype=Ya.prototype,Ya.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=r.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){r.fx.step[a.prop]?r.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[r.cssProps[a.prop]]&&!r.cssHooks[a.prop]?a.elem[a.prop]=a.now:r.style(a.elem,a.prop,a.now+a.unit)}}},Ya.propHooks.scrollTop=Ya.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},r.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},r.fx=Ya.prototype.init,r.fx.step={};var Za,$a,_a=/^(?:toggle|show|hide)$/,ab=/queueHooks$/;function bb(){$a&&(a.requestAnimationFrame(bb),r.fx.tick())}function cb(){return a.setTimeout(function(){Za=void 0}),Za=r.now()}function db(a,b){var c,d=0,e={height:a};for(b=b?1:0;d<4;d+=2-b)c=ba[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function eb(a,b,c){for(var d,e=(hb.tweeners[b]||[]).concat(hb.tweeners["*"]),f=0,g=e.length;f<g;f++)if(d=e[f].call(c,b,a))return d}function fb(a,b,c){var d,e,f,g,h,i,j,k,l="width"in b||"height"in b,m=this,n={},o=a.style,p=a.nodeType&&ca(a),q=V.get(a,"fxshow");c.queue||(g=r._queueHooks(a,"fx"),null==g.unqueued&&(g.unqueued=0,h=g.empty.fire,g.empty.fire=function(){g.unqueued||h()}),g.unqueued++,m.always(function(){m.always(function(){g.unqueued--,r.queue(a,"fx").length||g.empty.fire()})}));for(d in b)if(e=b[d],_a.test(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}n[d]=q&&q[d]||r.style(a,d)}if(i=!r.isEmptyObject(b),i||!r.isEmptyObject(n)){l&&1===a.nodeType&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=q&&q.display,null==j&&(j=V.get(a,"display")),k=r.css(a,"display"),"none"===k&&(j?k=j:(ha([a],!0),j=a.style.display||j,k=r.css(a,"display"),ha([a]))),("inline"===k||"inline-block"===k&&null!=j)&&"none"===r.css(a,"float")&&(i||(m.done(function(){o.display=j}),null==j&&(k=o.display,j="none"===k?"":k)),o.display="inline-block")),c.overflow&&(o.overflow="hidden",m.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]})),i=!1;for(d in n)i||(q?"hidden"in q&&(p=q.hidden):q=V.access(a,"fxshow",{display:j}),f&&(q.hidden=!p),p&&ha([a],!0),m.done(function(){p||ha([a]),V.remove(a,"fxshow");for(d in n)r.style(a,d,n[d])})),i=eb(p?q[d]:0,d,m),d in q||(q[d]=i.start,p&&(i.end=i.start,i.start=0))}}function gb(a,b){var c,d,e,f,g;for(c in a)if(d=r.camelCase(c),e=b[d],f=a[c],r.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=r.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function hb(a,b,c){var d,e,f=0,g=hb.prefilters.length,h=r.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Za||cb(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;g<i;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),f<1&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:r.extend({},b),opts:r.extend(!0,{specialEasing:{},easing:r.easing._default},c),originalProperties:b,originalOptions:c,startTime:Za||cb(),duration:c.duration,tweens:[],createTween:function(b,c){var d=r.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;c<d;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for(gb(k,j.opts.specialEasing);f<g;f++)if(d=hb.prefilters[f].call(j,a,k,j.opts))return r.isFunction(d.stop)&&(r._queueHooks(j.elem,j.opts.queue).stop=r.proxy(d.stop,d)),d;return r.map(k,eb,j),r.isFunction(j.opts.start)&&j.opts.start.call(a,j),r.fx.timer(r.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}r.Animation=r.extend(hb,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return ea(c.elem,a,aa.exec(b),c),c}]},tweener:function(a,b){r.isFunction(a)?(b=a,a=["*"]):a=a.match(K);for(var c,d=0,e=a.length;d<e;d++)c=a[d],hb.tweeners[c]=hb.tweeners[c]||[],hb.tweeners[c].unshift(b)},prefilters:[fb],prefilter:function(a,b){b?hb.prefilters.unshift(a):hb.prefilters.push(a)}}),r.speed=function(a,b,c){var e=a&&"object"==typeof a?r.extend({},a):{complete:c||!c&&b||r.isFunction(a)&&a,duration:a,easing:c&&b||b&&!r.isFunction(b)&&b};return r.fx.off||d.hidden?e.duration=0:"number"!=typeof e.duration&&(e.duration in r.fx.speeds?e.duration=r.fx.speeds[e.duration]:e.duration=r.fx.speeds._default),null!=e.queue&&e.queue!==!0||(e.queue="fx"),e.old=e.complete,e.complete=function(){r.isFunction(e.old)&&e.old.call(this),e.queue&&r.dequeue(this,e.queue)},e},r.fn.extend({fadeTo:function(a,b,c,d){return this.filter(ca).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=r.isEmptyObject(a),f=r.speed(b,c,d),g=function(){var b=hb(this,r.extend({},a),f);(e||V.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=r.timers,g=V.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&ab.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||r.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=V.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=r.timers,g=d?d.length:0;for(c.finish=!0,r.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;b<g;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),r.each(["toggle","show","hide"],function(a,b){var c=r.fn[b];r.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(db(b,!0),a,d,e)}}),r.each({slideDown:db("show"),slideUp:db("hide"),slideToggle:db("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){r.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),r.timers=[],r.fx.tick=function(){var a,b=0,c=r.timers;for(Za=r.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||r.fx.stop(),Za=void 0},r.fx.timer=function(a){r.timers.push(a),a()?r.fx.start():r.timers.pop()},r.fx.interval=13,r.fx.start=function(){$a||($a=a.requestAnimationFrame?a.requestAnimationFrame(bb):a.setInterval(r.fx.tick,r.fx.interval))},r.fx.stop=function(){a.cancelAnimationFrame?a.cancelAnimationFrame($a):a.clearInterval($a),$a=null},r.fx.speeds={slow:600,fast:200,_default:400},r.fn.delay=function(b,c){return b=r.fx?r.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",o.checkOn=""!==a.value,o.optSelected=c.selected,a=d.createElement("input"),a.value="t",a.type="radio",o.radioValue="t"===a.value}();var ib,jb=r.expr.attrHandle;r.fn.extend({attr:function(a,b){return S(this,r.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){r.removeAttr(this,a)})}}),r.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?r.prop(a,b,c):(1===f&&r.isXMLDoc(a)||(e=r.attrHooks[b.toLowerCase()]||(r.expr.match.bool.test(b)?ib:void 0)),
void 0!==c?null===c?void r.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=r.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!o.radioValue&&"radio"===b&&r.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d=0,e=b&&b.match(K);if(e&&1===a.nodeType)while(c=e[d++])a.removeAttribute(c)}}),ib={set:function(a,b,c){return b===!1?r.removeAttr(a,c):a.setAttribute(c,c),c}},r.each(r.expr.match.bool.source.match(/\w+/g),function(a,b){var c=jb[b]||r.find.attr;jb[b]=function(a,b,d){var e,f,g=b.toLowerCase();return d||(f=jb[g],jb[g]=e,e=null!=c(a,b,d)?g:null,jb[g]=f),e}});var kb=/^(?:input|select|textarea|button)$/i,lb=/^(?:a|area)$/i;r.fn.extend({prop:function(a,b){return S(this,r.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[r.propFix[a]||a]})}}),r.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&r.isXMLDoc(a)||(b=r.propFix[b]||b,e=r.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=r.find.attr(a,"tabindex");return b?parseInt(b,10):kb.test(a.nodeName)||lb.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),o.optSelected||(r.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),r.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){r.propFix[this.toLowerCase()]=this});function mb(a){var b=a.match(K)||[];return b.join(" ")}function nb(a){return a.getAttribute&&a.getAttribute("class")||""}r.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).addClass(a.call(this,b,nb(this)))});if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=nb(c),d=1===c.nodeType&&" "+mb(e)+" "){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=mb(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(r.isFunction(a))return this.each(function(b){r(this).removeClass(a.call(this,b,nb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(K)||[];while(c=this[i++])if(e=nb(c),d=1===c.nodeType&&" "+mb(e)+" "){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=mb(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):r.isFunction(a)?this.each(function(c){r(this).toggleClass(a.call(this,c,nb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=r(this),f=a.match(K)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=nb(this),b&&V.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":V.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+mb(nb(c))+" ").indexOf(b)>-1)return!0;return!1}});var ob=/\r/g;r.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=r.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,r(this).val()):a,null==e?e="":"number"==typeof e?e+="":r.isArray(e)&&(e=r.map(e,function(a){return null==a?"":a+""})),b=r.valHooks[this.type]||r.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=r.valHooks[e.type]||r.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(ob,""):null==c?"":c)}}}),r.extend({valHooks:{option:{get:function(a){var b=r.find.attr(a,"value");return null!=b?b:mb(r.text(a))}},select:{get:function(a){var b,c,d,e=a.options,f=a.selectedIndex,g="select-one"===a.type,h=g?null:[],i=g?f+1:e.length;for(d=f<0?i:g?f:0;d<i;d++)if(c=e[d],(c.selected||d===f)&&!c.disabled&&(!c.parentNode.disabled||!r.nodeName(c.parentNode,"optgroup"))){if(b=r(c).val(),g)return b;h.push(b)}return h},set:function(a,b){var c,d,e=a.options,f=r.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=r.inArray(r.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),r.each(["radio","checkbox"],function(){r.valHooks[this]={set:function(a,b){if(r.isArray(b))return a.checked=r.inArray(r(a).val(),b)>-1}},o.checkOn||(r.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var pb=/^(?:focusinfocus|focusoutblur)$/;r.extend(r.event,{trigger:function(b,c,e,f){var g,h,i,j,k,m,n,o=[e||d],p=l.call(b,"type")?b.type:b,q=l.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!pb.test(p+r.event.triggered)&&(p.indexOf(".")>-1&&(q=p.split("."),p=q.shift(),q.sort()),k=p.indexOf(":")<0&&"on"+p,b=b[r.expando]?b:new r.Event(p,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=q.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:r.makeArray(c,[b]),n=r.event.special[p]||{},f||!n.trigger||n.trigger.apply(e,c)!==!1)){if(!f&&!n.noBubble&&!r.isWindow(e)){for(j=n.delegateType||p,pb.test(j+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),i=h;i===(e.ownerDocument||d)&&o.push(i.defaultView||i.parentWindow||a)}g=0;while((h=o[g++])&&!b.isPropagationStopped())b.type=g>1?j:n.bindType||p,m=(V.get(h,"events")||{})[b.type]&&V.get(h,"handle"),m&&m.apply(h,c),m=k&&h[k],m&&m.apply&&T(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=p,f||b.isDefaultPrevented()||n._default&&n._default.apply(o.pop(),c)!==!1||!T(e)||k&&r.isFunction(e[p])&&!r.isWindow(e)&&(i=e[k],i&&(e[k]=null),r.event.triggered=p,e[p](),r.event.triggered=void 0,i&&(e[k]=i)),b.result}},simulate:function(a,b,c){var d=r.extend(new r.Event,c,{type:a,isSimulated:!0});r.event.trigger(d,null,b)}}),r.fn.extend({trigger:function(a,b){return this.each(function(){r.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];if(c)return r.event.trigger(a,b,c,!0)}}),r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(a,b){r.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),r.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),o.focusin="onfocusin"in a,o.focusin||r.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){r.event.simulate(b,a.target,r.event.fix(a))};r.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=V.access(d,b);e||d.addEventListener(a,c,!0),V.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=V.access(d,b)-1;e?V.access(d,b,e):(d.removeEventListener(a,c,!0),V.remove(d,b))}}});var qb=a.location,rb=r.now(),sb=/\?/;r.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||r.error("Invalid XML: "+b),c};var tb=/\[\]$/,ub=/\r?\n/g,vb=/^(?:submit|button|image|reset|file)$/i,wb=/^(?:input|select|textarea|keygen)/i;function xb(a,b,c,d){var e;if(r.isArray(b))r.each(b,function(b,e){c||tb.test(a)?d(a,e):xb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==r.type(b))d(a,b);else for(e in b)xb(a+"["+e+"]",b[e],c,d)}r.param=function(a,b){var c,d=[],e=function(a,b){var c=r.isFunction(b)?b():b;d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(null==c?"":c)};if(r.isArray(a)||a.jquery&&!r.isPlainObject(a))r.each(a,function(){e(this.name,this.value)});else for(c in a)xb(c,a[c],b,e);return d.join("&")},r.fn.extend({serialize:function(){return r.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=r.prop(this,"elements");return a?r.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!r(this).is(":disabled")&&wb.test(this.nodeName)&&!vb.test(a)&&(this.checked||!ia.test(a))}).map(function(a,b){var c=r(this).val();return null==c?null:r.isArray(c)?r.map(c,function(a){return{name:b.name,value:a.replace(ub,"\r\n")}}):{name:b.name,value:c.replace(ub,"\r\n")}}).get()}});var yb=/%20/g,zb=/#.*$/,Ab=/([?&])_=[^&]*/,Bb=/^(.*?):[ \t]*([^\r\n]*)$/gm,Cb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Db=/^(?:GET|HEAD)$/,Eb=/^\/\//,Fb={},Gb={},Hb="*/".concat("*"),Ib=d.createElement("a");Ib.href=qb.href;function Jb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(K)||[];if(r.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function Kb(a,b,c,d){var e={},f=a===Gb;function g(h){var i;return e[h]=!0,r.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function Lb(a,b){var c,d,e=r.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&r.extend(!0,a,d),a}function Mb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}if(f)return f!==i[0]&&i.unshift(f),c[f]}function Nb(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}r.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:qb.href,type:"GET",isLocal:Cb.test(qb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Hb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":r.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?Lb(Lb(a,r.ajaxSettings),b):Lb(r.ajaxSettings,a)},ajaxPrefilter:Jb(Fb),ajaxTransport:Jb(Gb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m,n,o=r.ajaxSetup({},c),p=o.context||o,q=o.context&&(p.nodeType||p.jquery)?r(p):r.event,s=r.Deferred(),t=r.Callbacks("once memory"),u=o.statusCode||{},v={},w={},x="canceled",y={readyState:0,getResponseHeader:function(a){var b;if(k){if(!h){h={};while(b=Bb.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return k?g:null},setRequestHeader:function(a,b){return null==k&&(a=w[a.toLowerCase()]=w[a.toLowerCase()]||a,v[a]=b),this},overrideMimeType:function(a){return null==k&&(o.mimeType=a),this},statusCode:function(a){var b;if(a)if(k)y.always(a[y.status]);else for(b in a)u[b]=[u[b],a[b]];return this},abort:function(a){var b=a||x;return e&&e.abort(b),A(0,b),this}};if(s.promise(y),o.url=((b||o.url||qb.href)+"").replace(Eb,qb.protocol+"//"),o.type=c.method||c.type||o.method||o.type,o.dataTypes=(o.dataType||"*").toLowerCase().match(K)||[""],null==o.crossDomain){j=d.createElement("a");try{j.href=o.url,j.href=j.href,o.crossDomain=Ib.protocol+"//"+Ib.host!=j.protocol+"//"+j.host}catch(z){o.crossDomain=!0}}if(o.data&&o.processData&&"string"!=typeof o.data&&(o.data=r.param(o.data,o.traditional)),Kb(Fb,o,c,y),k)return y;l=r.event&&o.global,l&&0===r.active++&&r.event.trigger("ajaxStart"),o.type=o.type.toUpperCase(),o.hasContent=!Db.test(o.type),f=o.url.replace(zb,""),o.hasContent?o.data&&o.processData&&0===(o.contentType||"").indexOf("application/x-www-form-urlencoded")&&(o.data=o.data.replace(yb,"+")):(n=o.url.slice(f.length),o.data&&(f+=(sb.test(f)?"&":"?")+o.data,delete o.data),o.cache===!1&&(f=f.replace(Ab,"$1"),n=(sb.test(f)?"&":"?")+"_="+rb++ +n),o.url=f+n),o.ifModified&&(r.lastModified[f]&&y.setRequestHeader("If-Modified-Since",r.lastModified[f]),r.etag[f]&&y.setRequestHeader("If-None-Match",r.etag[f])),(o.data&&o.hasContent&&o.contentType!==!1||c.contentType)&&y.setRequestHeader("Content-Type",o.contentType),y.setRequestHeader("Accept",o.dataTypes[0]&&o.accepts[o.dataTypes[0]]?o.accepts[o.dataTypes[0]]+("*"!==o.dataTypes[0]?", "+Hb+"; q=0.01":""):o.accepts["*"]);for(m in o.headers)y.setRequestHeader(m,o.headers[m]);if(o.beforeSend&&(o.beforeSend.call(p,y,o)===!1||k))return y.abort();if(x="abort",t.add(o.complete),y.done(o.success),y.fail(o.error),e=Kb(Gb,o,c,y)){if(y.readyState=1,l&&q.trigger("ajaxSend",[y,o]),k)return y;o.async&&o.timeout>0&&(i=a.setTimeout(function(){y.abort("timeout")},o.timeout));try{k=!1,e.send(v,A)}catch(z){if(k)throw z;A(-1,z)}}else A(-1,"No Transport");function A(b,c,d,h){var j,m,n,v,w,x=c;k||(k=!0,i&&a.clearTimeout(i),e=void 0,g=h||"",y.readyState=b>0?4:0,j=b>=200&&b<300||304===b,d&&(v=Mb(o,y,d)),v=Nb(o,v,y,j),j?(o.ifModified&&(w=y.getResponseHeader("Last-Modified"),w&&(r.lastModified[f]=w),w=y.getResponseHeader("etag"),w&&(r.etag[f]=w)),204===b||"HEAD"===o.type?x="nocontent":304===b?x="notmodified":(x=v.state,m=v.data,n=v.error,j=!n)):(n=x,!b&&x||(x="error",b<0&&(b=0))),y.status=b,y.statusText=(c||x)+"",j?s.resolveWith(p,[m,x,y]):s.rejectWith(p,[y,x,n]),y.statusCode(u),u=void 0,l&&q.trigger(j?"ajaxSuccess":"ajaxError",[y,o,j?m:n]),t.fireWith(p,[y,x]),l&&(q.trigger("ajaxComplete",[y,o]),--r.active||r.event.trigger("ajaxStop")))}return y},getJSON:function(a,b,c){return r.get(a,b,c,"json")},getScript:function(a,b){return r.get(a,void 0,b,"script")}}),r.each(["get","post"],function(a,b){r[b]=function(a,c,d,e){return r.isFunction(c)&&(e=e||d,d=c,c=void 0),r.ajax(r.extend({url:a,type:b,dataType:e,data:c,success:d},r.isPlainObject(a)&&a))}}),r._evalUrl=function(a){return r.ajax({url:a,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,"throws":!0})},r.fn.extend({wrapAll:function(a){var b;return this[0]&&(r.isFunction(a)&&(a=a.call(this[0])),b=r(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this},wrapInner:function(a){return r.isFunction(a)?this.each(function(b){r(this).wrapInner(a.call(this,b))}):this.each(function(){var b=r(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=r.isFunction(a);return this.each(function(c){r(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(a){return this.parent(a).not("body").each(function(){r(this).replaceWith(this.childNodes)}),this}}),r.expr.pseudos.hidden=function(a){return!r.expr.pseudos.visible(a)},r.expr.pseudos.visible=function(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)},r.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Ob={0:200,1223:204},Pb=r.ajaxSettings.xhr();o.cors=!!Pb&&"withCredentials"in Pb,o.ajax=Pb=!!Pb,r.ajaxTransport(function(b){var c,d;if(o.cors||Pb&&!b.crossDomain)return{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Ob[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}}),r.ajaxPrefilter(function(a){a.crossDomain&&(a.contents.script=!1)}),r.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return r.globalEval(a),a}}}),r.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),r.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=r("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Qb=[],Rb=/(=)\?(?=&|$)|\?\?/;r.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Qb.pop()||r.expando+"_"+rb++;return this[a]=!0,a}}),r.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Rb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Rb.test(b.data)&&"data");if(h||"jsonp"===b.dataTypes[0])return e=b.jsonpCallback=r.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Rb,"$1"+e):b.jsonp!==!1&&(b.url+=(sb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||r.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?r(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Qb.push(e)),g&&r.isFunction(f)&&f(g[0]),g=f=void 0}),"script"}),o.createHTMLDocument=function(){var a=d.implementation.createHTMLDocument("").body;return a.innerHTML="<form></form><form></form>",2===a.childNodes.length}(),r.parseHTML=function(a,b,c){if("string"!=typeof a)return[];"boolean"==typeof b&&(c=b,b=!1);var e,f,g;return b||(o.createHTMLDocument?(b=d.implementation.createHTMLDocument(""),e=b.createElement("base"),e.href=d.location.href,b.head.appendChild(e)):b=d),f=B.exec(a),g=!c&&[],f?[b.createElement(f[1])]:(f=pa([a],b,g),g&&g.length&&r(g).remove(),r.merge([],f.childNodes))},r.fn.load=function(a,b,c){var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=mb(a.slice(h)),a=a.slice(0,h)),r.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&r.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?r("<div>").append(r.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},r.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){r.fn[b]=function(a){return this.on(b,a)}}),r.expr.pseudos.animated=function(a){return r.grep(r.timers,function(b){return a===b.elem}).length};function Sb(a){return r.isWindow(a)?a:9===a.nodeType&&a.defaultView}r.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=r.css(a,"position"),l=r(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=r.css(a,"top"),i=r.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),r.isFunction(b)&&(b=b.call(a,c,r.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},r.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){r.offset.setOffset(this,a,b)});var b,c,d,e,f=this[0];if(f)return f.getClientRects().length?(d=f.getBoundingClientRect(),d.width||d.height?(e=f.ownerDocument,c=Sb(e),b=e.documentElement,{top:d.top+c.pageYOffset-b.clientTop,left:d.left+c.pageXOffset-b.clientLeft}):d):{top:0,left:0}},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===r.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),r.nodeName(a[0],"html")||(d=a.offset()),d={top:d.top+r.css(a[0],"borderTopWidth",!0),left:d.left+r.css(a[0],"borderLeftWidth",!0)}),{top:b.top-d.top-r.css(c,"marginTop",!0),left:b.left-d.left-r.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===r.css(a,"position"))a=a.offsetParent;return a||qa})}}),r.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;r.fn[a]=function(d){return S(this,function(a,d,e){var f=Sb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),r.each(["top","left"],function(a,b){r.cssHooks[b]=Oa(o.pixelPosition,function(a,c){if(c)return c=Na(a,b),La.test(c)?r(a).position()[b]+"px":c})}),r.each({Height:"height",Width:"width"},function(a,b){r.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){r.fn[d]=function(e,f){var g=arguments.length&&(c||"boolean"!=typeof e),h=c||(e===!0||f===!0?"margin":"border");return S(this,function(b,c,e){var f;return r.isWindow(b)?0===d.indexOf("outer")?b["inner"+a]:b.document.documentElement["client"+a]:9===b.nodeType?(f=b.documentElement,Math.max(b.body["scroll"+a],f["scroll"+a],b.body["offset"+a],f["offset"+a],f["client"+a])):void 0===e?r.css(b,c,h):r.style(b,c,e,h)},b,g?e:void 0,g)}})}),r.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),r.parseJSON=JSON.parse,"function"==typeof define&&define.amd&&define("jquery",[],function(){return r});var Tb=a.jQuery,Ub=a.$;return r.noConflict=function(b){return a.$===r&&(a.$=Ub),b&&a.jQuery===r&&(a.jQuery=Tb),r},b||(a.jQuery=a.$=r),r});
/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts
Released under the MIT license
 */

;
(function() {
  this.Rails = {
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
    buttonClickSelector: {
      selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
      exclude: 'form button'
    },
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
    formSubmitSelector: 'form',
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
    formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
    formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
    fileInputSelector: 'input[name][type=file]:not([disabled])',
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
  };

}).call(this);
(function() {
  var nonce;

  nonce = null;

  Rails.loadCSPNonce = function() {
    var ref;
    return nonce = (ref = document.querySelector("meta[name=csp-nonce]")) != null ? ref.content : void 0;
  };

  Rails.cspNonce = function() {
    return nonce != null ? nonce : Rails.loadCSPNonce();
  };

}).call(this);
(function() {
  var expando, m;

  m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

  Rails.matches = function(element, selector) {
    if (selector.exclude != null) {
      return m.call(element, selector.selector) && !m.call(element, selector.exclude);
    } else {
      return m.call(element, selector);
    }
  };

  expando = '_ujsData';

  Rails.getData = function(element, key) {
    var ref;
    return (ref = element[expando]) != null ? ref[key] : void 0;
  };

  Rails.setData = function(element, key, value) {
    if (element[expando] == null) {
      element[expando] = {};
    }
    return element[expando][key] = value;
  };

  Rails.$ = function(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  };

}).call(this);
(function() {
  var $, csrfParam, csrfToken;

  $ = Rails.$;

  csrfToken = Rails.csrfToken = function() {
    var meta;
    meta = document.querySelector('meta[name=csrf-token]');
    return meta && meta.content;
  };

  csrfParam = Rails.csrfParam = function() {
    var meta;
    meta = document.querySelector('meta[name=csrf-param]');
    return meta && meta.content;
  };

  Rails.CSRFProtection = function(xhr) {
    var token;
    token = csrfToken();
    if (token != null) {
      return xhr.setRequestHeader('X-CSRF-Token', token);
    }
  };

  Rails.refreshCSRFTokens = function() {
    var param, token;
    token = csrfToken();
    param = csrfParam();
    if ((token != null) && (param != null)) {
      return $('form input[name="' + param + '"]').forEach(function(input) {
        return input.value = token;
      });
    }
  };

}).call(this);
(function() {
  var CustomEvent, fire, matches, preventDefault;

  matches = Rails.matches;

  CustomEvent = window.CustomEvent;

  if (typeof CustomEvent !== 'function') {
    CustomEvent = function(event, params) {
      var evt;
      evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
    CustomEvent.prototype = window.Event.prototype;
    preventDefault = CustomEvent.prototype.preventDefault;
    CustomEvent.prototype.preventDefault = function() {
      var result;
      result = preventDefault.call(this);
      if (this.cancelable && !this.defaultPrevented) {
        Object.defineProperty(this, 'defaultPrevented', {
          get: function() {
            return true;
          }
        });
      }
      return result;
    };
  }

  fire = Rails.fire = function(obj, name, data) {
    var event;
    event = new CustomEvent(name, {
      bubbles: true,
      cancelable: true,
      detail: data
    });
    obj.dispatchEvent(event);
    return !event.defaultPrevented;
  };

  Rails.stopEverything = function(e) {
    fire(e.target, 'ujs:everythingStopped');
    e.preventDefault();
    e.stopPropagation();
    return e.stopImmediatePropagation();
  };

  Rails.delegate = function(element, selector, eventType, handler) {
    return element.addEventListener(eventType, function(e) {
      var target;
      target = e.target;
      while (!(!(target instanceof Element) || matches(target, selector))) {
        target = target.parentNode;
      }
      if (target instanceof Element && handler.call(target, e) === false) {
        e.preventDefault();
        return e.stopPropagation();
      }
    });
  };

}).call(this);
(function() {
  var AcceptHeaders, CSRFProtection, createXHR, cspNonce, fire, prepareOptions, processResponse;

  cspNonce = Rails.cspNonce, CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

  AcceptHeaders = {
    '*': '*/*',
    text: 'text/plain',
    html: 'text/html',
    xml: 'application/xml, text/xml',
    json: 'application/json, text/javascript',
    script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
  };

  Rails.ajax = function(options) {
    var xhr;
    options = prepareOptions(options);
    xhr = createXHR(options, function() {
      var ref, response;
      response = processResponse((ref = xhr.response) != null ? ref : xhr.responseText, xhr.getResponseHeader('Content-Type'));
      if (Math.floor(xhr.status / 100) === 2) {
        if (typeof options.success === "function") {
          options.success(response, xhr.statusText, xhr);
        }
      } else {
        if (typeof options.error === "function") {
          options.error(response, xhr.statusText, xhr);
        }
      }
      return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
    });
    if ((options.beforeSend != null) && !options.beforeSend(xhr, options)) {
      return false;
    }
    if (xhr.readyState === XMLHttpRequest.OPENED) {
      return xhr.send(options.data);
    }
  };

  prepareOptions = function(options) {
    options.url = options.url || location.href;
    options.type = options.type.toUpperCase();
    if (options.type === 'GET' && options.data) {
      if (options.url.indexOf('?') < 0) {
        options.url += '?' + options.data;
      } else {
        options.url += '&' + options.data;
      }
    }
    if (AcceptHeaders[options.dataType] == null) {
      options.dataType = '*';
    }
    options.accept = AcceptHeaders[options.dataType];
    if (options.dataType !== '*') {
      options.accept += ', */*; q=0.01';
    }
    return options;
  };

  createXHR = function(options, done) {
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open(options.type, options.url, true);
    xhr.setRequestHeader('Accept', options.accept);
    if (typeof options.data === 'string') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    }
    if (!options.crossDomain) {
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      CSRFProtection(xhr);
    }
    xhr.withCredentials = !!options.withCredentials;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        return done(xhr);
      }
    };
    return xhr;
  };

  processResponse = function(response, type) {
    var parser, script;
    if (typeof response === 'string' && typeof type === 'string') {
      if (type.match(/\bjson\b/)) {
        try {
          response = JSON.parse(response);
        } catch (error) {}
      } else if (type.match(/\b(?:java|ecma)script\b/)) {
        script = document.createElement('script');
        script.setAttribute('nonce', cspNonce());
        script.text = response;
        document.head.appendChild(script).parentNode.removeChild(script);
      } else if (type.match(/\b(xml|html|svg)\b/)) {
        parser = new DOMParser();
        type = type.replace(/;.+/, '');
        try {
          response = parser.parseFromString(response, type);
        } catch (error) {}
      }
    }
    return response;
  };

  Rails.href = function(element) {
    return element.href;
  };

  Rails.isCrossDomain = function(url) {
    var e, originAnchor, urlAnchor;
    originAnchor = document.createElement('a');
    originAnchor.href = location.href;
    urlAnchor = document.createElement('a');
    try {
      urlAnchor.href = url;
      return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
    } catch (error) {
      e = error;
      return true;
    }
  };

}).call(this);
(function() {
  var matches, toArray;

  matches = Rails.matches;

  toArray = function(e) {
    return Array.prototype.slice.call(e);
  };

  Rails.serializeElement = function(element, additionalParam) {
    var inputs, params;
    inputs = [element];
    if (matches(element, 'form')) {
      inputs = toArray(element.elements);
    }
    params = [];
    inputs.forEach(function(input) {
      if (!input.name || input.disabled) {
        return;
      }
      if (matches(input, 'fieldset[disabled] *')) {
        return;
      }
      if (matches(input, 'select')) {
        return toArray(input.options).forEach(function(option) {
          if (option.selected) {
            return params.push({
              name: input.name,
              value: option.value
            });
          }
        });
      } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
        return params.push({
          name: input.name,
          value: input.value
        });
      }
    });
    if (additionalParam) {
      params.push(additionalParam);
    }
    return params.map(function(param) {
      if (param.name != null) {
        return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
      } else {
        return param;
      }
    }).join('&');
  };

  Rails.formElements = function(form, selector) {
    if (matches(form, 'form')) {
      return toArray(form.elements).filter(function(el) {
        return matches(el, selector);
      });
    } else {
      return toArray(form.querySelectorAll(selector));
    }
  };

}).call(this);
(function() {
  var allowAction, fire, stopEverything;

  fire = Rails.fire, stopEverything = Rails.stopEverything;

  Rails.handleConfirm = function(e) {
    if (!allowAction(this)) {
      return stopEverything(e);
    }
  };

  Rails.confirm = function(message, element) {
    return confirm(message);
  };

  allowAction = function(element) {
    var answer, callback, message;
    message = element.getAttribute('data-confirm');
    if (!message) {
      return true;
    }
    answer = false;
    if (fire(element, 'confirm')) {
      try {
        answer = Rails.confirm(message, element);
      } catch (error) {}
      callback = fire(element, 'confirm:complete', [answer]);
    }
    return answer && callback;
  };

}).call(this);
(function() {
  var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, isXhrRedirect, matches, setData, stopEverything;

  matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

  Rails.handleDisabledElement = function(e) {
    var element;
    element = this;
    if (element.disabled) {
      return stopEverything(e);
    }
  };

  Rails.enableElement = function(e) {
    var element;
    if (e instanceof Event) {
      if (isXhrRedirect(e)) {
        return;
      }
      element = e.target;
    } else {
      element = e;
    }
    if (matches(element, Rails.linkDisableSelector)) {
      return enableLinkElement(element);
    } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
      return enableFormElement(element);
    } else if (matches(element, Rails.formSubmitSelector)) {
      return enableFormElements(element);
    }
  };

  Rails.disableElement = function(e) {
    var element;
    element = e instanceof Event ? e.target : e;
    if (matches(element, Rails.linkDisableSelector)) {
      return disableLinkElement(element);
    } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
      return disableFormElement(element);
    } else if (matches(element, Rails.formSubmitSelector)) {
      return disableFormElements(element);
    }
  };

  disableLinkElement = function(element) {
    var replacement;
    if (getData(element, 'ujs:disabled')) {
      return;
    }
    replacement = element.getAttribute('data-disable-with');
    if (replacement != null) {
      setData(element, 'ujs:enable-with', element.innerHTML);
      element.innerHTML = replacement;
    }
    element.addEventListener('click', stopEverything);
    return setData(element, 'ujs:disabled', true);
  };

  enableLinkElement = function(element) {
    var originalText;
    originalText = getData(element, 'ujs:enable-with');
    if (originalText != null) {
      element.innerHTML = originalText;
      setData(element, 'ujs:enable-with', null);
    }
    element.removeEventListener('click', stopEverything);
    return setData(element, 'ujs:disabled', null);
  };

  disableFormElements = function(form) {
    return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
  };

  disableFormElement = function(element) {
    var replacement;
    if (getData(element, 'ujs:disabled')) {
      return;
    }
    replacement = element.getAttribute('data-disable-with');
    if (replacement != null) {
      if (matches(element, 'button')) {
        setData(element, 'ujs:enable-with', element.innerHTML);
        element.innerHTML = replacement;
      } else {
        setData(element, 'ujs:enable-with', element.value);
        element.value = replacement;
      }
    }
    element.disabled = true;
    return setData(element, 'ujs:disabled', true);
  };

  enableFormElements = function(form) {
    return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
  };

  enableFormElement = function(element) {
    var originalText;
    originalText = getData(element, 'ujs:enable-with');
    if (originalText != null) {
      if (matches(element, 'button')) {
        element.innerHTML = originalText;
      } else {
        element.value = originalText;
      }
      setData(element, 'ujs:enable-with', null);
    }
    element.disabled = false;
    return setData(element, 'ujs:disabled', null);
  };

  isXhrRedirect = function(event) {
    var ref, xhr;
    xhr = (ref = event.detail) != null ? ref[0] : void 0;
    return (xhr != null ? xhr.getResponseHeader("X-Xhr-Redirect") : void 0) != null;
  };

}).call(this);
(function() {
  var stopEverything;

  stopEverything = Rails.stopEverything;

  Rails.handleMethod = function(e) {
    var csrfParam, csrfToken, form, formContent, href, link, method;
    link = this;
    method = link.getAttribute('data-method');
    if (!method) {
      return;
    }
    href = Rails.href(link);
    csrfToken = Rails.csrfToken();
    csrfParam = Rails.csrfParam();
    form = document.createElement('form');
    formContent = "<input name='_method' value='" + method + "' type='hidden' />";
    if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
      formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
    }
    formContent += '<input type="submit" />';
    form.method = 'post';
    form.action = href;
    form.target = link.target;
    form.innerHTML = formContent;
    form.style.display = 'none';
    document.body.appendChild(form);
    form.querySelector('[type="submit"]').click();
    return stopEverything(e);
  };

}).call(this);
(function() {
  var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
    slice = [].slice;

  matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

  isRemote = function(element) {
    var value;
    value = element.getAttribute('data-remote');
    return (value != null) && value !== 'false';
  };

  Rails.handleRemote = function(e) {
    var button, data, dataType, element, method, url, withCredentials;
    element = this;
    if (!isRemote(element)) {
      return true;
    }
    if (!fire(element, 'ajax:before')) {
      fire(element, 'ajax:stopped');
      return false;
    }
    withCredentials = element.getAttribute('data-with-credentials');
    dataType = element.getAttribute('data-type') || 'script';
    if (matches(element, Rails.formSubmitSelector)) {
      button = getData(element, 'ujs:submit-button');
      method = getData(element, 'ujs:submit-button-formmethod') || element.method;
      url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
      if (method.toUpperCase() === 'GET') {
        url = url.replace(/\?.*$/, '');
      }
      if (element.enctype === 'multipart/form-data') {
        data = new FormData(element);
        if (button != null) {
          data.append(button.name, button.value);
        }
      } else {
        data = serializeElement(element, button);
      }
      setData(element, 'ujs:submit-button', null);
      setData(element, 'ujs:submit-button-formmethod', null);
      setData(element, 'ujs:submit-button-formaction', null);
    } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
      method = element.getAttribute('data-method');
      url = element.getAttribute('data-url');
      data = serializeElement(element, element.getAttribute('data-params'));
    } else {
      method = element.getAttribute('data-method');
      url = Rails.href(element);
      data = element.getAttribute('data-params');
    }
    ajax({
      type: method || 'GET',
      url: url,
      data: data,
      dataType: dataType,
      beforeSend: function(xhr, options) {
        if (fire(element, 'ajax:beforeSend', [xhr, options])) {
          return fire(element, 'ajax:send', [xhr]);
        } else {
          fire(element, 'ajax:stopped');
          return false;
        }
      },
      success: function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return fire(element, 'ajax:success', args);
      },
      error: function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return fire(element, 'ajax:error', args);
      },
      complete: function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return fire(element, 'ajax:complete', args);
      },
      crossDomain: isCrossDomain(url),
      withCredentials: (withCredentials != null) && withCredentials !== 'false'
    });
    return stopEverything(e);
  };

  Rails.formSubmitButtonClick = function(e) {
    var button, form;
    button = this;
    form = button.form;
    if (!form) {
      return;
    }
    if (button.name) {
      setData(form, 'ujs:submit-button', {
        name: button.name,
        value: button.value
      });
    }
    setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
    setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
    return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
  };

  Rails.preventInsignificantClick = function(e) {
    var data, insignificantMetaClick, link, metaClick, method, nonPrimaryMouseClick;
    link = this;
    method = (link.getAttribute('data-method') || 'GET').toUpperCase();
    data = link.getAttribute('data-params');
    metaClick = e.metaKey || e.ctrlKey;
    insignificantMetaClick = metaClick && method === 'GET' && !data;
    nonPrimaryMouseClick = (e.button != null) && e.button !== 0;
    if (nonPrimaryMouseClick || insignificantMetaClick) {
      return e.stopImmediatePropagation();
    }
  };

}).call(this);
(function() {
  var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMethod, handleRemote, loadCSPNonce, preventInsignificantClick, refreshCSRFTokens;

  fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, loadCSPNonce = Rails.loadCSPNonce, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, preventInsignificantClick = Rails.preventInsignificantClick, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMethod = Rails.handleMethod;

  if ((typeof jQuery !== "undefined" && jQuery !== null) && (jQuery.ajax != null)) {
    if (jQuery.rails) {
      throw new Error('If you load both jquery_ujs and rails-ujs, use rails-ujs only.');
    }
    jQuery.rails = Rails;
    jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
      if (!options.crossDomain) {
        return CSRFProtection(xhr);
      }
    });
  }

  Rails.start = function() {
    if (window._rails_loaded) {
      throw new Error('rails-ujs has already been loaded!');
    }
    window.addEventListener('pageshow', function() {
      $(Rails.formEnableSelector).forEach(function(el) {
        if (getData(el, 'ujs:disabled')) {
          return enableElement(el);
        }
      });
      return $(Rails.linkDisableSelector).forEach(function(el) {
        if (getData(el, 'ujs:disabled')) {
          return enableElement(el);
        }
      });
    });
    delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
    delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
    delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
    delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
    delegate(document, Rails.linkClickSelector, 'click', preventInsignificantClick);
    delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
    delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
    delegate(document, Rails.linkClickSelector, 'click', disableElement);
    delegate(document, Rails.linkClickSelector, 'click', handleRemote);
    delegate(document, Rails.linkClickSelector, 'click', handleMethod);
    delegate(document, Rails.buttonClickSelector, 'click', preventInsignificantClick);
    delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
    delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
    delegate(document, Rails.buttonClickSelector, 'click', disableElement);
    delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
    delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
    delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
    delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
    delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
    delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
    delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
    delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
      return setTimeout((function() {
        return disableElement(e);
      }), 13);
    });
    delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
    delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
    delegate(document, Rails.formInputClickSelector, 'click', preventInsignificantClick);
    delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
    delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
    delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
    document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
    document.addEventListener('DOMContentLoaded', loadCSPNonce);
    return window._rails_loaded = true;
  };

  if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
    Rails.start();
  }

}).call(this);
/*
 *
 *   INSPINIA - Responsive Admin Theme
 *   version 2.7.1
 *
 */



$(document).ready(function () {


    // Add body-small class if window less than 768px
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }

    // MetsiMenu
    $('#side-menu').metisMenu();

    // Collapse ibox function
    $('.collapse-link').on('click', function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.children('.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.close-link').on('click', function () {
        var content = $(this).closest('div.ibox');
        content.remove();
    });

    // Fullscreen ibox function
    $('.fullscreen-link').on('click', function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        $('body').toggleClass('fullscreen-ibox-mode');
        button.toggleClass('fa-expand').toggleClass('fa-compress');
        ibox.toggleClass('fullscreen');
        setTimeout(function () {
            $(window).trigger('resize');
        }, 100);
    });

    // Close menu in canvas mode
    $('.close-canvas-menu').on('click', function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });

    // Run menu of canvas
    // $('body.canvas-menu .sidebar-collapse').slimScroll({
    //     height: '100%',
    //     railOpacity: 0.9
    // });

    // Open close right sidebar
    $('.right-sidebar-toggle').on('click', function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Initialize slimscroll for right sidebar
    // $('.sidebar-container').slimScroll({
    //     height: '100%',
    //     railOpacity: 0.4,
    //     wheelStep: 10
    // });

    // Open close small chat
    $('.open-small-chat').on('click', function () {
        $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
        $('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    // $('.small-chat-box .content').slimScroll({
    //     height: '234px',
    //     railOpacity: 0.4
    // });

    // Small todo handler
    $('.check-link').on('click', function () {
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-completed');
        return false;
    });

    // Minimalize menu
    $('.navbar-minimalize').on('click', function (event) {
        event.preventDefault();
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();

    });

    // Tooltips demo
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });


    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebar-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarheight = $('nav.navbar-default').height();
        var wrapperHeight = $('#page-wrapper').height();

        if (navbarheight > wrapperHeight) {
            $('#page-wrapper').css("min-height", navbarheight + "px");
        }

        if (navbarheight < wrapperHeight) {
            $('#page-wrapper').css("min-height", $(window).height() + "px");
        }

        if ($('body').hasClass('fixed-nav')) {
            if (navbarheight > wrapperHeight) {
                $('#page-wrapper').css("min-height", navbarheight + "px");
            } else {
                $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
            }
        }

    }

    fix_height();

    // Fixed Sidebar
    $(window).bind("load", function () {
        if ($("body").hasClass('fixed-sidebar')) {
            // $('.sidebar-collapse').slimScroll({
            //     height: '100%',
            //     railOpacity: 0.9
            // });
        }
    });

    // Move right sidebar top after scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    $(window).bind("load resize scroll", function () {
        if (!$("body").hasClass('body-small')) {
            fix_height();
        }
    });

    $("[data-toggle=popover]")
        .popover();

    // Add slimscroll to element
    // $('.full-height-scroll').slimscroll({
    //     height: '100%'
    // })
});


// Minimalize menu when screen is less than 768px
$(window).bind("resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});

// Local Storage functions
// Set proper body class and plugins based on user configuration
$(document).ready(function () {
    if (localStorageSupport()) {

        var collapse = localStorage.getItem("collapse_menu");
        var fixedsidebar = localStorage.getItem("fixedsidebar");
        var fixednavbar = localStorage.getItem("fixednavbar");
        var boxedlayout = localStorage.getItem("boxedlayout");
        var fixedfooter = localStorage.getItem("fixedfooter");

        var body = $('body');

        if (fixedsidebar == 'on') {
            body.addClass('fixed-sidebar');
            // $('.sidebar-collapse').slimScroll({
            //     height: '100%',
            //     railOpacity: 0.9
            // });
        }

        if (collapse == 'on') {
            if (body.hasClass('fixed-sidebar')) {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }
            } else {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }

            }
        }

        if (fixednavbar == 'on') {
            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
            body.addClass('fixed-nav');
        }

        if (boxedlayout == 'on') {
            body.addClass('boxed-layout');
        }

        if (fixedfooter == 'on') {
            $(".footer").addClass('fixed');
        }
    }
});

// Check if browser support HTML5 local storage
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}

// For demo purpose - animation css script
function animationHover(element, animation) {
    element = $(element);
    element.hover(
        function () {
            element.addClass('animated ' + animation);
        },
        function () {
            //wait for animation to finish before removing classes
            window.setTimeout(function () {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 100);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}

// Dragable panels
function WinMove() {
    var element = "[class*=col]";
    var handle = ".ibox-title";
    var connect = "[class*=col]";
    $(element).sortable(
        {
            handle: handle,
            connectWith: connect,
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            opacity: 0.8
        })
        .disableSelection();
}
;
/* ========================================================================
 * Bootstrap: affix.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#affix
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    var target = this.options.target === Affix.DEFAULTS.target ? $(this.options.target) : $(document).find(this.options.target)

    this.$target = target
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.4.1'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.4.1'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    selector    = selector === '#' ? [] : selector
    var $parent = $(document).find(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.4.1'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.4.1'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      if (typeof $next === 'object' && $next.length) {
        $next[0].offsetWidth // force reflow
      }
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    if (href) {
      href = href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    }

    var target  = $this.attr('data-target') || href
    var $target = $(document).find(target)

    if (!$target.hasClass('carousel')) return

    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.4.1'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(document).find(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(document).find(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.4.1'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector !== '#' ? $(document).find(selector) : null

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#modals
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options = options
    this.$body = $(document.body)
    this.$element = $(element)
    this.$dialog = this.$element.find('.modal-dialog')
    this.$backdrop = null
    this.isShown = null
    this.originalBodyPad = null
    this.scrollbarWidth = 0
    this.ignoreBackdropClick = false
    this.fixedContent = '.navbar-fixed-top, .navbar-fixed-bottom'

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION = '3.4.1'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
          this.$element[0] !== e.target &&
          !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    var scrollbarWidth = this.scrollbarWidth
    if (this.bodyIsOverflowing) {
      this.$body.css('padding-right', bodyPad + scrollbarWidth)
      $(this.fixedContent).each(function (index, element) {
        var actualPadding = element.style.paddingRight
        var calculatedPadding = $(element).css('padding-right')
        $(element)
          .data('padding-right', actualPadding)
          .css('padding-right', parseFloat(calculatedPadding) + scrollbarWidth + 'px')
      })
    }
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
    $(this.fixedContent).each(function (index, element) {
      var padding = $(element).data('padding-right')
      $(element).removeData('padding-right')
      element.style.paddingRight = padding ? padding : ''
    })
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
    var href = $this.attr('href')
    var target = $this.attr('data-target') ||
      (href && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7

    var $target = $(document).find(target)
    var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.4.1'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.4.1'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(document).find(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
        .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
          .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: transition.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // https://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn']

  var uriAttrs = [
    'background',
    'cite',
    'href',
    'itemtype',
    'longdesc',
    'poster',
    'src',
    'xlink:href'
  ]

  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i

  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
  }

  /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi

  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */
  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase()

    if ($.inArray(attrName, allowedAttributeList) !== -1) {
      if ($.inArray(attrName, uriAttrs) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN))
      }

      return true
    }

    var regExp = $(allowedAttributeList).filter(function (index, value) {
      return value instanceof RegExp
    })

    // Check if a regular expression validates the attribute.
    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true
      }
    }

    return false
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml)
    }

    // IE 8 and below don't support createHTMLDocument
    if (!document.implementation || !document.implementation.createHTMLDocument) {
      return unsafeHtml
    }

    var createdDocument = document.implementation.createHTMLDocument('sanitization')
    createdDocument.body.innerHTML = unsafeHtml

    var whitelistKeys = $.map(whiteList, function (el, i) { return i })
    var elements = $(createdDocument.body).find('*')

    for (var i = 0, len = elements.length; i < len; i++) {
      var el = elements[i]
      var elName = el.nodeName.toLowerCase()

      if ($.inArray(elName, whitelistKeys) === -1) {
        el.parentNode.removeChild(el)

        continue
      }

      var attributeList = $.map(el.attributes, function (el) { return el })
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || [])

      for (var j = 0, len2 = attributeList.length; j < len2; j++) {
        if (!allowedAttribute(attributeList[j], whitelistedAttributes)) {
          el.removeAttribute(attributeList[j].nodeName)
        }
      }
    }

    return createdDocument.body.innerHTML
  }

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.4.1'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    },
    sanitize : true,
    sanitizeFn : null,
    whiteList : DefaultWhitelist
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(document).find($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    var dataAttributes = this.$element.data()

    for (var dataAttr in dataAttributes) {
      if (dataAttributes.hasOwnProperty(dataAttr) && $.inArray(dataAttr, DISALLOWED_ATTRIBUTES) !== -1) {
        delete dataAttributes[dataAttr]
      }
    }

    options = $.extend({}, this.getDefaults(), dataAttributes, options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    if (options.sanitize) {
      options.template = sanitizeHtml(options.template, options.whiteList, options.sanitizeFn)
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo($(document).find(this.options.container)) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    if (this.options.html) {
      if (this.options.sanitize) {
        title = sanitizeHtml(title, this.options.whiteList, this.options.sanitizeFn)
      }

      $tip.find('.tooltip-inner').html(title)
    } else {
      $tip.find('.tooltip-inner').text(title)
    }

    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }

  Tooltip.prototype.sanitizeHtml = function (unsafeHtml) {
    return sanitizeHtml(unsafeHtml, this.options.whiteList, this.options.sanitizeFn)
  }

  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.4.1'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    if (this.options.html) {
      var typeContent = typeof content

      if (this.options.sanitize) {
        title = this.sanitizeHtml(title)

        if (typeContent === 'string') {
          content = this.sanitizeHtml(content)
        }
      }

      $tip.find('.popover-title').html(title)
      $tip.find('.popover-content').children().detach().end()[
        typeContent === 'string' ? 'html' : 'append'
      ](content)
    } else {
      $tip.find('.popover-title').text(title)
      $tip.find('.popover-content').children().detach().end().text(content)
    }

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
        o.content.call($e[0]) :
        o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












/*
 * metismenu - v2.0.2
 * A jQuery menu plugin
 * https://github.com/onokumus/metisMenu
 *
 * Made by Osman Nuri Okumus
 * Under MIT License
 */


!function(a){"use strict";function b(){var a=document.createElement("mm"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}function c(b){return this.each(function(){var c=a(this),d=c.data("mm"),f=a.extend({},e.DEFAULTS,c.data(),"object"==typeof b&&b);d||c.data("mm",d=new e(this,f)),"string"==typeof b&&d[b]()})}a.fn.emulateTransitionEnd=function(b){var c=!1,e=this;a(this).one("mmTransitionEnd",function(){c=!0});var f=function(){c||a(e).trigger(d.end)};return setTimeout(f,b),this};var d=b();d&&(a.event.special.mmTransitionEnd={bindType:d.end,delegateType:d.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}});var e=function(b,c){this.$element=a(b),this.options=a.extend({},e.DEFAULTS,c),this.transitioning=null,this.init()};e.TRANSITION_DURATION=350,e.DEFAULTS={toggle:!0,doubleTapToGo:!1,activeClass:"active"},e.prototype.init=function(){var b=this,c=this.options.activeClass;this.$element.find("li."+c).has("ul").children("ul").addClass("collapse in"),this.$element.find("li").not("."+c).has("ul").children("ul").addClass("collapse"),this.options.doubleTapToGo&&this.$element.find("li."+c).has("ul").children("a").addClass("doubleTapToGo"),this.$element.find("li").has("ul").children("a").on("click.metisMenu",function(d){var e=a(this),f=e.parent("li"),g=f.children("ul");return d.preventDefault(),f.hasClass(c)?b.hide(g):b.show(g),b.options.doubleTapToGo&&b.doubleTapToGo(e)&&"#"!==e.attr("href")&&""!==e.attr("href")?(d.stopPropagation(),void(document.location=e.attr("href"))):void 0})},e.prototype.doubleTapToGo=function(a){var b=this.$element;return a.hasClass("doubleTapToGo")?(a.removeClass("doubleTapToGo"),!0):a.parent().children("ul").length?(b.find(".doubleTapToGo").removeClass("doubleTapToGo"),a.addClass("doubleTapToGo"),!1):void 0},e.prototype.show=function(b){var c=this.options.activeClass,f=a(b),g=f.parent("li");if(!this.transitioning&&!f.hasClass("in")){g.addClass(c),this.options.toggle&&this.hide(g.siblings().children("ul.in")),f.removeClass("collapse").addClass("collapsing").height(0),this.transitioning=1;var h=function(){f.removeClass("collapsing").addClass("collapse in").height(""),this.transitioning=0};return d?void f.one("mmTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(e.TRANSITION_DURATION).height(f[0].scrollHeight):h.call(this)}},e.prototype.hide=function(b){var c=this.options.activeClass,f=a(b);if(!this.transitioning&&f.hasClass("in")){f.parent("li").removeClass(c),f.height(f.height())[0].offsetHeight,f.addClass("collapsing").removeClass("collapse").removeClass("in"),this.transitioning=1;var g=function(){this.transitioning=0,f.removeClass("collapsing").addClass("collapse")};return d?void f.height(0).one("mmTransitionEnd",a.proxy(g,this)).emulateTransitionEnd(e.TRANSITION_DURATION):g.call(this)}};var f=a.fn.metisMenu;a.fn.metisMenu=c,a.fn.metisMenu.Constructor=e,a.fn.metisMenu.noConflict=function(){return a.fn.metisMenu=f,this}}(jQuery);
!function(e){e(["jquery"],function(e){return function(){function t(e,t,n){return f({type:O.error,iconClass:g().iconClasses.error,message:e,optionsOverride:n,title:t})}function n(t,n){return t||(t=g()),v=e("#"+t.containerId),v.length?v:(n&&(v=c(t)),v)}function i(e,t,n){return f({type:O.info,iconClass:g().iconClasses.info,message:e,optionsOverride:n,title:t})}function o(e){w=e}function s(e,t,n){return f({type:O.success,iconClass:g().iconClasses.success,message:e,optionsOverride:n,title:t})}function a(e,t,n){return f({type:O.warning,iconClass:g().iconClasses.warning,message:e,optionsOverride:n,title:t})}function r(e){var t=g();v||n(t),l(e,t)||u(t)}function d(t){var i=g();return v||n(i),t&&0===e(":focus",t).length?void h(t):void(v.children().length&&v.remove())}function u(t){for(var n=v.children(),i=n.length-1;i>=0;i--)l(e(n[i]),t)}function l(t,n){return t&&0===e(":focus",t).length?(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){h(t)}}),!0):!1}function c(t){return v=e("<div/>").attr("id",t.containerId).addClass(t.positionClass).attr("aria-live","polite").attr("role","alert"),v.appendTo(e(t.target)),v}function p(){return{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",target:"body",closeHtml:'<button type="button">&times;</button>',newestOnTop:!0,preventDuplicates:!1,progressBar:!1}}function m(e){w&&w(e)}function f(t){function i(t){return!e(":focus",l).length||t?(clearTimeout(O.intervalId),l[r.hideMethod]({duration:r.hideDuration,easing:r.hideEasing,complete:function(){h(l),r.onHidden&&"hidden"!==b.state&&r.onHidden(),b.state="hidden",b.endTime=new Date,m(b)}})):void 0}function o(){(r.timeOut>0||r.extendedTimeOut>0)&&(u=setTimeout(i,r.extendedTimeOut),O.maxHideTime=parseFloat(r.extendedTimeOut),O.hideEta=(new Date).getTime()+O.maxHideTime)}function s(){clearTimeout(u),O.hideEta=0,l.stop(!0,!0)[r.showMethod]({duration:r.showDuration,easing:r.showEasing})}function a(){var e=(O.hideEta-(new Date).getTime())/O.maxHideTime*100;f.width(e+"%")}var r=g(),d=t.iconClass||r.iconClass;if("undefined"!=typeof t.optionsOverride&&(r=e.extend(r,t.optionsOverride),d=t.optionsOverride.iconClass||d),r.preventDuplicates){if(t.message===C)return;C=t.message}T++,v=n(r,!0);var u=null,l=e("<div/>"),c=e("<div/>"),p=e("<div/>"),f=e("<div/>"),w=e(r.closeHtml),O={intervalId:null,hideEta:null,maxHideTime:null},b={toastId:T,state:"visible",startTime:new Date,options:r,map:t};return t.iconClass&&l.addClass(r.toastClass).addClass(d),t.title&&(c.append(t.title).addClass(r.titleClass),l.append(c)),t.message&&(p.append(t.message).addClass(r.messageClass),l.append(p)),r.closeButton&&(w.addClass("toast-close-button").attr("role","button"),l.prepend(w)),r.progressBar&&(f.addClass("toast-progress"),l.prepend(f)),l.hide(),r.newestOnTop?v.prepend(l):v.append(l),l[r.showMethod]({duration:r.showDuration,easing:r.showEasing,complete:r.onShown}),r.timeOut>0&&(u=setTimeout(i,r.timeOut),O.maxHideTime=parseFloat(r.timeOut),O.hideEta=(new Date).getTime()+O.maxHideTime,r.progressBar&&(O.intervalId=setInterval(a,10))),l.hover(s,o),!r.onclick&&r.tapToDismiss&&l.click(i),r.closeButton&&w&&w.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&e.cancelBubble!==!0&&(e.cancelBubble=!0),i(!0)}),r.onclick&&l.click(function(){r.onclick(),i()}),m(b),r.debug&&console&&console.log(b),l}function g(){return e.extend({},p(),b.options)}function h(e){v||(v=n()),e.is(":visible")||(e.remove(),e=null,0===v.children().length&&(v.remove(),C=void 0))}var v,w,C,T=0,O={error:"error",info:"info",success:"success",warning:"warning"},b={clear:r,remove:d,error:t,getContainer:n,info:i,options:{},subscribe:o,success:s,version:"2.1.0",warning:a};return b}()})}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)});
/*
 *  Bootstrap Duallistbox - v3.0.5
 *  A responsive dual listbox widget optimized for Twitter Bootstrap. It works on all modern browsers and on touch devices.
 *  http://www.virtuosoft.eu/code/bootstrap-duallistbox/
 *
 *  Made by István Ujj-Mészáros
 *  Under Apache License v2.0 License
 */

;(function ($, window, document, undefined) {
    // Create the defaults once
    var pluginName = 'bootstrapDualListbox',
        defaults = {
            bootstrap2Compatible: false,
            filterTextClear: 'show all',
            filterPlaceHolder: 'Filter',
            moveSelectedLabel: 'Move selected',
            moveAllLabel: 'Move all',
            removeSelectedLabel: 'Remove selected',
            removeAllLabel: 'Remove all',
            moveOnSelect: true,                                                                 // true/false (forced true on androids, see the comment later)
            preserveSelectionOnMove: false,                                                     // 'all' / 'moved' / false
            selectedListLabel: false,                                                           // 'string', false
            nonSelectedListLabel: false,                                                        // 'string', false
            helperSelectNamePostfix: '_helper',                                                 // 'string_of_postfix' / false
            selectorMinimalHeight: 100,
            showFilterInputs: true,                                                             // whether to show filter inputs
            nonSelectedFilter: '',                                                              // string, filter the non selected options
            selectedFilter: '',                                                                 // string, filter the selected options
            infoText: 'Showing all {0}',                                                        // text when all options are visible / false for no info text
            infoTextFiltered: '<span class="label label-warning">Filtered</span> {0} from {1}', // when not all of the options are visible due to the filter
            infoTextEmpty: 'Empty list',                                                        // when there are no options present in the list
            filterOnValues: false,                                                              // filter by selector's values, boolean
            sortByInputOrder: false
        },
    // Selections are invisible on android if the containing select is styled with CSS
    // http://code.google.com/p/android/issues/detail?id=16922
        isBuggyAndroid = /android/i.test(navigator.userAgent.toLowerCase());

    // The actual plugin constructor
    function BootstrapDualListbox(element, options) {
        this.element = $(element);
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    function triggerChangeEvent(dualListbox) {
        dualListbox.element.trigger('change');
    }

    function updateSelectionStates(dualListbox) {
        dualListbox.element.find('option').each(function(index, item) {
            var $item = $(item);
            if (typeof($item.data('original-index')) === 'undefined') {
                $item.data('original-index', dualListbox.elementCount++);
            }
            if (typeof($item.data('_selected')) === 'undefined') {
                $item.data('_selected', false);
            }
        });
    }

    function changeSelectionState(dualListbox, original_index, selected) {
        dualListbox.element.find('option').each(function(index, item) {
            var $item = $(item);
            if ($item.data('original-index') === original_index) {
                $item.prop('selected', selected);
                if(selected){
                    $item.attr('data-sortindex', dualListbox.sortIndex);
                    dualListbox.sortIndex++;
                } else {
                    $item.removeAttr('data-sortindex');
                }
            }
        });
    }

    function formatString(s, args) {
        return s.replace(/\{(\d+)\}/g, function(match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    }

    function refreshInfo(dualListbox) {
        if (!dualListbox.settings.infoText) {
            return;
        }

        var visible1 = dualListbox.elements.select1.find('option').length,
            visible2 = dualListbox.elements.select2.find('option').length,
            all1 = dualListbox.element.find('option').length - dualListbox.selectedElements,
            all2 = dualListbox.selectedElements,
            content = '';

        if (all1 === 0) {
            content = dualListbox.settings.infoTextEmpty;
        } else if (visible1 === all1) {
            content = formatString(dualListbox.settings.infoText, [visible1, all1]);
        } else {
            content = formatString(dualListbox.settings.infoTextFiltered, [visible1, all1]);
        }

        dualListbox.elements.info1.html(content);
        dualListbox.elements.box1.toggleClass('filtered', !(visible1 === all1 || all1 === 0));

        if (all2 === 0) {
            content = dualListbox.settings.infoTextEmpty;
        } else if (visible2 === all2) {
            content = formatString(dualListbox.settings.infoText, [visible2, all2]);
        } else {
            content = formatString(dualListbox.settings.infoTextFiltered, [visible2, all2]);
        }

        dualListbox.elements.info2.html(content);
        dualListbox.elements.box2.toggleClass('filtered', !(visible2 === all2 || all2 === 0));
    }

    function refreshSelects(dualListbox) {
        dualListbox.selectedElements = 0;

        dualListbox.elements.select1.empty();
        dualListbox.elements.select2.empty();

        dualListbox.element.find('option').each(function(index, item) {
            var $item = $(item);
            if ($item.prop('selected')) {
                dualListbox.selectedElements++;
                dualListbox.elements.select2.append($item.clone(true).prop('selected', $item.data('_selected')));
            } else {
                dualListbox.elements.select1.append($item.clone(true).prop('selected', $item.data('_selected')));
            }
        });

        if (dualListbox.settings.showFilterInputs) {
            filter(dualListbox, 1);
            filter(dualListbox, 2);
        }
        refreshInfo(dualListbox);
    }

    function filter(dualListbox, selectIndex) {
        if (!dualListbox.settings.showFilterInputs) {
            return;
        }

        saveSelections(dualListbox, selectIndex);

        dualListbox.elements['select'+selectIndex].empty().scrollTop(0);

        var regex = new RegExp($.trim(dualListbox.elements['filterInput'+selectIndex].val()), 'gi'),
            allOptions = dualListbox.element.find('option'),
            options = dualListbox.element;

        if (selectIndex === 1) {
            options = allOptions.not(':selected');
        } else  {
            options = options.find('option:selected');
        }

        options.each(function(index, item) {
            var $item = $(item),
                isFiltered = true;
            if (item.text.match(regex) || (dualListbox.settings.filterOnValues && $item.attr('value').match(regex) ) ) {
                isFiltered = false;
                dualListbox.elements['select'+selectIndex].append($item.clone(true).prop('selected', $item.data('_selected')));
            }
            allOptions.eq($item.data('original-index')).data('filtered'+selectIndex, isFiltered);
        });

        refreshInfo(dualListbox);
    }

    function saveSelections(dualListbox, selectIndex) {
        var options = dualListbox.element.find('option');
        dualListbox.elements['select'+selectIndex].find('option').each(function(index, item) {
            var $item = $(item);
            options.eq($item.data('original-index')).data('_selected', $item.prop('selected'));
        });
    }

    function sortOptionsByInputOrder(select){
        var selectopt = select.children('option');

        selectopt.sort(function(a,b){
            var an = parseInt(a.getAttribute('data-sortindex')),
                bn = parseInt(b.getAttribute('data-sortindex'));

            if(an > bn) {
                return 1;
            }
            if(an < bn) {
                return -1;
            }
            return 0;
        });

        selectopt.detach().appendTo(select);
    }

    function sortOptions(select) {
        select.find('option').sort(function(a, b) {
            return ($(a).data('original-index') > $(b).data('original-index')) ? 1 : -1;
        }).appendTo(select);
    }

    function clearSelections(dualListbox) {
        dualListbox.elements.select1.find('option').each(function() {
            dualListbox.element.find('option').data('_selected', false);
        });
    }

    function move(dualListbox) {
        if (dualListbox.settings.preserveSelectionOnMove === 'all' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 1);
            saveSelections(dualListbox, 2);
        } else if (dualListbox.settings.preserveSelectionOnMove === 'moved' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 1);
        }

        dualListbox.elements.select1.find('option:selected').each(function(index, item) {
            var $item = $(item);
            if (!$item.data('filtered1')) {
                changeSelectionState(dualListbox, $item.data('original-index'), true);
            }
        });

        refreshSelects(dualListbox);
        triggerChangeEvent(dualListbox);
        if(dualListbox.settings.sortByInputOrder){
            sortOptionsByInputOrder(dualListbox.elements.select2);
        } else {
            sortOptions(dualListbox.elements.select2);
        }
    }

    function remove(dualListbox) {
        if (dualListbox.settings.preserveSelectionOnMove === 'all' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 1);
            saveSelections(dualListbox, 2);
        } else if (dualListbox.settings.preserveSelectionOnMove === 'moved' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 2);
        }

        dualListbox.elements.select2.find('option:selected').each(function(index, item) {
            var $item = $(item);
            if (!$item.data('filtered2')) {
                changeSelectionState(dualListbox, $item.data('original-index'), false);
            }
        });

        refreshSelects(dualListbox);
        triggerChangeEvent(dualListbox);
        sortOptions(dualListbox.elements.select1);
    }

    function moveAll(dualListbox) {
        if (dualListbox.settings.preserveSelectionOnMove === 'all' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 1);
            saveSelections(dualListbox, 2);
        } else if (dualListbox.settings.preserveSelectionOnMove === 'moved' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 1);
        }

        dualListbox.element.find('option').each(function(index, item) {
            var $item = $(item);
            if (!$item.data('filtered1')) {
                $item.prop('selected', true);
                $item.attr('data-sortindex', dualListbox.sortIndex);
                dualListbox.sortIndex++;
            }
        });

        refreshSelects(dualListbox);
        triggerChangeEvent(dualListbox);
    }

    function removeAll(dualListbox) {
        if (dualListbox.settings.preserveSelectionOnMove === 'all' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 1);
            saveSelections(dualListbox, 2);
        } else if (dualListbox.settings.preserveSelectionOnMove === 'moved' && !dualListbox.settings.moveOnSelect) {
            saveSelections(dualListbox, 2);
        }

        dualListbox.element.find('option').each(function(index, item) {
            var $item = $(item);
            if (!$item.data('filtered2')) {
                $item.prop('selected', false);
                $item.removeAttr('data-sortindex');
            }
        });

        refreshSelects(dualListbox);
        triggerChangeEvent(dualListbox);
    }

    function bindEvents(dualListbox) {
        dualListbox.elements.form.submit(function(e) {
            if (dualListbox.elements.filterInput1.is(':focus')) {
                e.preventDefault();
                dualListbox.elements.filterInput1.focusout();
            } else if (dualListbox.elements.filterInput2.is(':focus')) {
                e.preventDefault();
                dualListbox.elements.filterInput2.focusout();
            }
        });

        dualListbox.element.on('bootstrapDualListbox.refresh', function(e, mustClearSelections){
            dualListbox.refresh(mustClearSelections);
        });

        dualListbox.elements.filterClear1.on('click', function() {
            dualListbox.setNonSelectedFilter('', true);
        });

        dualListbox.elements.filterClear2.on('click', function() {
            dualListbox.setSelectedFilter('', true);
        });

        dualListbox.elements.moveButton.on('click', function() {
            move(dualListbox);
        });

        dualListbox.elements.moveAllButton.on('click', function() {
            moveAll(dualListbox);
        });

        dualListbox.elements.removeButton.on('click', function() {
            remove(dualListbox);
        });

        dualListbox.elements.removeAllButton.on('click', function() {
            removeAll(dualListbox);
        });

        dualListbox.elements.filterInput1.on('change keyup', function() {
            filter(dualListbox, 1);
        });

        dualListbox.elements.filterInput2.on('change keyup', function() {
            filter(dualListbox, 2);
        });
    }

    BootstrapDualListbox.prototype = {
        init: function () {
            // Add the custom HTML template
            this.container = $('' +
                '<div class="bootstrap-duallistbox-container">' +
                ' <div class="box1">' +
                '   <label></label>' +
                '   <span class="info-container">' +
                '     <span class="info"></span>' +
                '     <button type="button" class="btn clear1 pull-right"></button>' +
                '   </span>' +
                '   <input class="filter" type="text">' +
                '   <div class="btn-group buttons">' +
                '     <button type="button" class="btn moveall">' +
                '       <i></i>' +
                '       <i></i>' +
                '     </button>' +
                '     <button type="button" class="btn move">' +
                '       <i></i>' +
                '     </button>' +
                '   </div>' +
                '   <select multiple="multiple"></select>' +
                ' </div>' +
                ' <div class="box2">' +
                '   <label></label>' +
                '   <span class="info-container">' +
                '     <span class="info"></span>' +
                '     <button type="button" class="btn clear2 pull-right"></button>' +
                '   </span>' +
                '   <input class="filter" type="text">' +
                '   <div class="btn-group buttons">' +
                '     <button type="button" class="btn remove">' +
                '       <i></i>' +
                '     </button>' +
                '     <button type="button" class="btn removeall">' +
                '       <i></i>' +
                '       <i></i>' +
                '     </button>' +
                '   </div>' +
                '   <select multiple="multiple"></select>' +
                ' </div>' +
                '</div>')
                .insertBefore(this.element);

            // Cache the inner elements
            this.elements = {
                originalSelect: this.element,
                box1: $('.box1', this.container),
                box2: $('.box2', this.container),
                filterInput1: $('.box1 .filter', this.container),
                filterInput2: $('.box2 .filter', this.container),
                filterClear1: $('.box1 .clear1', this.container),
                filterClear2: $('.box2 .clear2', this.container),
                label1: $('.box1 > label', this.container),
                label2: $('.box2 > label', this.container),
                info1: $('.box1 .info', this.container),
                info2: $('.box2 .info', this.container),
                select1: $('.box1 select', this.container),
                select2: $('.box2 select', this.container),
                moveButton: $('.box1 .move', this.container),
                removeButton: $('.box2 .remove', this.container),
                moveAllButton: $('.box1 .moveall', this.container),
                removeAllButton: $('.box2 .removeall', this.container),
                form: $($('.box1 .filter', this.container)[0].form)
            };

            // Set select IDs
            this.originalSelectName = this.element.attr('name') || '';
            var select1Id = 'bootstrap-duallistbox-nonselected-list_' + this.originalSelectName,
                select2Id = 'bootstrap-duallistbox-selected-list_' + this.originalSelectName;
            this.elements.select1.attr('id', select1Id);
            this.elements.select2.attr('id', select2Id);
            this.elements.label1.attr('for', select1Id);
            this.elements.label2.attr('for', select2Id);

            // Apply all settings
            this.selectedElements = 0;
            this.sortIndex = 0;
            this.elementCount = 0;
            this.setBootstrap2Compatible(this.settings.bootstrap2Compatible);
            this.setFilterTextClear(this.settings.filterTextClear);
            this.setFilterPlaceHolder(this.settings.filterPlaceHolder);
            this.setMoveSelectedLabel(this.settings.moveSelectedLabel);
            this.setMoveAllLabel(this.settings.moveAllLabel);
            this.setRemoveSelectedLabel(this.settings.removeSelectedLabel);
            this.setRemoveAllLabel(this.settings.removeAllLabel);
            this.setMoveOnSelect(this.settings.moveOnSelect);
            this.setPreserveSelectionOnMove(this.settings.preserveSelectionOnMove);
            this.setSelectedListLabel(this.settings.selectedListLabel);
            this.setNonSelectedListLabel(this.settings.nonSelectedListLabel);
            this.setHelperSelectNamePostfix(this.settings.helperSelectNamePostfix);
            this.setSelectOrMinimalHeight(this.settings.selectorMinimalHeight);

            updateSelectionStates(this);

            this.setShowFilterInputs(this.settings.showFilterInputs);
            this.setNonSelectedFilter(this.settings.nonSelectedFilter);
            this.setSelectedFilter(this.settings.selectedFilter);
            this.setInfoText(this.settings.infoText);
            this.setInfoTextFiltered(this.settings.infoTextFiltered);
            this.setInfoTextEmpty(this.settings.infoTextEmpty);
            this.setFilterOnValues(this.settings.filterOnValues);
            this.setSortByInputOrder(this.settings.sortByInputOrder);

            // Hide the original select
            this.element.hide();

            bindEvents(this);
            refreshSelects(this);

            return this.element;
        },
        setBootstrap2Compatible: function(value, refresh) {
            this.settings.bootstrap2Compatible = value;
            if (value) {
                this.container.removeClass('row').addClass('row-fluid bs2compatible');
                this.container.find('.box1, .box2').removeClass('col-md-6').addClass('span6');
                this.container.find('.clear1, .clear2').removeClass('btn-default btn-xs').addClass('btn-mini');
                this.container.find('input, select').removeClass('form-control');
                this.container.find('.btn').removeClass('btn-default');
                this.container.find('.moveall > i, .move > i').removeClass('glyphicon glyphicon-arrow-right').addClass('icon-arrow-right');
                this.container.find('.removeall > i, .remove > i').removeClass('glyphicon glyphicon-arrow-left').addClass('icon-arrow-left');
            } else {
                this.container.removeClass('row-fluid bs2compatible').addClass('row');
                this.container.find('.box1, .box2').removeClass('span6').addClass('col-md-6');
                this.container.find('.clear1, .clear2').removeClass('btn-mini').addClass('btn-default btn-xs');
                this.container.find('input, select').addClass('form-control');
                this.container.find('.btn').addClass('btn-default');
                this.container.find('.moveall > i, .move > i').removeClass('icon-arrow-right').addClass('glyphicon glyphicon-arrow-right');
                this.container.find('.removeall > i, .remove > i').removeClass('icon-arrow-left').addClass('glyphicon glyphicon-arrow-left');
            }
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setFilterTextClear: function(value, refresh) {
            this.settings.filterTextClear = value;
            this.elements.filterClear1.html(value);
            this.elements.filterClear2.html(value);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setFilterPlaceHolder: function(value, refresh) {
            this.settings.filterPlaceHolder = value;
            this.elements.filterInput1.attr('placeholder', value);
            this.elements.filterInput2.attr('placeholder', value);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setMoveSelectedLabel: function(value, refresh) {
            this.settings.moveSelectedLabel = value;
            this.elements.moveButton.attr('title', value);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setMoveAllLabel: function(value, refresh) {
            this.settings.moveAllLabel = value;
            this.elements.moveAllButton.attr('title', value);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setRemoveSelectedLabel: function(value, refresh) {
            this.settings.removeSelectedLabel = value;
            this.elements.removeButton.attr('title', value);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setRemoveAllLabel: function(value, refresh) {
            this.settings.removeAllLabel = value;
            this.elements.removeAllButton.attr('title', value);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setMoveOnSelect: function(value, refresh) {
            if (isBuggyAndroid) {
                value = true;
            }
            this.settings.moveOnSelect = value;
            if (this.settings.moveOnSelect) {
                this.container.addClass('moveonselect');
                var self = this;
                this.elements.select1.on('change', function() {
                    move(self);
                });
                this.elements.select2.on('change', function() {
                    remove(self);
                });
            } else {
                this.container.removeClass('moveonselect');
                this.elements.select1.off('change');
                this.elements.select2.off('change');
            }
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setPreserveSelectionOnMove: function(value, refresh) {
            // We are forcing to move on select and disabling preserveSelectionOnMove on Android
            if (isBuggyAndroid) {
                value = false;
            }
            this.settings.preserveSelectionOnMove = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setSelectedListLabel: function(value, refresh) {
            this.settings.selectedListLabel = value;
            if (value) {
                this.elements.label2.show().html(value);
            } else {
                this.elements.label2.hide().html(value);
            }
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setNonSelectedListLabel: function(value, refresh) {
            this.settings.nonSelectedListLabel = value;
            if (value) {
                this.elements.label1.show().html(value);
            } else {
                this.elements.label1.hide().html(value);
            }
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setHelperSelectNamePostfix: function(value, refresh) {
            this.settings.helperSelectNamePostfix = value;
            if (value) {
                this.elements.select1.attr('name', this.originalSelectName + value + '1');
                this.elements.select2.attr('name', this.originalSelectName + value + '2');
            } else {
                this.elements.select1.removeAttr('name');
                this.elements.select2.removeAttr('name');
            }
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setSelectOrMinimalHeight: function(value, refresh) {
            this.settings.selectorMinimalHeight = value;
            var height = this.element.height();
            if (this.element.height() < value) {
                height = value;
            }
            this.elements.select1.height(height);
            this.elements.select2.height(height);
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setShowFilterInputs: function(value, refresh) {
            if (!value) {
                this.setNonSelectedFilter('');
                this.setSelectedFilter('');
                refreshSelects(this);
                this.elements.filterInput1.hide();
                this.elements.filterInput2.hide();
            } else {
                this.elements.filterInput1.show();
                this.elements.filterInput2.show();
            }
            this.settings.showFilterInputs = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setNonSelectedFilter: function(value, refresh) {
            if (this.settings.showFilterInputs) {
                this.settings.nonSelectedFilter = value;
                this.elements.filterInput1.val(value);
                if (refresh) {
                    refreshSelects(this);
                }
                return this.element;
            }
        },
        setSelectedFilter: function(value, refresh) {
            if (this.settings.showFilterInputs) {
                this.settings.selectedFilter = value;
                this.elements.filterInput2.val(value);
                if (refresh) {
                    refreshSelects(this);
                }
                return this.element;
            }
        },
        setInfoText: function(value, refresh) {
            this.settings.infoText = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setInfoTextFiltered: function(value, refresh) {
            this.settings.infoTextFiltered = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setInfoTextEmpty: function(value, refresh) {
            this.settings.infoTextEmpty = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setFilterOnValues: function(value, refresh) {
            this.settings.filterOnValues = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        setSortByInputOrder: function(value, refresh){
            this.settings.sortByInputOrder = value;
            if (refresh) {
                refreshSelects(this);
            }
            return this.element;
        },
        getContainer: function() {
            return this.container;
        },
        refresh: function(mustClearSelections) {
            updateSelectionStates(this);

            if (!mustClearSelections) {
                saveSelections(this, 1);
                saveSelections(this, 2);
            } else {
                clearSelections(this);
            }

            refreshSelects(this);
        },
        destroy: function() {
            this.container.remove();
            this.element.show();
            $.data(this, 'plugin_' + pluginName, null);
            return this.element;
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function (options) {
        var args = arguments;

        // Is the first parameter an object (options), or was omitted, instantiate a new instance of the plugin.
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                // If this is not a select
                if (!$(this).is('select')) {
                    $(this).find('select').each(function(index, item) {
                        // For each nested select, instantiate the Dual List Box
                        $(item).bootstrapDualListbox(options);
                    });
                } else if (!$.data(this, 'plugin_' + pluginName)) {
                    // Only allow the plugin to be instantiated once so we check that the element has no plugin instantiation yet

                    // if it has no instance, create a new one, pass options to our plugin constructor,
                    // and store the plugin instance in the elements jQuery data object.
                    $.data(this, 'plugin_' + pluginName, new BootstrapDualListbox(this, options));
                }
            });
            // If the first parameter is a string and it doesn't start with an underscore or "contains" the `init`-function,
            // treat this as a call to a public method.
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {

            // Cache the method call to make it possible to return a value
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);
                // Tests that there's already a plugin-instance and checks that the requested public method exists
                if (instance instanceof BootstrapDualListbox && typeof instance[options] === 'function') {
                    // Call the method of our plugin instance, and pass it the supplied arguments.
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
            });

            // If the earlier cached method gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }

    };

})(jQuery, window, document);
/*!
 * jQuery.extendext 0.1.2
 *
 * Copyright 2014-2016 Damien "Mistic" Sorel (http://www.strangeplanet.fr)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 *
 * Based on jQuery.extend by jQuery Foundation, Inc. and other contributors
 */

!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],b):"object"==typeof module&&module.exports?module.exports=b(require("jquery")):b(a.jQuery)}(this,function($){"use strict";$.extendext=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1,k="default";for("boolean"==typeof g&&(j=g,g=arguments[h++]||{}),"string"==typeof g&&(k=g.toLowerCase(),"concat"!==k&&"replace"!==k&&"extend"!==k&&(k="default"),g=arguments[h++]||{}),"object"==typeof g||$.isFunction(g)||(g={}),h===i&&(g=this,h--);h<i;h++)if(null!==(a=arguments[h]))if($.isArray(a)&&"default"!==k)switch(f=g&&$.isArray(g)?g:[],k){case"concat":g=f.concat($.extend(j,[],a));break;case"replace":g=$.extend(j,[],a);break;case"extend":a.forEach(function(a,b){if("object"==typeof a){var c=$.isArray(a)?[]:{};f[b]=$.extendext(j,k,f[b]||c,a)}else f.indexOf(a)===-1&&f.push(a)}),g=f}else for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&($.isPlainObject(d)||(e=$.isArray(d)))?(e?(e=!1,f=c&&$.isArray(c)?c:[]):f=c&&$.isPlainObject(c)?c:{},g[b]=$.extendext(j,k,f,d)):void 0!==d&&(g[b]=d));return g}});
/* Laura Doktorova https://github.com/olado/doT */

!function(){"use strict";function e(n,t,r){return("string"==typeof t?t:t.toString()).replace(n.define||a,function(e,t,o,a){return 0===t.indexOf("def.")&&(t=t.substring(4)),t in r||(":"===o?(n.defineParams&&a.replace(n.defineParams,function(e,n,o){r[t]={arg:n,text:o}}),t in r||(r[t]=a)):new Function("def","def['"+t+"']="+a)(r)),""}).replace(n.use||a,function(t,o){n.useParams&&(o=o.replace(n.useParams,function(e,n,t,o){if(r[t]&&r[t].arg&&o){var a=(t+":"+o).replace(/'|\\/g,"_");return r.__exp=r.__exp||{},r.__exp[a]=r[t].text.replace(new RegExp("(^|[^\\w$])"+r[t].arg+"([^\\w$])","g"),"$1"+o+"$2"),n+"def.__exp['"+a+"']"}}));var a=new Function("def","return "+o)(r);return a?e(n,a,r):a})}function n(e){return e.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var t,r={engine:"doT",version:"1.1.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1,doNotSkipEncoded:!1},template:void 0,compile:void 0,log:!0};r.encodeHTMLSource=function(e){var n={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},t=e?/[&<>"'\/]/g:/&(?!#?\w+;)|<|>|"|'|\//g;return function(e){return e?e.toString().replace(t,function(e){return n[e]||e}):""}},t=function(){return this||(0,eval)("this")}(),"undefined"!=typeof module&&module.exports?module.exports=r:"function"==typeof define&&define.amd?define(function(){return r}):t.doT=r;var o={append:{start:"'+(",end:")+'",startencode:"'+encodeHTML("},split:{start:"';out+=(",end:");out+='",startencode:"';out+=encodeHTML("}},a=/$^/;r.template=function(c,i,u){i=i||r.templateSettings;var d,s,p=i.append?o.append:o.split,l=0,f=i.use||i.define?e(i,c,u||{}):c;f=("var out='"+(i.strip?f.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):f).replace(/'|\\/g,"\\$&").replace(i.interpolate||a,function(e,t){return p.start+n(t)+p.end}).replace(i.encode||a,function(e,t){return d=!0,p.startencode+n(t)+p.end}).replace(i.conditional||a,function(e,t,r){return t?r?"';}else if("+n(r)+"){out+='":"';}else{out+='":r?"';if("+n(r)+"){out+='":"';}out+='"}).replace(i.iterate||a,function(e,t,r,o){return t?(l+=1,s=o||"i"+l,t=n(t),"';var arr"+l+"="+t+";if(arr"+l+"){var "+r+","+s+"=-1,l"+l+"=arr"+l+".length-1;while("+s+"<l"+l+"){"+r+"=arr"+l+"["+s+"+=1];out+='"):"';} } out+='"}).replace(i.evaluate||a,function(e,t){return"';"+n(t)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,""),d&&(i.selfcontained||!t||t._encodeHTML||(t._encodeHTML=r.encodeHTMLSource(i.doNotSkipEncoded)),f="var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("+r.encodeHTMLSource.toString()+"("+(i.doNotSkipEncoded||"")+"));"+f);try{return new Function(i.varname,f)}catch(e){throw"undefined"!=typeof console&&console.log("Could not create a template function: "+f),e}},r.compile=function(e,n){return r.template(e,null,n)}}();
/*!
 * Datepicker for Bootstrap v1.8.0 (https://github.com/uxsolutions/bootstrap-datepicker)
 *
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */


(function(factory){
  if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory);
  } else if (typeof exports === 'object') {
      factory(require('jquery'));
  } else {
      factory(jQuery);
  }
}(function($, undefined){
function UTCDate(){
  return new Date(Date.UTC.apply(Date, arguments));
}
function UTCToday(){
  var today = new Date();
  return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
}
function isUTCEquals(date1, date2) {
  return (
    date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate()
  );
}
function alias(method, deprecationMsg){
  return function(){
    if (deprecationMsg !== undefined) {
      $.fn.datepicker.deprecated(deprecationMsg);
    }

    return this[method].apply(this, arguments);
  };
}
function isValidDate(d) {
  return d && !isNaN(d.getTime());
}

var DateArray = (function(){
  var extras = {
    get: function(i){
      return this.slice(i)[0];
    },
    contains: function(d){
      // Array.indexOf is not cross-browser;
      // $.inArray doesn't work with Dates
      var val = d && d.valueOf();
      for (var i=0, l=this.length; i < l; i++)
        // Use date arithmetic to allow dates with different times to match
        if (0 <= this[i].valueOf() - val && this[i].valueOf() - val < 1000*60*60*24)
          return i;
      return -1;
    },
    remove: function(i){
      this.splice(i,1);
    },
    replace: function(new_array){
      if (!new_array)
        return;
      if (!$.isArray(new_array))
        new_array = [new_array];
      this.clear();
      this.push.apply(this, new_array);
    },
    clear: function(){
      this.length = 0;
    },
    copy: function(){
      var a = new DateArray();
      a.replace(this);
      return a;
    }
  };

  return function(){
    var a = [];
    a.push.apply(a, arguments);
    $.extend(a, extras);
    return a;
  };
})();


// Picker object

var Datepicker = function(element, options){
  $.data(element, 'datepicker', this);
  this._process_options(options);

  this.dates = new DateArray();
  this.viewDate = this.o.defaultViewDate;
  this.focusDate = null;

  this.element = $(element);
  this.isInput = this.element.is('input');
  this.inputField = this.isInput ? this.element : this.element.find('input');
  this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
  if (this.component && this.component.length === 0)
    this.component = false;
  this.isInline = !this.component && this.element.is('div');

  this.picker = $(DPGlobal.template);

  // Checking templates and inserting
  if (this._check_template(this.o.templates.leftArrow)) {
    this.picker.find('.prev').html(this.o.templates.leftArrow);
  }

  if (this._check_template(this.o.templates.rightArrow)) {
    this.picker.find('.next').html(this.o.templates.rightArrow);
  }

  this._buildEvents();
  this._attachEvents();

  if (this.isInline){
    this.picker.addClass('datepicker-inline').appendTo(this.element);
  }
  else {
    this.picker.addClass('datepicker-dropdown dropdown-menu');
  }

  if (this.o.rtl){
    this.picker.addClass('datepicker-rtl');
  }

  if (this.o.calendarWeeks) {
    this.picker.find('.datepicker-days .datepicker-switch, thead .datepicker-title, tfoot .today, tfoot .clear')
      .attr('colspan', function(i, val){
        return Number(val) + 1;
      });
  }

  this._process_options({
    startDate: this._o.startDate,
    endDate: this._o.endDate,
    daysOfWeekDisabled: this.o.daysOfWeekDisabled,
    daysOfWeekHighlighted: this.o.daysOfWeekHighlighted,
    datesDisabled: this.o.datesDisabled
  });

  this._allow_update = false;
  this.setViewMode(this.o.startView);
  this._allow_update = true;

  this.fillDow();
  this.fillMonths();

  this.update();

  if (this.isInline){
    this.show();
  }
};

Datepicker.prototype = {
  constructor: Datepicker,

  _resolveViewName: function(view){
    $.each(DPGlobal.viewModes, function(i, viewMode){
      if (view === i || $.inArray(view, viewMode.names) !== -1){
        view = i;
        return false;
      }
    });

    return view;
  },

  _resolveDaysOfWeek: function(daysOfWeek){
    if (!$.isArray(daysOfWeek))
      daysOfWeek = daysOfWeek.split(/[,\s]*/);
    return $.map(daysOfWeek, Number);
  },

  _check_template: function(tmp){
    try {
      // If empty
      if (tmp === undefined || tmp === "") {
        return false;
      }
      // If no html, everything ok
      if ((tmp.match(/[<>]/g) || []).length <= 0) {
        return true;
      }
      // Checking if html is fine
      var jDom = $(tmp);
      return jDom.length > 0;
    }
    catch (ex) {
      return false;
    }
  },

  _process_options: function(opts){
    // Store raw options for reference
    this._o = $.extend({}, this._o, opts);
    // Processed options
    var o = this.o = $.extend({}, this._o);

    // Check if "de-DE" style date is available, if not language should
    // fallback to 2 letter code eg "de"
    var lang = o.language;
    if (!dates[lang]){
      lang = lang.split('-')[0];
      if (!dates[lang])
        lang = defaults.language;
    }
    o.language = lang;

    // Retrieve view index from any aliases
    o.startView = this._resolveViewName(o.startView);
    o.minViewMode = this._resolveViewName(o.minViewMode);
    o.maxViewMode = this._resolveViewName(o.maxViewMode);

    // Check view is between min and max
    o.startView = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, o.startView));

    // true, false, or Number > 0
    if (o.multidate !== true){
      o.multidate = Number(o.multidate) || false;
      if (o.multidate !== false)
        o.multidate = Math.max(0, o.multidate);
    }
    o.multidateSeparator = String(o.multidateSeparator);

    o.weekStart %= 7;
    o.weekEnd = (o.weekStart + 6) % 7;

    var format = DPGlobal.parseFormat(o.format);
    if (o.startDate !== -Infinity){
      if (!!o.startDate){
        if (o.startDate instanceof Date)
          o.startDate = this._local_to_utc(this._zero_time(o.startDate));
        else
          o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
      }
      else {
        o.startDate = -Infinity;
      }
    }
    if (o.endDate !== Infinity){
      if (!!o.endDate){
        if (o.endDate instanceof Date)
          o.endDate = this._local_to_utc(this._zero_time(o.endDate));
        else
          o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
      }
      else {
        o.endDate = Infinity;
      }
    }

    o.daysOfWeekDisabled = this._resolveDaysOfWeek(o.daysOfWeekDisabled||[]);
    o.daysOfWeekHighlighted = this._resolveDaysOfWeek(o.daysOfWeekHighlighted||[]);

    o.datesDisabled = o.datesDisabled||[];
    if (!$.isArray(o.datesDisabled)) {
      o.datesDisabled = o.datesDisabled.split(',');
    }
    o.datesDisabled = $.map(o.datesDisabled, function(d){
      return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
    });

    var plc = String(o.orientation).toLowerCase().split(/\s+/g),
      _plc = o.orientation.toLowerCase();
    plc = $.grep(plc, function(word){
      return /^auto|left|right|top|bottom$/.test(word);
    });
    o.orientation = {x: 'auto', y: 'auto'};
    if (!_plc || _plc === 'auto')
      ; // no action
    else if (plc.length === 1){
      switch (plc[0]){
        case 'top':
        case 'bottom':
          o.orientation.y = plc[0];
          break;
        case 'left':
        case 'right':
          o.orientation.x = plc[0];
          break;
      }
    }
    else {
      _plc = $.grep(plc, function(word){
        return /^left|right$/.test(word);
      });
      o.orientation.x = _plc[0] || 'auto';

      _plc = $.grep(plc, function(word){
        return /^top|bottom$/.test(word);
      });
      o.orientation.y = _plc[0] || 'auto';
    }
    if (o.defaultViewDate instanceof Date || typeof o.defaultViewDate === 'string') {
      o.defaultViewDate = DPGlobal.parseDate(o.defaultViewDate, format, o.language, o.assumeNearbyYear);
    } else if (o.defaultViewDate) {
      var year = o.defaultViewDate.year || new Date().getFullYear();
      var month = o.defaultViewDate.month || 0;
      var day = o.defaultViewDate.day || 1;
      o.defaultViewDate = UTCDate(year, month, day);
    } else {
      o.defaultViewDate = UTCToday();
    }
  },
  _events: [],
  _secondaryEvents: [],
  _applyEvents: function(evs){
    for (var i=0, el, ch, ev; i < evs.length; i++){
      el = evs[i][0];
      if (evs[i].length === 2){
        ch = undefined;
        ev = evs[i][1];
      } else if (evs[i].length === 3){
        ch = evs[i][1];
        ev = evs[i][2];
      }
      el.on(ev, ch);
    }
  },
  _unapplyEvents: function(evs){
    for (var i=0, el, ev, ch; i < evs.length; i++){
      el = evs[i][0];
      if (evs[i].length === 2){
        ch = undefined;
        ev = evs[i][1];
      } else if (evs[i].length === 3){
        ch = evs[i][1];
        ev = evs[i][2];
      }
      el.off(ev, ch);
    }
  },
  _buildEvents: function(){
          var events = {
              keyup: $.proxy(function(e){
                  if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
                      this.update();
              }, this),
              keydown: $.proxy(this.keydown, this),
              paste: $.proxy(this.paste, this)
          };

          if (this.o.showOnFocus === true) {
              events.focus = $.proxy(this.show, this);
          }

          if (this.isInput) { // single input
              this._events = [
                  [this.element, events]
              ];
          }
          // component: input + button
          else if (this.component && this.inputField.length) {
              this._events = [
                  // For components that are not readonly, allow keyboard nav
                  [this.inputField, events],
                  [this.component, {
                      click: $.proxy(this.show, this)
                  }]
              ];
          }
    else {
      this._events = [
        [this.element, {
          click: $.proxy(this.show, this),
          keydown: $.proxy(this.keydown, this)
        }]
      ];
    }
    this._events.push(
      // Component: listen for blur on element descendants
      [this.element, '*', {
        blur: $.proxy(function(e){
          this._focused_from = e.target;
        }, this)
      }],
      // Input: listen for blur on element
      [this.element, {
        blur: $.proxy(function(e){
          this._focused_from = e.target;
        }, this)
      }]
    );

    if (this.o.immediateUpdates) {
      // Trigger input updates immediately on changed year/month
      this._events.push([this.element, {
        'changeYear changeMonth': $.proxy(function(e){
          this.update(e.date);
        }, this)
      }]);
    }

    this._secondaryEvents = [
      [this.picker, {
        click: $.proxy(this.click, this)
      }],
      [this.picker, '.prev, .next', {
        click: $.proxy(this.navArrowsClick, this)
      }],
      [this.picker, '.day:not(.disabled)', {
        click: $.proxy(this.dayCellClick, this)
      }],
      [$(window), {
        resize: $.proxy(this.place, this)
      }],
      [$(document), {
        'mousedown touchstart': $.proxy(function(e){
          // Clicked outside the datepicker, hide it
          if (!(
            this.element.is(e.target) ||
            this.element.find(e.target).length ||
            this.picker.is(e.target) ||
            this.picker.find(e.target).length ||
            this.isInline
          )){
            this.hide();
          }
        }, this)
      }]
    ];
  },
  _attachEvents: function(){
    this._detachEvents();
    this._applyEvents(this._events);
  },
  _detachEvents: function(){
    this._unapplyEvents(this._events);
  },
  _attachSecondaryEvents: function(){
    this._detachSecondaryEvents();
    this._applyEvents(this._secondaryEvents);
  },
  _detachSecondaryEvents: function(){
    this._unapplyEvents(this._secondaryEvents);
  },
  _trigger: function(event, altdate){
    var date = altdate || this.dates.get(-1),
      local_date = this._utc_to_local(date);

    this.element.trigger({
      type: event,
      date: local_date,
      viewMode: this.viewMode,
      dates: $.map(this.dates, this._utc_to_local),
      format: $.proxy(function(ix, format){
        if (arguments.length === 0){
          ix = this.dates.length - 1;
          format = this.o.format;
        } else if (typeof ix === 'string'){
          format = ix;
          ix = this.dates.length - 1;
        }
        format = format || this.o.format;
        var date = this.dates.get(ix);
        return DPGlobal.formatDate(date, format, this.o.language);
      }, this)
    });
  },

  show: function(){
    if (this.inputField.prop('disabled') || (this.inputField.prop('readonly') && this.o.enableOnReadonly === false))
      return;
    if (!this.isInline)
      this.picker.appendTo(this.o.container);
    this.place();
    this.picker.show();
    this._attachSecondaryEvents();
    this._trigger('show');
    if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
      $(this.element).blur();
    }
    return this;
  },

  hide: function(){
    if (this.isInline || !this.picker.is(':visible'))
      return this;
    this.focusDate = null;
    this.picker.hide().detach();
    this._detachSecondaryEvents();
    this.setViewMode(this.o.startView);

    if (this.o.forceParse && this.inputField.val())
      this.setValue();
    this._trigger('hide');
    return this;
  },

  destroy: function(){
    this.hide();
    this._detachEvents();
    this._detachSecondaryEvents();
    this.picker.remove();
    delete this.element.data().datepicker;
    if (!this.isInput){
      delete this.element.data().date;
    }
    return this;
  },

  paste: function(e){
    var dateString;
    if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.types
      && $.inArray('text/plain', e.originalEvent.clipboardData.types) !== -1) {
      dateString = e.originalEvent.clipboardData.getData('text/plain');
    } else if (window.clipboardData) {
      dateString = window.clipboardData.getData('Text');
    } else {
      return;
    }
    this.setDate(dateString);
    this.update();
    e.preventDefault();
  },

  _utc_to_local: function(utc){
    if (!utc) {
      return utc;
    }

    var local = new Date(utc.getTime() + (utc.getTimezoneOffset() * 60000));

    if (local.getTimezoneOffset() !== utc.getTimezoneOffset()) {
      local = new Date(utc.getTime() + (local.getTimezoneOffset() * 60000));
    }

    return local;
  },
  _local_to_utc: function(local){
    return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
  },
  _zero_time: function(local){
    return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
  },
  _zero_utc_time: function(utc){
    return utc && UTCDate(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate());
  },

  getDates: function(){
    return $.map(this.dates, this._utc_to_local);
  },

  getUTCDates: function(){
    return $.map(this.dates, function(d){
      return new Date(d);
    });
  },

  getDate: function(){
    return this._utc_to_local(this.getUTCDate());
  },

  getUTCDate: function(){
    var selected_date = this.dates.get(-1);
    if (selected_date !== undefined) {
      return new Date(selected_date);
    } else {
      return null;
    }
  },

  clearDates: function(){
    this.inputField.val('');
    this.update();
    this._trigger('changeDate');

    if (this.o.autoclose) {
      this.hide();
    }
  },

  setDates: function(){
    var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
    this.update.apply(this, args);
    this._trigger('changeDate');
    this.setValue();
    return this;
  },

  setUTCDates: function(){
    var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
    this.setDates.apply(this, $.map(args, this._utc_to_local));
    return this;
  },

  setDate: alias('setDates'),
  setUTCDate: alias('setUTCDates'),
  remove: alias('destroy', 'Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead'),

  setValue: function(){
    var formatted = this.getFormattedDate();
    this.inputField.val(formatted);
    return this;
  },

  getFormattedDate: function(format){
    if (format === undefined)
      format = this.o.format;

    var lang = this.o.language;
    return $.map(this.dates, function(d){
      return DPGlobal.formatDate(d, format, lang);
    }).join(this.o.multidateSeparator);
  },

  getStartDate: function(){
    return this.o.startDate;
  },

  setStartDate: function(startDate){
    this._process_options({startDate: startDate});
    this.update();
    this.updateNavArrows();
    return this;
  },

  getEndDate: function(){
    return this.o.endDate;
  },

  setEndDate: function(endDate){
    this._process_options({endDate: endDate});
    this.update();
    this.updateNavArrows();
    return this;
  },

  setDaysOfWeekDisabled: function(daysOfWeekDisabled){
    this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
    this.update();
    return this;
  },

  setDaysOfWeekHighlighted: function(daysOfWeekHighlighted){
    this._process_options({daysOfWeekHighlighted: daysOfWeekHighlighted});
    this.update();
    return this;
  },

  setDatesDisabled: function(datesDisabled){
    this._process_options({datesDisabled: datesDisabled});
    this.update();
    return this;
  },

  place: function(){
    if (this.isInline)
      return this;
    var calendarWidth = this.picker.outerWidth(),
      calendarHeight = this.picker.outerHeight(),
      visualPadding = 10,
      container = $(this.o.container),
      windowWidth = container.width(),
      scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop(),
      appendOffset = container.offset();

    var parentsZindex = [0];
    this.element.parents().each(function(){
      var itemZIndex = $(this).css('z-index');
      if (itemZIndex !== 'auto' && Number(itemZIndex) !== 0) parentsZindex.push(Number(itemZIndex));
    });
    var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
    var offset = this.component ? this.component.parent().offset() : this.element.offset();
    var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
    var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
    var left = offset.left - appendOffset.left;
    var top = offset.top - appendOffset.top;

    if (this.o.container !== 'body') {
      top += scrollTop;
    }

    this.picker.removeClass(
      'datepicker-orient-top datepicker-orient-bottom '+
      'datepicker-orient-right datepicker-orient-left'
    );

    if (this.o.orientation.x !== 'auto'){
      this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
      if (this.o.orientation.x === 'right')
        left -= calendarWidth - width;
    }
    // auto x orientation is best-placement: if it crosses a window
    // edge, fudge it sideways
    else {
      if (offset.left < 0) {
        // component is outside the window on the left side. Move it into visible range
        this.picker.addClass('datepicker-orient-left');
        left -= offset.left - visualPadding;
      } else if (left + calendarWidth > windowWidth) {
        // the calendar passes the widow right edge. Align it to component right side
        this.picker.addClass('datepicker-orient-right');
        left += width - calendarWidth;
      } else {
        if (this.o.rtl) {
          // Default to right
          this.picker.addClass('datepicker-orient-right');
        } else {
          // Default to left
          this.picker.addClass('datepicker-orient-left');
        }
      }
    }

    // auto y orientation is best-situation: top or bottom, no fudging,
    // decision based on which shows more of the calendar
    var yorient = this.o.orientation.y,
      top_overflow;
    if (yorient === 'auto'){
      top_overflow = -scrollTop + top - calendarHeight;
      yorient = top_overflow < 0 ? 'bottom' : 'top';
    }

    this.picker.addClass('datepicker-orient-' + yorient);
    if (yorient === 'top')
      top -= calendarHeight + parseInt(this.picker.css('padding-top'));
    else
      top += height;

    if (this.o.rtl) {
      var right = windowWidth - (left + width);
      this.picker.css({
        top: top,
        right: right,
        zIndex: zIndex
      });
    } else {
      this.picker.css({
        top: top,
        left: left,
        zIndex: zIndex
      });
    }
    return this;
  },

  _allow_update: true,
  update: function(){
    if (!this._allow_update)
      return this;

    var oldDates = this.dates.copy(),
      dates = [],
      fromArgs = false;
    if (arguments.length){
      $.each(arguments, $.proxy(function(i, date){
        if (date instanceof Date)
          date = this._local_to_utc(date);
        dates.push(date);
      }, this));
      fromArgs = true;
    } else {
      dates = this.isInput
          ? this.element.val()
          : this.element.data('date') || this.inputField.val();
      if (dates && this.o.multidate)
        dates = dates.split(this.o.multidateSeparator);
      else
        dates = [dates];
      delete this.element.data().date;
    }

    dates = $.map(dates, $.proxy(function(date){
      return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
    }, this));
    dates = $.grep(dates, $.proxy(function(date){
      return (
        !this.dateWithinRange(date) ||
        !date
      );
    }, this), true);
    this.dates.replace(dates);

    if (this.o.updateViewDate) {
      if (this.dates.length)
        this.viewDate = new Date(this.dates.get(-1));
      else if (this.viewDate < this.o.startDate)
        this.viewDate = new Date(this.o.startDate);
      else if (this.viewDate > this.o.endDate)
        this.viewDate = new Date(this.o.endDate);
      else
        this.viewDate = this.o.defaultViewDate;
    }

    if (fromArgs){
      // setting date by clicking
      this.setValue();
      this.element.change();
    }
    else if (this.dates.length){
      // setting date by typing
      if (String(oldDates) !== String(this.dates) && fromArgs) {
        this._trigger('changeDate');
        this.element.change();
      }
    }
    if (!this.dates.length && oldDates.length) {
      this._trigger('clearDate');
      this.element.change();
    }

    this.fill();
    return this;
  },

  fillDow: function(){
    if (this.o.showWeekDays) {
    var dowCnt = this.o.weekStart,
      html = '<tr>';
    if (this.o.calendarWeeks){
      html += '<th class="cw">&#160;</th>';
    }
    while (dowCnt < this.o.weekStart + 7){
      html += '<th class="dow';
      if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) !== -1)
        html += ' disabled';
      html += '">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
    }
    html += '</tr>';
    this.picker.find('.datepicker-days thead').append(html);
    }
  },

  fillMonths: function(){
    var localDate = this._utc_to_local(this.viewDate);
    var html = '';
    var focused;
    for (var i = 0; i < 12; i++){
      focused = localDate && localDate.getMonth() === i ? ' focused' : '';
      html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i] + '</span>';
    }
    this.picker.find('.datepicker-months td').html(html);
  },

  setRange: function(range){
    if (!range || !range.length)
      delete this.range;
    else
      this.range = $.map(range, function(d){
        return d.valueOf();
      });
    this.fill();
  },

  getClassNames: function(date){
    var cls = [],
      year = this.viewDate.getUTCFullYear(),
      month = this.viewDate.getUTCMonth(),
      today = UTCToday();
    if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
      cls.push('old');
    } else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
      cls.push('new');
    }
    if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
      cls.push('focused');
    // Compare internal UTC date with UTC today, not local today
    if (this.o.todayHighlight && isUTCEquals(date, today)) {
      cls.push('today');
    }
    if (this.dates.contains(date) !== -1)
      cls.push('active');
    if (!this.dateWithinRange(date)){
      cls.push('disabled');
    }
    if (this.dateIsDisabled(date)){
      cls.push('disabled', 'disabled-date');
    }
    if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1){
      cls.push('highlighted');
    }

    if (this.range){
      if (date > this.range[0] && date < this.range[this.range.length-1]){
        cls.push('range');
      }
      if ($.inArray(date.valueOf(), this.range) !== -1){
        cls.push('selected');
      }
      if (date.valueOf() === this.range[0]){
        cls.push('range-start');
      }
      if (date.valueOf() === this.range[this.range.length-1]){
        cls.push('range-end');
      }
    }
    return cls;
  },

  _fill_yearsView: function(selector, cssClass, factor, year, startYear, endYear, beforeFn){
    var html = '';
    var step = factor / 10;
    var view = this.picker.find(selector);
    var startVal = Math.floor(year / factor) * factor;
    var endVal = startVal + step * 9;
    var focusedVal = Math.floor(this.viewDate.getFullYear() / step) * step;
    var selected = $.map(this.dates, function(d){
      return Math.floor(d.getUTCFullYear() / step) * step;
    });

    var classes, tooltip, before;
    for (var currVal = startVal - step; currVal <= endVal + step; currVal += step) {
      classes = [cssClass];
      tooltip = null;

      if (currVal === startVal - step) {
        classes.push('old');
      } else if (currVal === endVal + step) {
        classes.push('new');
      }
      if ($.inArray(currVal, selected) !== -1) {
        classes.push('active');
      }
      if (currVal < startYear || currVal > endYear) {
        classes.push('disabled');
      }
      if (currVal === focusedVal) {
        classes.push('focused');
      }

      if (beforeFn !== $.noop) {
        before = beforeFn(new Date(currVal, 0, 1));
        if (before === undefined) {
          before = {};
        } else if (typeof before === 'boolean') {
          before = {enabled: before};
        } else if (typeof before === 'string') {
          before = {classes: before};
        }
        if (before.enabled === false) {
          classes.push('disabled');
        }
        if (before.classes) {
          classes = classes.concat(before.classes.split(/\s+/));
        }
        if (before.tooltip) {
          tooltip = before.tooltip;
        }
      }

      html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + currVal + '</span>';
    }

    view.find('.datepicker-switch').text(startVal + '-' + endVal);
    view.find('td').html(html);
  },

  fill: function(){
    var d = new Date(this.viewDate),
      year = d.getUTCFullYear(),
      month = d.getUTCMonth(),
      startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
      startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
      endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
      endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
      todaytxt = dates[this.o.language].today || dates['en'].today || '',
      cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
      titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat,
      tooltip,
      before;
    if (isNaN(year) || isNaN(month))
      return;
    this.picker.find('.datepicker-days .datepicker-switch')
          .text(DPGlobal.formatDate(d, titleFormat, this.o.language));
    this.picker.find('tfoot .today')
          .text(todaytxt)
          .css('display', this.o.todayBtn === true || this.o.todayBtn === 'linked' ? 'table-cell' : 'none');
    this.picker.find('tfoot .clear')
          .text(cleartxt)
          .css('display', this.o.clearBtn === true ? 'table-cell' : 'none');
    this.picker.find('thead .datepicker-title')
          .text(this.o.title)
          .css('display', typeof this.o.title === 'string' && this.o.title !== '' ? 'table-cell' : 'none');
    this.updateNavArrows();
    this.fillMonths();
    var prevMonth = UTCDate(year, month, 0),
      day = prevMonth.getUTCDate();
    prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
    var nextMonth = new Date(prevMonth);
    if (prevMonth.getUTCFullYear() < 100){
      nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
    }
    nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
    nextMonth = nextMonth.valueOf();
    var html = [];
    var weekDay, clsName;
    while (prevMonth.valueOf() < nextMonth){
      weekDay = prevMonth.getUTCDay();
      if (weekDay === this.o.weekStart){
        html.push('<tr>');
        if (this.o.calendarWeeks){
          // ISO 8601: First week contains first thursday.
          // ISO also states week starts on Monday, but we can be more abstract here.
          var
            // Start of current week: based on weekstart/current date
            ws = new Date(+prevMonth + (this.o.weekStart - weekDay - 7) % 7 * 864e5),
            // Thursday of this week
            th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
            // First Thursday of year, year from thursday
            yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay()) % 7 * 864e5),
            // Calendar week: ms between thursdays, div ms per day, div 7 days
            calWeek = (th - yth) / 864e5 / 7 + 1;
          html.push('<td class="cw">'+ calWeek +'</td>');
        }
      }
      clsName = this.getClassNames(prevMonth);
      clsName.push('day');

      var content = prevMonth.getUTCDate();

      if (this.o.beforeShowDay !== $.noop){
        before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
        if (before === undefined)
          before = {};
        else if (typeof before === 'boolean')
          before = {enabled: before};
        else if (typeof before === 'string')
          before = {classes: before};
        if (before.enabled === false)
          clsName.push('disabled');
        if (before.classes)
          clsName = clsName.concat(before.classes.split(/\s+/));
        if (before.tooltip)
          tooltip = before.tooltip;
        if (before.content)
          content = before.content;
      }

      //Check if uniqueSort exists (supported by jquery >=1.12 and >=2.2)
      //Fallback to unique function for older jquery versions
      if ($.isFunction($.uniqueSort)) {
        clsName = $.uniqueSort(clsName);
      } else {
        clsName = $.unique(clsName);
      }

      html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + ' data-date="' + prevMonth.getTime().toString() + '">' + content + '</td>');
      tooltip = null;
      if (weekDay === this.o.weekEnd){
        html.push('</tr>');
      }
      prevMonth.setUTCDate(prevMonth.getUTCDate() + 1);
    }
    this.picker.find('.datepicker-days tbody').html(html.join(''));

    var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';
    var months = this.picker.find('.datepicker-months')
          .find('.datepicker-switch')
            .text(this.o.maxViewMode < 2 ? monthsTitle : year)
            .end()
          .find('tbody span').removeClass('active');

    $.each(this.dates, function(i, d){
      if (d.getUTCFullYear() === year)
        months.eq(d.getUTCMonth()).addClass('active');
    });

    if (year < startYear || year > endYear){
      months.addClass('disabled');
    }
    if (year === startYear){
      months.slice(0, startMonth).addClass('disabled');
    }
    if (year === endYear){
      months.slice(endMonth+1).addClass('disabled');
    }

    if (this.o.beforeShowMonth !== $.noop){
      var that = this;
      $.each(months, function(i, month){
        var moDate = new Date(year, i, 1);
        var before = that.o.beforeShowMonth(moDate);
        if (before === undefined)
          before = {};
        else if (typeof before === 'boolean')
          before = {enabled: before};
        else if (typeof before === 'string')
          before = {classes: before};
        if (before.enabled === false && !$(month).hasClass('disabled'))
            $(month).addClass('disabled');
        if (before.classes)
            $(month).addClass(before.classes);
        if (before.tooltip)
            $(month).prop('title', before.tooltip);
      });
    }

    // Generating decade/years picker
    this._fill_yearsView(
      '.datepicker-years',
      'year',
      10,
      year,
      startYear,
      endYear,
      this.o.beforeShowYear
    );

    // Generating century/decades picker
    this._fill_yearsView(
      '.datepicker-decades',
      'decade',
      100,
      year,
      startYear,
      endYear,
      this.o.beforeShowDecade
    );

    // Generating millennium/centuries picker
    this._fill_yearsView(
      '.datepicker-centuries',
      'century',
      1000,
      year,
      startYear,
      endYear,
      this.o.beforeShowCentury
    );
  },

  updateNavArrows: function(){
    if (!this._allow_update)
      return;

    var d = new Date(this.viewDate),
      year = d.getUTCFullYear(),
      month = d.getUTCMonth(),
      startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
      startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
      endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
      endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
      prevIsDisabled,
      nextIsDisabled,
      factor = 1;
    switch (this.viewMode){
      case 4:
        factor *= 10;
        /* falls through */
      case 3:
        factor *= 10;
        /* falls through */
      case 2:
        factor *= 10;
        /* falls through */
      case 1:
        prevIsDisabled = Math.floor(year / factor) * factor < startYear;
        nextIsDisabled = Math.floor(year / factor) * factor + factor > endYear;
        break;
      case 0:
        prevIsDisabled = year <= startYear && month < startMonth;
        nextIsDisabled = year >= endYear && month > endMonth;
        break;
    }

    this.picker.find('.prev').toggleClass('disabled', prevIsDisabled);
    this.picker.find('.next').toggleClass('disabled', nextIsDisabled);
  },

  click: function(e){
    e.preventDefault();
    e.stopPropagation();

    var target, dir, day, year, month;
    target = $(e.target);

    // Clicked on the switch
    if (target.hasClass('datepicker-switch') && this.viewMode !== this.o.maxViewMode){
      this.setViewMode(this.viewMode + 1);
    }

    // Clicked on today button
    if (target.hasClass('today') && !target.hasClass('day')){
      this.setViewMode(0);
      this._setDate(UTCToday(), this.o.todayBtn === 'linked' ? null : 'view');
    }

    // Clicked on clear button
    if (target.hasClass('clear')){
      this.clearDates();
    }

    if (!target.hasClass('disabled')){
      // Clicked on a month, year, decade, century
      if (target.hasClass('month')
          || target.hasClass('year')
          || target.hasClass('decade')
          || target.hasClass('century')) {
        this.viewDate.setUTCDate(1);

        day = 1;
        if (this.viewMode === 1){
          month = target.parent().find('span').index(target);
          year = this.viewDate.getUTCFullYear();
          this.viewDate.setUTCMonth(month);
        } else {
          month = 0;
          year = Number(target.text());
          this.viewDate.setUTCFullYear(year);
        }

        this._trigger(DPGlobal.viewModes[this.viewMode - 1].e, this.viewDate);

        if (this.viewMode === this.o.minViewMode){
          this._setDate(UTCDate(year, month, day));
        } else {
          this.setViewMode(this.viewMode - 1);
          this.fill();
        }
      }
    }

    if (this.picker.is(':visible') && this._focused_from){
      this._focused_from.focus();
    }
    delete this._focused_from;
  },

  dayCellClick: function(e){
    var $target = $(e.currentTarget);
    var timestamp = $target.data('date');
    var date = new Date(timestamp);

    if (this.o.updateViewDate) {
      if (date.getUTCFullYear() !== this.viewDate.getUTCFullYear()) {
        this._trigger('changeYear', this.viewDate);
      }

      if (date.getUTCMonth() !== this.viewDate.getUTCMonth()) {
        this._trigger('changeMonth', this.viewDate);
      }
    }
    this._setDate(date);
  },

  // Clicked on prev or next
  navArrowsClick: function(e){
    var $target = $(e.currentTarget);
    var dir = $target.hasClass('prev') ? -1 : 1;
    if (this.viewMode !== 0){
      dir *= DPGlobal.viewModes[this.viewMode].navStep * 12;
    }
    this.viewDate = this.moveMonth(this.viewDate, dir);
    this._trigger(DPGlobal.viewModes[this.viewMode].e, this.viewDate);
    this.fill();
  },

  _toggle_multidate: function(date){
    var ix = this.dates.contains(date);
    if (!date){
      this.dates.clear();
    }

    if (ix !== -1){
      if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive){
        this.dates.remove(ix);
      }
    } else if (this.o.multidate === false) {
      this.dates.clear();
      this.dates.push(date);
    }
    else {
      this.dates.push(date);
    }

    if (typeof this.o.multidate === 'number')
      while (this.dates.length > this.o.multidate)
        this.dates.remove(0);
  },

  _setDate: function(date, which){
    if (!which || which === 'date')
      this._toggle_multidate(date && new Date(date));
    if ((!which && this.o.updateViewDate) || which === 'view')
      this.viewDate = date && new Date(date);

    this.fill();
    this.setValue();
    if (!which || which !== 'view') {
      this._trigger('changeDate');
    }
    this.inputField.trigger('change');
    if (this.o.autoclose && (!which || which === 'date')){
      this.hide();
    }
  },

  moveDay: function(date, dir){
    var newDate = new Date(date);
    newDate.setUTCDate(date.getUTCDate() + dir);

    return newDate;
  },

  moveWeek: function(date, dir){
    return this.moveDay(date, dir * 7);
  },

  moveMonth: function(date, dir){
    if (!isValidDate(date))
      return this.o.defaultViewDate;
    if (!dir)
      return date;
    var new_date = new Date(date.valueOf()),
      day = new_date.getUTCDate(),
      month = new_date.getUTCMonth(),
      mag = Math.abs(dir),
      new_month, test;
    dir = dir > 0 ? 1 : -1;
    if (mag === 1){
      test = dir === -1
        // If going back one month, make sure month is not current month
        // (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
        ? function(){
          return new_date.getUTCMonth() === month;
        }
        // If going forward one month, make sure month is as expected
        // (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
        : function(){
          return new_date.getUTCMonth() !== new_month;
        };
      new_month = month + dir;
      new_date.setUTCMonth(new_month);
      // Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
      new_month = (new_month + 12) % 12;
    }
    else {
      // For magnitudes >1, move one month at a time...
      for (var i=0; i < mag; i++)
        // ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
        new_date = this.moveMonth(new_date, dir);
      // ...then reset the day, keeping it in the new month
      new_month = new_date.getUTCMonth();
      new_date.setUTCDate(day);
      test = function(){
        return new_month !== new_date.getUTCMonth();
      };
    }
    // Common date-resetting loop -- if date is beyond end of month, make it
    // end of month
    while (test()){
      new_date.setUTCDate(--day);
      new_date.setUTCMonth(new_month);
    }
    return new_date;
  },

  moveYear: function(date, dir){
    return this.moveMonth(date, dir*12);
  },

  moveAvailableDate: function(date, dir, fn){
    do {
      date = this[fn](date, dir);

      if (!this.dateWithinRange(date))
        return false;

      fn = 'moveDay';
    }
    while (this.dateIsDisabled(date));

    return date;
  },

  weekOfDateIsDisabled: function(date){
    return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
  },

  dateIsDisabled: function(date){
    return (
      this.weekOfDateIsDisabled(date) ||
      $.grep(this.o.datesDisabled, function(d){
        return isUTCEquals(date, d);
      }).length > 0
    );
  },

  dateWithinRange: function(date){
    return date >= this.o.startDate && date <= this.o.endDate;
  },

  keydown: function(e){
    if (!this.picker.is(':visible')){
      if (e.keyCode === 40 || e.keyCode === 27) { // allow down to re-show picker
        this.show();
        e.stopPropagation();
      }
      return;
    }
    var dateChanged = false,
      dir, newViewDate,
      focusDate = this.focusDate || this.viewDate;
    switch (e.keyCode){
      case 27: // escape
        if (this.focusDate){
          this.focusDate = null;
          this.viewDate = this.dates.get(-1) || this.viewDate;
          this.fill();
        }
        else
          this.hide();
        e.preventDefault();
        e.stopPropagation();
        break;
      case 37: // left
      case 38: // up
      case 39: // right
      case 40: // down
        if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7)
          break;
        dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
        if (this.viewMode === 0) {
          if (e.ctrlKey){
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');

            if (newViewDate)
              this._trigger('changeYear', this.viewDate);
          } else if (e.shiftKey){
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');

            if (newViewDate)
              this._trigger('changeMonth', this.viewDate);
          } else if (e.keyCode === 37 || e.keyCode === 39){
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');
          } else if (!this.weekOfDateIsDisabled(focusDate)){
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');
          }
        } else if (this.viewMode === 1) {
          if (e.keyCode === 38 || e.keyCode === 40) {
            dir = dir * 4;
          }
          newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
        } else if (this.viewMode === 2) {
          if (e.keyCode === 38 || e.keyCode === 40) {
            dir = dir * 4;
          }
          newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
        }
        if (newViewDate){
          this.focusDate = this.viewDate = newViewDate;
          this.setValue();
          this.fill();
          e.preventDefault();
        }
        break;
      case 13: // enter
        if (!this.o.forceParse)
          break;
        focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
        if (this.o.keyboardNavigation) {
          this._toggle_multidate(focusDate);
          dateChanged = true;
        }
        this.focusDate = null;
        this.viewDate = this.dates.get(-1) || this.viewDate;
        this.setValue();
        this.fill();
        if (this.picker.is(':visible')){
          e.preventDefault();
          e.stopPropagation();
          if (this.o.autoclose)
            this.hide();
        }
        break;
      case 9: // tab
        this.focusDate = null;
        this.viewDate = this.dates.get(-1) || this.viewDate;
        this.fill();
        this.hide();
        break;
    }
    if (dateChanged){
      if (this.dates.length)
        this._trigger('changeDate');
      else
        this._trigger('clearDate');
      this.inputField.trigger('change');
    }
  },

  setViewMode: function(viewMode){
    this.viewMode = viewMode;
    this.picker
      .children('div')
      .hide()
      .filter('.datepicker-' + DPGlobal.viewModes[this.viewMode].clsName)
        .show();
    this.updateNavArrows();
    this._trigger('changeViewMode', new Date(this.viewDate));
  }
};

var DateRangePicker = function(element, options){
  $.data(element, 'datepicker', this);
  this.element = $(element);
  this.inputs = $.map(options.inputs, function(i){
    return i.jquery ? i[0] : i;
  });
  delete options.inputs;

  this.keepEmptyValues = options.keepEmptyValues;
  delete options.keepEmptyValues;

  datepickerPlugin.call($(this.inputs), options)
    .on('changeDate', $.proxy(this.dateUpdated, this));

  this.pickers = $.map(this.inputs, function(i){
    return $.data(i, 'datepicker');
  });
  this.updateDates();
};
DateRangePicker.prototype = {
  updateDates: function(){
    this.dates = $.map(this.pickers, function(i){
      return i.getUTCDate();
    });
    this.updateRanges();
  },
  updateRanges: function(){
    var range = $.map(this.dates, function(d){
      return d.valueOf();
    });
    $.each(this.pickers, function(i, p){
      p.setRange(range);
    });
  },
  clearDates: function(){
    $.each(this.pickers, function(i, p){
      p.clearDates();
    });
  },
  dateUpdated: function(e){
    // `this.updating` is a workaround for preventing infinite recursion
    // between `changeDate` triggering and `setUTCDate` calling.  Until
    // there is a better mechanism.
    if (this.updating)
      return;
    this.updating = true;

    var dp = $.data(e.target, 'datepicker');

    if (dp === undefined) {
      return;
    }

    var new_date = dp.getUTCDate(),
      keep_empty_values = this.keepEmptyValues,
      i = $.inArray(e.target, this.inputs),
      j = i - 1,
      k = i + 1,
      l = this.inputs.length;
    if (i === -1)
      return;

    $.each(this.pickers, function(i, p){
      if (!p.getUTCDate() && (p === dp || !keep_empty_values))
        p.setUTCDate(new_date);
    });

    if (new_date < this.dates[j]){
      // Date being moved earlier/left
      while (j >= 0 && new_date < this.dates[j]){
        this.pickers[j--].setUTCDate(new_date);
      }
    } else if (new_date > this.dates[k]){
      // Date being moved later/right
      while (k < l && new_date > this.dates[k]){
        this.pickers[k++].setUTCDate(new_date);
      }
    }
    this.updateDates();

    delete this.updating;
  },
  destroy: function(){
    $.map(this.pickers, function(p){ p.destroy(); });
    $(this.inputs).off('changeDate', this.dateUpdated);
    delete this.element.data().datepicker;
  },
  remove: alias('destroy', 'Method `remove` is deprecated and will be removed in version 2.0. Use `destroy` instead')
};

function opts_from_el(el, prefix){
  // Derive options from element data-attrs
  var data = $(el).data(),
    out = {}, inkey,
    replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
  prefix = new RegExp('^' + prefix.toLowerCase());
  function re_lower(_,a){
    return a.toLowerCase();
  }
  for (var key in data)
    if (prefix.test(key)){
      inkey = key.replace(replace, re_lower);
      out[inkey] = data[key];
    }
  return out;
}

function opts_from_locale(lang){
  // Derive options from locale plugins
  var out = {};
  // Check if "de-DE" style date is available, if not language should
  // fallback to 2 letter code eg "de"
  if (!dates[lang]){
    lang = lang.split('-')[0];
    if (!dates[lang])
      return;
  }
  var d = dates[lang];
  $.each(locale_opts, function(i,k){
    if (k in d)
      out[k] = d[k];
  });
  return out;
}

var old = $.fn.datepicker;
var datepickerPlugin = function(option){
  var args = Array.apply(null, arguments);
  args.shift();
  var internal_return;
  this.each(function(){
    var $this = $(this),
      data = $this.data('datepicker'),
      options = typeof option === 'object' && option;
    if (!data){
      var elopts = opts_from_el(this, 'date'),
        // Preliminary otions
        xopts = $.extend({}, defaults, elopts, options),
        locopts = opts_from_locale(xopts.language),
        // Options priority: js args, data-attrs, locales, defaults
        opts = $.extend({}, defaults, locopts, elopts, options);
      if ($this.hasClass('input-daterange') || opts.inputs){
        $.extend(opts, {
          inputs: opts.inputs || $this.find('input').toArray()
        });
        data = new DateRangePicker(this, opts);
      }
      else {
        data = new Datepicker(this, opts);
      }
      $this.data('datepicker', data);
    }
    if (typeof option === 'string' && typeof data[option] === 'function'){
      internal_return = data[option].apply(data, args);
    }
  });

  if (
    internal_return === undefined ||
    internal_return instanceof Datepicker ||
    internal_return instanceof DateRangePicker
  )
    return this;

  if (this.length > 1)
    throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');
  else
    return internal_return;
};
$.fn.datepicker = datepickerPlugin;

var defaults = $.fn.datepicker.defaults = {
  assumeNearbyYear: false,
  autoclose: false,
  beforeShowDay: $.noop,
  beforeShowMonth: $.noop,
  beforeShowYear: $.noop,
  beforeShowDecade: $.noop,
  beforeShowCentury: $.noop,
  calendarWeeks: false,
  clearBtn: false,
  toggleActive: false,
  daysOfWeekDisabled: [],
  daysOfWeekHighlighted: [],
  datesDisabled: [],
  endDate: Infinity,
  forceParse: true,
  format: 'mm/dd/yyyy',
  keepEmptyValues: false,
  keyboardNavigation: true,
  language: 'en',
  minViewMode: 0,
  maxViewMode: 4,
  multidate: false,
  multidateSeparator: ',',
  orientation: "auto",
  rtl: false,
  startDate: -Infinity,
  startView: 0,
  todayBtn: false,
  todayHighlight: false,
  updateViewDate: true,
  weekStart: 0,
  disableTouchKeyboard: false,
  enableOnReadonly: true,
  showOnFocus: true,
  zIndexOffset: 10,
  container: 'body',
  immediateUpdates: false,
  title: '',
  templates: {
    leftArrow: '&#x00AB;',
    rightArrow: '&#x00BB;'
  },
  showWeekDays: true
};
var locale_opts = $.fn.datepicker.locale_opts = [
  'format',
  'rtl',
  'weekStart'
];
$.fn.datepicker.Constructor = Datepicker;
var dates = $.fn.datepicker.dates = {
  en: {
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    today: "Today",
    clear: "Clear",
    titleFormat: "MM yyyy"
  }
};

var DPGlobal = {
  viewModes: [
    {
      names: ['days', 'month'],
      clsName: 'days',
      e: 'changeMonth'
    },
    {
      names: ['months', 'year'],
      clsName: 'months',
      e: 'changeYear',
      navStep: 1
    },
    {
      names: ['years', 'decade'],
      clsName: 'years',
      e: 'changeDecade',
      navStep: 10
    },
    {
      names: ['decades', 'century'],
      clsName: 'decades',
      e: 'changeCentury',
      navStep: 100
    },
    {
      names: ['centuries', 'millennium'],
      clsName: 'centuries',
      e: 'changeMillennium',
      navStep: 1000
    }
  ],
  validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
  nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
  parseFormat: function(format){
    if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')
              return format;
          // IE treats \0 as a string end in inputs (truncating the value),
    // so it's a bad format delimiter, anyway
    var separators = format.replace(this.validParts, '\0').split('\0'),
      parts = format.match(this.validParts);
    if (!separators || !separators.length || !parts || parts.length === 0){
      throw new Error("Invalid date format.");
    }
    return {separators: separators, parts: parts};
  },
  parseDate: function(date, format, language, assumeNearby){
    if (!date)
      return undefined;
    if (date instanceof Date)
      return date;
    if (typeof format === 'string')
      format = DPGlobal.parseFormat(format);
    if (format.toValue)
      return format.toValue(date, format, language);
    var fn_map = {
        d: 'moveDay',
        m: 'moveMonth',
        w: 'moveWeek',
        y: 'moveYear'
      },
      dateAliases = {
        yesterday: '-1d',
        today: '+0d',
        tomorrow: '+1d'
      },
      parts, part, dir, i, fn;
    if (date in dateAliases){
      date = dateAliases[date];
    }
    if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/i.test(date)){
      parts = date.match(/([\-+]\d+)([dmwy])/gi);
      date = new Date();
      for (i=0; i < parts.length; i++){
        part = parts[i].match(/([\-+]\d+)([dmwy])/i);
        dir = Number(part[1]);
        fn = fn_map[part[2].toLowerCase()];
        date = Datepicker.prototype[fn](date, dir);
      }
      return Datepicker.prototype._zero_utc_time(date);
    }

    parts = date && date.match(this.nonpunctuation) || [];

    function applyNearbyYear(year, threshold){
      if (threshold === true)
        threshold = 10;

      // if year is 2 digits or less, than the user most likely is trying to get a recent century
      if (year < 100){
        year += 2000;
        // if the new year is more than threshold years in advance, use last century
        if (year > ((new Date()).getFullYear()+threshold)){
          year -= 100;
        }
      }

      return year;
    }

    var parsed = {},
      setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
      setters_map = {
        yyyy: function(d,v){
          return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
        },
        m: function(d,v){
          if (isNaN(d))
            return d;
          v -= 1;
          while (v < 0) v += 12;
          v %= 12;
          d.setUTCMonth(v);
          while (d.getUTCMonth() !== v)
            d.setUTCDate(d.getUTCDate()-1);
          return d;
        },
        d: function(d,v){
          return d.setUTCDate(v);
        }
      },
      val, filtered;
    setters_map['yy'] = setters_map['yyyy'];
    setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
    setters_map['dd'] = setters_map['d'];
    date = UTCToday();
    var fparts = format.parts.slice();
    // Remove noop parts
    if (parts.length !== fparts.length){
      fparts = $(fparts).filter(function(i,p){
        return $.inArray(p, setters_order) !== -1;
      }).toArray();
    }
    // Process remainder
    function match_part(){
      var m = this.slice(0, parts[i].length),
        p = parts[i].slice(0, m.length);
      return m.toLowerCase() === p.toLowerCase();
    }
    if (parts.length === fparts.length){
      var cnt;
      for (i=0, cnt = fparts.length; i < cnt; i++){
        val = parseInt(parts[i], 10);
        part = fparts[i];
        if (isNaN(val)){
          switch (part){
            case 'MM':
              filtered = $(dates[language].months).filter(match_part);
              val = $.inArray(filtered[0], dates[language].months) + 1;
              break;
            case 'M':
              filtered = $(dates[language].monthsShort).filter(match_part);
              val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
              break;
          }
        }
        parsed[part] = val;
      }
      var _date, s;
      for (i=0; i < setters_order.length; i++){
        s = setters_order[i];
        if (s in parsed && !isNaN(parsed[s])){
          _date = new Date(date);
          setters_map[s](_date, parsed[s]);
          if (!isNaN(_date))
            date = _date;
        }
      }
    }
    return date;
  },
  formatDate: function(date, format, language){
    if (!date)
      return '';
    if (typeof format === 'string')
      format = DPGlobal.parseFormat(format);
    if (format.toDisplay)
              return format.toDisplay(date, format, language);
          var val = {
      d: date.getUTCDate(),
      D: dates[language].daysShort[date.getUTCDay()],
      DD: dates[language].days[date.getUTCDay()],
      m: date.getUTCMonth() + 1,
      M: dates[language].monthsShort[date.getUTCMonth()],
      MM: dates[language].months[date.getUTCMonth()],
      yy: date.getUTCFullYear().toString().substring(2),
      yyyy: date.getUTCFullYear()
    };
    val.dd = (val.d < 10 ? '0' : '') + val.d;
    val.mm = (val.m < 10 ? '0' : '') + val.m;
    date = [];
    var seps = $.extend([], format.separators);
    for (var i=0, cnt = format.parts.length; i <= cnt; i++){
      if (seps.length)
        date.push(seps.shift());
      date.push(val[format.parts[i]]);
    }
    return date.join('');
  },
  headTemplate: '<thead>'+
                  '<tr>'+
                    '<th colspan="7" class="datepicker-title"></th>'+
                  '</tr>'+
            '<tr>'+
              '<th class="prev">'+defaults.templates.leftArrow+'</th>'+
              '<th colspan="5" class="datepicker-switch"></th>'+
              '<th class="next">'+defaults.templates.rightArrow+'</th>'+
            '</tr>'+
          '</thead>',
  contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
  footTemplate: '<tfoot>'+
            '<tr>'+
              '<th colspan="7" class="today"></th>'+
            '</tr>'+
            '<tr>'+
              '<th colspan="7" class="clear"></th>'+
            '</tr>'+
          '</tfoot>'
};
DPGlobal.template = '<div class="datepicker">'+
            '<div class="datepicker-days">'+
              '<table class="table-condensed">'+
                DPGlobal.headTemplate+
                '<tbody></tbody>'+
                DPGlobal.footTemplate+
              '</table>'+
            '</div>'+
            '<div class="datepicker-months">'+
              '<table class="table-condensed">'+
                DPGlobal.headTemplate+
                DPGlobal.contTemplate+
                DPGlobal.footTemplate+
              '</table>'+
            '</div>'+
            '<div class="datepicker-years">'+
              '<table class="table-condensed">'+
                DPGlobal.headTemplate+
                DPGlobal.contTemplate+
                DPGlobal.footTemplate+
              '</table>'+
            '</div>'+
            '<div class="datepicker-decades">'+
              '<table class="table-condensed">'+
                DPGlobal.headTemplate+
                DPGlobal.contTemplate+
                DPGlobal.footTemplate+
              '</table>'+
            '</div>'+
            '<div class="datepicker-centuries">'+
              '<table class="table-condensed">'+
                DPGlobal.headTemplate+
                DPGlobal.contTemplate+
                DPGlobal.footTemplate+
              '</table>'+
            '</div>'+
          '</div>';

$.fn.datepicker.DPGlobal = DPGlobal;


/* DATEPICKER NO CONFLICT
* =================== */

$.fn.datepicker.noConflict = function(){
  $.fn.datepicker = old;
  return this;
};

/* DATEPICKER VERSION
 * =================== */
$.fn.datepicker.version = '1.8.0';

$.fn.datepicker.deprecated = function(msg){
  var console = window.console;
  if (console && console.warn) {
    console.warn('DEPRECATED: ' + msg);
  }
};


/* DATEPICKER DATA-API
* ================== */

$(document).on(
  'focus.datepicker.data-api click.datepicker.data-api',
  '[data-provide="datepicker"]',
  function(e){
    var $this = $(this);
    if ($this.data('datepicker'))
      return;
    e.preventDefault();
    // component click requires us to explicitly show it
    datepickerPlugin.call($this, 'show');
  }
);
$(function(){
  datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
});

}));
/*! tooltipster v4.2.7 */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(a){return b(a)}):"object"==typeof exports?module.exports=b(require("jquery")):b(jQuery)}(this,function(a){function b(a){this.$container,this.constraints=null,this.__$tooltip,this.__init(a)}function c(b,c){var d=!0;return a.each(b,function(a,e){return void 0===c[a]||b[a]!==c[a]?(d=!1,!1):void 0}),d}function d(b){var c=b.attr("id"),d=c?h.window.document.getElementById(c):null;return d?d===b[0]:a.contains(h.window.document.body,b[0])}function e(){if(!g)return!1;var a=g.document.body||g.document.documentElement,b=a.style,c="transition",d=["Moz","Webkit","Khtml","O","ms"];if("string"==typeof b[c])return!0;c=c.charAt(0).toUpperCase()+c.substr(1);for(var e=0;e<d.length;e++)if("string"==typeof b[d[e]+c])return!0;return!1}var f={animation:"fade",animationDuration:350,content:null,contentAsHTML:!1,contentCloning:!1,debug:!0,delay:300,delayTouch:[300,500],functionInit:null,functionBefore:null,functionReady:null,functionAfter:null,functionFormat:null,IEmin:6,interactive:!1,multiple:!1,parent:null,plugins:["sideTip"],repositionOnScroll:!1,restoration:"none",selfDestruction:!0,theme:[],timer:0,trackerInterval:500,trackOrigin:!1,trackTooltip:!1,trigger:"hover",triggerClose:{click:!1,mouseleave:!1,originClick:!1,scroll:!1,tap:!1,touchleave:!1},triggerOpen:{click:!1,mouseenter:!1,tap:!1,touchstart:!1},updateAnimation:"rotate",zIndex:9999999},g="undefined"!=typeof window?window:null,h={hasTouchCapability:!(!g||!("ontouchstart"in g||g.DocumentTouch&&g.document instanceof g.DocumentTouch||g.navigator.maxTouchPoints)),hasTransitions:e(),IE:!1,semVer:"4.2.7",window:g},i=function(){this.__$emitterPrivate=a({}),this.__$emitterPublic=a({}),this.__instancesLatestArr=[],this.__plugins={},this._env=h};i.prototype={__bridge:function(b,c,d){if(!c[d]){var e=function(){};e.prototype=b;var g=new e;g.__init&&g.__init(c),a.each(b,function(a,b){0!=a.indexOf("__")&&(c[a]?f.debug&&console.log("The "+a+" method of the "+d+" plugin conflicts with another plugin or native methods"):(c[a]=function(){return g[a].apply(g,Array.prototype.slice.apply(arguments))},c[a].bridged=g))}),c[d]=g}return this},__setWindow:function(a){return h.window=a,this},_getRuler:function(a){return new b(a)},_off:function(){return this.__$emitterPrivate.off.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_on:function(){return this.__$emitterPrivate.on.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_one:function(){return this.__$emitterPrivate.one.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_plugin:function(b){var c=this;if("string"==typeof b){var d=b,e=null;return d.indexOf(".")>0?e=c.__plugins[d]:a.each(c.__plugins,function(a,b){return b.name.substring(b.name.length-d.length-1)=="."+d?(e=b,!1):void 0}),e}if(b.name.indexOf(".")<0)throw new Error("Plugins must be namespaced");return c.__plugins[b.name]=b,b.core&&c.__bridge(b.core,c,b.name),this},_trigger:function(){var a=Array.prototype.slice.apply(arguments);return"string"==typeof a[0]&&(a[0]={type:a[0]}),this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate,a),this.__$emitterPublic.trigger.apply(this.__$emitterPublic,a),this},instances:function(b){var c=[],d=b||".tooltipstered";return a(d).each(function(){var b=a(this),d=b.data("tooltipster-ns");d&&a.each(d,function(a,d){c.push(b.data(d))})}),c},instancesLatest:function(){return this.__instancesLatestArr},off:function(){return this.__$emitterPublic.off.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},on:function(){return this.__$emitterPublic.on.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},one:function(){return this.__$emitterPublic.one.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},origins:function(b){var c=b?b+" ":"";return a(c+".tooltipstered").toArray()},setDefaults:function(b){return a.extend(f,b),this},triggerHandler:function(){return this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this}},a.tooltipster=new i,a.Tooltipster=function(b,c){this.__callbacks={close:[],open:[]},this.__closingTime,this.__Content,this.__contentBcr,this.__destroyed=!1,this.__$emitterPrivate=a({}),this.__$emitterPublic=a({}),this.__enabled=!0,this.__garbageCollector,this.__Geometry,this.__lastPosition,this.__namespace="tooltipster-"+Math.round(1e6*Math.random()),this.__options,this.__$originParents,this.__pointerIsOverOrigin=!1,this.__previousThemes=[],this.__state="closed",this.__timeouts={close:[],open:null},this.__touchEvents=[],this.__tracker=null,this._$origin,this._$tooltip,this.__init(b,c)},a.Tooltipster.prototype={__init:function(b,c){var d=this;if(d._$origin=a(b),d.__options=a.extend(!0,{},f,c),d.__optionsFormat(),!h.IE||h.IE>=d.__options.IEmin){var e=null;if(void 0===d._$origin.data("tooltipster-initialTitle")&&(e=d._$origin.attr("title"),void 0===e&&(e=null),d._$origin.data("tooltipster-initialTitle",e)),null!==d.__options.content)d.__contentSet(d.__options.content);else{var g,i=d._$origin.attr("data-tooltip-content");i&&(g=a(i)),g&&g[0]?d.__contentSet(g.first()):d.__contentSet(e)}d._$origin.removeAttr("title").addClass("tooltipstered"),d.__prepareOrigin(),d.__prepareGC(),a.each(d.__options.plugins,function(a,b){d._plug(b)}),h.hasTouchCapability&&a(h.window.document.body).on("touchmove."+d.__namespace+"-triggerOpen",function(a){d._touchRecordEvent(a)}),d._on("created",function(){d.__prepareTooltip()})._on("repositioned",function(a){d.__lastPosition=a.position})}else d.__options.disabled=!0},__contentInsert:function(){var a=this,b=a._$tooltip.find(".tooltipster-content"),c=a.__Content,d=function(a){c=a};return a._trigger({type:"format",content:a.__Content,format:d}),a.__options.functionFormat&&(c=a.__options.functionFormat.call(a,a,{origin:a._$origin[0]},a.__Content)),"string"!=typeof c||a.__options.contentAsHTML?b.empty().append(c):b.text(c),a},__contentSet:function(b){return b instanceof a&&this.__options.contentCloning&&(b=b.clone(!0)),this.__Content=b,this._trigger({type:"updated",content:b}),this},__destroyError:function(){throw new Error("This tooltip has been destroyed and cannot execute your method call.")},__geometry:function(){var b=this,c=b._$origin,d=b._$origin.is("area");if(d){var e=b._$origin.parent().attr("name");c=a('img[usemap="#'+e+'"]')}var f=c[0].getBoundingClientRect(),g=a(h.window.document),i=a(h.window),j=c,k={available:{document:null,window:null},document:{size:{height:g.height(),width:g.width()}},window:{scroll:{left:h.window.scrollX||h.window.document.documentElement.scrollLeft,top:h.window.scrollY||h.window.document.documentElement.scrollTop},size:{height:i.height(),width:i.width()}},origin:{fixedLineage:!1,offset:{},size:{height:f.bottom-f.top,width:f.right-f.left},usemapImage:d?c[0]:null,windowOffset:{bottom:f.bottom,left:f.left,right:f.right,top:f.top}}};if(d){var l=b._$origin.attr("shape"),m=b._$origin.attr("coords");if(m&&(m=m.split(","),a.map(m,function(a,b){m[b]=parseInt(a)})),"default"!=l)switch(l){case"circle":var n=m[0],o=m[1],p=m[2],q=o-p,r=n-p;k.origin.size.height=2*p,k.origin.size.width=k.origin.size.height,k.origin.windowOffset.left+=r,k.origin.windowOffset.top+=q;break;case"rect":var s=m[0],t=m[1],u=m[2],v=m[3];k.origin.size.height=v-t,k.origin.size.width=u-s,k.origin.windowOffset.left+=s,k.origin.windowOffset.top+=t;break;case"poly":for(var w=0,x=0,y=0,z=0,A="even",B=0;B<m.length;B++){var C=m[B];"even"==A?(C>y&&(y=C,0===B&&(w=y)),w>C&&(w=C),A="odd"):(C>z&&(z=C,1==B&&(x=z)),x>C&&(x=C),A="even")}k.origin.size.height=z-x,k.origin.size.width=y-w,k.origin.windowOffset.left+=w,k.origin.windowOffset.top+=x}}var D=function(a){k.origin.size.height=a.height,k.origin.windowOffset.left=a.left,k.origin.windowOffset.top=a.top,k.origin.size.width=a.width};for(b._trigger({type:"geometry",edit:D,geometry:{height:k.origin.size.height,left:k.origin.windowOffset.left,top:k.origin.windowOffset.top,width:k.origin.size.width}}),k.origin.windowOffset.right=k.origin.windowOffset.left+k.origin.size.width,k.origin.windowOffset.bottom=k.origin.windowOffset.top+k.origin.size.height,k.origin.offset.left=k.origin.windowOffset.left+k.window.scroll.left,k.origin.offset.top=k.origin.windowOffset.top+k.window.scroll.top,k.origin.offset.bottom=k.origin.offset.top+k.origin.size.height,k.origin.offset.right=k.origin.offset.left+k.origin.size.width,k.available.document={bottom:{height:k.document.size.height-k.origin.offset.bottom,width:k.document.size.width},left:{height:k.document.size.height,width:k.origin.offset.left},right:{height:k.document.size.height,width:k.document.size.width-k.origin.offset.right},top:{height:k.origin.offset.top,width:k.document.size.width}},k.available.window={bottom:{height:Math.max(k.window.size.height-Math.max(k.origin.windowOffset.bottom,0),0),width:k.window.size.width},left:{height:k.window.size.height,width:Math.max(k.origin.windowOffset.left,0)},right:{height:k.window.size.height,width:Math.max(k.window.size.width-Math.max(k.origin.windowOffset.right,0),0)},top:{height:Math.max(k.origin.windowOffset.top,0),width:k.window.size.width}};"html"!=j[0].tagName.toLowerCase();){if("fixed"==j.css("position")){k.origin.fixedLineage=!0;break}j=j.parent()}return k},__optionsFormat:function(){return"number"==typeof this.__options.animationDuration&&(this.__options.animationDuration=[this.__options.animationDuration,this.__options.animationDuration]),"number"==typeof this.__options.delay&&(this.__options.delay=[this.__options.delay,this.__options.delay]),"number"==typeof this.__options.delayTouch&&(this.__options.delayTouch=[this.__options.delayTouch,this.__options.delayTouch]),"string"==typeof this.__options.theme&&(this.__options.theme=[this.__options.theme]),null===this.__options.parent?this.__options.parent=a(h.window.document.body):"string"==typeof this.__options.parent&&(this.__options.parent=a(this.__options.parent)),"hover"==this.__options.trigger?(this.__options.triggerOpen={mouseenter:!0,touchstart:!0},this.__options.triggerClose={mouseleave:!0,originClick:!0,touchleave:!0}):"click"==this.__options.trigger&&(this.__options.triggerOpen={click:!0,tap:!0},this.__options.triggerClose={click:!0,tap:!0}),this._trigger("options"),this},__prepareGC:function(){var b=this;return b.__options.selfDestruction?b.__garbageCollector=setInterval(function(){var c=(new Date).getTime();b.__touchEvents=a.grep(b.__touchEvents,function(a,b){return c-a.time>6e4}),d(b._$origin)||b.close(function(){b.destroy()})},2e4):clearInterval(b.__garbageCollector),b},__prepareOrigin:function(){var a=this;if(a._$origin.off("."+a.__namespace+"-triggerOpen"),h.hasTouchCapability&&a._$origin.on("touchstart."+a.__namespace+"-triggerOpen touchend."+a.__namespace+"-triggerOpen touchcancel."+a.__namespace+"-triggerOpen",function(b){a._touchRecordEvent(b)}),a.__options.triggerOpen.click||a.__options.triggerOpen.tap&&h.hasTouchCapability){var b="";a.__options.triggerOpen.click&&(b+="click."+a.__namespace+"-triggerOpen "),a.__options.triggerOpen.tap&&h.hasTouchCapability&&(b+="touchend."+a.__namespace+"-triggerOpen"),a._$origin.on(b,function(b){a._touchIsMeaningfulEvent(b)&&a._open(b)})}if(a.__options.triggerOpen.mouseenter||a.__options.triggerOpen.touchstart&&h.hasTouchCapability){var b="";a.__options.triggerOpen.mouseenter&&(b+="mouseenter."+a.__namespace+"-triggerOpen "),a.__options.triggerOpen.touchstart&&h.hasTouchCapability&&(b+="touchstart."+a.__namespace+"-triggerOpen"),a._$origin.on(b,function(b){!a._touchIsTouchEvent(b)&&a._touchIsEmulatedEvent(b)||(a.__pointerIsOverOrigin=!0,a._openShortly(b))})}if(a.__options.triggerClose.mouseleave||a.__options.triggerClose.touchleave&&h.hasTouchCapability){var b="";a.__options.triggerClose.mouseleave&&(b+="mouseleave."+a.__namespace+"-triggerOpen "),a.__options.triggerClose.touchleave&&h.hasTouchCapability&&(b+="touchend."+a.__namespace+"-triggerOpen touchcancel."+a.__namespace+"-triggerOpen"),a._$origin.on(b,function(b){a._touchIsMeaningfulEvent(b)&&(a.__pointerIsOverOrigin=!1)})}return a},__prepareTooltip:function(){var b=this,c=b.__options.interactive?"auto":"";return b._$tooltip.attr("id",b.__namespace).css({"pointer-events":c,zIndex:b.__options.zIndex}),a.each(b.__previousThemes,function(a,c){b._$tooltip.removeClass(c)}),a.each(b.__options.theme,function(a,c){b._$tooltip.addClass(c)}),b.__previousThemes=a.merge([],b.__options.theme),b},__scrollHandler:function(b){var c=this;if(c.__options.triggerClose.scroll)c._close(b);else if(d(c._$origin)&&d(c._$tooltip)){var e=null;if(b.target===h.window.document)c.__Geometry.origin.fixedLineage||c.__options.repositionOnScroll&&c.reposition(b);else{e=c.__geometry();var f=!1;if("fixed"!=c._$origin.css("position")&&c.__$originParents.each(function(b,c){var d=a(c),g=d.css("overflow-x"),h=d.css("overflow-y");if("visible"!=g||"visible"!=h){var i=c.getBoundingClientRect();if("visible"!=g&&(e.origin.windowOffset.left<i.left||e.origin.windowOffset.right>i.right))return f=!0,!1;if("visible"!=h&&(e.origin.windowOffset.top<i.top||e.origin.windowOffset.bottom>i.bottom))return f=!0,!1}return"fixed"==d.css("position")?!1:void 0}),f)c._$tooltip.css("visibility","hidden");else if(c._$tooltip.css("visibility","visible"),c.__options.repositionOnScroll)c.reposition(b);else{var g=e.origin.offset.left-c.__Geometry.origin.offset.left,i=e.origin.offset.top-c.__Geometry.origin.offset.top;c._$tooltip.css({left:c.__lastPosition.coord.left+g,top:c.__lastPosition.coord.top+i})}}c._trigger({type:"scroll",event:b,geo:e})}return c},__stateSet:function(a){return this.__state=a,this._trigger({type:"state",state:a}),this},__timeoutsClear:function(){return clearTimeout(this.__timeouts.open),this.__timeouts.open=null,a.each(this.__timeouts.close,function(a,b){clearTimeout(b)}),this.__timeouts.close=[],this},__trackerStart:function(){var a=this,b=a._$tooltip.find(".tooltipster-content");return a.__options.trackTooltip&&(a.__contentBcr=b[0].getBoundingClientRect()),a.__tracker=setInterval(function(){if(d(a._$origin)&&d(a._$tooltip)){if(a.__options.trackOrigin){var e=a.__geometry(),f=!1;c(e.origin.size,a.__Geometry.origin.size)&&(a.__Geometry.origin.fixedLineage?c(e.origin.windowOffset,a.__Geometry.origin.windowOffset)&&(f=!0):c(e.origin.offset,a.__Geometry.origin.offset)&&(f=!0)),f||(a.__options.triggerClose.mouseleave?a._close():a.reposition())}if(a.__options.trackTooltip){var g=b[0].getBoundingClientRect();g.height===a.__contentBcr.height&&g.width===a.__contentBcr.width||(a.reposition(),a.__contentBcr=g)}}else a._close()},a.__options.trackerInterval),a},_close:function(b,c,d){var e=this,f=!0;if(e._trigger({type:"close",event:b,stop:function(){f=!1}}),f||d){c&&e.__callbacks.close.push(c),e.__callbacks.open=[],e.__timeoutsClear();var g=function(){a.each(e.__callbacks.close,function(a,c){c.call(e,e,{event:b,origin:e._$origin[0]})}),e.__callbacks.close=[]};if("closed"!=e.__state){var i=!0,j=new Date,k=j.getTime(),l=k+e.__options.animationDuration[1];if("disappearing"==e.__state&&l>e.__closingTime&&e.__options.animationDuration[1]>0&&(i=!1),i){e.__closingTime=l,"disappearing"!=e.__state&&e.__stateSet("disappearing");var m=function(){clearInterval(e.__tracker),e._trigger({type:"closing",event:b}),e._$tooltip.off("."+e.__namespace+"-triggerClose").removeClass("tooltipster-dying"),a(h.window).off("."+e.__namespace+"-triggerClose"),e.__$originParents.each(function(b,c){a(c).off("scroll."+e.__namespace+"-triggerClose")}),e.__$originParents=null,a(h.window.document.body).off("."+e.__namespace+"-triggerClose"),e._$origin.off("."+e.__namespace+"-triggerClose"),e._off("dismissable"),e.__stateSet("closed"),e._trigger({type:"after",event:b}),e.__options.functionAfter&&e.__options.functionAfter.call(e,e,{event:b,origin:e._$origin[0]}),g()};h.hasTransitions?(e._$tooltip.css({"-moz-animation-duration":e.__options.animationDuration[1]+"ms","-ms-animation-duration":e.__options.animationDuration[1]+"ms","-o-animation-duration":e.__options.animationDuration[1]+"ms","-webkit-animation-duration":e.__options.animationDuration[1]+"ms","animation-duration":e.__options.animationDuration[1]+"ms","transition-duration":e.__options.animationDuration[1]+"ms"}),e._$tooltip.clearQueue().removeClass("tooltipster-show").addClass("tooltipster-dying"),e.__options.animationDuration[1]>0&&e._$tooltip.delay(e.__options.animationDuration[1]),e._$tooltip.queue(m)):e._$tooltip.stop().fadeOut(e.__options.animationDuration[1],m)}}else g()}return e},_off:function(){return this.__$emitterPrivate.off.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_on:function(){return this.__$emitterPrivate.on.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_one:function(){return this.__$emitterPrivate.one.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_open:function(b,c){var e=this;if(!e.__destroying&&d(e._$origin)&&e.__enabled){var f=!0;if("closed"==e.__state&&(e._trigger({type:"before",event:b,stop:function(){f=!1}}),f&&e.__options.functionBefore&&(f=e.__options.functionBefore.call(e,e,{event:b,origin:e._$origin[0]}))),f!==!1&&null!==e.__Content){c&&e.__callbacks.open.push(c),e.__callbacks.close=[],e.__timeoutsClear();var g,i=function(){"stable"!=e.__state&&e.__stateSet("stable"),a.each(e.__callbacks.open,function(a,b){b.call(e,e,{origin:e._$origin[0],tooltip:e._$tooltip[0]})}),e.__callbacks.open=[]};if("closed"!==e.__state)g=0,"disappearing"===e.__state?(e.__stateSet("appearing"),h.hasTransitions?(e._$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-show"),e.__options.animationDuration[0]>0&&e._$tooltip.delay(e.__options.animationDuration[0]),e._$tooltip.queue(i)):e._$tooltip.stop().fadeIn(i)):"stable"==e.__state&&i();else{if(e.__stateSet("appearing"),g=e.__options.animationDuration[0],e.__contentInsert(),e.reposition(b,!0),h.hasTransitions?(e._$tooltip.addClass("tooltipster-"+e.__options.animation).addClass("tooltipster-initial").css({"-moz-animation-duration":e.__options.animationDuration[0]+"ms","-ms-animation-duration":e.__options.animationDuration[0]+"ms","-o-animation-duration":e.__options.animationDuration[0]+"ms","-webkit-animation-duration":e.__options.animationDuration[0]+"ms","animation-duration":e.__options.animationDuration[0]+"ms","transition-duration":e.__options.animationDuration[0]+"ms"}),setTimeout(function(){"closed"!=e.__state&&(e._$tooltip.addClass("tooltipster-show").removeClass("tooltipster-initial"),e.__options.animationDuration[0]>0&&e._$tooltip.delay(e.__options.animationDuration[0]),e._$tooltip.queue(i))},0)):e._$tooltip.css("display","none").fadeIn(e.__options.animationDuration[0],i),e.__trackerStart(),a(h.window).on("resize."+e.__namespace+"-triggerClose",function(b){var c=a(document.activeElement);(c.is("input")||c.is("textarea"))&&a.contains(e._$tooltip[0],c[0])||e.reposition(b)}).on("scroll."+e.__namespace+"-triggerClose",function(a){e.__scrollHandler(a)}),e.__$originParents=e._$origin.parents(),e.__$originParents.each(function(b,c){a(c).on("scroll."+e.__namespace+"-triggerClose",function(a){e.__scrollHandler(a)})}),e.__options.triggerClose.mouseleave||e.__options.triggerClose.touchleave&&h.hasTouchCapability){e._on("dismissable",function(a){a.dismissable?a.delay?(m=setTimeout(function(){e._close(a.event)},a.delay),e.__timeouts.close.push(m)):e._close(a):clearTimeout(m)});var j=e._$origin,k="",l="",m=null;e.__options.interactive&&(j=j.add(e._$tooltip)),e.__options.triggerClose.mouseleave&&(k+="mouseenter."+e.__namespace+"-triggerClose ",l+="mouseleave."+e.__namespace+"-triggerClose "),e.__options.triggerClose.touchleave&&h.hasTouchCapability&&(k+="touchstart."+e.__namespace+"-triggerClose",l+="touchend."+e.__namespace+"-triggerClose touchcancel."+e.__namespace+"-triggerClose"),j.on(l,function(a){if(e._touchIsTouchEvent(a)||!e._touchIsEmulatedEvent(a)){var b="mouseleave"==a.type?e.__options.delay:e.__options.delayTouch;e._trigger({delay:b[1],dismissable:!0,event:a,type:"dismissable"})}}).on(k,function(a){!e._touchIsTouchEvent(a)&&e._touchIsEmulatedEvent(a)||e._trigger({dismissable:!1,event:a,type:"dismissable"})})}e.__options.triggerClose.originClick&&e._$origin.on("click."+e.__namespace+"-triggerClose",function(a){e._touchIsTouchEvent(a)||e._touchIsEmulatedEvent(a)||e._close(a)}),(e.__options.triggerClose.click||e.__options.triggerClose.tap&&h.hasTouchCapability)&&setTimeout(function(){if("closed"!=e.__state){var b="",c=a(h.window.document.body);e.__options.triggerClose.click&&(b+="click."+e.__namespace+"-triggerClose "),e.__options.triggerClose.tap&&h.hasTouchCapability&&(b+="touchend."+e.__namespace+"-triggerClose"),c.on(b,function(b){e._touchIsMeaningfulEvent(b)&&(e._touchRecordEvent(b),e.__options.interactive&&a.contains(e._$tooltip[0],b.target)||e._close(b))}),e.__options.triggerClose.tap&&h.hasTouchCapability&&c.on("touchstart."+e.__namespace+"-triggerClose",function(a){e._touchRecordEvent(a)})}},0),e._trigger("ready"),e.__options.functionReady&&e.__options.functionReady.call(e,e,{origin:e._$origin[0],tooltip:e._$tooltip[0]})}if(e.__options.timer>0){var m=setTimeout(function(){e._close()},e.__options.timer+g);e.__timeouts.close.push(m)}}}return e},_openShortly:function(a){var b=this,c=!0;if("stable"!=b.__state&&"appearing"!=b.__state&&!b.__timeouts.open&&(b._trigger({type:"start",event:a,stop:function(){c=!1}}),c)){var d=0==a.type.indexOf("touch")?b.__options.delayTouch:b.__options.delay;d[0]?b.__timeouts.open=setTimeout(function(){b.__timeouts.open=null,b.__pointerIsOverOrigin&&b._touchIsMeaningfulEvent(a)?(b._trigger("startend"),b._open(a)):b._trigger("startcancel")},d[0]):(b._trigger("startend"),b._open(a))}return b},_optionsExtract:function(b,c){var d=this,e=a.extend(!0,{},c),f=d.__options[b];return f||(f={},a.each(c,function(a,b){var c=d.__options[a];void 0!==c&&(f[a]=c)})),a.each(e,function(b,c){void 0!==f[b]&&("object"!=typeof c||c instanceof Array||null==c||"object"!=typeof f[b]||f[b]instanceof Array||null==f[b]?e[b]=f[b]:a.extend(e[b],f[b]))}),e},_plug:function(b){var c=a.tooltipster._plugin(b);if(!c)throw new Error('The "'+b+'" plugin is not defined');return c.instance&&a.tooltipster.__bridge(c.instance,this,c.name),this},_touchIsEmulatedEvent:function(a){for(var b=!1,c=(new Date).getTime(),d=this.__touchEvents.length-1;d>=0;d--){var e=this.__touchEvents[d];if(!(c-e.time<500))break;e.target===a.target&&(b=!0)}return b},_touchIsMeaningfulEvent:function(a){return this._touchIsTouchEvent(a)&&!this._touchSwiped(a.target)||!this._touchIsTouchEvent(a)&&!this._touchIsEmulatedEvent(a)},_touchIsTouchEvent:function(a){return 0==a.type.indexOf("touch")},_touchRecordEvent:function(a){return this._touchIsTouchEvent(a)&&(a.time=(new Date).getTime(),this.__touchEvents.push(a)),this},_touchSwiped:function(a){for(var b=!1,c=this.__touchEvents.length-1;c>=0;c--){var d=this.__touchEvents[c];if("touchmove"==d.type){b=!0;break}if("touchstart"==d.type&&a===d.target)break}return b},_trigger:function(){var b=Array.prototype.slice.apply(arguments);return"string"==typeof b[0]&&(b[0]={type:b[0]}),b[0].instance=this,b[0].origin=this._$origin?this._$origin[0]:null,b[0].tooltip=this._$tooltip?this._$tooltip[0]:null,this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate,b),a.tooltipster._trigger.apply(a.tooltipster,b),this.__$emitterPublic.trigger.apply(this.__$emitterPublic,b),this},_unplug:function(b){var c=this;if(c[b]){var d=a.tooltipster._plugin(b);d.instance&&a.each(d.instance,function(a,d){c[a]&&c[a].bridged===c[b]&&delete c[a]}),c[b].__destroy&&c[b].__destroy(),delete c[b]}return c},close:function(a){return this.__destroyed?this.__destroyError():this._close(null,a),this},content:function(a){var b=this;if(void 0===a)return b.__Content;if(b.__destroyed)b.__destroyError();else if(b.__contentSet(a),null!==b.__Content){if("closed"!==b.__state&&(b.__contentInsert(),b.reposition(),b.__options.updateAnimation))if(h.hasTransitions){var c=b.__options.updateAnimation;b._$tooltip.addClass("tooltipster-update-"+c),setTimeout(function(){"closed"!=b.__state&&b._$tooltip.removeClass("tooltipster-update-"+c)},1e3)}else b._$tooltip.fadeTo(200,.5,function(){"closed"!=b.__state&&b._$tooltip.fadeTo(200,1)})}else b._close();return b},destroy:function(){var b=this;if(b.__destroyed)b.__destroyError();else{"closed"!=b.__state?b.option("animationDuration",0)._close(null,null,!0):b.__timeoutsClear(),b._trigger("destroy"),b.__destroyed=!0,b._$origin.removeData(b.__namespace).off("."+b.__namespace+"-triggerOpen"),a(h.window.document.body).off("."+b.__namespace+"-triggerOpen");var c=b._$origin.data("tooltipster-ns");if(c)if(1===c.length){var d=null;"previous"==b.__options.restoration?d=b._$origin.data("tooltipster-initialTitle"):"current"==b.__options.restoration&&(d="string"==typeof b.__Content?b.__Content:a("<div></div>").append(b.__Content).html()),d&&b._$origin.attr("title",d),b._$origin.removeClass("tooltipstered"),b._$origin.removeData("tooltipster-ns").removeData("tooltipster-initialTitle")}else c=a.grep(c,function(a,c){return a!==b.__namespace}),b._$origin.data("tooltipster-ns",c);b._trigger("destroyed"),b._off(),b.off(),b.__Content=null,b.__$emitterPrivate=null,b.__$emitterPublic=null,b.__options.parent=null,b._$origin=null,b._$tooltip=null,a.tooltipster.__instancesLatestArr=a.grep(a.tooltipster.__instancesLatestArr,function(a,c){return b!==a}),clearInterval(b.__garbageCollector)}return b},disable:function(){return this.__destroyed?(this.__destroyError(),this):(this._close(),this.__enabled=!1,this)},elementOrigin:function(){return this.__destroyed?void this.__destroyError():this._$origin[0]},elementTooltip:function(){return this._$tooltip?this._$tooltip[0]:null},enable:function(){return this.__enabled=!0,this},hide:function(a){return this.close(a)},instance:function(){return this},off:function(){return this.__destroyed||this.__$emitterPublic.off.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},on:function(){return this.__destroyed?this.__destroyError():this.__$emitterPublic.on.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},one:function(){return this.__destroyed?this.__destroyError():this.__$emitterPublic.one.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},open:function(a){return this.__destroyed?this.__destroyError():this._open(null,a),this},option:function(b,c){return void 0===c?this.__options[b]:(this.__destroyed?this.__destroyError():(this.__options[b]=c,this.__optionsFormat(),a.inArray(b,["trigger","triggerClose","triggerOpen"])>=0&&this.__prepareOrigin(),"selfDestruction"===b&&this.__prepareGC()),this)},reposition:function(a,b){var c=this;return c.__destroyed?c.__destroyError():"closed"!=c.__state&&d(c._$origin)&&(b||d(c._$tooltip))&&(b||c._$tooltip.detach(),c.__Geometry=c.__geometry(),c._trigger({type:"reposition",event:a,helper:{geo:c.__Geometry}})),c},show:function(a){return this.open(a)},status:function(){return{destroyed:this.__destroyed,enabled:this.__enabled,open:"closed"!==this.__state,state:this.__state}},triggerHandler:function(){return this.__destroyed?this.__destroyError():this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this}},a.fn.tooltipster=function(){var b=Array.prototype.slice.apply(arguments),c="You are using a single HTML element as content for several tooltips. You probably want to set the contentCloning option to TRUE.";if(0===this.length)return this;if("string"==typeof b[0]){var d="#*$~&";return this.each(function(){var e=a(this).data("tooltipster-ns"),f=e?a(this).data(e[0]):null;if(!f)throw new Error("You called Tooltipster's \""+b[0]+'" method on an uninitialized element');if("function"!=typeof f[b[0]])throw new Error('Unknown method "'+b[0]+'"');this.length>1&&"content"==b[0]&&(b[1]instanceof a||"object"==typeof b[1]&&null!=b[1]&&b[1].tagName)&&!f.__options.contentCloning&&f.__options.debug&&console.log(c);var g=f[b[0]](b[1],b[2]);return g!==f||"instance"===b[0]?(d=g,!1):void 0}),"#*$~&"!==d?d:this}a.tooltipster.__instancesLatestArr=[];var e=b[0]&&void 0!==b[0].multiple,g=e&&b[0].multiple||!e&&f.multiple,h=b[0]&&void 0!==b[0].content,i=h&&b[0].content||!h&&f.content,j=b[0]&&void 0!==b[0].contentCloning,k=j&&b[0].contentCloning||!j&&f.contentCloning,l=b[0]&&void 0!==b[0].debug,m=l&&b[0].debug||!l&&f.debug;return this.length>1&&(i instanceof a||"object"==typeof i&&null!=i&&i.tagName)&&!k&&m&&console.log(c),this.each(function(){var c=!1,d=a(this),e=d.data("tooltipster-ns"),f=null;e?g?c=!0:m&&(console.log("Tooltipster: one or more tooltips are already attached to the element below. Ignoring."),console.log(this)):c=!0,c&&(f=new a.Tooltipster(this,b[0]),e||(e=[]),e.push(f.__namespace),d.data("tooltipster-ns",e),d.data(f.__namespace,f),f.__options.functionInit&&f.__options.functionInit.call(f,f,{origin:this}),f._trigger("init")),a.tooltipster.__instancesLatestArr.push(f)}),this},b.prototype={__init:function(b){this.__$tooltip=b,this.__$tooltip.css({left:0,overflow:"hidden",position:"absolute",top:0}).find(".tooltipster-content").css("overflow","auto"),this.$container=a('<div class="tooltipster-ruler"></div>').append(this.__$tooltip).appendTo(h.window.document.body)},__forceRedraw:function(){var a=this.__$tooltip.parent();this.__$tooltip.detach(),this.__$tooltip.appendTo(a)},constrain:function(a,b){return this.constraints={width:a,height:b},this.__$tooltip.css({display:"block",height:"",overflow:"auto",width:a}),this},destroy:function(){this.__$tooltip.detach().find(".tooltipster-content").css({display:"",overflow:""}),this.$container.remove()},free:function(){return this.constraints=null,this.__$tooltip.css({display:"",height:"",overflow:"visible",width:""}),this},measure:function(){this.__forceRedraw();var a=this.__$tooltip[0].getBoundingClientRect(),b={size:{height:a.height||a.bottom-a.top,width:a.width||a.right-a.left}};if(this.constraints){var c=this.__$tooltip.find(".tooltipster-content"),d=this.__$tooltip.outerHeight(),e=c[0].getBoundingClientRect(),f={height:d<=this.constraints.height,width:a.width<=this.constraints.width&&e.width>=c[0].scrollWidth-1};b.fits=f.height&&f.width}return h.IE&&h.IE<=11&&b.size.width!==h.window.document.documentElement.clientWidth&&(b.size.width=Math.ceil(b.size.width)+1),b}};var j=navigator.userAgent.toLowerCase();-1!=j.indexOf("msie")?h.IE=parseInt(j.split("msie")[1]):-1!==j.toLowerCase().indexOf("trident")&&-1!==j.indexOf(" rv:11")?h.IE=11:-1!=j.toLowerCase().indexOf("edge/")&&(h.IE=parseInt(j.toLowerCase().split("edge/")[1]));var k="tooltipster.sideTip";return a.tooltipster._plugin({name:k,instance:{__defaults:function(){return{arrow:!0,distance:6,functionPosition:null,maxWidth:null,minIntersection:16,minWidth:0,position:null,side:"top",viewportAware:!0}},__init:function(a){var b=this;b.__instance=a,b.__namespace="tooltipster-sideTip-"+Math.round(1e6*Math.random()),b.__previousState="closed",b.__options,b.__optionsFormat(),b.__instance._on("state."+b.__namespace,function(a){"closed"==a.state?b.__close():"appearing"==a.state&&"closed"==b.__previousState&&b.__create(),b.__previousState=a.state}),b.__instance._on("options."+b.__namespace,function(){b.__optionsFormat()}),b.__instance._on("reposition."+b.__namespace,function(a){b.__reposition(a.event,a.helper)})},__close:function(){this.__instance.content()instanceof a&&this.__instance.content().detach(),this.__instance._$tooltip.remove(),this.__instance._$tooltip=null},__create:function(){var b=a('<div class="tooltipster-base tooltipster-sidetip"><div class="tooltipster-box"><div class="tooltipster-content"></div></div><div class="tooltipster-arrow"><div class="tooltipster-arrow-uncropped"><div class="tooltipster-arrow-border"></div><div class="tooltipster-arrow-background"></div></div></div></div>');this.__options.arrow||b.find(".tooltipster-box").css("margin",0).end().find(".tooltipster-arrow").hide(),this.__options.minWidth&&b.css("min-width",this.__options.minWidth+"px"),this.__options.maxWidth&&b.css("max-width",this.__options.maxWidth+"px"),
this.__instance._$tooltip=b,this.__instance._trigger("created")},__destroy:function(){this.__instance._off("."+self.__namespace)},__optionsFormat:function(){var b=this;if(b.__options=b.__instance._optionsExtract(k,b.__defaults()),b.__options.position&&(b.__options.side=b.__options.position),"object"!=typeof b.__options.distance&&(b.__options.distance=[b.__options.distance]),b.__options.distance.length<4&&(void 0===b.__options.distance[1]&&(b.__options.distance[1]=b.__options.distance[0]),void 0===b.__options.distance[2]&&(b.__options.distance[2]=b.__options.distance[0]),void 0===b.__options.distance[3]&&(b.__options.distance[3]=b.__options.distance[1]),b.__options.distance={top:b.__options.distance[0],right:b.__options.distance[1],bottom:b.__options.distance[2],left:b.__options.distance[3]}),"string"==typeof b.__options.side){var c={top:"bottom",right:"left",bottom:"top",left:"right"};b.__options.side=[b.__options.side,c[b.__options.side]],"left"==b.__options.side[0]||"right"==b.__options.side[0]?b.__options.side.push("top","bottom"):b.__options.side.push("right","left")}6===a.tooltipster._env.IE&&b.__options.arrow!==!0&&(b.__options.arrow=!1)},__reposition:function(b,c){var d,e=this,f=e.__targetFind(c),g=[];e.__instance._$tooltip.detach();var h=e.__instance._$tooltip.clone(),i=a.tooltipster._getRuler(h),j=!1,k=e.__instance.option("animation");switch(k&&h.removeClass("tooltipster-"+k),a.each(["window","document"],function(d,k){var l=null;if(e.__instance._trigger({container:k,helper:c,satisfied:j,takeTest:function(a){l=a},results:g,type:"positionTest"}),1==l||0!=l&&0==j&&("window"!=k||e.__options.viewportAware))for(var d=0;d<e.__options.side.length;d++){var m={horizontal:0,vertical:0},n=e.__options.side[d];"top"==n||"bottom"==n?m.vertical=e.__options.distance[n]:m.horizontal=e.__options.distance[n],e.__sideChange(h,n),a.each(["natural","constrained"],function(a,d){if(l=null,e.__instance._trigger({container:k,event:b,helper:c,mode:d,results:g,satisfied:j,side:n,takeTest:function(a){l=a},type:"positionTest"}),1==l||0!=l&&0==j){var h={container:k,distance:m,fits:null,mode:d,outerSize:null,side:n,size:null,target:f[n],whole:null},o="natural"==d?i.free():i.constrain(c.geo.available[k][n].width-m.horizontal,c.geo.available[k][n].height-m.vertical),p=o.measure();if(h.size=p.size,h.outerSize={height:p.size.height+m.vertical,width:p.size.width+m.horizontal},"natural"==d?c.geo.available[k][n].width>=h.outerSize.width&&c.geo.available[k][n].height>=h.outerSize.height?h.fits=!0:h.fits=!1:h.fits=p.fits,"window"==k&&(h.fits?"top"==n||"bottom"==n?h.whole=c.geo.origin.windowOffset.right>=e.__options.minIntersection&&c.geo.window.size.width-c.geo.origin.windowOffset.left>=e.__options.minIntersection:h.whole=c.geo.origin.windowOffset.bottom>=e.__options.minIntersection&&c.geo.window.size.height-c.geo.origin.windowOffset.top>=e.__options.minIntersection:h.whole=!1),g.push(h),h.whole)j=!0;else if("natural"==h.mode&&(h.fits||h.size.width<=c.geo.available[k][n].width))return!1}})}}),e.__instance._trigger({edit:function(a){g=a},event:b,helper:c,results:g,type:"positionTested"}),g.sort(function(a,b){if(a.whole&&!b.whole)return-1;if(!a.whole&&b.whole)return 1;if(a.whole&&b.whole){var c=e.__options.side.indexOf(a.side),d=e.__options.side.indexOf(b.side);return d>c?-1:c>d?1:"natural"==a.mode?-1:1}if(a.fits&&!b.fits)return-1;if(!a.fits&&b.fits)return 1;if(a.fits&&b.fits){var c=e.__options.side.indexOf(a.side),d=e.__options.side.indexOf(b.side);return d>c?-1:c>d?1:"natural"==a.mode?-1:1}return"document"==a.container&&"bottom"==a.side&&"natural"==a.mode?-1:1}),d=g[0],d.coord={},d.side){case"left":case"right":d.coord.top=Math.floor(d.target-d.size.height/2);break;case"bottom":case"top":d.coord.left=Math.floor(d.target-d.size.width/2)}switch(d.side){case"left":d.coord.left=c.geo.origin.windowOffset.left-d.outerSize.width;break;case"right":d.coord.left=c.geo.origin.windowOffset.right+d.distance.horizontal;break;case"top":d.coord.top=c.geo.origin.windowOffset.top-d.outerSize.height;break;case"bottom":d.coord.top=c.geo.origin.windowOffset.bottom+d.distance.vertical}"window"==d.container?"top"==d.side||"bottom"==d.side?d.coord.left<0?c.geo.origin.windowOffset.right-this.__options.minIntersection>=0?d.coord.left=0:d.coord.left=c.geo.origin.windowOffset.right-this.__options.minIntersection-1:d.coord.left>c.geo.window.size.width-d.size.width&&(c.geo.origin.windowOffset.left+this.__options.minIntersection<=c.geo.window.size.width?d.coord.left=c.geo.window.size.width-d.size.width:d.coord.left=c.geo.origin.windowOffset.left+this.__options.minIntersection+1-d.size.width):d.coord.top<0?c.geo.origin.windowOffset.bottom-this.__options.minIntersection>=0?d.coord.top=0:d.coord.top=c.geo.origin.windowOffset.bottom-this.__options.minIntersection-1:d.coord.top>c.geo.window.size.height-d.size.height&&(c.geo.origin.windowOffset.top+this.__options.minIntersection<=c.geo.window.size.height?d.coord.top=c.geo.window.size.height-d.size.height:d.coord.top=c.geo.origin.windowOffset.top+this.__options.minIntersection+1-d.size.height):(d.coord.left>c.geo.window.size.width-d.size.width&&(d.coord.left=c.geo.window.size.width-d.size.width),d.coord.left<0&&(d.coord.left=0)),e.__sideChange(h,d.side),c.tooltipClone=h[0],c.tooltipParent=e.__instance.option("parent").parent[0],c.mode=d.mode,c.whole=d.whole,c.origin=e.__instance._$origin[0],c.tooltip=e.__instance._$tooltip[0],delete d.container,delete d.fits,delete d.mode,delete d.outerSize,delete d.whole,d.distance=d.distance.horizontal||d.distance.vertical;var l=a.extend(!0,{},d);if(e.__instance._trigger({edit:function(a){d=a},event:b,helper:c,position:l,type:"position"}),e.__options.functionPosition){var m=e.__options.functionPosition.call(e,e.__instance,c,l);m&&(d=m)}i.destroy();var n,o;"top"==d.side||"bottom"==d.side?(n={prop:"left",val:d.target-d.coord.left},o=d.size.width-this.__options.minIntersection):(n={prop:"top",val:d.target-d.coord.top},o=d.size.height-this.__options.minIntersection),n.val<this.__options.minIntersection?n.val=this.__options.minIntersection:n.val>o&&(n.val=o);var p;p=c.geo.origin.fixedLineage?c.geo.origin.windowOffset:{left:c.geo.origin.windowOffset.left+c.geo.window.scroll.left,top:c.geo.origin.windowOffset.top+c.geo.window.scroll.top},d.coord={left:p.left+(d.coord.left-c.geo.origin.windowOffset.left),top:p.top+(d.coord.top-c.geo.origin.windowOffset.top)},e.__sideChange(e.__instance._$tooltip,d.side),c.geo.origin.fixedLineage?e.__instance._$tooltip.css("position","fixed"):e.__instance._$tooltip.css("position",""),e.__instance._$tooltip.css({left:d.coord.left,top:d.coord.top,height:d.size.height,width:d.size.width}).find(".tooltipster-arrow").css({left:"",top:""}).css(n.prop,n.val),e.__instance._$tooltip.appendTo(e.__instance.option("parent")),e.__instance._trigger({type:"repositioned",event:b,position:d})},__sideChange:function(a,b){a.removeClass("tooltipster-bottom").removeClass("tooltipster-left").removeClass("tooltipster-right").removeClass("tooltipster-top").addClass("tooltipster-"+b)},__targetFind:function(a){var b={},c=this.__instance._$origin[0].getClientRects();if(c.length>1){var d=this.__instance._$origin.css("opacity");1==d&&(this.__instance._$origin.css("opacity",.99),c=this.__instance._$origin[0].getClientRects(),this.__instance._$origin.css("opacity",1))}if(c.length<2)b.top=Math.floor(a.geo.origin.windowOffset.left+a.geo.origin.size.width/2),b.bottom=b.top,b.left=Math.floor(a.geo.origin.windowOffset.top+a.geo.origin.size.height/2),b.right=b.left;else{var e=c[0];b.top=Math.floor(e.left+(e.right-e.left)/2),e=c.length>2?c[Math.ceil(c.length/2)-1]:c[0],b.right=Math.floor(e.top+(e.bottom-e.top)/2),e=c[c.length-1],b.bottom=Math.floor(e.left+(e.right-e.left)/2),e=c.length>2?c[Math.ceil((c.length+1)/2)-1]:c[c.length-1],b.left=Math.floor(e.top+(e.bottom-e.top)/2)}return b}}}),a});
window.Paloma = window.Paloma || {};

//
// Do nothing if there is no available console.
//
if ( !window['console'] ){
  Paloma.log = Paloma.warn = function(msg){};
}
else {
  Paloma.warn = function(msg){
    if (Paloma.env != 'development'){ return; }
    console.warn(msg);
  };

  Paloma.log = function(msg){
    if (Paloma.env != 'development'){ return; }
    console.log(msg);
  };
}


if ( !window['Paloma'] ){
  if ( !window['console'] ){
    console.warn("Paloma not found. Require it in your application.js.");
  }
}
;
Paloma.BaseController = function(params){
  this.params = params;
};

Paloma.BaseController.prototype = {
  before: []
};

Paloma.ControllerClassFactory = function(){
  this._controllers = {};
  this._inheritanceSymbol = '<';
};

Paloma.ControllerClassFactory.prototype = {

  make: function(controllerAndParent, prototype){
    var parts = this._extractParts(controllerAndParent),
        controller = this._getOrCreate( parts.controller );

    this._updatePrototype(controller, prototype);
    this._updateParent(controller, parts.parent);

    return controller;
  },

  get: function(name){
    return this._controllers[name] || null;
  },

  _updateParent: function(controller, parent){
    if (!parent) return;

    var parentClass = this.get(parent);
    if (parentClass) controller.prototype = Object.create(parentClass.prototype, controller.prototype);
  },

  _updatePrototype: function(controller, newPrototype){
    for (var k in newPrototype)
      if (newPrototype.hasOwnProperty(k))
        controller.prototype[k] = newPrototype[k];
  },

  _getOrCreate: function(name){
    return this.get(name) || this._create(name);
  },

  _create: function(name){
    var controller = function(params){
      Paloma.BaseController.call(this, params);
    };

    controller.prototype = Object.create(Paloma.BaseController.prototype);
    controller.prototype.constructor = controller;

    this._controllers[name] = controller;
    return controller;
  },

  _extractParts: function(controllerAndParent){
    var parts = controllerAndParent.split( this._inheritanceSymbol );

    var controller = parts[0].trim(),
        parent = parts[1];

    if (parent) parent = parent.trim();

    return {controller: controller, parent: parent};
  }

};
Paloma.BeforeCallbackPerformer = function(controller){
  this.controller = controller;
  this.entries = controller.before || [];
  this.action = null;
};

Paloma.BeforeCallbackPerformer.prototype = {

  perform: function(action){
    this.action = action;
    this._executeCallbacks();
  },

  _executeCallbacks: function(){
    for (var i = 0, n = this._callbacks().length; i < n; i++)
      this._executeCallback( this._callbacks()[i] );
  },

  _executeCallback: function(name){
    var callback = this.controller[name];
    if (callback) callback.call(this.controller);
  },

  _callbacks: function(){
    if (this._callbackList) return this._callbackList;

    this._callbackList = [];

    for (var i = 0, n = this.entries.length; i < n; i++){
      var entry = this.entries[i];

      this._callbackList =
        this._callbackList.concat( this._getCallbacksIfForAction(entry) );
    }

    return this._callbackList;
  },

  _getCallbacksIfForAction: function(entry){
    var parsedEntry = this._parseEntry(entry);

    if (
      this._actionIsOn(parsedEntry.actions) ||
      this._allIsOn(parsedEntry.actions)
    )
      return parsedEntry.callbacks;

    return [];
  },

  _actionIsOn: function(actions){
    return actions.indexOf(this.action) != -1;
  },

  _allIsOn: function(actions){
    return actions.indexOf('all') != -1;
  },

  _parseEntry: function(entry){
    var parts = entry.split('->'),
        data = {actions: [], callbacks: []};

    if (parts[0]) data.actions = parts[0].trim().split(' ');
    if (parts[1]) data.callbacks = parts[1].trim().split(' ');

    return data;
  }

};
Paloma.ControllerBuilder = function(classFactory){
  this.classFactory = classFactory;
  this.options = {};
};

Paloma.ControllerBuilder.prototype = {

  build: function(options){
    this.options = options;

    var ControllerClass = this._controllerClass();
    if ( !ControllerClass ) return null;

    var controller = new ControllerClass( this._buildParams() );

    controller.controller = this.options.controller;
    controller.action = this.options.action;

    return controller;
  },

  _controllerClass: function(){
    return this.classFactory.get( this.options.controller );
  },

  _buildParams: function(){
    var params = {};

    for (var k in this.options.params)
      if (this.options.params.hasOwnProperty(k))
        params[k] = this.options.params[k];

    return params;
  }

};
Paloma.Engine = function(controllerBuilder){
  this.controllerBuilder = controllerBuilder;
  this._clearRequest();
};

Paloma.Engine.prototype = {

  setRequest: function(options){
    this._request = {
      id: options.id,
      controller: options.resource,
      action: options.action,
      params: options.params,
      executed: false
    };
  },

  hasRequest: function(){
    return this._request != null;
  },

  lastRequest: function(){
    return this._lastRequest = this._lastRequest || {executed: false};
  },

  start: function(){
    if ( this._shouldStop() ) return;

    this._logRequest();
    this._lastRequest = this._request;

    this._executeControllerAction();
    this._clearRequest();
  },

  _executeControllerAction: function(){
    var controller = this._buildController();
    if (!controller) return;

    var callbackPerformer = new Paloma.BeforeCallbackPerformer(controller);
    callbackPerformer.perform( this._request.action );

    var method = controller[ this._request.action ];
    if (method) method.call(controller);

    this._lastRequest.executed = true;
  },

  _buildController: function(){
    return this.controllerBuilder.build({
      controller: this._request.controller,
      action: this._request.action,
      params: this._request.params
    });
  },

  _shouldStop: function(){
    if ( !this.hasRequest() ) return true;
    if ( this._request.id == this.lastRequest().id ) return true;

    return false;
  },

  _logRequest: function(){
    Paloma.log(
      'Paloma: ' + this._request.controller + '#' +
      this._request.action + ' with params:'
    );

    Paloma.log( this._request.params );
  },

  _clearRequest: function(){
    this._request = null;
  }

};
(function(Paloma){

  var classFactory = new Paloma.ControllerClassFactory(),
      controllerBuilder = new Paloma.ControllerBuilder(classFactory),
      engine = new Paloma.Engine(controllerBuilder)

  Paloma._controllerClassFactory = classFactory;
  Paloma._controllerBuilder = controllerBuilder
  Paloma.engine = engine;

  Paloma.controller = function(name, prototype){
    return classFactory.make(name, prototype);
  };

  Paloma._executeHook = function(){
    var hook = document.querySelector('.js-paloma-hook script');
    if (hook) eval(hook.innerHTML);
  };

  Paloma.start = function(){
    if ( !engine.hasRequest() ) this._executeHook();
    if ( engine.hasRequest() ) engine.start();
  };

  Paloma.isExecuted = function(){
    return engine.lastRequest().executed;
  };

})(window.Paloma);







$(document).ready(function(){
  Paloma.start();
});
/* Javascript plotting library for jQuery, version 0.8.3.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

*/

// first an inline dependency, jquery.colorhelpers.js, we inline it here
// for convenience

/* Plugin for jQuery for working with colors.
 *
 * Version 1.1.
 *
 * Inspiration from jQuery color animation plugin by John Resig.
 *
 * Released under the MIT license by Ole Laursen, October 2009.
 *
 * Examples:
 *
 *   $.color.parse("#fff").scale('rgb', 0.25).add('a', -0.5).toString()
 *   var c = $.color.extract($("#mydiv"), 'background-color');
 *   console.log(c.r, c.g, c.b, c.a);
 *   $.color.make(100, 50, 25, 0.4).toString() // returns "rgba(100,50,25,0.4)"
 *
 * Note that .scale() and .add() return the same modified object
 * instead of making a new one.
 *
 * V. 1.1: Fix error handling so e.g. parsing an empty string does
 * produce a color rather than just crashing.
 */

(function($){$.color={};$.color.make=function(r,g,b,a){var o={};o.r=r||0;o.g=g||0;o.b=b||0;o.a=a!=null?a:1;o.add=function(c,d){for(var i=0;i<c.length;++i)o[c.charAt(i)]+=d;return o.normalize()};o.scale=function(c,f){for(var i=0;i<c.length;++i)o[c.charAt(i)]*=f;return o.normalize()};o.toString=function(){if(o.a>=1){return"rgb("+[o.r,o.g,o.b].join(",")+")"}else{return"rgba("+[o.r,o.g,o.b,o.a].join(",")+")"}};o.normalize=function(){function clamp(min,value,max){return value<min?min:value>max?max:value}o.r=clamp(0,parseInt(o.r),255);o.g=clamp(0,parseInt(o.g),255);o.b=clamp(0,parseInt(o.b),255);o.a=clamp(0,o.a,1);return o};o.clone=function(){return $.color.make(o.r,o.b,o.g,o.a)};return o.normalize()};$.color.extract=function(elem,css){var c;do{c=elem.css(css).toLowerCase();if(c!=""&&c!="transparent")break;elem=elem.parent()}while(elem.length&&!$.nodeName(elem.get(0),"body"));if(c=="rgba(0, 0, 0, 0)")c="transparent";return $.color.parse(c)};$.color.parse=function(str){var res,m=$.color.make;if(res=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(str))return m(parseInt(res[1],10),parseInt(res[2],10),parseInt(res[3],10));if(res=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))return m(parseInt(res[1],10),parseInt(res[2],10),parseInt(res[3],10),parseFloat(res[4]));if(res=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(str))return m(parseFloat(res[1])*2.55,parseFloat(res[2])*2.55,parseFloat(res[3])*2.55);if(res=/rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))return m(parseFloat(res[1])*2.55,parseFloat(res[2])*2.55,parseFloat(res[3])*2.55,parseFloat(res[4]));if(res=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(str))return m(parseInt(res[1],16),parseInt(res[2],16),parseInt(res[3],16));if(res=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(str))return m(parseInt(res[1]+res[1],16),parseInt(res[2]+res[2],16),parseInt(res[3]+res[3],16));var name=$.trim(str).toLowerCase();if(name=="transparent")return m(255,255,255,0);else{res=lookupColors[name]||[0,0,0];return m(res[0],res[1],res[2])}};var lookupColors={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]}})(jQuery);

// the actual Flot code
(function($) {

	// Cache the prototype hasOwnProperty for faster access

	var hasOwnProperty = Object.prototype.hasOwnProperty;

    // A shim to provide 'detach' to jQuery versions prior to 1.4.  Using a DOM
    // operation produces the same effect as detach, i.e. removing the element
    // without touching its jQuery data.

    // Do not merge this into Flot 0.9, since it requires jQuery 1.4.4+.

    if (!$.fn.detach) {
        $.fn.detach = function() {
            return this.each(function() {
                if (this.parentNode) {
                    this.parentNode.removeChild( this );
                }
            });
        };
    }

	///////////////////////////////////////////////////////////////////////////
	// The Canvas object is a wrapper around an HTML5 <canvas> tag.
	//
	// @constructor
	// @param {string} cls List of classes to apply to the canvas.
	// @param {element} container Element onto which to append the canvas.
	//
	// Requiring a container is a little iffy, but unfortunately canvas
	// operations don't work unless the canvas is attached to the DOM.

	function Canvas(cls, container) {

		var element = container.children("." + cls)[0];

		if (element == null) {

			element = document.createElement("canvas");
			element.className = cls;

			$(element).css({ direction: "ltr", position: "absolute", left: 0, top: 0 })
				.appendTo(container);

			// If HTML5 Canvas isn't available, fall back to [Ex|Flash]canvas

			if (!element.getContext) {
				if (window.G_vmlCanvasManager) {
					element = window.G_vmlCanvasManager.initElement(element);
				} else {
					throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
				}
			}
		}

		this.element = element;

		var context = this.context = element.getContext("2d");

		// Determine the screen's ratio of physical to device-independent
		// pixels.  This is the ratio between the canvas width that the browser
		// advertises and the number of pixels actually present in that space.

		// The iPhone 4, for example, has a device-independent width of 320px,
		// but its screen is actually 640px wide.  It therefore has a pixel
		// ratio of 2, while most normal devices have a ratio of 1.

		var devicePixelRatio = window.devicePixelRatio || 1,
			backingStoreRatio =
				context.webkitBackingStorePixelRatio ||
				context.mozBackingStorePixelRatio ||
				context.msBackingStorePixelRatio ||
				context.oBackingStorePixelRatio ||
				context.backingStorePixelRatio || 1;

		this.pixelRatio = devicePixelRatio / backingStoreRatio;

		// Size the canvas to match the internal dimensions of its container

		this.resize(container.width(), container.height());

		// Collection of HTML div layers for text overlaid onto the canvas

		this.textContainer = null;
		this.text = {};

		// Cache of text fragments and metrics, so we can avoid expensively
		// re-calculating them when the plot is re-rendered in a loop.

		this._textCache = {};
	}

	// Resizes the canvas to the given dimensions.
	//
	// @param {number} width New width of the canvas, in pixels.
	// @param {number} width New height of the canvas, in pixels.

	Canvas.prototype.resize = function(width, height) {

		if (width <= 0 || height <= 0) {
			throw new Error("Invalid dimensions for plot, width = " + width + ", height = " + height);
		}

		var element = this.element,
			context = this.context,
			pixelRatio = this.pixelRatio;

		// Resize the canvas, increasing its density based on the display's
		// pixel ratio; basically giving it more pixels without increasing the
		// size of its element, to take advantage of the fact that retina
		// displays have that many more pixels in the same advertised space.

		// Resizing should reset the state (excanvas seems to be buggy though)

		if (this.width != width) {
			element.width = width * pixelRatio;
			element.style.width = width + "px";
			this.width = width;
		}

		if (this.height != height) {
			element.height = height * pixelRatio;
			element.style.height = height + "px";
			this.height = height;
		}

		// Save the context, so we can reset in case we get replotted.  The
		// restore ensure that we're really back at the initial state, and
		// should be safe even if we haven't saved the initial state yet.

		context.restore();
		context.save();

		// Scale the coordinate space to match the display density; so even though we
		// may have twice as many pixels, we still want lines and other drawing to
		// appear at the same size; the extra pixels will just make them crisper.

		context.scale(pixelRatio, pixelRatio);
	};

	// Clears the entire canvas area, not including any overlaid HTML text

	Canvas.prototype.clear = function() {
		this.context.clearRect(0, 0, this.width, this.height);
	};

	// Finishes rendering the canvas, including managing the text overlay.

	Canvas.prototype.render = function() {

		var cache = this._textCache;

		// For each text layer, add elements marked as active that haven't
		// already been rendered, and remove those that are no longer active.

		for (var layerKey in cache) {
			if (hasOwnProperty.call(cache, layerKey)) {

				var layer = this.getTextLayer(layerKey),
					layerCache = cache[layerKey];

				layer.hide();

				for (var styleKey in layerCache) {
					if (hasOwnProperty.call(layerCache, styleKey)) {
						var styleCache = layerCache[styleKey];
						for (var key in styleCache) {
							if (hasOwnProperty.call(styleCache, key)) {

								var positions = styleCache[key].positions;

								for (var i = 0, position; position = positions[i]; i++) {
									if (position.active) {
										if (!position.rendered) {
											layer.append(position.element);
											position.rendered = true;
										}
									} else {
										positions.splice(i--, 1);
										if (position.rendered) {
											position.element.detach();
										}
									}
								}

								if (positions.length == 0) {
									delete styleCache[key];
								}
							}
						}
					}
				}

				layer.show();
			}
		}
	};

	// Creates (if necessary) and returns the text overlay container.
	//
	// @param {string} classes String of space-separated CSS classes used to
	//     uniquely identify the text layer.
	// @return {object} The jQuery-wrapped text-layer div.

	Canvas.prototype.getTextLayer = function(classes) {

		var layer = this.text[classes];

		// Create the text layer if it doesn't exist

		if (layer == null) {

			// Create the text layer container, if it doesn't exist

			if (this.textContainer == null) {
				this.textContainer = $("<div class='flot-text'></div>")
					.css({
						position: "absolute",
						top: 0,
						left: 0,
						bottom: 0,
						right: 0,
						'font-size': "smaller",
						color: "#545454"
					})
					.insertAfter(this.element);
			}

			layer = this.text[classes] = $("<div></div>")
				.addClass(classes)
				.css({
					position: "absolute",
					top: 0,
					left: 0,
					bottom: 0,
					right: 0
				})
				.appendTo(this.textContainer);
		}

		return layer;
	};

	// Creates (if necessary) and returns a text info object.
	//
	// The object looks like this:
	//
	// {
	//     width: Width of the text's wrapper div.
	//     height: Height of the text's wrapper div.
	//     element: The jQuery-wrapped HTML div containing the text.
	//     positions: Array of positions at which this text is drawn.
	// }
	//
	// The positions array contains objects that look like this:
	//
	// {
	//     active: Flag indicating whether the text should be visible.
	//     rendered: Flag indicating whether the text is currently visible.
	//     element: The jQuery-wrapped HTML div containing the text.
	//     x: X coordinate at which to draw the text.
	//     y: Y coordinate at which to draw the text.
	// }
	//
	// Each position after the first receives a clone of the original element.
	//
	// The idea is that that the width, height, and general 'identity' of the
	// text is constant no matter where it is placed; the placements are a
	// secondary property.
	//
	// Canvas maintains a cache of recently-used text info objects; getTextInfo
	// either returns the cached element or creates a new entry.
	//
	// @param {string} layer A string of space-separated CSS classes uniquely
	//     identifying the layer containing this text.
	// @param {string} text Text string to retrieve info for.
	// @param {(string|object)=} font Either a string of space-separated CSS
	//     classes or a font-spec object, defining the text's font and style.
	// @param {number=} angle Angle at which to rotate the text, in degrees.
	//     Angle is currently unused, it will be implemented in the future.
	// @param {number=} width Maximum width of the text before it wraps.
	// @return {object} a text info object.

	Canvas.prototype.getTextInfo = function(layer, text, font, angle, width) {

		var textStyle, layerCache, styleCache, info;

		// Cast the value to a string, in case we were given a number or such

		text = "" + text;

		// If the font is a font-spec object, generate a CSS font definition

		if (typeof font === "object") {
			textStyle = font.style + " " + font.variant + " " + font.weight + " " + font.size + "px/" + font.lineHeight + "px " + font.family;
		} else {
			textStyle = font;
		}

		// Retrieve (or create) the cache for the text's layer and styles

		layerCache = this._textCache[layer];

		if (layerCache == null) {
			layerCache = this._textCache[layer] = {};
		}

		styleCache = layerCache[textStyle];

		if (styleCache == null) {
			styleCache = layerCache[textStyle] = {};
		}

		info = styleCache[text];

		// If we can't find a matching element in our cache, create a new one

		if (info == null) {

			var element = $("<div></div>").html(text)
				.css({
					position: "absolute",
					'max-width': width,
					top: -9999
				})
				.appendTo(this.getTextLayer(layer));

			if (typeof font === "object") {
				element.css({
					font: textStyle,
					color: font.color
				});
			} else if (typeof font === "string") {
				element.addClass(font);
			}

			info = styleCache[text] = {
				width: element.outerWidth(true),
				height: element.outerHeight(true),
				element: element,
				positions: []
			};

			element.detach();
		}

		return info;
	};

	// Adds a text string to the canvas text overlay.
	//
	// The text isn't drawn immediately; it is marked as rendering, which will
	// result in its addition to the canvas on the next render pass.
	//
	// @param {string} layer A string of space-separated CSS classes uniquely
	//     identifying the layer containing this text.
	// @param {number} x X coordinate at which to draw the text.
	// @param {number} y Y coordinate at which to draw the text.
	// @param {string} text Text string to draw.
	// @param {(string|object)=} font Either a string of space-separated CSS
	//     classes or a font-spec object, defining the text's font and style.
	// @param {number=} angle Angle at which to rotate the text, in degrees.
	//     Angle is currently unused, it will be implemented in the future.
	// @param {number=} width Maximum width of the text before it wraps.
	// @param {string=} halign Horizontal alignment of the text; either "left",
	//     "center" or "right".
	// @param {string=} valign Vertical alignment of the text; either "top",
	//     "middle" or "bottom".

	Canvas.prototype.addText = function(layer, x, y, text, font, angle, width, halign, valign) {

		var info = this.getTextInfo(layer, text, font, angle, width),
			positions = info.positions;

		// Tweak the div's position to match the text's alignment

		if (halign == "center") {
			x -= info.width / 2;
		} else if (halign == "right") {
			x -= info.width;
		}

		if (valign == "middle") {
			y -= info.height / 2;
		} else if (valign == "bottom") {
			y -= info.height;
		}

		// Determine whether this text already exists at this position.
		// If so, mark it for inclusion in the next render pass.

		for (var i = 0, position; position = positions[i]; i++) {
			if (position.x == x && position.y == y) {
				position.active = true;
				return;
			}
		}

		// If the text doesn't exist at this position, create a new entry

		// For the very first position we'll re-use the original element,
		// while for subsequent ones we'll clone it.

		position = {
			active: true,
			rendered: false,
			element: positions.length ? info.element.clone() : info.element,
			x: x,
			y: y
		};

		positions.push(position);

		// Move the element to its final position within the container

		position.element.css({
			top: Math.round(y),
			left: Math.round(x),
			'text-align': halign	// In case the text wraps
		});
	};

	// Removes one or more text strings from the canvas text overlay.
	//
	// If no parameters are given, all text within the layer is removed.
	//
	// Note that the text is not immediately removed; it is simply marked as
	// inactive, which will result in its removal on the next render pass.
	// This avoids the performance penalty for 'clear and redraw' behavior,
	// where we potentially get rid of all text on a layer, but will likely
	// add back most or all of it later, as when redrawing axes, for example.
	//
	// @param {string} layer A string of space-separated CSS classes uniquely
	//     identifying the layer containing this text.
	// @param {number=} x X coordinate of the text.
	// @param {number=} y Y coordinate of the text.
	// @param {string=} text Text string to remove.
	// @param {(string|object)=} font Either a string of space-separated CSS
	//     classes or a font-spec object, defining the text's font and style.
	// @param {number=} angle Angle at which the text is rotated, in degrees.
	//     Angle is currently unused, it will be implemented in the future.

	Canvas.prototype.removeText = function(layer, x, y, text, font, angle) {
		if (text == null) {
			var layerCache = this._textCache[layer];
			if (layerCache != null) {
				for (var styleKey in layerCache) {
					if (hasOwnProperty.call(layerCache, styleKey)) {
						var styleCache = layerCache[styleKey];
						for (var key in styleCache) {
							if (hasOwnProperty.call(styleCache, key)) {
								var positions = styleCache[key].positions;
								for (var i = 0, position; position = positions[i]; i++) {
									position.active = false;
								}
							}
						}
					}
				}
			}
		} else {
			var positions = this.getTextInfo(layer, text, font, angle).positions;
			for (var i = 0, position; position = positions[i]; i++) {
				if (position.x == x && position.y == y) {
					position.active = false;
				}
			}
		}
	};

	///////////////////////////////////////////////////////////////////////////
	// The top-level container for the entire plot.

    function Plot(placeholder, data_, options_, plugins) {
        // data is on the form:
        //   [ series1, series2 ... ]
        // where series is either just the data as [ [x1, y1], [x2, y2], ... ]
        // or { data: [ [x1, y1], [x2, y2], ... ], label: "some label", ... }

        var series = [],
            options = {
                // the color theme used for graphs
                colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
                legend: {
                    show: true,
                    noColumns: 1, // number of colums in legend table
                    labelFormatter: null, // fn: string -> string
                    labelBoxBorderColor: "#ccc", // border color for the little label boxes
                    container: null, // container (as jQuery object) to put legend in, null means default on top of graph
                    position: "ne", // position of default legend container within plot
                    margin: 5, // distance from grid edge to default legend container within plot
                    backgroundColor: null, // null means auto-detect
                    backgroundOpacity: 0.85, // set to 0 to avoid background
                    sorted: null    // default to no legend sorting
                },
                xaxis: {
                    show: null, // null = auto-detect, true = always, false = never
                    position: "bottom", // or "top"
                    mode: null, // null or "time"
                    font: null, // null (derived from CSS in placeholder) or object like { size: 11, lineHeight: 13, style: "italic", weight: "bold", family: "sans-serif", variant: "small-caps" }
                    color: null, // base color, labels, ticks
                    tickColor: null, // possibly different color of ticks, e.g. "rgba(0,0,0,0.15)"
                    transform: null, // null or f: number -> number to transform axis
                    inverseTransform: null, // if transform is set, this should be the inverse function
                    min: null, // min. value to show, null means set automatically
                    max: null, // max. value to show, null means set automatically
                    autoscaleMargin: null, // margin in % to add if auto-setting min/max
                    ticks: null, // either [1, 3] or [[1, "a"], 3] or (fn: axis info -> ticks) or app. number of ticks for auto-ticks
                    tickFormatter: null, // fn: number -> string
                    labelWidth: null, // size of tick labels in pixels
                    labelHeight: null,
                    reserveSpace: null, // whether to reserve space even if axis isn't shown
                    tickLength: null, // size in pixels of ticks, or "full" for whole line
                    alignTicksWithAxis: null, // axis number or null for no sync
                    tickDecimals: null, // no. of decimals, null means auto
                    tickSize: null, // number or [number, "unit"]
                    minTickSize: null // number or [number, "unit"]
                },
                yaxis: {
                    autoscaleMargin: 0.02,
                    position: "left" // or "right"
                },
                xaxes: [],
                yaxes: [],
                series: {
                    points: {
                        show: false,
                        radius: 3,
                        lineWidth: 2, // in pixels
                        fill: true,
                        fillColor: "#ffffff",
                        symbol: "circle" // or callback
                    },
                    lines: {
                        // we don't put in show: false so we can see
                        // whether lines were actively disabled
                        lineWidth: 2, // in pixels
                        fill: false,
                        fillColor: null,
                        steps: false
                        // Omit 'zero', so we can later default its value to
                        // match that of the 'fill' option.
                    },
                    bars: {
                        show: false,
                        lineWidth: 2, // in pixels
                        barWidth: 1, // in units of the x axis
                        fill: true,
                        fillColor: null,
                        align: "left", // "left", "right", or "center"
                        horizontal: false,
                        zero: true
                    },
                    shadowSize: 3,
                    highlightColor: null
                },
                grid: {
                    show: true,
                    aboveData: false,
                    color: "#545454", // primary color used for outline and labels
                    backgroundColor: null, // null for transparent, else color
                    borderColor: null, // set if different from the grid color
                    tickColor: null, // color for the ticks, e.g. "rgba(0,0,0,0.15)"
                    margin: 0, // distance from the canvas edge to the grid
                    labelMargin: 5, // in pixels
                    axisMargin: 8, // in pixels
                    borderWidth: 2, // in pixels
                    minBorderMargin: null, // in pixels, null means taken from points radius
                    markings: null, // array of ranges or fn: axes -> array of ranges
                    markingsColor: "#f4f4f4",
                    markingsLineWidth: 2,
                    // interactive stuff
                    clickable: false,
                    hoverable: false,
                    autoHighlight: true, // highlight in case mouse is near
                    mouseActiveRadius: 10 // how far the mouse can be away to activate an item
                },
                interaction: {
                    redrawOverlayInterval: 1000/60 // time between updates, -1 means in same flow
                },
                hooks: {}
            },
        surface = null,     // the canvas for the plot itself
        overlay = null,     // canvas for interactive stuff on top of plot
        eventHolder = null, // jQuery object that events should be bound to
        ctx = null, octx = null,
        xaxes = [], yaxes = [],
        plotOffset = { left: 0, right: 0, top: 0, bottom: 0},
        plotWidth = 0, plotHeight = 0,
        hooks = {
            processOptions: [],
            processRawData: [],
            processDatapoints: [],
            processOffset: [],
            drawBackground: [],
            drawSeries: [],
            draw: [],
            bindEvents: [],
            drawOverlay: [],
            shutdown: []
        },
        plot = this;

        // public functions
        plot.setData = setData;
        plot.setupGrid = setupGrid;
        plot.draw = draw;
        plot.getPlaceholder = function() { return placeholder; };
        plot.getCanvas = function() { return surface.element; };
        plot.getPlotOffset = function() { return plotOffset; };
        plot.width = function () { return plotWidth; };
        plot.height = function () { return plotHeight; };
        plot.offset = function () {
            var o = eventHolder.offset();
            o.left += plotOffset.left;
            o.top += plotOffset.top;
            return o;
        };
        plot.getData = function () { return series; };
        plot.getAxes = function () {
            var res = {}, i;
            $.each(xaxes.concat(yaxes), function (_, axis) {
                if (axis)
                    res[axis.direction + (axis.n != 1 ? axis.n : "") + "axis"] = axis;
            });
            return res;
        };
        plot.getXAxes = function () { return xaxes; };
        plot.getYAxes = function () { return yaxes; };
        plot.c2p = canvasToAxisCoords;
        plot.p2c = axisToCanvasCoords;
        plot.getOptions = function () { return options; };
        plot.highlight = highlight;
        plot.unhighlight = unhighlight;
        plot.triggerRedrawOverlay = triggerRedrawOverlay;
        plot.pointOffset = function(point) {
            return {
                left: parseInt(xaxes[axisNumber(point, "x") - 1].p2c(+point.x) + plotOffset.left, 10),
                top: parseInt(yaxes[axisNumber(point, "y") - 1].p2c(+point.y) + plotOffset.top, 10)
            };
        };
        plot.shutdown = shutdown;
        plot.destroy = function () {
            shutdown();
            placeholder.removeData("plot").empty();

            series = [];
            options = null;
            surface = null;
            overlay = null;
            eventHolder = null;
            ctx = null;
            octx = null;
            xaxes = [];
            yaxes = [];
            hooks = null;
            highlights = [];
            plot = null;
        };
        plot.resize = function () {
        	var width = placeholder.width(),
        		height = placeholder.height();
            surface.resize(width, height);
            overlay.resize(width, height);
        };

        // public attributes
        plot.hooks = hooks;

        // initialize
        initPlugins(plot);
        parseOptions(options_);
        setupCanvases();
        setData(data_);
        setupGrid();
        draw();
        bindEvents();


        function executeHooks(hook, args) {
            args = [plot].concat(args);
            for (var i = 0; i < hook.length; ++i)
                hook[i].apply(this, args);
        }

        function initPlugins() {

            // References to key classes, allowing plugins to modify them

            var classes = {
                Canvas: Canvas
            };

            for (var i = 0; i < plugins.length; ++i) {
                var p = plugins[i];
                p.init(plot, classes);
                if (p.options)
                    $.extend(true, options, p.options);
            }
        }

        function parseOptions(opts) {

            $.extend(true, options, opts);

            // $.extend merges arrays, rather than replacing them.  When less
            // colors are provided than the size of the default palette, we
            // end up with those colors plus the remaining defaults, which is
            // not expected behavior; avoid it by replacing them here.

            if (opts && opts.colors) {
            	options.colors = opts.colors;
            }

            if (options.xaxis.color == null)
                options.xaxis.color = $.color.parse(options.grid.color).scale('a', 0.22).toString();
            if (options.yaxis.color == null)
                options.yaxis.color = $.color.parse(options.grid.color).scale('a', 0.22).toString();

            if (options.xaxis.tickColor == null) // grid.tickColor for back-compatibility
                options.xaxis.tickColor = options.grid.tickColor || options.xaxis.color;
            if (options.yaxis.tickColor == null) // grid.tickColor for back-compatibility
                options.yaxis.tickColor = options.grid.tickColor || options.yaxis.color;

            if (options.grid.borderColor == null)
                options.grid.borderColor = options.grid.color;
            if (options.grid.tickColor == null)
                options.grid.tickColor = $.color.parse(options.grid.color).scale('a', 0.22).toString();

            // Fill in defaults for axis options, including any unspecified
            // font-spec fields, if a font-spec was provided.

            // If no x/y axis options were provided, create one of each anyway,
            // since the rest of the code assumes that they exist.

            var i, axisOptions, axisCount,
                fontSize = placeholder.css("font-size"),
                fontSizeDefault = fontSize ? +fontSize.replace("px", "") : 13,
                fontDefaults = {
                    style: placeholder.css("font-style"),
                    size: Math.round(0.8 * fontSizeDefault),
                    variant: placeholder.css("font-variant"),
                    weight: placeholder.css("font-weight"),
                    family: placeholder.css("font-family")
                };

            axisCount = options.xaxes.length || 1;
            for (i = 0; i < axisCount; ++i) {

                axisOptions = options.xaxes[i];
                if (axisOptions && !axisOptions.tickColor) {
                    axisOptions.tickColor = axisOptions.color;
                }

                axisOptions = $.extend(true, {}, options.xaxis, axisOptions);
                options.xaxes[i] = axisOptions;

                if (axisOptions.font) {
                    axisOptions.font = $.extend({}, fontDefaults, axisOptions.font);
                    if (!axisOptions.font.color) {
                        axisOptions.font.color = axisOptions.color;
                    }
                    if (!axisOptions.font.lineHeight) {
                        axisOptions.font.lineHeight = Math.round(axisOptions.font.size * 1.15);
                    }
                }
            }

            axisCount = options.yaxes.length || 1;
            for (i = 0; i < axisCount; ++i) {

                axisOptions = options.yaxes[i];
                if (axisOptions && !axisOptions.tickColor) {
                    axisOptions.tickColor = axisOptions.color;
                }

                axisOptions = $.extend(true, {}, options.yaxis, axisOptions);
                options.yaxes[i] = axisOptions;

                if (axisOptions.font) {
                    axisOptions.font = $.extend({}, fontDefaults, axisOptions.font);
                    if (!axisOptions.font.color) {
                        axisOptions.font.color = axisOptions.color;
                    }
                    if (!axisOptions.font.lineHeight) {
                        axisOptions.font.lineHeight = Math.round(axisOptions.font.size * 1.15);
                    }
                }
            }

            // backwards compatibility, to be removed in future
            if (options.xaxis.noTicks && options.xaxis.ticks == null)
                options.xaxis.ticks = options.xaxis.noTicks;
            if (options.yaxis.noTicks && options.yaxis.ticks == null)
                options.yaxis.ticks = options.yaxis.noTicks;
            if (options.x2axis) {
                options.xaxes[1] = $.extend(true, {}, options.xaxis, options.x2axis);
                options.xaxes[1].position = "top";
                // Override the inherit to allow the axis to auto-scale
                if (options.x2axis.min == null) {
                    options.xaxes[1].min = null;
                }
                if (options.x2axis.max == null) {
                    options.xaxes[1].max = null;
                }
            }
            if (options.y2axis) {
                options.yaxes[1] = $.extend(true, {}, options.yaxis, options.y2axis);
                options.yaxes[1].position = "right";
                // Override the inherit to allow the axis to auto-scale
                if (options.y2axis.min == null) {
                    options.yaxes[1].min = null;
                }
                if (options.y2axis.max == null) {
                    options.yaxes[1].max = null;
                }
            }
            if (options.grid.coloredAreas)
                options.grid.markings = options.grid.coloredAreas;
            if (options.grid.coloredAreasColor)
                options.grid.markingsColor = options.grid.coloredAreasColor;
            if (options.lines)
                $.extend(true, options.series.lines, options.lines);
            if (options.points)
                $.extend(true, options.series.points, options.points);
            if (options.bars)
                $.extend(true, options.series.bars, options.bars);
            if (options.shadowSize != null)
                options.series.shadowSize = options.shadowSize;
            if (options.highlightColor != null)
                options.series.highlightColor = options.highlightColor;

            // save options on axes for future reference
            for (i = 0; i < options.xaxes.length; ++i)
                getOrCreateAxis(xaxes, i + 1).options = options.xaxes[i];
            for (i = 0; i < options.yaxes.length; ++i)
                getOrCreateAxis(yaxes, i + 1).options = options.yaxes[i];

            // add hooks from options
            for (var n in hooks)
                if (options.hooks[n] && options.hooks[n].length)
                    hooks[n] = hooks[n].concat(options.hooks[n]);

            executeHooks(hooks.processOptions, [options]);
        }

        function setData(d) {
            series = parseData(d);
            fillInSeriesOptions();
            processData();
        }

        function parseData(d) {
            var res = [];
            for (var i = 0; i < d.length; ++i) {
                var s = $.extend(true, {}, options.series);

                if (d[i].data != null) {
                    s.data = d[i].data; // move the data instead of deep-copy
                    delete d[i].data;

                    $.extend(true, s, d[i]);

                    d[i].data = s.data;
                }
                else
                    s.data = d[i];
                res.push(s);
            }

            return res;
        }

        function axisNumber(obj, coord) {
            var a = obj[coord + "axis"];
            if (typeof a == "object") // if we got a real axis, extract number
                a = a.n;
            if (typeof a != "number")
                a = 1; // default to first axis
            return a;
        }

        function allAxes() {
            // return flat array without annoying null entries
            return $.grep(xaxes.concat(yaxes), function (a) { return a; });
        }

        function canvasToAxisCoords(pos) {
            // return an object with x/y corresponding to all used axes
            var res = {}, i, axis;
            for (i = 0; i < xaxes.length; ++i) {
                axis = xaxes[i];
                if (axis && axis.used)
                    res["x" + axis.n] = axis.c2p(pos.left);
            }

            for (i = 0; i < yaxes.length; ++i) {
                axis = yaxes[i];
                if (axis && axis.used)
                    res["y" + axis.n] = axis.c2p(pos.top);
            }

            if (res.x1 !== undefined)
                res.x = res.x1;
            if (res.y1 !== undefined)
                res.y = res.y1;

            return res;
        }

        function axisToCanvasCoords(pos) {
            // get canvas coords from the first pair of x/y found in pos
            var res = {}, i, axis, key;

            for (i = 0; i < xaxes.length; ++i) {
                axis = xaxes[i];
                if (axis && axis.used) {
                    key = "x" + axis.n;
                    if (pos[key] == null && axis.n == 1)
                        key = "x";

                    if (pos[key] != null) {
                        res.left = axis.p2c(pos[key]);
                        break;
                    }
                }
            }

            for (i = 0; i < yaxes.length; ++i) {
                axis = yaxes[i];
                if (axis && axis.used) {
                    key = "y" + axis.n;
                    if (pos[key] == null && axis.n == 1)
                        key = "y";

                    if (pos[key] != null) {
                        res.top = axis.p2c(pos[key]);
                        break;
                    }
                }
            }

            return res;
        }

        function getOrCreateAxis(axes, number) {
            if (!axes[number - 1])
                axes[number - 1] = {
                    n: number, // save the number for future reference
                    direction: axes == xaxes ? "x" : "y",
                    options: $.extend(true, {}, axes == xaxes ? options.xaxis : options.yaxis)
                };

            return axes[number - 1];
        }

        function fillInSeriesOptions() {

            var neededColors = series.length, maxIndex = -1, i;

            // Subtract the number of series that already have fixed colors or
            // color indexes from the number that we still need to generate.

            for (i = 0; i < series.length; ++i) {
                var sc = series[i].color;
                if (sc != null) {
                    neededColors--;
                    if (typeof sc == "number" && sc > maxIndex) {
                        maxIndex = sc;
                    }
                }
            }

            // If any of the series have fixed color indexes, then we need to
            // generate at least as many colors as the highest index.

            if (neededColors <= maxIndex) {
                neededColors = maxIndex + 1;
            }

            // Generate all the colors, using first the option colors and then
            // variations on those colors once they're exhausted.

            var c, colors = [], colorPool = options.colors,
                colorPoolSize = colorPool.length, variation = 0;

            for (i = 0; i < neededColors; i++) {

                c = $.color.parse(colorPool[i % colorPoolSize] || "#666");

                // Each time we exhaust the colors in the pool we adjust
                // a scaling factor used to produce more variations on
                // those colors. The factor alternates negative/positive
                // to produce lighter/darker colors.

                // Reset the variation after every few cycles, or else
                // it will end up producing only white or black colors.

                if (i % colorPoolSize == 0 && i) {
                    if (variation >= 0) {
                        if (variation < 0.5) {
                            variation = -variation - 0.2;
                        } else variation = 0;
                    } else variation = -variation;
                }

                colors[i] = c.scale('rgb', 1 + variation);
            }

            // Finalize the series options, filling in their colors

            var colori = 0, s;
            for (i = 0; i < series.length; ++i) {
                s = series[i];

                // assign colors
                if (s.color == null) {
                    s.color = colors[colori].toString();
                    ++colori;
                }
                else if (typeof s.color == "number")
                    s.color = colors[s.color].toString();

                // turn on lines automatically in case nothing is set
                if (s.lines.show == null) {
                    var v, show = true;
                    for (v in s)
                        if (s[v] && s[v].show) {
                            show = false;
                            break;
                        }
                    if (show)
                        s.lines.show = true;
                }

                // If nothing was provided for lines.zero, default it to match
                // lines.fill, since areas by default should extend to zero.

                if (s.lines.zero == null) {
                    s.lines.zero = !!s.lines.fill;
                }

                // setup axes
                s.xaxis = getOrCreateAxis(xaxes, axisNumber(s, "x"));
                s.yaxis = getOrCreateAxis(yaxes, axisNumber(s, "y"));
            }
        }

        function processData() {
            var topSentry = Number.POSITIVE_INFINITY,
                bottomSentry = Number.NEGATIVE_INFINITY,
                fakeInfinity = Number.MAX_VALUE,
                i, j, k, m, length,
                s, points, ps, x, y, axis, val, f, p,
                data, format;

            function updateAxis(axis, min, max) {
                if (min < axis.datamin && min != -fakeInfinity)
                    axis.datamin = min;
                if (max > axis.datamax && max != fakeInfinity)
                    axis.datamax = max;
            }

            $.each(allAxes(), function (_, axis) {
                // init axis
                axis.datamin = topSentry;
                axis.datamax = bottomSentry;
                axis.used = false;
            });

            for (i = 0; i < series.length; ++i) {
                s = series[i];
                s.datapoints = { points: [] };

                executeHooks(hooks.processRawData, [ s, s.data, s.datapoints ]);
            }

            // first pass: clean and copy data
            for (i = 0; i < series.length; ++i) {
                s = series[i];

                data = s.data;
                format = s.datapoints.format;

                if (!format) {
                    format = [];
                    // find out how to copy
                    format.push({ x: true, number: true, required: true });
                    format.push({ y: true, number: true, required: true });

                    if (s.bars.show || (s.lines.show && s.lines.fill)) {
                        var autoscale = !!((s.bars.show && s.bars.zero) || (s.lines.show && s.lines.zero));
                        format.push({ y: true, number: true, required: false, defaultValue: 0, autoscale: autoscale });
                        if (s.bars.horizontal) {
                            delete format[format.length - 1].y;
                            format[format.length - 1].x = true;
                        }
                    }

                    s.datapoints.format = format;
                }

                if (s.datapoints.pointsize != null)
                    continue; // already filled in

                s.datapoints.pointsize = format.length;

                ps = s.datapoints.pointsize;
                points = s.datapoints.points;

                var insertSteps = s.lines.show && s.lines.steps;
                s.xaxis.used = s.yaxis.used = true;

                for (j = k = 0; j < data.length; ++j, k += ps) {
                    p = data[j];

                    var nullify = p == null;
                    if (!nullify) {
                        for (m = 0; m < ps; ++m) {
                            val = p[m];
                            f = format[m];

                            if (f) {
                                if (f.number && val != null) {
                                    val = +val; // convert to number
                                    if (isNaN(val))
                                        val = null;
                                    else if (val == Infinity)
                                        val = fakeInfinity;
                                    else if (val == -Infinity)
                                        val = -fakeInfinity;
                                }

                                if (val == null) {
                                    if (f.required)
                                        nullify = true;

                                    if (f.defaultValue != null)
                                        val = f.defaultValue;
                                }
                            }

                            points[k + m] = val;
                        }
                    }

                    if (nullify) {
                        for (m = 0; m < ps; ++m) {
                            val = points[k + m];
                            if (val != null) {
                                f = format[m];
                                // extract min/max info
                                if (f.autoscale !== false) {
                                    if (f.x) {
                                        updateAxis(s.xaxis, val, val);
                                    }
                                    if (f.y) {
                                        updateAxis(s.yaxis, val, val);
                                    }
                                }
                            }
                            points[k + m] = null;
                        }
                    }
                    else {
                        // a little bit of line specific stuff that
                        // perhaps shouldn't be here, but lacking
                        // better means...
                        if (insertSteps && k > 0
                            && points[k - ps] != null
                            && points[k - ps] != points[k]
                            && points[k - ps + 1] != points[k + 1]) {
                            // copy the point to make room for a middle point
                            for (m = 0; m < ps; ++m)
                                points[k + ps + m] = points[k + m];

                            // middle point has same y
                            points[k + 1] = points[k - ps + 1];

                            // we've added a point, better reflect that
                            k += ps;
                        }
                    }
                }
            }

            // give the hooks a chance to run
            for (i = 0; i < series.length; ++i) {
                s = series[i];

                executeHooks(hooks.processDatapoints, [ s, s.datapoints]);
            }

            // second pass: find datamax/datamin for auto-scaling
            for (i = 0; i < series.length; ++i) {
                s = series[i];
                points = s.datapoints.points;
                ps = s.datapoints.pointsize;
                format = s.datapoints.format;

                var xmin = topSentry, ymin = topSentry,
                    xmax = bottomSentry, ymax = bottomSentry;

                for (j = 0; j < points.length; j += ps) {
                    if (points[j] == null)
                        continue;

                    for (m = 0; m < ps; ++m) {
                        val = points[j + m];
                        f = format[m];
                        if (!f || f.autoscale === false || val == fakeInfinity || val == -fakeInfinity)
                            continue;

                        if (f.x) {
                            if (val < xmin)
                                xmin = val;
                            if (val > xmax)
                                xmax = val;
                        }
                        if (f.y) {
                            if (val < ymin)
                                ymin = val;
                            if (val > ymax)
                                ymax = val;
                        }
                    }
                }

                if (s.bars.show) {
                    // make sure we got room for the bar on the dancing floor
                    var delta;

                    switch (s.bars.align) {
                        case "left":
                            delta = 0;
                            break;
                        case "right":
                            delta = -s.bars.barWidth;
                            break;
                        default:
                            delta = -s.bars.barWidth / 2;
                    }

                    if (s.bars.horizontal) {
                        ymin += delta;
                        ymax += delta + s.bars.barWidth;
                    }
                    else {
                        xmin += delta;
                        xmax += delta + s.bars.barWidth;
                    }
                }

                updateAxis(s.xaxis, xmin, xmax);
                updateAxis(s.yaxis, ymin, ymax);
            }

            $.each(allAxes(), function (_, axis) {
                if (axis.datamin == topSentry)
                    axis.datamin = null;
                if (axis.datamax == bottomSentry)
                    axis.datamax = null;
            });
        }

        function setupCanvases() {

            // Make sure the placeholder is clear of everything except canvases
            // from a previous plot in this container that we'll try to re-use.

            placeholder.css("padding", 0) // padding messes up the positioning
                .children().filter(function(){
                    return !$(this).hasClass("flot-overlay") && !$(this).hasClass('flot-base');
                }).remove();

            if (placeholder.css("position") == 'static')
                placeholder.css("position", "relative"); // for positioning labels and overlay

            surface = new Canvas("flot-base", placeholder);
            overlay = new Canvas("flot-overlay", placeholder); // overlay canvas for interactive features

            ctx = surface.context;
            octx = overlay.context;

            // define which element we're listening for events on
            eventHolder = $(overlay.element).unbind();

            // If we're re-using a plot object, shut down the old one

            var existing = placeholder.data("plot");

            if (existing) {
                existing.shutdown();
                overlay.clear();
            }

            // save in case we get replotted
            placeholder.data("plot", plot);
        }

        function bindEvents() {
            // bind events
            if (options.grid.hoverable) {
                eventHolder.mousemove(onMouseMove);

                // Use bind, rather than .mouseleave, because we officially
                // still support jQuery 1.2.6, which doesn't define a shortcut
                // for mouseenter or mouseleave.  This was a bug/oversight that
                // was fixed somewhere around 1.3.x.  We can return to using
                // .mouseleave when we drop support for 1.2.6.

                eventHolder.bind("mouseleave", onMouseLeave);
            }

            if (options.grid.clickable)
                eventHolder.click(onClick);

            executeHooks(hooks.bindEvents, [eventHolder]);
        }

        function shutdown() {
            if (redrawTimeout)
                clearTimeout(redrawTimeout);

            eventHolder.unbind("mousemove", onMouseMove);
            eventHolder.unbind("mouseleave", onMouseLeave);
            eventHolder.unbind("click", onClick);

            executeHooks(hooks.shutdown, [eventHolder]);
        }

        function setTransformationHelpers(axis) {
            // set helper functions on the axis, assumes plot area
            // has been computed already

            function identity(x) { return x; }

            var s, m, t = axis.options.transform || identity,
                it = axis.options.inverseTransform;

            // precompute how much the axis is scaling a point
            // in canvas space
            if (axis.direction == "x") {
                s = axis.scale = plotWidth / Math.abs(t(axis.max) - t(axis.min));
                m = Math.min(t(axis.max), t(axis.min));
            }
            else {
                s = axis.scale = plotHeight / Math.abs(t(axis.max) - t(axis.min));
                s = -s;
                m = Math.max(t(axis.max), t(axis.min));
            }

            // data point to canvas coordinate
            if (t == identity) // slight optimization
                axis.p2c = function (p) { return (p - m) * s; };
            else
                axis.p2c = function (p) { return (t(p) - m) * s; };
            // canvas coordinate to data point
            if (!it)
                axis.c2p = function (c) { return m + c / s; };
            else
                axis.c2p = function (c) { return it(m + c / s); };
        }

        function measureTickLabels(axis) {

            var opts = axis.options,
                ticks = axis.ticks || [],
                labelWidth = opts.labelWidth || 0,
                labelHeight = opts.labelHeight || 0,
                maxWidth = labelWidth || (axis.direction == "x" ? Math.floor(surface.width / (ticks.length || 1)) : null),
                legacyStyles = axis.direction + "Axis " + axis.direction + axis.n + "Axis",
                layer = "flot-" + axis.direction + "-axis flot-" + axis.direction + axis.n + "-axis " + legacyStyles,
                font = opts.font || "flot-tick-label tickLabel";

            for (var i = 0; i < ticks.length; ++i) {

                var t = ticks[i];

                if (!t.label)
                    continue;

                var info = surface.getTextInfo(layer, t.label, font, null, maxWidth);

                labelWidth = Math.max(labelWidth, info.width);
                labelHeight = Math.max(labelHeight, info.height);
            }

            axis.labelWidth = opts.labelWidth || labelWidth;
            axis.labelHeight = opts.labelHeight || labelHeight;
        }

        function allocateAxisBoxFirstPhase(axis) {
            // find the bounding box of the axis by looking at label
            // widths/heights and ticks, make room by diminishing the
            // plotOffset; this first phase only looks at one
            // dimension per axis, the other dimension depends on the
            // other axes so will have to wait

            var lw = axis.labelWidth,
                lh = axis.labelHeight,
                pos = axis.options.position,
                isXAxis = axis.direction === "x",
                tickLength = axis.options.tickLength,
                axisMargin = options.grid.axisMargin,
                padding = options.grid.labelMargin,
                innermost = true,
                outermost = true,
                first = true,
                found = false;

            // Determine the axis's position in its direction and on its side

            $.each(isXAxis ? xaxes : yaxes, function(i, a) {
                if (a && (a.show || a.reserveSpace)) {
                    if (a === axis) {
                        found = true;
                    } else if (a.options.position === pos) {
                        if (found) {
                            outermost = false;
                        } else {
                            innermost = false;
                        }
                    }
                    if (!found) {
                        first = false;
                    }
                }
            });

            // The outermost axis on each side has no margin

            if (outermost) {
                axisMargin = 0;
            }

            // The ticks for the first axis in each direction stretch across

            if (tickLength == null) {
                tickLength = first ? "full" : 5;
            }

            if (!isNaN(+tickLength))
                padding += +tickLength;

            if (isXAxis) {
                lh += padding;

                if (pos == "bottom") {
                    plotOffset.bottom += lh + axisMargin;
                    axis.box = { top: surface.height - plotOffset.bottom, height: lh };
                }
                else {
                    axis.box = { top: plotOffset.top + axisMargin, height: lh };
                    plotOffset.top += lh + axisMargin;
                }
            }
            else {
                lw += padding;

                if (pos == "left") {
                    axis.box = { left: plotOffset.left + axisMargin, width: lw };
                    plotOffset.left += lw + axisMargin;
                }
                else {
                    plotOffset.right += lw + axisMargin;
                    axis.box = { left: surface.width - plotOffset.right, width: lw };
                }
            }

             // save for future reference
            axis.position = pos;
            axis.tickLength = tickLength;
            axis.box.padding = padding;
            axis.innermost = innermost;
        }

        function allocateAxisBoxSecondPhase(axis) {
            // now that all axis boxes have been placed in one
            // dimension, we can set the remaining dimension coordinates
            if (axis.direction == "x") {
                axis.box.left = plotOffset.left - axis.labelWidth / 2;
                axis.box.width = surface.width - plotOffset.left - plotOffset.right + axis.labelWidth;
            }
            else {
                axis.box.top = plotOffset.top - axis.labelHeight / 2;
                axis.box.height = surface.height - plotOffset.bottom - plotOffset.top + axis.labelHeight;
            }
        }

        function adjustLayoutForThingsStickingOut() {
            // possibly adjust plot offset to ensure everything stays
            // inside the canvas and isn't clipped off

            var minMargin = options.grid.minBorderMargin,
                axis, i;

            // check stuff from the plot (FIXME: this should just read
            // a value from the series, otherwise it's impossible to
            // customize)
            if (minMargin == null) {
                minMargin = 0;
                for (i = 0; i < series.length; ++i)
                    minMargin = Math.max(minMargin, 2 * (series[i].points.radius + series[i].points.lineWidth/2));
            }

            var margins = {
                left: minMargin,
                right: minMargin,
                top: minMargin,
                bottom: minMargin
            };

            // check axis labels, note we don't check the actual
            // labels but instead use the overall width/height to not
            // jump as much around with replots
            $.each(allAxes(), function (_, axis) {
                if (axis.reserveSpace && axis.ticks && axis.ticks.length) {
                    if (axis.direction === "x") {
                        margins.left = Math.max(margins.left, axis.labelWidth / 2);
                        margins.right = Math.max(margins.right, axis.labelWidth / 2);
                    } else {
                        margins.bottom = Math.max(margins.bottom, axis.labelHeight / 2);
                        margins.top = Math.max(margins.top, axis.labelHeight / 2);
                    }
                }
            });

            plotOffset.left = Math.ceil(Math.max(margins.left, plotOffset.left));
            plotOffset.right = Math.ceil(Math.max(margins.right, plotOffset.right));
            plotOffset.top = Math.ceil(Math.max(margins.top, plotOffset.top));
            plotOffset.bottom = Math.ceil(Math.max(margins.bottom, plotOffset.bottom));
        }

        function setupGrid() {
            var i, axes = allAxes(), showGrid = options.grid.show;

            // Initialize the plot's offset from the edge of the canvas

            for (var a in plotOffset) {
                var margin = options.grid.margin || 0;
                plotOffset[a] = typeof margin == "number" ? margin : margin[a] || 0;
            }

            executeHooks(hooks.processOffset, [plotOffset]);

            // If the grid is visible, add its border width to the offset

            for (var a in plotOffset) {
                if(typeof(options.grid.borderWidth) == "object") {
                    plotOffset[a] += showGrid ? options.grid.borderWidth[a] : 0;
                }
                else {
                    plotOffset[a] += showGrid ? options.grid.borderWidth : 0;
                }
            }

            $.each(axes, function (_, axis) {
                var axisOpts = axis.options;
                axis.show = axisOpts.show == null ? axis.used : axisOpts.show;
                axis.reserveSpace = axisOpts.reserveSpace == null ? axis.show : axisOpts.reserveSpace;
                setRange(axis);
            });

            if (showGrid) {

                var allocatedAxes = $.grep(axes, function (axis) {
                    return axis.show || axis.reserveSpace;
                });

                $.each(allocatedAxes, function (_, axis) {
                    // make the ticks
                    setupTickGeneration(axis);
                    setTicks(axis);
                    snapRangeToTicks(axis, axis.ticks);
                    // find labelWidth/Height for axis
                    measureTickLabels(axis);
                });

                // with all dimensions calculated, we can compute the
                // axis bounding boxes, start from the outside
                // (reverse order)
                for (i = allocatedAxes.length - 1; i >= 0; --i)
                    allocateAxisBoxFirstPhase(allocatedAxes[i]);

                // make sure we've got enough space for things that
                // might stick out
                adjustLayoutForThingsStickingOut();

                $.each(allocatedAxes, function (_, axis) {
                    allocateAxisBoxSecondPhase(axis);
                });
            }

            plotWidth = surface.width - plotOffset.left - plotOffset.right;
            plotHeight = surface.height - plotOffset.bottom - plotOffset.top;

            // now we got the proper plot dimensions, we can compute the scaling
            $.each(axes, function (_, axis) {
                setTransformationHelpers(axis);
            });

            if (showGrid) {
                drawAxisLabels();
            }

            insertLegend();
        }

        function setRange(axis) {
            var opts = axis.options,
                min = +(opts.min != null ? opts.min : axis.datamin),
                max = +(opts.max != null ? opts.max : axis.datamax),
                delta = max - min;

            if (delta == 0.0) {
                // degenerate case
                var widen = max == 0 ? 1 : 0.01;

                if (opts.min == null)
                    min -= widen;
                // always widen max if we couldn't widen min to ensure we
                // don't fall into min == max which doesn't work
                if (opts.max == null || opts.min != null)
                    max += widen;
            }
            else {
                // consider autoscaling
                var margin = opts.autoscaleMargin;
                if (margin != null) {
                    if (opts.min == null) {
                        min -= delta * margin;
                        // make sure we don't go below zero if all values
                        // are positive
                        if (min < 0 && axis.datamin != null && axis.datamin >= 0)
                            min = 0;
                    }
                    if (opts.max == null) {
                        max += delta * margin;
                        if (max > 0 && axis.datamax != null && axis.datamax <= 0)
                            max = 0;
                    }
                }
            }
            axis.min = min;
            axis.max = max;
        }

        function setupTickGeneration(axis) {
            var opts = axis.options;

            // estimate number of ticks
            var noTicks;
            if (typeof opts.ticks == "number" && opts.ticks > 0)
                noTicks = opts.ticks;
            else
                // heuristic based on the model a*sqrt(x) fitted to
                // some data points that seemed reasonable
                noTicks = 0.3 * Math.sqrt(axis.direction == "x" ? surface.width : surface.height);

            var delta = (axis.max - axis.min) / noTicks,
                dec = -Math.floor(Math.log(delta) / Math.LN10),
                maxDec = opts.tickDecimals;

            if (maxDec != null && dec > maxDec) {
                dec = maxDec;
            }

            var magn = Math.pow(10, -dec),
                norm = delta / magn, // norm is between 1.0 and 10.0
                size;

            if (norm < 1.5) {
                size = 1;
            } else if (norm < 3) {
                size = 2;
                // special case for 2.5, requires an extra decimal
                if (norm > 2.25 && (maxDec == null || dec + 1 <= maxDec)) {
                    size = 2.5;
                    ++dec;
                }
            } else if (norm < 7.5) {
                size = 5;
            } else {
                size = 10;
            }

            size *= magn;

            if (opts.minTickSize != null && size < opts.minTickSize) {
                size = opts.minTickSize;
            }

            axis.delta = delta;
            axis.tickDecimals = Math.max(0, maxDec != null ? maxDec : dec);
            axis.tickSize = opts.tickSize || size;

            // Time mode was moved to a plug-in in 0.8, and since so many people use it
            // we'll add an especially friendly reminder to make sure they included it.

            if (opts.mode == "time" && !axis.tickGenerator) {
                throw new Error("Time mode requires the flot.time plugin.");
            }

            // Flot supports base-10 axes; any other mode else is handled by a plug-in,
            // like flot.time.js.

            if (!axis.tickGenerator) {

                axis.tickGenerator = function (axis) {

                    var ticks = [],
                        start = floorInBase(axis.min, axis.tickSize),
                        i = 0,
                        v = Number.NaN,
                        prev;

                    do {
                        prev = v;
                        v = start + i * axis.tickSize;
                        ticks.push(v);
                        ++i;
                    } while (v < axis.max && v != prev);
                    return ticks;
                };

				axis.tickFormatter = function (value, axis) {

					var factor = axis.tickDecimals ? Math.pow(10, axis.tickDecimals) : 1;
					var formatted = "" + Math.round(value * factor) / factor;

					// If tickDecimals was specified, ensure that we have exactly that
					// much precision; otherwise default to the value's own precision.

					if (axis.tickDecimals != null) {
						var decimal = formatted.indexOf(".");
						var precision = decimal == -1 ? 0 : formatted.length - decimal - 1;
						if (precision < axis.tickDecimals) {
							return (precision ? formatted : formatted + ".") + ("" + factor).substr(1, axis.tickDecimals - precision);
						}
					}

                    return formatted;
                };
            }

            if ($.isFunction(opts.tickFormatter))
                axis.tickFormatter = function (v, axis) { return "" + opts.tickFormatter(v, axis); };

            if (opts.alignTicksWithAxis != null) {
                var otherAxis = (axis.direction == "x" ? xaxes : yaxes)[opts.alignTicksWithAxis - 1];
                if (otherAxis && otherAxis.used && otherAxis != axis) {
                    // consider snapping min/max to outermost nice ticks
                    var niceTicks = axis.tickGenerator(axis);
                    if (niceTicks.length > 0) {
                        if (opts.min == null)
                            axis.min = Math.min(axis.min, niceTicks[0]);
                        if (opts.max == null && niceTicks.length > 1)
                            axis.max = Math.max(axis.max, niceTicks[niceTicks.length - 1]);
                    }

                    axis.tickGenerator = function (axis) {
                        // copy ticks, scaled to this axis
                        var ticks = [], v, i;
                        for (i = 0; i < otherAxis.ticks.length; ++i) {
                            v = (otherAxis.ticks[i].v - otherAxis.min) / (otherAxis.max - otherAxis.min);
                            v = axis.min + v * (axis.max - axis.min);
                            ticks.push(v);
                        }
                        return ticks;
                    };

                    // we might need an extra decimal since forced
                    // ticks don't necessarily fit naturally
                    if (!axis.mode && opts.tickDecimals == null) {
                        var extraDec = Math.max(0, -Math.floor(Math.log(axis.delta) / Math.LN10) + 1),
                            ts = axis.tickGenerator(axis);

                        // only proceed if the tick interval rounded
                        // with an extra decimal doesn't give us a
                        // zero at end
                        if (!(ts.length > 1 && /\..*0$/.test((ts[1] - ts[0]).toFixed(extraDec))))
                            axis.tickDecimals = extraDec;
                    }
                }
            }
        }

        function setTicks(axis) {
            var oticks = axis.options.ticks, ticks = [];
            if (oticks == null || (typeof oticks == "number" && oticks > 0))
                ticks = axis.tickGenerator(axis);
            else if (oticks) {
                if ($.isFunction(oticks))
                    // generate the ticks
                    ticks = oticks(axis);
                else
                    ticks = oticks;
            }

            // clean up/labelify the supplied ticks, copy them over
            var i, v;
            axis.ticks = [];
            for (i = 0; i < ticks.length; ++i) {
                var label = null;
                var t = ticks[i];
                if (typeof t == "object") {
                    v = +t[0];
                    if (t.length > 1)
                        label = t[1];
                }
                else
                    v = +t;
                if (label == null)
                    label = axis.tickFormatter(v, axis);
                if (!isNaN(v))
                    axis.ticks.push({ v: v, label: label });
            }
        }

        function snapRangeToTicks(axis, ticks) {
            if (axis.options.autoscaleMargin && ticks.length > 0) {
                // snap to ticks
                if (axis.options.min == null)
                    axis.min = Math.min(axis.min, ticks[0].v);
                if (axis.options.max == null && ticks.length > 1)
                    axis.max = Math.max(axis.max, ticks[ticks.length - 1].v);
            }
        }

        function draw() {

            surface.clear();

            executeHooks(hooks.drawBackground, [ctx]);

            var grid = options.grid;

            // draw background, if any
            if (grid.show && grid.backgroundColor)
                drawBackground();

            if (grid.show && !grid.aboveData) {
                drawGrid();
            }

            for (var i = 0; i < series.length; ++i) {
                executeHooks(hooks.drawSeries, [ctx, series[i]]);
                drawSeries(series[i]);
            }

            executeHooks(hooks.draw, [ctx]);

            if (grid.show && grid.aboveData) {
                drawGrid();
            }

            surface.render();

            // A draw implies that either the axes or data have changed, so we
            // should probably update the overlay highlights as well.

            triggerRedrawOverlay();
        }

        function extractRange(ranges, coord) {
            var axis, from, to, key, axes = allAxes();

            for (var i = 0; i < axes.length; ++i) {
                axis = axes[i];
                if (axis.direction == coord) {
                    key = coord + axis.n + "axis";
                    if (!ranges[key] && axis.n == 1)
                        key = coord + "axis"; // support x1axis as xaxis
                    if (ranges[key]) {
                        from = ranges[key].from;
                        to = ranges[key].to;
                        break;
                    }
                }
            }

            // backwards-compat stuff - to be removed in future
            if (!ranges[key]) {
                axis = coord == "x" ? xaxes[0] : yaxes[0];
                from = ranges[coord + "1"];
                to = ranges[coord + "2"];
            }

            // auto-reverse as an added bonus
            if (from != null && to != null && from > to) {
                var tmp = from;
                from = to;
                to = tmp;
            }

            return { from: from, to: to, axis: axis };
        }

        function drawBackground() {
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);

            ctx.fillStyle = getColorOrGradient(options.grid.backgroundColor, plotHeight, 0, "rgba(255, 255, 255, 0)");
            ctx.fillRect(0, 0, plotWidth, plotHeight);
            ctx.restore();
        }

        function drawGrid() {
            var i, axes, bw, bc;

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);

            // draw markings
            var markings = options.grid.markings;
            if (markings) {
                if ($.isFunction(markings)) {
                    axes = plot.getAxes();
                    // xmin etc. is backwards compatibility, to be
                    // removed in the future
                    axes.xmin = axes.xaxis.min;
                    axes.xmax = axes.xaxis.max;
                    axes.ymin = axes.yaxis.min;
                    axes.ymax = axes.yaxis.max;

                    markings = markings(axes);
                }

                for (i = 0; i < markings.length; ++i) {
                    var m = markings[i],
                        xrange = extractRange(m, "x"),
                        yrange = extractRange(m, "y");

                    // fill in missing
                    if (xrange.from == null)
                        xrange.from = xrange.axis.min;
                    if (xrange.to == null)
                        xrange.to = xrange.axis.max;
                    if (yrange.from == null)
                        yrange.from = yrange.axis.min;
                    if (yrange.to == null)
                        yrange.to = yrange.axis.max;

                    // clip
                    if (xrange.to < xrange.axis.min || xrange.from > xrange.axis.max ||
                        yrange.to < yrange.axis.min || yrange.from > yrange.axis.max)
                        continue;

                    xrange.from = Math.max(xrange.from, xrange.axis.min);
                    xrange.to = Math.min(xrange.to, xrange.axis.max);
                    yrange.from = Math.max(yrange.from, yrange.axis.min);
                    yrange.to = Math.min(yrange.to, yrange.axis.max);

                    var xequal = xrange.from === xrange.to,
                        yequal = yrange.from === yrange.to;

                    if (xequal && yequal) {
                        continue;
                    }

                    // then draw
                    xrange.from = Math.floor(xrange.axis.p2c(xrange.from));
                    xrange.to = Math.floor(xrange.axis.p2c(xrange.to));
                    yrange.from = Math.floor(yrange.axis.p2c(yrange.from));
                    yrange.to = Math.floor(yrange.axis.p2c(yrange.to));

                    if (xequal || yequal) {
                        var lineWidth = m.lineWidth || options.grid.markingsLineWidth,
                            subPixel = lineWidth % 2 ? 0.5 : 0;
                        ctx.beginPath();
                        ctx.strokeStyle = m.color || options.grid.markingsColor;
                        ctx.lineWidth = lineWidth;
                        if (xequal) {
                            ctx.moveTo(xrange.to + subPixel, yrange.from);
                            ctx.lineTo(xrange.to + subPixel, yrange.to);
                        } else {
                            ctx.moveTo(xrange.from, yrange.to + subPixel);
                            ctx.lineTo(xrange.to, yrange.to + subPixel);                            
                        }
                        ctx.stroke();
                    } else {
                        ctx.fillStyle = m.color || options.grid.markingsColor;
                        ctx.fillRect(xrange.from, yrange.to,
                                     xrange.to - xrange.from,
                                     yrange.from - yrange.to);
                    }
                }
            }

            // draw the ticks
            axes = allAxes();
            bw = options.grid.borderWidth;

            for (var j = 0; j < axes.length; ++j) {
                var axis = axes[j], box = axis.box,
                    t = axis.tickLength, x, y, xoff, yoff;
                if (!axis.show || axis.ticks.length == 0)
                    continue;

                ctx.lineWidth = 1;

                // find the edges
                if (axis.direction == "x") {
                    x = 0;
                    if (t == "full")
                        y = (axis.position == "top" ? 0 : plotHeight);
                    else
                        y = box.top - plotOffset.top + (axis.position == "top" ? box.height : 0);
                }
                else {
                    y = 0;
                    if (t == "full")
                        x = (axis.position == "left" ? 0 : plotWidth);
                    else
                        x = box.left - plotOffset.left + (axis.position == "left" ? box.width : 0);
                }

                // draw tick bar
                if (!axis.innermost) {
                    ctx.strokeStyle = axis.options.color;
                    ctx.beginPath();
                    xoff = yoff = 0;
                    if (axis.direction == "x")
                        xoff = plotWidth + 1;
                    else
                        yoff = plotHeight + 1;

                    if (ctx.lineWidth == 1) {
                        if (axis.direction == "x") {
                            y = Math.floor(y) + 0.5;
                        } else {
                            x = Math.floor(x) + 0.5;
                        }
                    }

                    ctx.moveTo(x, y);
                    ctx.lineTo(x + xoff, y + yoff);
                    ctx.stroke();
                }

                // draw ticks

                ctx.strokeStyle = axis.options.tickColor;

                ctx.beginPath();
                for (i = 0; i < axis.ticks.length; ++i) {
                    var v = axis.ticks[i].v;

                    xoff = yoff = 0;

                    if (isNaN(v) || v < axis.min || v > axis.max
                        // skip those lying on the axes if we got a border
                        || (t == "full"
                            && ((typeof bw == "object" && bw[axis.position] > 0) || bw > 0)
                            && (v == axis.min || v == axis.max)))
                        continue;

                    if (axis.direction == "x") {
                        x = axis.p2c(v);
                        yoff = t == "full" ? -plotHeight : t;

                        if (axis.position == "top")
                            yoff = -yoff;
                    }
                    else {
                        y = axis.p2c(v);
                        xoff = t == "full" ? -plotWidth : t;

                        if (axis.position == "left")
                            xoff = -xoff;
                    }

                    if (ctx.lineWidth == 1) {
                        if (axis.direction == "x")
                            x = Math.floor(x) + 0.5;
                        else
                            y = Math.floor(y) + 0.5;
                    }

                    ctx.moveTo(x, y);
                    ctx.lineTo(x + xoff, y + yoff);
                }

                ctx.stroke();
            }


            // draw border
            if (bw) {
                // If either borderWidth or borderColor is an object, then draw the border
                // line by line instead of as one rectangle
                bc = options.grid.borderColor;
                if(typeof bw == "object" || typeof bc == "object") {
                    if (typeof bw !== "object") {
                        bw = {top: bw, right: bw, bottom: bw, left: bw};
                    }
                    if (typeof bc !== "object") {
                        bc = {top: bc, right: bc, bottom: bc, left: bc};
                    }

                    if (bw.top > 0) {
                        ctx.strokeStyle = bc.top;
                        ctx.lineWidth = bw.top;
                        ctx.beginPath();
                        ctx.moveTo(0 - bw.left, 0 - bw.top/2);
                        ctx.lineTo(plotWidth, 0 - bw.top/2);
                        ctx.stroke();
                    }

                    if (bw.right > 0) {
                        ctx.strokeStyle = bc.right;
                        ctx.lineWidth = bw.right;
                        ctx.beginPath();
                        ctx.moveTo(plotWidth + bw.right / 2, 0 - bw.top);
                        ctx.lineTo(plotWidth + bw.right / 2, plotHeight);
                        ctx.stroke();
                    }

                    if (bw.bottom > 0) {
                        ctx.strokeStyle = bc.bottom;
                        ctx.lineWidth = bw.bottom;
                        ctx.beginPath();
                        ctx.moveTo(plotWidth + bw.right, plotHeight + bw.bottom / 2);
                        ctx.lineTo(0, plotHeight + bw.bottom / 2);
                        ctx.stroke();
                    }

                    if (bw.left > 0) {
                        ctx.strokeStyle = bc.left;
                        ctx.lineWidth = bw.left;
                        ctx.beginPath();
                        ctx.moveTo(0 - bw.left/2, plotHeight + bw.bottom);
                        ctx.lineTo(0- bw.left/2, 0);
                        ctx.stroke();
                    }
                }
                else {
                    ctx.lineWidth = bw;
                    ctx.strokeStyle = options.grid.borderColor;
                    ctx.strokeRect(-bw/2, -bw/2, plotWidth + bw, plotHeight + bw);
                }
            }

            ctx.restore();
        }

        function drawAxisLabels() {

            $.each(allAxes(), function (_, axis) {
                var box = axis.box,
                    legacyStyles = axis.direction + "Axis " + axis.direction + axis.n + "Axis",
                    layer = "flot-" + axis.direction + "-axis flot-" + axis.direction + axis.n + "-axis " + legacyStyles,
                    font = axis.options.font || "flot-tick-label tickLabel",
                    tick, x, y, halign, valign;

                // Remove text before checking for axis.show and ticks.length;
                // otherwise plugins, like flot-tickrotor, that draw their own
                // tick labels will end up with both theirs and the defaults.

                surface.removeText(layer);

                if (!axis.show || axis.ticks.length == 0)
                    return;

                for (var i = 0; i < axis.ticks.length; ++i) {

                    tick = axis.ticks[i];
                    if (!tick.label || tick.v < axis.min || tick.v > axis.max)
                        continue;

                    if (axis.direction == "x") {
                        halign = "center";
                        x = plotOffset.left + axis.p2c(tick.v);
                        if (axis.position == "bottom") {
                            y = box.top + box.padding;
                        } else {
                            y = box.top + box.height - box.padding;
                            valign = "bottom";
                        }
                    } else {
                        valign = "middle";
                        y = plotOffset.top + axis.p2c(tick.v);
                        if (axis.position == "left") {
                            x = box.left + box.width - box.padding;
                            halign = "right";
                        } else {
                            x = box.left + box.padding;
                        }
                    }

                    surface.addText(layer, x, y, tick.label, font, null, null, halign, valign);
                }
            });
        }

        function drawSeries(series) {
            if (series.lines.show)
                drawSeriesLines(series);
            if (series.bars.show)
                drawSeriesBars(series);
            if (series.points.show)
                drawSeriesPoints(series);
        }

        function drawSeriesLines(series) {
            function plotLine(datapoints, xoffset, yoffset, axisx, axisy) {
                var points = datapoints.points,
                    ps = datapoints.pointsize,
                    prevx = null, prevy = null;

                ctx.beginPath();
                for (var i = ps; i < points.length; i += ps) {
                    var x1 = points[i - ps], y1 = points[i - ps + 1],
                        x2 = points[i], y2 = points[i + 1];

                    if (x1 == null || x2 == null)
                        continue;

                    // clip with ymin
                    if (y1 <= y2 && y1 < axisy.min) {
                        if (y2 < axisy.min)
                            continue;   // line segment is outside
                        // compute new intersection point
                        x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.min;
                    }
                    else if (y2 <= y1 && y2 < axisy.min) {
                        if (y1 < axisy.min)
                            continue;
                        x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.min;
                    }

                    // clip with ymax
                    if (y1 >= y2 && y1 > axisy.max) {
                        if (y2 > axisy.max)
                            continue;
                        x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.max;
                    }
                    else if (y2 >= y1 && y2 > axisy.max) {
                        if (y1 > axisy.max)
                            continue;
                        x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.max;
                    }

                    // clip with xmin
                    if (x1 <= x2 && x1 < axisx.min) {
                        if (x2 < axisx.min)
                            continue;
                        y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.min;
                    }
                    else if (x2 <= x1 && x2 < axisx.min) {
                        if (x1 < axisx.min)
                            continue;
                        y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.min;
                    }

                    // clip with xmax
                    if (x1 >= x2 && x1 > axisx.max) {
                        if (x2 > axisx.max)
                            continue;
                        y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.max;
                    }
                    else if (x2 >= x1 && x2 > axisx.max) {
                        if (x1 > axisx.max)
                            continue;
                        y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.max;
                    }

                    if (x1 != prevx || y1 != prevy)
                        ctx.moveTo(axisx.p2c(x1) + xoffset, axisy.p2c(y1) + yoffset);

                    prevx = x2;
                    prevy = y2;
                    ctx.lineTo(axisx.p2c(x2) + xoffset, axisy.p2c(y2) + yoffset);
                }
                ctx.stroke();
            }

            function plotLineArea(datapoints, axisx, axisy) {
                var points = datapoints.points,
                    ps = datapoints.pointsize,
                    bottom = Math.min(Math.max(0, axisy.min), axisy.max),
                    i = 0, top, areaOpen = false,
                    ypos = 1, segmentStart = 0, segmentEnd = 0;

                // we process each segment in two turns, first forward
                // direction to sketch out top, then once we hit the
                // end we go backwards to sketch the bottom
                while (true) {
                    if (ps > 0 && i > points.length + ps)
                        break;

                    i += ps; // ps is negative if going backwards

                    var x1 = points[i - ps],
                        y1 = points[i - ps + ypos],
                        x2 = points[i], y2 = points[i + ypos];

                    if (areaOpen) {
                        if (ps > 0 && x1 != null && x2 == null) {
                            // at turning point
                            segmentEnd = i;
                            ps = -ps;
                            ypos = 2;
                            continue;
                        }

                        if (ps < 0 && i == segmentStart + ps) {
                            // done with the reverse sweep
                            ctx.fill();
                            areaOpen = false;
                            ps = -ps;
                            ypos = 1;
                            i = segmentStart = segmentEnd + ps;
                            continue;
                        }
                    }

                    if (x1 == null || x2 == null)
                        continue;

                    // clip x values

                    // clip with xmin
                    if (x1 <= x2 && x1 < axisx.min) {
                        if (x2 < axisx.min)
                            continue;
                        y1 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.min;
                    }
                    else if (x2 <= x1 && x2 < axisx.min) {
                        if (x1 < axisx.min)
                            continue;
                        y2 = (axisx.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.min;
                    }

                    // clip with xmax
                    if (x1 >= x2 && x1 > axisx.max) {
                        if (x2 > axisx.max)
                            continue;
                        y1 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = axisx.max;
                    }
                    else if (x2 >= x1 && x2 > axisx.max) {
                        if (x1 > axisx.max)
                            continue;
                        y2 = (axisx.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = axisx.max;
                    }

                    if (!areaOpen) {
                        // open area
                        ctx.beginPath();
                        ctx.moveTo(axisx.p2c(x1), axisy.p2c(bottom));
                        areaOpen = true;
                    }

                    // now first check the case where both is outside
                    if (y1 >= axisy.max && y2 >= axisy.max) {
                        ctx.lineTo(axisx.p2c(x1), axisy.p2c(axisy.max));
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(axisy.max));
                        continue;
                    }
                    else if (y1 <= axisy.min && y2 <= axisy.min) {
                        ctx.lineTo(axisx.p2c(x1), axisy.p2c(axisy.min));
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(axisy.min));
                        continue;
                    }

                    // else it's a bit more complicated, there might
                    // be a flat maxed out rectangle first, then a
                    // triangular cutout or reverse; to find these
                    // keep track of the current x values
                    var x1old = x1, x2old = x2;

                    // clip the y values, without shortcutting, we
                    // go through all cases in turn

                    // clip with ymin
                    if (y1 <= y2 && y1 < axisy.min && y2 >= axisy.min) {
                        x1 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.min;
                    }
                    else if (y2 <= y1 && y2 < axisy.min && y1 >= axisy.min) {
                        x2 = (axisy.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.min;
                    }

                    // clip with ymax
                    if (y1 >= y2 && y1 > axisy.max && y2 <= axisy.max) {
                        x1 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = axisy.max;
                    }
                    else if (y2 >= y1 && y2 > axisy.max && y1 <= axisy.max) {
                        x2 = (axisy.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = axisy.max;
                    }

                    // if the x value was changed we got a rectangle
                    // to fill
                    if (x1 != x1old) {
                        ctx.lineTo(axisx.p2c(x1old), axisy.p2c(y1));
                        // it goes to (x1, y1), but we fill that below
                    }

                    // fill triangular section, this sometimes result
                    // in redundant points if (x1, y1) hasn't changed
                    // from previous line to, but we just ignore that
                    ctx.lineTo(axisx.p2c(x1), axisy.p2c(y1));
                    ctx.lineTo(axisx.p2c(x2), axisy.p2c(y2));

                    // fill the other rectangle if it's there
                    if (x2 != x2old) {
                        ctx.lineTo(axisx.p2c(x2), axisy.p2c(y2));
                        ctx.lineTo(axisx.p2c(x2old), axisy.p2c(y2));
                    }
                }
            }

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            ctx.lineJoin = "round";

            var lw = series.lines.lineWidth,
                sw = series.shadowSize;
            // FIXME: consider another form of shadow when filling is turned on
            if (lw > 0 && sw > 0) {
                // draw shadow as a thick and thin line with transparency
                ctx.lineWidth = sw;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                // position shadow at angle from the mid of line
                var angle = Math.PI/18;
                plotLine(series.datapoints, Math.sin(angle) * (lw/2 + sw/2), Math.cos(angle) * (lw/2 + sw/2), series.xaxis, series.yaxis);
                ctx.lineWidth = sw/2;
                plotLine(series.datapoints, Math.sin(angle) * (lw/2 + sw/4), Math.cos(angle) * (lw/2 + sw/4), series.xaxis, series.yaxis);
            }

            ctx.lineWidth = lw;
            ctx.strokeStyle = series.color;
            var fillStyle = getFillStyle(series.lines, series.color, 0, plotHeight);
            if (fillStyle) {
                ctx.fillStyle = fillStyle;
                plotLineArea(series.datapoints, series.xaxis, series.yaxis);
            }

            if (lw > 0)
                plotLine(series.datapoints, 0, 0, series.xaxis, series.yaxis);
            ctx.restore();
        }

        function drawSeriesPoints(series) {
            function plotPoints(datapoints, radius, fillStyle, offset, shadow, axisx, axisy, symbol) {
                var points = datapoints.points, ps = datapoints.pointsize;

                for (var i = 0; i < points.length; i += ps) {
                    var x = points[i], y = points[i + 1];
                    if (x == null || x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max)
                        continue;

                    ctx.beginPath();
                    x = axisx.p2c(x);
                    y = axisy.p2c(y) + offset;
                    if (symbol == "circle")
                        ctx.arc(x, y, radius, 0, shadow ? Math.PI : Math.PI * 2, false);
                    else
                        symbol(ctx, x, y, radius, shadow);
                    ctx.closePath();

                    if (fillStyle) {
                        ctx.fillStyle = fillStyle;
                        ctx.fill();
                    }
                    ctx.stroke();
                }
            }

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);

            var lw = series.points.lineWidth,
                sw = series.shadowSize,
                radius = series.points.radius,
                symbol = series.points.symbol;

            // If the user sets the line width to 0, we change it to a very 
            // small value. A line width of 0 seems to force the default of 1.
            // Doing the conditional here allows the shadow setting to still be 
            // optional even with a lineWidth of 0.

            if( lw == 0 )
                lw = 0.0001;

            if (lw > 0 && sw > 0) {
                // draw shadow in two steps
                var w = sw / 2;
                ctx.lineWidth = w;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                plotPoints(series.datapoints, radius, null, w + w/2, true,
                           series.xaxis, series.yaxis, symbol);

                ctx.strokeStyle = "rgba(0,0,0,0.2)";
                plotPoints(series.datapoints, radius, null, w/2, true,
                           series.xaxis, series.yaxis, symbol);
            }

            ctx.lineWidth = lw;
            ctx.strokeStyle = series.color;
            plotPoints(series.datapoints, radius,
                       getFillStyle(series.points, series.color), 0, false,
                       series.xaxis, series.yaxis, symbol);
            ctx.restore();
        }

        function drawBar(x, y, b, barLeft, barRight, fillStyleCallback, axisx, axisy, c, horizontal, lineWidth) {
            var left, right, bottom, top,
                drawLeft, drawRight, drawTop, drawBottom,
                tmp;

            // in horizontal mode, we start the bar from the left
            // instead of from the bottom so it appears to be
            // horizontal rather than vertical
            if (horizontal) {
                drawBottom = drawRight = drawTop = true;
                drawLeft = false;
                left = b;
                right = x;
                top = y + barLeft;
                bottom = y + barRight;

                // account for negative bars
                if (right < left) {
                    tmp = right;
                    right = left;
                    left = tmp;
                    drawLeft = true;
                    drawRight = false;
                }
            }
            else {
                drawLeft = drawRight = drawTop = true;
                drawBottom = false;
                left = x + barLeft;
                right = x + barRight;
                bottom = b;
                top = y;

                // account for negative bars
                if (top < bottom) {
                    tmp = top;
                    top = bottom;
                    bottom = tmp;
                    drawBottom = true;
                    drawTop = false;
                }
            }

            // clip
            if (right < axisx.min || left > axisx.max ||
                top < axisy.min || bottom > axisy.max)
                return;

            if (left < axisx.min) {
                left = axisx.min;
                drawLeft = false;
            }

            if (right > axisx.max) {
                right = axisx.max;
                drawRight = false;
            }

            if (bottom < axisy.min) {
                bottom = axisy.min;
                drawBottom = false;
            }

            if (top > axisy.max) {
                top = axisy.max;
                drawTop = false;
            }

            left = axisx.p2c(left);
            bottom = axisy.p2c(bottom);
            right = axisx.p2c(right);
            top = axisy.p2c(top);

            // fill the bar
            if (fillStyleCallback) {
                c.fillStyle = fillStyleCallback(bottom, top);
                c.fillRect(left, top, right - left, bottom - top)
            }

            // draw outline
            if (lineWidth > 0 && (drawLeft || drawRight || drawTop || drawBottom)) {
                c.beginPath();

                // FIXME: inline moveTo is buggy with excanvas
                c.moveTo(left, bottom);
                if (drawLeft)
                    c.lineTo(left, top);
                else
                    c.moveTo(left, top);
                if (drawTop)
                    c.lineTo(right, top);
                else
                    c.moveTo(right, top);
                if (drawRight)
                    c.lineTo(right, bottom);
                else
                    c.moveTo(right, bottom);
                if (drawBottom)
                    c.lineTo(left, bottom);
                else
                    c.moveTo(left, bottom);
                c.stroke();
            }
        }

        function drawSeriesBars(series) {
            function plotBars(datapoints, barLeft, barRight, fillStyleCallback, axisx, axisy) {
                var points = datapoints.points, ps = datapoints.pointsize;

                for (var i = 0; i < points.length; i += ps) {
                    if (points[i] == null)
                        continue;
                    drawBar(points[i], points[i + 1], points[i + 2], barLeft, barRight, fillStyleCallback, axisx, axisy, ctx, series.bars.horizontal, series.bars.lineWidth);
                }
            }

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);

            // FIXME: figure out a way to add shadows (for instance along the right edge)
            ctx.lineWidth = series.bars.lineWidth;
            ctx.strokeStyle = series.color;

            var barLeft;

            switch (series.bars.align) {
                case "left":
                    barLeft = 0;
                    break;
                case "right":
                    barLeft = -series.bars.barWidth;
                    break;
                default:
                    barLeft = -series.bars.barWidth / 2;
            }

            var fillStyleCallback = series.bars.fill ? function (bottom, top) { return getFillStyle(series.bars, series.color, bottom, top); } : null;
            plotBars(series.datapoints, barLeft, barLeft + series.bars.barWidth, fillStyleCallback, series.xaxis, series.yaxis);
            ctx.restore();
        }

        function getFillStyle(filloptions, seriesColor, bottom, top) {
            var fill = filloptions.fill;
            if (!fill)
                return null;

            if (filloptions.fillColor)
                return getColorOrGradient(filloptions.fillColor, bottom, top, seriesColor);

            var c = $.color.parse(seriesColor);
            c.a = typeof fill == "number" ? fill : 0.4;
            c.normalize();
            return c.toString();
        }

        function insertLegend() {

            if (options.legend.container != null) {
                $(options.legend.container).html("");
            } else {
                placeholder.find(".legend").remove();
            }

            if (!options.legend.show) {
                return;
            }

            var fragments = [], entries = [], rowStarted = false,
                lf = options.legend.labelFormatter, s, label;

            // Build a list of legend entries, with each having a label and a color

            for (var i = 0; i < series.length; ++i) {
                s = series[i];
                if (s.label) {
                    label = lf ? lf(s.label, s) : s.label;
                    if (label) {
                        entries.push({
                            label: label,
                            color: s.color
                        });
                    }
                }
            }

            // Sort the legend using either the default or a custom comparator

            if (options.legend.sorted) {
                if ($.isFunction(options.legend.sorted)) {
                    entries.sort(options.legend.sorted);
                } else if (options.legend.sorted == "reverse") {
                	entries.reverse();
                } else {
                    var ascending = options.legend.sorted != "descending";
                    entries.sort(function(a, b) {
                        return a.label == b.label ? 0 : (
                            (a.label < b.label) != ascending ? 1 : -1   // Logical XOR
                        );
                    });
                }
            }

            // Generate markup for the list of entries, in their final order

            for (var i = 0; i < entries.length; ++i) {

                var entry = entries[i];

                if (i % options.legend.noColumns == 0) {
                    if (rowStarted)
                        fragments.push('</tr>');
                    fragments.push('<tr>');
                    rowStarted = true;
                }

                fragments.push(
                    '<td class="legendColorBox"><div style="border:1px solid ' + options.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + entry.color + ';overflow:hidden"></div></div></td>' +
                    '<td class="legendLabel">' + entry.label + '</td>'
                );
            }

            if (rowStarted)
                fragments.push('</tr>');

            if (fragments.length == 0)
                return;

            var table = '<table style="font-size:smaller;color:' + options.grid.color + '">' + fragments.join("") + '</table>';
            if (options.legend.container != null)
                $(options.legend.container).html(table);
            else {
                var pos = "",
                    p = options.legend.position,
                    m = options.legend.margin;
                if (m[0] == null)
                    m = [m, m];
                if (p.charAt(0) == "n")
                    pos += 'top:' + (m[1] + plotOffset.top) + 'px;';
                else if (p.charAt(0) == "s")
                    pos += 'bottom:' + (m[1] + plotOffset.bottom) + 'px;';
                if (p.charAt(1) == "e")
                    pos += 'right:' + (m[0] + plotOffset.right) + 'px;';
                else if (p.charAt(1) == "w")
                    pos += 'left:' + (m[0] + plotOffset.left) + 'px;';
                var legend = $('<div class="legend">' + table.replace('style="', 'style="position:absolute;' + pos +';') + '</div>').appendTo(placeholder);
                if (options.legend.backgroundOpacity != 0.0) {
                    // put in the transparent background
                    // separately to avoid blended labels and
                    // label boxes
                    var c = options.legend.backgroundColor;
                    if (c == null) {
                        c = options.grid.backgroundColor;
                        if (c && typeof c == "string")
                            c = $.color.parse(c);
                        else
                            c = $.color.extract(legend, 'background-color');
                        c.a = 1;
                        c = c.toString();
                    }
                    var div = legend.children();
                    $('<div style="position:absolute;width:' + div.width() + 'px;height:' + div.height() + 'px;' + pos +'background-color:' + c + ';"> </div>').prependTo(legend).css('opacity', options.legend.backgroundOpacity);
                }
            }
        }


        // interactive features

        var highlights = [],
            redrawTimeout = null;

        // returns the data item the mouse is over, or null if none is found
        function findNearbyItem(mouseX, mouseY, seriesFilter) {
            var maxDistance = options.grid.mouseActiveRadius,
                smallestDistance = maxDistance * maxDistance + 1,
                item = null, foundPoint = false, i, j, ps;

            for (i = series.length - 1; i >= 0; --i) {
                if (!seriesFilter(series[i]))
                    continue;

                var s = series[i],
                    axisx = s.xaxis,
                    axisy = s.yaxis,
                    points = s.datapoints.points,
                    mx = axisx.c2p(mouseX), // precompute some stuff to make the loop faster
                    my = axisy.c2p(mouseY),
                    maxx = maxDistance / axisx.scale,
                    maxy = maxDistance / axisy.scale;

                ps = s.datapoints.pointsize;
                // with inverse transforms, we can't use the maxx/maxy
                // optimization, sadly
                if (axisx.options.inverseTransform)
                    maxx = Number.MAX_VALUE;
                if (axisy.options.inverseTransform)
                    maxy = Number.MAX_VALUE;

                if (s.lines.show || s.points.show) {
                    for (j = 0; j < points.length; j += ps) {
                        var x = points[j], y = points[j + 1];
                        if (x == null)
                            continue;

                        // For points and lines, the cursor must be within a
                        // certain distance to the data point
                        if (x - mx > maxx || x - mx < -maxx ||
                            y - my > maxy || y - my < -maxy)
                            continue;

                        // We have to calculate distances in pixels, not in
                        // data units, because the scales of the axes may be different
                        var dx = Math.abs(axisx.p2c(x) - mouseX),
                            dy = Math.abs(axisy.p2c(y) - mouseY),
                            dist = dx * dx + dy * dy; // we save the sqrt

                        // use <= to ensure last point takes precedence
                        // (last generally means on top of)
                        if (dist < smallestDistance) {
                            smallestDistance = dist;
                            item = [i, j / ps];
                        }
                    }
                }

                if (s.bars.show && !item) { // no other point can be nearby

                    var barLeft, barRight;

                    switch (s.bars.align) {
                        case "left":
                            barLeft = 0;
                            break;
                        case "right":
                            barLeft = -s.bars.barWidth;
                            break;
                        default:
                            barLeft = -s.bars.barWidth / 2;
                    }

                    barRight = barLeft + s.bars.barWidth;

                    for (j = 0; j < points.length; j += ps) {
                        var x = points[j], y = points[j + 1], b = points[j + 2];
                        if (x == null)
                            continue;

                        // for a bar graph, the cursor must be inside the bar
                        if (series[i].bars.horizontal ?
                            (mx <= Math.max(b, x) && mx >= Math.min(b, x) &&
                             my >= y + barLeft && my <= y + barRight) :
                            (mx >= x + barLeft && mx <= x + barRight &&
                             my >= Math.min(b, y) && my <= Math.max(b, y)))
                                item = [i, j / ps];
                    }
                }
            }

            if (item) {
                i = item[0];
                j = item[1];
                ps = series[i].datapoints.pointsize;

                return { datapoint: series[i].datapoints.points.slice(j * ps, (j + 1) * ps),
                         dataIndex: j,
                         series: series[i],
                         seriesIndex: i };
            }

            return null;
        }

        function onMouseMove(e) {
            if (options.grid.hoverable)
                triggerClickHoverEvent("plothover", e,
                                       function (s) { return s["hoverable"] != false; });
        }

        function onMouseLeave(e) {
            if (options.grid.hoverable)
                triggerClickHoverEvent("plothover", e,
                                       function (s) { return false; });
        }

        function onClick(e) {
            triggerClickHoverEvent("plotclick", e,
                                   function (s) { return s["clickable"] != false; });
        }

        // trigger click or hover event (they send the same parameters
        // so we share their code)
        function triggerClickHoverEvent(eventname, event, seriesFilter) {
            var offset = eventHolder.offset(),
                canvasX = event.pageX - offset.left - plotOffset.left,
                canvasY = event.pageY - offset.top - plotOffset.top,
            pos = canvasToAxisCoords({ left: canvasX, top: canvasY });

            pos.pageX = event.pageX;
            pos.pageY = event.pageY;

            var item = findNearbyItem(canvasX, canvasY, seriesFilter);

            if (item) {
                // fill in mouse pos for any listeners out there
                item.pageX = parseInt(item.series.xaxis.p2c(item.datapoint[0]) + offset.left + plotOffset.left, 10);
                item.pageY = parseInt(item.series.yaxis.p2c(item.datapoint[1]) + offset.top + plotOffset.top, 10);
            }

            if (options.grid.autoHighlight) {
                // clear auto-highlights
                for (var i = 0; i < highlights.length; ++i) {
                    var h = highlights[i];
                    if (h.auto == eventname &&
                        !(item && h.series == item.series &&
                          h.point[0] == item.datapoint[0] &&
                          h.point[1] == item.datapoint[1]))
                        unhighlight(h.series, h.point);
                }

                if (item)
                    highlight(item.series, item.datapoint, eventname);
            }

            placeholder.trigger(eventname, [ pos, item ]);
        }

        function triggerRedrawOverlay() {
            var t = options.interaction.redrawOverlayInterval;
            if (t == -1) {      // skip event queue
                drawOverlay();
                return;
            }

            if (!redrawTimeout)
                redrawTimeout = setTimeout(drawOverlay, t);
        }

        function drawOverlay() {
            redrawTimeout = null;

            // draw highlights
            octx.save();
            overlay.clear();
            octx.translate(plotOffset.left, plotOffset.top);

            var i, hi;
            for (i = 0; i < highlights.length; ++i) {
                hi = highlights[i];

                if (hi.series.bars.show)
                    drawBarHighlight(hi.series, hi.point);
                else
                    drawPointHighlight(hi.series, hi.point);
            }
            octx.restore();

            executeHooks(hooks.drawOverlay, [octx]);
        }

        function highlight(s, point, auto) {
            if (typeof s == "number")
                s = series[s];

            if (typeof point == "number") {
                var ps = s.datapoints.pointsize;
                point = s.datapoints.points.slice(ps * point, ps * (point + 1));
            }

            var i = indexOfHighlight(s, point);
            if (i == -1) {
                highlights.push({ series: s, point: point, auto: auto });

                triggerRedrawOverlay();
            }
            else if (!auto)
                highlights[i].auto = false;
        }

        function unhighlight(s, point) {
            if (s == null && point == null) {
                highlights = [];
                triggerRedrawOverlay();
                return;
            }

            if (typeof s == "number")
                s = series[s];

            if (typeof point == "number") {
                var ps = s.datapoints.pointsize;
                point = s.datapoints.points.slice(ps * point, ps * (point + 1));
            }

            var i = indexOfHighlight(s, point);
            if (i != -1) {
                highlights.splice(i, 1);

                triggerRedrawOverlay();
            }
        }

        function indexOfHighlight(s, p) {
            for (var i = 0; i < highlights.length; ++i) {
                var h = highlights[i];
                if (h.series == s && h.point[0] == p[0]
                    && h.point[1] == p[1])
                    return i;
            }
            return -1;
        }

        function drawPointHighlight(series, point) {
            var x = point[0], y = point[1],
                axisx = series.xaxis, axisy = series.yaxis,
                highlightColor = (typeof series.highlightColor === "string") ? series.highlightColor : $.color.parse(series.color).scale('a', 0.5).toString();

            if (x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max)
                return;

            var pointRadius = series.points.radius + series.points.lineWidth / 2;
            octx.lineWidth = pointRadius;
            octx.strokeStyle = highlightColor;
            var radius = 1.5 * pointRadius;
            x = axisx.p2c(x);
            y = axisy.p2c(y);

            octx.beginPath();
            if (series.points.symbol == "circle")
                octx.arc(x, y, radius, 0, 2 * Math.PI, false);
            else
                series.points.symbol(octx, x, y, radius, false);
            octx.closePath();
            octx.stroke();
        }

        function drawBarHighlight(series, point) {
            var highlightColor = (typeof series.highlightColor === "string") ? series.highlightColor : $.color.parse(series.color).scale('a', 0.5).toString(),
                fillStyle = highlightColor,
                barLeft;

            switch (series.bars.align) {
                case "left":
                    barLeft = 0;
                    break;
                case "right":
                    barLeft = -series.bars.barWidth;
                    break;
                default:
                    barLeft = -series.bars.barWidth / 2;
            }

            octx.lineWidth = series.bars.lineWidth;
            octx.strokeStyle = highlightColor;

            drawBar(point[0], point[1], point[2] || 0, barLeft, barLeft + series.bars.barWidth,
                    function () { return fillStyle; }, series.xaxis, series.yaxis, octx, series.bars.horizontal, series.bars.lineWidth);
        }

        function getColorOrGradient(spec, bottom, top, defaultColor) {
            if (typeof spec == "string")
                return spec;
            else {
                // assume this is a gradient spec; IE currently only
                // supports a simple vertical gradient properly, so that's
                // what we support too
                var gradient = ctx.createLinearGradient(0, top, 0, bottom);

                for (var i = 0, l = spec.colors.length; i < l; ++i) {
                    var c = spec.colors[i];
                    if (typeof c != "string") {
                        var co = $.color.parse(defaultColor);
                        if (c.brightness != null)
                            co = co.scale('rgb', c.brightness);
                        if (c.opacity != null)
                            co.a *= c.opacity;
                        c = co.toString();
                    }
                    gradient.addColorStop(i / (l - 1), c);
                }

                return gradient;
            }
        }
    }

    // Add the plot function to the top level of the jQuery object

    $.plot = function(placeholder, data, options) {
        //var t0 = new Date();
        var plot = new Plot($(placeholder), data, options, $.plot.plugins);
        //(window.console ? console.log : alert)("time used (msecs): " + ((new Date()).getTime() - t0.getTime()));
        return plot;
    };

    $.plot.version = "0.8.3";

    $.plot.plugins = [];

    // Also add the plot function as a chainable property

    $.fn.plot = function(data, options) {
        return this.each(function() {
            $.plot(this, data, options);
        });
    };

    // round to nearby lower multiple of base
    function floorInBase(n, base) {
        return base * Math.floor(n / base);
    }

})(jQuery);
/**
 * Flot plugin that provides spline interpolation for line graphs
 * author: Alex Bardas < alex.bardas@gmail.com >
 * modified by: Avi Kohn https://github.com/AMKohn
 * based on the spline interpolation described at:
 *		 http://scaledinnovation.com/analytics/splines/aboutSplines.html
 *
 * Example usage: (add in plot options series object)
 *		for linespline:
 *			series: {
 *				...
 *				lines: {
 *					show: false
 *				},
 *				splines: {
 *					show: true,
 *					tension: x, (float between 0 and 1, defaults to 0.5),
 *					lineWidth: y (number, defaults to 2),
 *					fill: z (float between 0 .. 1 or false, as in flot documentation)
 *				},
 *				...
 *			}
 *		areaspline:
 *			series: {
 *				...
 *				lines: {
 *					show: true,
 *					lineWidth: 0, (line drawing will not execute)
 *					fill: x, (float between 0 .. 1, as in flot documentation)
 *					...
 *				},
 *				splines: {
 *					show: true,
 *					tension: 0.5 (float between 0 and 1)
 *				},
 *				...
 *			}
 *
 */


(function($) {
    'use strict'

    /**
     * @param {Number} x0, y0, x1, y1: coordinates of the end (knot) points of the segment
     * @param {Number} x2, y2: the next knot (not connected, but needed to calculate p2)
     * @param {Number} tension: control how far the control points spread
     * @return {Array}: p1 -> control point, from x1 back toward x0
     * 					p2 -> the next control point, returned to become the next segment's p1
     *
     * @api private
     */
    function getControlPoints(x0, y0, x1, y1, x2, y2, tension) {

        var pow = Math.pow,
            sqrt = Math.sqrt,
            d01, d12, fa, fb, p1x, p1y, p2x, p2y;

        //  Scaling factors: distances from this knot to the previous and following knots.
        d01 = sqrt(pow(x1 - x0, 2) + pow(y1 - y0, 2));
        d12 = sqrt(pow(x2 - x1, 2) + pow(y2 - y1, 2));

        fa = tension * d01 / (d01 + d12);
        fb = tension - fa;

        p1x = x1 + fa * (x0 - x2);
        p1y = y1 + fa * (y0 - y2);

        p2x = x1 - fb * (x0 - x2);
        p2y = y1 - fb * (y0 - y2);

        return [p1x, p1y, p2x, p2y];
    }

    var line = [];

    function drawLine(points, ctx, height, fill, seriesColor) {
        var c = $.color.parse(seriesColor);

        c.a = typeof fill == "number" ? fill : .3;
        c.normalize();
        c = c.toString();

        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);

        var plength = points.length;

        for (var i = 0; i < plength; i++) {
            ctx[points[i][3]].apply(ctx, points[i][2]);
        }

        ctx.stroke();

        ctx.lineWidth = 0;
        ctx.lineTo(points[plength - 1][0], height);
        ctx.lineTo(points[0][0], height);

        ctx.closePath();

        if (fill !== false) {
            ctx.fillStyle = c;
            ctx.fill();
        }
    }

    /**
     * @param {Object} ctx: canvas context
     * @param {String} type: accepted strings: 'bezier' or 'quadratic' (defaults to quadratic)
     * @param {Array} points: 2 points for which to draw the interpolation
     * @param {Array} cpoints: control points for those segment points
     *
     * @api private
     */
    function queue(ctx, type, points, cpoints) {
        if (type === void 0 || (type !== 'bezier' && type !== 'quadratic')) {
            type = 'quadratic';
        }
        type = type + 'CurveTo';

        if (line.length == 0) line.push([points[0], points[1], cpoints.concat(points.slice(2)), type]);
        else if (type == "quadraticCurveTo" && points.length == 2) {
            cpoints = cpoints.slice(0, 2).concat(points);

            line.push([points[0], points[1], cpoints, type]);
        }
        else line.push([points[2], points[3], cpoints.concat(points.slice(2)), type]);
    }

    /**
     * @param {Object} plot
     * @param {Object} ctx: canvas context
     * @param {Object} series
     *
     * @api private
     */

    function drawSpline(plot, ctx, series) {
        // Not interested if spline is not requested
        if (series.splines.show !== true) {
            return;
        }

        var cp = [],
        // array of control points
            tension = series.splines.tension || 0.5,
            idx, x, y, points = series.datapoints.points,
            ps = series.datapoints.pointsize,
            plotOffset = plot.getPlotOffset(),
            len = points.length,
            pts = [];

        line = [];

        // Cannot display a linespline/areaspline if there are less than 3 points
        if (len / ps < 4) {
            $.extend(series.lines, series.splines);
            return;
        }

        for (idx = 0; idx < len; idx += ps) {
            x = points[idx];
            y = points[idx + 1];
            if (x == null || x < series.xaxis.min || x > series.xaxis.max || y < series.yaxis.min || y > series.yaxis.max) {
                continue;
            }

            pts.push(series.xaxis.p2c(x) + plotOffset.left, series.yaxis.p2c(y) + plotOffset.top);
        }

        len = pts.length;

        // Draw an open curve, not connected at the ends
        for (idx = 0; idx < len - 2; idx += 2) {
            cp = cp.concat(getControlPoints.apply(this, pts.slice(idx, idx + 6).concat([tension])));
        }

        ctx.save();
        ctx.strokeStyle = series.color;
        ctx.lineWidth = series.splines.lineWidth;

        queue(ctx, 'quadratic', pts.slice(0, 4), cp.slice(0, 2));

        for (idx = 2; idx < len - 3; idx += 2) {
            queue(ctx, 'bezier', pts.slice(idx, idx + 4), cp.slice(2 * idx - 2, 2 * idx + 2));
        }

        queue(ctx, 'quadratic', pts.slice(len - 2, len), [cp[2 * len - 10], cp[2 * len - 9], pts[len - 4], pts[len - 3]]);

        drawLine(line, ctx, plot.height() + 10, series.splines.fill, series.color);

        ctx.restore();
    }

    $.plot.plugins.push({
        init: function(plot) {
            plot.hooks.drawSeries.push(drawSpline);
        },
        options: {
            series: {
                splines: {
                    show: false,
                    lineWidth: 2,
                    tension: 0.5,
                    fill: false
                }
            }
        },
        name: 'spline',
        version: '0.8.2'
    });
})(jQuery);


"use strict";

function stateLoadCallbackFunction(object, callback) {
  $.ajax({
        url: "/data_table_states/load?table=" + object.data("table-name"),
        dataType: "json",
        success(json) {
            callback(json);
        },
        error(){
            toastr.error("Something went wrong. Please reload the page or speak to an Administrator");
        }
    });
}

function stateSaveCallbackFunction(settings, data, object) {
    if (settings.iDraw <= 1) {
        return;
    }
    $.ajax({
        url: "/data_table_states/save?table=" + object.data("table-name"),
        data: { "state": data },
        dataType: "json",
        type: "POST",
        success(){},
        error(){
            toastr.error("Something went wrong. Please reload the page or speak to an Administrator");
        }
    });
}

function initCompleteFunction(settings, json, searchableTable) {
    $("[id ^='target-table-'][id $='_filter'] input").unbind();
    $("[id ^='target-table-'][id $='_filter'] input").bind("keyup", function (e) {
        if (e.keyCode === 13) {
            searchableTable.search(this.value).draw();
        }
    });
}


function humanizeString(str) {
    var restOfStr = str.slice(1).replace(/_/g, " ");

    return str.charAt(0).toUpperCase() + restOfStr;
}
;
"use strict";

function displayActionsBar (table) {
  var filterBar = $(".table--filter-bar-container").html();
  var tableInfo = $(".table--info");
  let checkedCount = $(".data-table--select-input:checked").length;
  let selectedText = $(".filter-bar--selected .white").last();

  if (tableInfo.find(".table--filter-bar").length === 0) {
    tableInfo.append(filterBar);
  } else if (checkedCount > 1) {
    selectedText.text(checkedCount + " results selected");
  } else if (checkedCount === 1) {
    selectedText.text(checkedCount + " result selected");
  } else if (checkedCount === 0) {
    $(".table--filter-bar").last().remove();
  }
}

function selectInput (table) {
  $("body").on("change", ".data-table--select-input:checkbox", function () {
    displayActionsBar(table);
  });
}

function deleteData () {
  $("body").on("click", ".filter-bar--delete", function () {
    let recordsArray = new Array();
    let checkboxes = $(".data-table--select-input:checked");
    checkboxes.each(function () {
      recordsArray.push($(this).parent().parent().data("record-id"));
    });
    let databaseId = checkboxes.first().data("id");
    let table = checkboxes.first().val();

    $.ajax({
      method: "POST",
      url: "/table/delete_record",
      dataType: "script",
      data: {
        database_id: databaseId,
        table,
        records_array: recordsArray
      },
      success(data) {
        $(".table--filter-bar").last().remove();
        $(".data-table").DataTable().ajax.reload();
        toastr.success("Record(s) successfully deleted.");
      },
      error() {
        toastr.error("Unable to delete the record(s). Please check you have adequate permission to do this action or speak to an Administrator.");
      }
    });
  });
}

function editData () {
  $("body").on("click", ".filter-bar--edit", function () {
    let recordsArray = new Array();
    let checkboxes = $(".data-table--select-input:checked");
    checkboxes.each(function () {
      recordsArray.push($(this).parent().parent().data("record-id"));
    });
    let databaseId = checkboxes.first().data("id");
    let table = checkboxes.first().val();

    $.ajax({
      method: "GET",
      url: "/table/edit_record",
      dataType: "script",
      data: {
        database_id: databaseId,
        table,
        records_array: recordsArray
      },
      success(data) { },
      error() { }
    });
  });
}

function clearSelection () {
  $("body").on("click", ".filter-bar--clear", function () {
    let checkboxes = $(".data-table--select-input:checked");
    checkboxes.each(function () {
      $(this).prop("checked", false);
    });

    $(".table--filter-bar").last().remove();
  });
}

function manipulateData (table) {
  deleteData();
  editData();
  clearSelection();
}
;
function replaceArrowGlypicon () {
  $(".glyphicon-arrow-right").addClass("fa fa-arrow-right").removeClass("glyphicon glyphicon-arrow-right");
  $(".glyphicon-arrow-left").addClass("fa fa-arrow-left").removeClass("glyphicon glyphicon-arrow-left");
}

$(document).ready(function() {
  replaceArrowGlypicon();
});
function showEditable(evt) {
  evt.preventDefault();

  let editableRow = evt.currentTarget.parentElement.parentElement.parentElement;
  let editableInput = $(editableRow).find(".editable-input");

  evt.currentTarget.style.display = "none";
  $(editableInput).css("display", "inline-block");
  $(editableInput).focus();

  return true;
}

function cancelEditable(evt) {
  evt.preventDefault();

  let editableRow = evt.currentTarget.parentElement.parentElement.parentElement;
  let editableContent = $(editableRow).find(".editable-content");
  let editableInput = $(editableRow).find(".editable-input");

  $(editableContent).css("display", "inline-block");
  $(editableInput).css("display", "none");
}

function hideEditable(editableContent, editableRow) {
  let editableInput = $(editableRow).find(".editable-input");

  $(editableContent).css("display", "inline-block");
  $(editableInput).css("display", "none");
}

function refreshEditableContent(editableContent, newValue) {
  $(editableContent).children(".editable-content-text").text(newValue);
}

function updateTableField(evt, table, field, id, databaseId) {
  evt.preventDefault();

  let editableRow = evt.currentTarget.parentElement.parentElement.parentElement;
  let editableContent = $(editableRow).find(".editable-content");
  let editableInput = $(editableRow).find(".editable-input");
  let currentValue = $(editableContent).text().trim();
  let newValue = $(editableInput).children("input").val();

  if (currentValue === newValue) {
    cancelEditable(evt);
    return;
  }

  let data = {};
  data["table_field"] = {};
  data["table_field"]["table"] = table;
  data["table_field"]["id"] = id;
  data["table_field"]["field"] = field;
  data["table_field"]["value"] = newValue;
  data["database_id"] = databaseId;

  $.ajax({
    url: "/table_field",
    type: "PATCH",
    data,
    error (XMLHttpRequest){
      if (XMLHttpRequest.status === 400) {
        prepareLongToast();
        toastr.error(XMLHttpRequest.responseJSON.error);
      }
    },
    success (){
      refreshEditableContent(editableContent, newValue);
      hideEditable(editableContent, editableRow);
      toastr.info("Table field successfully updated.");
    }
  });
}

function updateRelatedTableField(evt, table, field, foreignKeyTitle, foreignKeyValue) {
  evt.preventDefault();

  let editableRow = evt.currentTarget.parentElement.parentElement.parentElement;
  let editableContent = editableRow.getElementsByClassName("editable-content")[0];
  let editableInput = editableRow.getElementsByClassName("editable-input")[0];
  let currentValue = editableContent.innerText.trim();
  let newValue = editableInput.children[0].value;

  if (currentValue === newValue) {
    cancelEditable(evt);
    return;
  }

  let data = {};
  data["related_table_field"] = {};
  data["related_table_field"]["table"] = table;
  data["related_table_field"]["foreign_key_value"] = foreignKeyValue;
  data["related_table_field"]["foreign_key_title"] = foreignKeyTitle;
  data["related_table_field"]["field"] = field;
  data["related_table_field"]["value"] = newValue;

  $.ajax({
    url: "/related_table_field",
    type: "PATCH",
    data,
    error (XMLHttpRequest){
      if (XMLHttpRequest.status === 400) {
        prepareLongToast();
        toastr.error(XMLHttpRequest.responseJSON.error);
      }
    },
    success () {
      refreshEditableContent(editableContent, newValue);
      hideEditable(editableContent, editableRow);
      toastr.info("Related table field successfully updated.");
    }
  });
}

function updateFields (event) {
  const table = event.target.dataset.table;
  const field = event.target.dataset.field;
  const id = event.target.dataset.id;
  const foreignKeyTitle = event.target.dataset.foreignKeyTitle;
  const foreignKeyValue = event.target.dataset.foreignKeyValue;
  const databaseId = event.target.dataset.databaseId;

  if (foreignKeyTitle) {
    updateRelatedTableField(event, table, field, foreignKeyTitle, foreignKeyValue);
  } else {
    updateTableField(event, table, field, id, databaseId);
  }
}

function updateEditableFieldInput () {
  $(".editable-input input").blur(function(event) {
    updateFields(event);
  });

  $(".editable-input input").keypress(function(event){
    if(event.keyCode === 13) {
      updateFields(event);
    }
  });
}
;
"use strict";

function goToNextScreen () {
  $("#layout-builder-modal-next-button").click(function() {
    $("#layout-builder-modal-screen-1").toggleClass("hide");
    $("#layout-builder-modal-screen-2").toggleClass("hide");
  });
}

function goToPreviousScreen () {
  $("#layout-builder-modal-back-button").click(function() {
    $("#layout-builder-modal-screen-1").toggleClass("hide");
    $("#layout-builder-modal-screen-2").toggleClass("hide");
  });
}

function saveLayout(name, primaryTable, ignoreModal, databaseId) {
  var layoutID;
  var redirectURL;

  $.ajax({
    url: "/layouts",
    type: "POST",
    data: {
      table: primaryTable,
      view_name: name,
      ignore_modal: ignoreModal,
      database_id: databaseId
    },
    error (errorTextStatus, error){
      alert("Failed: "+ errorTextStatus+" ;"+error);
    },
    success (response){
      layoutID = response.id;
      redirectURL = "/layouts/" + layoutID + "/edit";
      window.location.replace(redirectURL);
    }
  });
}

function layoutBuilderModalSave () {
  $("#layout-builder-modal-save-button").click(function() {
    var ignoreModal = $("#layout-builder-modal-ignore-checkbox").is(":checked");
    var layoutName = document.getElementById("layout-builder-modal-form-name").value;
    var layoutPrimaryTable = document.getElementById("layout-builder-modal-form-primary-table").value;
    var databaseId = $(this).data("database-id");
    saveLayout(layoutName, layoutPrimaryTable, ignoreModal, databaseId);
  });
}

function modalButtonActions () {
  goToNextScreen();
  goToPreviousScreen();
  layoutBuilderModalSave();
}

$(document).ready(function () {
  modalButtonActions();
});
// var ready, setPositions;

// setPositions = function(){
//   $(".tableField").each(function(i){
//     $(this).attr("data-pos",i+1);
//   });
// }

// ready = function(){
//   setPositions();

//   sortable(".sortable");

//   if (sortable(".sortable")[0]) {
//     sortable(".sortable")[0].addEventListener("sortupdate", function(e, ui) {
//       // array to store new order
//       updatedOrder = [];
//       // set the updated positions
//       setPositions();

//       // populate the updatedOrder array with the new task positions
//       $(".tableField").each(function(i){
//         updatedOrder.push({ value: $(this).data("value"), position: i+1 });
//       });
//     });
//   }
// }

// $(document).ready(ready);
// /**
//  * if using turbolinks
//  */
// $(document).on("page:load", ready);
"use strict";

function closeModal() {
  $("body").on("click", ".modal--close-btn", function () {
        var modal = $(this).parents(".show");
        modal.removeClass("show");
        modal.addClass("hide");
        $("button.table--settings").attr("disabled", false);
    });
}

$(document).ready(function () {
    closeModal();
});
var emptyCheckboxIcon = "/assets/images/icons/black-checkbox-empty.svg";
var filledCheckboxIcon = "/assets/images/icons/black-check-box-with-white-check.png";
var emptyCircleIcon = "/assets/images/icons/circle-with-cross.png";
var halfFullCircleIcon = "/assets/images/icons/circle-with-contrast.png";
var fullCircleIcon = "/assets/images/icons/circle-with-check-symbol.png";

function activateTooltipster () {
  $(".tooltipster-tooltip").each(function () {
    var role = $(this).data("role");
    var table = $(this).data("table");
    var databaseId = $(this).data("database-id");

    if (!$(this).hasClass("tooltipstered")) {
      $(this).tooltipster({
        theme: ["tooltipster-shadow", "tooltipster-shadow-customized"],
        side: "bottom",
        trigger: "click",
        triggerClose: {
          mouseleave: true
        },
        interactive: true,
        contentAsHTML: true,
        content: $("<div class='tooltip_templates'>"+
          "<span id='tooltip_content'>"+
          "<a href='#' class='permissions-enable-all' data-role='"+role+"' data-table='"+table+"' data-database-id='"+databaseId+"'>Enable</a>"+
          "<br>"+
          "<a href='#' class='permissions-disable-all' data-role='"+role+"' data-table='"+table+"' data-database-id='"+databaseId+"'>Disable</a>"+
          "</span>"+
          "</div>"
        ),
      });
    }
  });
}

function displayCheckbox (value, roleName, action, databaseId) {
  if (value === true) {
    return "<img class='filled-checkbox' src='"+filledCheckboxIcon+"' data-role='"+roleName+"' data-database-id='"+databaseId+"' data-action='"+action+"'>";
  } else {
    return "<img class='empty-checkbox' src='"+emptyCheckboxIcon+"' data-role='"+roleName+"' data-action='"+action+"'>";
  }
}

function formatNestedColumns ( d, tableDatabaseId ) {
  let databaseId = tableDatabaseId;
  let permissionsClass = 'class="permissions--nested-table-data"';
  let adminTd = permissionsClass+' data-role="Admin"';
  let salesTd = permissionsClass+' data-role="Editor"';
  let teamLeadTd = permissionsClass+' data-role="User"';

  return "<table id='permissions--nested-table' data-table='"+d.Table+"' data-database-id='"+databaseId+"'>"+
      "<tr>"+
          "<td "+permissionsClass+"><p>View</p></td>"+
          "<td "+adminTd+" data-action='view' data-table='"+d.Table+"'>"+ displayCheckbox(d.Admin_view, "Admin", "view", databaseId) +"</td>"+
          "<td "+salesTd+" data-action='view' data-table='"+d.Table+"'>"+ displayCheckbox(d.Editor_view, "Editor", "view", databaseId) +"</td>"+
          "<td "+teamLeadTd+" data-action='view' data-table='"+d.Table+"'>"+ displayCheckbox(d.User_view, "User", "view", databaseId) +"</td>"+
      "</tr>"+
      "<tr>"+
          "<td "+permissionsClass+"><p>Create</p></td>"+
          "<td "+adminTd+" data-action='create' data-table='"+d.Table+"'>"+ displayCheckbox(d.Admin_create, "Admin", "create", databaseId) +"</td>"+
          "<td "+salesTd+" data-action='create' data-table='"+d.Table+"'>"+ displayCheckbox(d.Editor_create, "Editor", "create", databaseId) +"</td>"+
          "<td "+teamLeadTd+" data-action='create' data-table='"+d.Table+"'>"+ displayCheckbox(d.User_create, "User", "create", databaseId) +"</td>"+
      "</tr>"+
      "<tr>"+
          "<td "+permissionsClass+"><p>Edit</p></td>"+
          "<td "+adminTd+" data-action='edit' data-table='"+d.Table+"'>"+ displayCheckbox(d.Admin_edit, "Admin", "edit", databaseId) +"</td>"+
          "<td "+salesTd+" data-action='edit' data-table='"+d.Table+"'>"+ displayCheckbox(d.Editor_edit, "Editor", "edit", databaseId) +"</td>"+
          "<td "+teamLeadTd+" data-action='edit' data-table='"+d.Table+"'>"+ displayCheckbox(d.User_edit, "User", "edit", databaseId) +"</td>"+
      "</tr>"+
      "<tr>"+
          "<td "+permissionsClass+"><p>Delete</p></td>"+
          "<td "+adminTd+" data-action='delete' data-table='"+d.Table+"'>"+ displayCheckbox(d.Admin_delete, "Admin", "delete", databaseId) +"</td>"+
          "<td "+salesTd+" data-action='delete' data-table='"+d.Table+"'>"+ displayCheckbox(d.Editor_delete, "Editor", "delete", databaseId) +"</td>"+
          "<td "+teamLeadTd+" data-action='delete' data-table='"+d.Table+"'>"+ displayCheckbox(d.User_delete, "User", "delete", databaseId) +"</td>"+
      "</tr>"+
  "</table>";
}

function showNestedTable () {
  $("body").on("click", "tbody > tr.original-row-permissions > td:first-child", function () {
    let tr = $(event.target).closest("tr");
    let database = $(tr).parent().parent().data("databaseId");
    let row = window["datatable" + database].row(tr);

    if ( row.child.isShown() ) {
      row.child.hide();
      tr.removeClass("shown");
    }
    else {
      row.child( formatNestedColumns(row.data(), database) ).show();
      tr.addClass("shown");
    }
  });
}

function loadPermissionsDataTable (columns, databaseId, table) {
  window["datatable" + databaseId] = table.DataTable({
    colReorder: true,
    paging: false,
    info: false,
    searching: false,
    deferRender: true,
    autoWidth: false,
    scrollX: true,
    serverSide: true,
    ordering: true,
    columnDefs: [
    {
      "orderable": true,
      "targets": 0,
    },
    {
      orderable: false,
      targets: [1, 2, 3]
    }],
    processing: false,
    ajax: "/" + (location.pathname+location.search).substr(1) + "?database_id=" + databaseId,
    columns,
    stateSave: true,
    stateSaveParams(settings, data) {
      data.search.search = "";
    },
    stateSaveCallback(settings, data) {
      stateSaveCallbackFunction(settings, data, $(this));
    },
    stateLoadCallback(settings, callback) {
      stateLoadCallbackFunction($(this), callback);
    },
    createdRow(row, data, dataIndex) {
      let table = $(this).data("table-name");
      let id = data.Id;
      let previewUrl = "/tables/" + table + "/" + id + "?table=" + table;
      $(row).addClass("original-row-permissions");
      $(row).attr("data-href",  previewUrl);
    },
    initComplete(settings, json) {
      initCompleteFunction(settings, json, window["datatable"+databaseId]);
    }
  });
}

function fetchDataForPermissionsTable(table) {
  let databaseId = $(table).data("database-id");

  $.ajax({
    dataType: "json",
    url: "/" + (location.pathname+location.search).substr(1) + "?database_id=" + databaseId,
    success(data) {
      if ( ! $.fn.DataTable.isDataTable( table ) ) {
        loadPermissionsDataTable(data.columns, databaseId, table);
      } else {
        table.DataTable().ajax.reload();
      }
    }
  });
}

function deHumanizeString (str) {
  function innerString() {
    return /[-\s]+/g;
  }

  return str.replace(/([a-z\d])([A-Z]+)/g, "$1_$2").replace(innerString(), "_").toLowerCase();
}

function amendAllRelatedPermissions (role, table, action, databaseId) {
  var humanizedTable = humanizeString(table);

  $(".permissions--nested-table-data[data-role='"+role+"'][data-table='"+humanizedTable+"']").each (function () {
    let checkbox = $(this).children();

    if (action === "enable") {
      checkbox.attr({ "src": filledCheckboxIcon });
      checkbox.removeClass("empty-checkbox");
      checkbox.addClass("filled-checkbox");
    } else if (action === "disable") {
      checkbox.attr({ "src": emptyCheckboxIcon });
      checkbox.removeClass("filled-checkbox");
      checkbox.addClass("empty-checkbox");
    }
  });
}

function enableTooltipOnContentClick () {
  $("body").on("click", ".permissions-enable-all", function (e) {
    e.preventDefault();
    var role = $(this).data("role");
    var table = $(this).data("table");
    var databaseId = $(this).data("database-id");

    $.post(
      "/permissions/enable_all",
      {
        role,
        table,
        database_id: databaseId
      }
    );

    amendAllRelatedPermissions(role, table, "enable", databaseId);

    $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"'][data-database-id='"+databaseId+"']").attr({ "src": fullCircleIcon });
    enableTooltipOnContentClick();
  });

  $("body").on("click", ".permissions-disable-all", function (e) {
    e.preventDefault();
    var role = $(this).data("role");
    var table = $(this).data("table");
    var databaseId = $(this).data("database-id");

    $.post(
      "/permissions/disable_all",
      {
        role,
        table,
        database_id: databaseId
      }
    );

    amendAllRelatedPermissions(role, table, "disable", databaseId);

    $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"'][data-database-id='"+databaseId+"']").attr({ "src": emptyCircleIcon });
    enableTooltipOnContentClick();
  });
}

function getUniqueRelatedPermissions (role, table, permission) {
  var relatedPermissions = [];

  $(".permissions--nested-table-data[data-role='"+role+"'][data-table='"+table+"']").each (function () {
    var checkbox = $(this).children().attr("src");

    if ($(this).data("action") === permission) {
      return;
    } else if (checkbox === emptyCheckboxIcon) {
      relatedPermissions.push(false);
    } else if (checkbox === filledCheckboxIcon) {
      relatedPermissions.push(true);
    }
  });

  return [...new Set(relatedPermissions)];
}

function updateTablePermissionsImg (role, table, permission, action) {
  var humanizedTable = table;
  var table = deHumanizeString(table);
  var current_image_src = $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"']").attr("src");
  var image = current_image_src.substr(current_image_src.length - 5);
  var uniqueRelatedPermissions = getUniqueRelatedPermissions(role, humanizedTable, permission);
  var uniquePermissionStrings = uniqueRelatedPermissions.sort().toString();

  if (action === "remove") {
    if (image === "l.png") {
      $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"']").attr({ "src": halfFullCircleIcon });
    } else if (uniquePermissionStrings === 'false') {
      $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"']").attr({ "src": emptyCircleIcon });
    }
  } else if (action === 'add') {
    if (image === 's.png') {
      $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"']").attr({ "src": halfFullCircleIcon });
    } else if (uniquePermissionStrings === 'true') {
      $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"']").attr({ "src": fullCircleIcon });
    }
  }
}

function addRolePermission (role, permission, table, databaseId) {
  $.post(
    "/permissions/add_to_role",
    {
      role,
      permission,
      table: deHumanizeString(table),
      database_id: databaseId
    }
  );

  var checkbox = $(".permissions--nested-table-data[data-role='"+role+"'][data-table='"+table+"'][data-action='"+permission+"']").children();
  checkbox.attr({ "src": filledCheckboxIcon });
  checkbox.removeClass("empty-checkbox");
  checkbox.addClass("filled-checkbox");

  var viewPermission = $(".permissions--nested-table-data[data-role='"+role+"'][data-table='"+table+"'][data-action='view']").children();

  if (permission !== "view" && viewPermission.attr("src") !== filledCheckboxIcon) {
    viewPermission.attr({ "src": filledCheckboxIcon });
  }

  updateTablePermissionsImg(role, table, permission, "add");
}

function removeRolePermission (role, permission, table, databaseId) {
  $.post(
    "/permissions/remove_from_role",
    {
      role,
      permission,
      table: deHumanizeString(table),
      database_id: databaseId
    }
  );

  var checkbox = $(".permissions--nested-table-data[data-role='"+role+"'][data-table='"+table+"'][data-action='"+permission+"']").children();
  checkbox.attr({ "src": emptyCheckboxIcon });
  checkbox.removeClass("filled-checkbox");
  checkbox.addClass("empty-checkbox");

  if (permission === "view") {
    amendAllRelatedPermissions(role, table, "disable");
    $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+deHumanizeString(table)+"']").attr({ "src": emptyCircleIcon });
  } else {
    updateTablePermissionsImg(role, table, permission, "remove");
  }
}

function emptyCheckbox() {
  $("body").on("click", ".data-table-permissions .filled-checkbox", function () {
    var role = $(this).data("role");
    var permission = $(this).data("action");
    var tableObject = $(this).closest("table");
    var table = tableObject.data("table");
    var databaseId = tableObject.data("database-id");

    removeRolePermission(role, permission, table, databaseId);
  });
}

function fillCheckbox() {
  $("body").on("click", ".data-table-permissions .empty-checkbox", function () {
    var role = $(this).data("role");
    var permission = $(this).data("action");
    var tableObject = $(this).closest("table");
    var table = tableObject.data("table");
    var databaseId = tableObject.data("database-id");

    addRolePermission(role, permission, table, databaseId);
  });
}

function togglePermissionAccordians () {
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      img = $(this).find("img").first();

      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        img.attr({ "src": "/assets/images/icons/plus-thick.png" });
        panel.style.display = "none";
      } else {
        img.attr({ "src": "/assets/images/icons/minus-thick.png" });
        panel.style.display = "block";
        var table = $(panel).find(".data-table-permissions");

        fetchDataForPermissionsTable(table);
      }
    });
  }
}

$(document).ready(function() {
  showNestedTable();
  emptyCheckbox();
  fillCheckbox();

  enableTooltipOnContentClick();

  togglePermissionAccordians();
});

$(document).ajaxStop(function(){
  activateTooltipster();
});
"use strict";

function loadToastr() {
  toastr.options = {
      closeButton: true,
      howMethod: "fadeIn",
      hideMethod: "fadeOut",
      preventDuplicates: true,
      timeOut: 5000
  };
}

$(document).ready(function() {
  loadToastr();

  $(".alert").fadeTo(5000, 500).slideUp(500, function(){
    $(".alert").slideUp(500);
  });

  $("[data-link]").click(function() {
    window.location.href = $(this).attr("data-link");
    return false;
  });

  // show spinner on AJAX start
  $(document).ajaxStart(function(){
    $(".spinner").show();
  });

  // hide spinner on AJAX stop
  $(document).ajaxStop(function(){
    $(".spinner").hide();
  });
});

// show spinner on AJAX start
$(document).ajaxStart(function(){
  $(".spinner").show();
});

// hide spinner on AJAX stop
$(document).ajaxStop(function(){
  $(".spinner").hide();
});

$(document).on("page:fetch", function(){
  $(".spinner").show();

});

$(document).on("page:receive", function(){
  $(".spinner").hide();
});
function renderAvailableDatabases (data, dropdownOriginal) {
  var dropdown = dropdownOriginal.next();
  var availableDatabases = [];
  dropdown[0].innerHTML = "";

  $.each(data.databases, function( index, value ) {
    availableDatabases.push(
      "<li>"+
        "<a href='' class='nav-link-for-databases' data-database-id='"+value.id+"'>"+
          "<span class='nav-label' data-i18n='nav.layouts'>"+
            value.friendly_name+
          "</span> <span class='fa arrow'></span>"+
        "</a>"+
        "<ul class='nav nav-second-level nav-databases collapse' id='nav-populate-available-databases-"+value.id+"'>"+
        "</ul>"+
      "</li>"
    );
  });
  dropdown.append(availableDatabases.join(""));
  dropdown.addClass("in");
}

function renderAvailableDatabaseSettings (data, dropdownOriginal) {
  var dropdown = dropdownOriginal.next();
  var availableDatabases = [];
  dropdown[0].innerHTML = "";

  $.each(data.databases, function( index, value ) {
    availableDatabases.push(
      "<li>"+
        "<a href='/databases/"+value.id+"/edit' class='nav-link-for-database-settings' data-database-id='"+value.id+"'>"+
          "<span class='nav-label' data-i18n='nav.layouts'>"+
            value.friendly_name+
          "</span>"+
        "</a>"+
      "</li>"
    );
  });

  if (data.can_add === "true") {
    availableDatabases.push(
      "<li>"+
        "<a id='nav-link-for-add-database' href='/databases/new'>Add</a>"+
      "</li>"
    );
  }

  dropdown.append(availableDatabases.join(""));

  dropdown.addClass("in");
}

function fetchAvailableDatabases (dropdown) {
  $.ajax({
    dataType: "json",
    url: "/databases",
    success(data) {
      renderAvailableDatabases(data, dropdown);
    }
  });
}

function loadAvailableDatabases () {
  $("#nav-link-for-available-databases").click(function() {
    var dropdown = $(this);

    if (dropdown.parent("li").hasClass("active")) {
      fetchAvailableDatabases(dropdown);
    }
  });
}

function fetchAvailableDatabaseSettings (dropdown) {
  $.ajax({
    dataType: "json",
    url: "/databases",
    data: { settings: true },
    success(data) {
      renderAvailableDatabaseSettings(data, dropdown);
    }
  });
}

function loadAvailableDatabaseSettings () {
  $("#nav-link-for-available-databases-settings").click(function() {
    var dropdown = $(this);

    if (dropdown.parent("li").hasClass("active")) {
      fetchAvailableDatabaseSettings(dropdown);
    }
  });
}

function renderAvailableTables (tables, databaseId) {
  var dropdown = $("#nav-populate-available-databases-"+databaseId);
  var availableTables = [];
  dropdown[0].innerHTML = "";

  if (tables.length === 0) {
    toastr.info("You don't have any permission on this database. Please configure permissions or talk to an Admin.");
  }
  $.each(tables, function( index, value ) {
    availableTables.push(
      "<li>"+
        "<a href='/tables/"+databaseId+"?table="+value+"'>"+value+"</a>"+
      "</li>"
    );
  });
  dropdown.append(availableTables.join(""));
  dropdown.addClass("in");
  dropdown.parent("li").addClass("active");
}

function fetchAvailableTables (databaseId) {
  $.ajax({
    dataType: "json",
    url: "/tables",
    data: { database_id: databaseId },
    success(data) {
      renderAvailableTables(data, databaseId);
    },
    error(){
      toastr.error("There appears to be an error with your database connection. Please check your credentials or speak to an Administrator");
    }
  });
}

function loadAvailableTables () {
  $("body").on("click", ".nav-link-for-databases", function (e) {
    e.preventDefault();
    var databaseId = $(this).data("databaseId");
    var tableList = $(this).next("ul");

    if (tableList.hasClass("in")) {
      tableList.removeClass("in");
      $(this).parent("li").removeClass("active");
    } else {
      fetchAvailableTables(databaseId);
    }
  });
}

function loadDatabasesNav () {
  if ($("#nav-link-databases").hasClass("active")) {
    var dropdown = $("#nav-link-for-available-databases");

    fetchAvailableDatabases(dropdown);

    var databaseId = (location.pathname+location.search).substr(1).split("/")[1].split("?")[0];

    fetchAvailableTables(databaseId);
  }
}

function loadAvailableDatabaseSettingsNav () {
  if ($("#nav-link-databases-settings").hasClass("active")) {
    var dropdown = $("#nav-link-for-available-databases-settings");

    fetchAvailableDatabaseSettings(dropdown);
  }
}

$(document).ready(function() {
  loadAvailableDatabases();
  loadAvailableDatabaseSettings();
  // loadAvailableTables();
  loadDatabasesNav();
  loadAvailableDatabaseSettingsNav();
});
function goToRegistrationStep(step) {
  $("#registration-step-1, #registration-step-2").toggleClass("hide");
}

function checkPasswordMatch() {
  let password = $("#admin_user_password").val();
  let confirmPassword = $("#admin_user_password_confirmation").val();

   if (password === confirmPassword) {
    $("#password-mismatch").hide();
    $("#next-registration-step").attr("disabled", false);
  } else {
    $("#password-mismatch").show();
    $("#next-registration-step").attr("disabled", true);
  }
}

$(document).ready(function () {
  $("#password-mismatch").hide();
  $("#admin_user_password, #admin_user_password_confirmation").keyup(function() {
    checkPasswordMatch();
  });
});

function toggleCheckbox () {
  $("body").on("change", ".toggle-state:checkbox", function (e) {
    let value = $(this).val();
    if (value === "false") {
      $(this).val("true");
    } else if (value === "true") {
      $(this).val("false");
    }
  });
}

$(document).ready(function() {
  toggleCheckbox();
});
// TODO: Put Twilio back when feature re-enabled
// /* Get a Twilio Client token with an AJAX request */

// /* Call a customer from a support ticket */
// function callCustomer(phoneNumber, tableName, recordId, fieldName) {
//   updateCallStatus("Calling " + phoneNumber + "...");

//   var params = {};
//   params["phoneNumber"] = phoneNumber;
//   params["tableName"] = tableName;
//   params["recordId"] = recordId;
//   params["fieldName"] = fieldName;

//   Twilio.Device.connect(params);
// }

// /* Helper function to update the call status bar */
// function updateCallStatus(status) {
//   $("#call-status").text(status);
// }

// /* End a call */
// function hangUp() {
//   Twilio.Device.disconnectAll();
// }

// function captureCallEvent(twilioCallSid, tableName, recordId, phoneNumber, fieldName) {
//   const activityContent = "Called [" + fieldName + " " + phoneNumber + "] " + " on " + moment().format("dddd, MMMM Do YYYY, h:mm:ss a") + ".";

//   // post to create activity
//   $.ajax({
//     url: "/activities",
//     type: "POST",
//     data: {
//       "activity": {
//         "feedable_type": tableName,
//         "feedable_id": recordId,
//         "kind": "call",
//         "content": activityContent,
//         "twilio_call_sid": twilioCallSid
//       }
//     },
//     async: true,
//     error: function(XMLHttpRequest, errorTextStatus, error){
//       window.toastr.error("Something went wrong, please try again.");
//      }
//   });
// }

// $(document).ready(function() {
//   $.post("/token/generate", {page: window.location.pathname}, function(data) {
//     // Set up the Twilio Client Device with the token
//     Twilio.Device.setup(data.token);
//   });

//   /* Report any errors to the call status display */
//   Twilio.Device.error(function (error) {
//     updateCallStatus("ERROR: " + error.message);
//   });

//   /* Callback to let us know Twilio Client is ready */
//   Twilio.Device.ready(function (device) {
//     updateCallStatus("Ready");
//   });

//   /* Callback for when Twilio Client initiates a new connection */
//   Twilio.Device.connect(function (connection) {
//     $("#call-status").removeClass("hide");
//     $(".hangup-button").prop("disabled", false);
//   });

//   /* Callback for when a call ends */
//   Twilio.Device.disconnect(function(connection) {
//     const phoneNumber = connection.customParameters.get("phoneNumber");
//     const tableName = connection.customParameters.get("tableName");
//     const recordId = connection.customParameters.get("recordId");
//     const fieldName = connection.customParameters.get("fieldName");

//     $("#call-status").addClass("hide");
//     $(".hangup-button").prop("disabled", true);
//     $(".call-customer-button").prop("disabled", false);

//     captureCallEvent(connection.parameters.CallSid, tableName, recordId, phoneNumber, fieldName);
//     updateCallStatus("Ready");
//   });
// });
"use strict";

function displayFilterBar (table) {
  var filterBar = $(".table--filter-bar-container").html();
  var tableInfo = $(".table--info");

  if (tableInfo.find(".table--filter-bar").length > 0) {
    if (table.columns([2,3]).search()[0].split(",").filter(Boolean).length > 1) {
      $(".filter-bar--selected .white").last().text("2 filters selected");
    } else {
      $(".filter-bar--selected .white").last().text("1 filter selected");
    }
  } else {
    tableInfo.append(filterBar);
  }
}

function removeFilterBar () {
  $(".table--filter-bar").last().remove();
}

function filterTable (status, role, table) {
  table.columns( [2, 3] )
    .search("");

  table.columns( [2, 3] )
    .search([status, role])
    .draw();

  displayFilterBar(table);
}

function filterByTeams (table) {
  $(".users-teams--table-data").click(function() {
    var role = $(this).data("role");
    var statusFilter = table.column(3).search();
    if (statusFilter.includes("true")) {
      statusFilter = "true";
    } else if (statusFilter.includes("false")) {
      statusFilter = "false";
    } else {
      statusFilter = "";
    }

    filterTable(statusFilter, role, table);
  })
}

function filterByStatus (table) {
  $(".users-status--table-data").click(function() {
    var status = $(this).data("status");
    var teamFilter = table.column(2).search().replace("true,", "").replace("false,", "");

    filterTable(status, teamFilter, table);
  })
}

function clearFilters (table) {
  $("body").on("click", ".filter-bar--clear", function () {
    table.columns( [2, 3] )
      .search( "" )
      .draw();

    removeFilterBar();
  })
}

function displayEditLink () {
  $(".users-teams--count").hover(function() {
    $(this).children(".team--user-count").toggleClass("hide");
    $(this).children(".team--edit-link").toggleClass("hide");
  })
}

function loadUserDataTable (columns) {
  var canExport = $("#target-table-admin-users").data("can-export");
  columns.push({"data":null,"defaultContent":"<a class='user--edit-link' data-remote='true' href='#'><img src='/assets/images/icons/edit@2x.png'></a>"});
  var searchableTable = $("#target-table-admin-users").DataTable({
    colReorder: true,
    deferRender: true,
    autoWidth: false,
    scrollX: true,
    serverSide: true,
    processing: false,
    language: {
      paginate: {
        next: "Next >",
        previous: "< Prev"
      },
      info: "of _MAX_ results",
    },
    ajax: "/" + (location.pathname+location.search).substr(1),
    dom: "f<'table--info'piB>rt<'clear'>",
    columns,
    stateSave: false,
    createdRow( row, data, dataIndex ) {
      var id = data.id;
      var previewUrl = "/users/" + id;
      var editLink = row.lastChild.firstChild;
      var statusField = row.children[3];
      var userStatus = statusField.innerHTML;
      var nameField = row.firstChild;

      if (userStatus === "false") {
        statusField.innerHTML = "<img src='/assets/images/icons/circle-with-cross.png'>";
      } else {
        statusField.innerHTML = "<img src='/assets/images/icons/circle-with-check-symbol.png'>";
      }

      $(editLink).attr("href",  previewUrl);
      $(nameField).html("<a href='" + previewUrl + "' data-remote='true'>" + data.name + "</a>");
    },
    buttons: [
      {
        extend: "csv",
        className: "table--export " + canExport,
        text: "Export"
      },
      {
        text: "Add",
        className: "table--add",
        action () {
          $.ajax({
            url: "/admin_users/new"
          });
        }
      }
    ],
    initComplete(settings, json) {
      initCompleteFunction(settings, json, searchableTable);
    }
  });

  filterByTeams(searchableTable);
  filterByStatus(searchableTable);
  clearFilters(searchableTable);
}

function fetchDataForUserTable () {
  $.ajax({
    dataType: "json",
    url: "/" + (location.pathname+location.search).substr(1),
    success(d) {
      loadUserDataTable(d.columns);
    }
  });
}

function submitStatusChange () {
  $("body").on("change", "#user--edit-status:checkbox", function (e) {
    var id = $(this).data("user");
    $.post(
      "/admin_users/update_status",
      {
        id: id
      }
    );
  });
}

function submitTeamChange () {
  $("body").on("change", ".user--team-select", function () {
    var id = $(this).data("user");
    var role = $(this).val();
    $.post(
      "/admin_users/update_role",
      {
        id: id,
        role: role,
      }
    );
  });
}

function validateForm () {
  var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  $("body").on("keyup", "#admin_user_first_name, #admin_user_last_name, #admin_user_email, #admin_user_password", "#admin_user_password_confirmation", function () {
    var fieldsFilled = $("#admin_user_first_name").val().length > 0 &&
    $("#admin_user_last_name").val().length > 0 &&
    $("#admin_user_email").val().length > 0;

    var create = $(".user--form-action").val() === "create";
    var update = $(".user--form-action").val() === "update";
    var passwordEmpty = $("#admin_user_password").val().length === 0;
    var passwordValid = $("#admin_user_password").val().match(password);

    var validForm = (fieldsFilled && passwordValid) || (update && fieldsFilled && passwordEmpty) || (update && fieldsFilled && !passwordEmpty && passwordValid);

    if (validForm) {
      $("input[type=submit]").prop("disabled", false);
    } else {
      $("input[type=submit]").prop("disabled", true);
    }
  });
}

function editFields () {
  $("body").on("click", ".user--modal-edit-button", function () {
    var id = $(this).data("user");
    var role = $(this).val();

    $.ajax({
      url: "/users/edit",
      data: { id: id },
      type: "GET",
      success() {}
    });
  });
}

$(document).ready(function() {
  let metaTag = $("meta[name=psj]");
  let isCurrentControllerAdminUsers = metaTag.attr("controller") === "admin_users";

  if (isCurrentControllerAdminUsers) {
    fetchDataForUserTable();
  }

  submitStatusChange();
  submitTeamChange();

  validateForm();

  editFields();

  displayEditLink();
})
;
let hideTrashContainer;
let showTrashContainer;
let iconForFieldType;
let containerDataContainsField;
let containerContainsDraggableItem;
let buildDraggableField;
let saveDraggableContainer;
let updateDraggableFieldsContainer;
let isDataContainer;
let initializeDraggable;

hideTrashContainer = function () {
  $("#layout-builder-draggable-trash-container").addClass("hide");
}

showTrashContainer =  function () {
  $("#layout-builder-draggable-trash-container").removeClass("hide");
  $("#layout-builder-draggable-trash-container").addClass("animated zoomIn");
}

iconForFieldType = function (fieldType) {
  switch(fieldType) {
    case "string":
    case "text":
      return "fa fa-font";
      break;
    case "time":
    case "timestamp":
      return "fa fa-clock-o";
      break;
    case "date":
    case "datetime":
      return "fa fa-calendar";
      break;
    case "boolean":
      return "fa fa-toggle-on";
      break;
    default:
      return "fa fa-font";
  }
}

containerDataContainsField = function (containerId, fieldName) {
  const el = $("#" + containerId)[0];

  if (el === undefined) {
    return;
  }

  let data = JSON.parse($("#" + containerId)[0].dataset.fieldsForContainer);

  if (data !== "[]") {
    let fields = Object.values(data);

    for (var i = 0; i < fields.length; i++) {
      if (fields[i].title === fieldName ) {
        return true;
      }
    }
  }

  return false;
}

containerContainsDraggableItem = function (containerId, fieldName) {
  let draggableItems = $(containerId + " .layout-builder-draggable-item").text().trim().split(" ");
  return draggableItems.includes(fieldName);
}

buildDraggableField = function (field) {
  var icon = iconForFieldType(field.kind);
  var item;

  if (field.editable === "true") {
    item = "<div class='layout-builder-draggable-field layout-builder-draggable-item draggable-source' data-field-table=" + field.table + " data-field-type=" + field.kind + " data-field-editable=" + field.editable + ">" +
      "<div class='row'>" +
      "<div class='col-sm-10'>" +
        "<div class = 'layout-builder-draggable-item-handle'>" +
          "<i class=" + "'" + icon + "'" + "aria-hidden='true'></i> " +
          "<span data-toggle='tooltip' data-placement='top' title = '" + field.title + "'" + "data-original-title='" + field.title + "'" +  " class='no-select'>" + field.title + "</span>" +
        "</div>" +
      "</div>" +

      "<div class='col-sm-2 text-right'>"+
        "<div class = 'layout-builder-field-editable-toggle'>" +
          "<label class='switch'>" +
              "<div class='toggle'>" +
                "<input class='layout-builder-editable-toggle toggle-state' type='checkbox' checked='" + field.editable + "'/>" +
                "<div class='toggle-inner'>" +
                   "<div class='indicator'></div>" +
                "</div>" +
                "<div class='active-bg'></div>" +
              "</div>" +
          "</label>" +
          "</div>" +
        "</div>" +
      "</div>"+
    "</div>"
  } else {
    item = "<div class='layout-builder-draggable-field layout-builder-draggable-item draggable-source' data-field-table=" + field.table + " data-field-type=" + field.kind + ">" +
      "<div class='row'>" +
        "<div class='col-sm-10'>" +
          "<div class = 'layout-builder-draggable-item-handle'>" +
            "<i class=" + "'" + icon + "'" + "aria-hidden='true'></i> " +
            "<span data-toggle='tooltip' data-placement='top' title = '" + field.title + "'" + "data-original-title='" + field.title + "'" +  " class='no-select'>" + field.title + "</span>" +
          "</div>" +
        "</div>" +

        "<div class='col-sm-2 text-right'>"+
          "<div class = 'layout-builder-field-editable-toggle'>" +
            "<label class='switch'>" +
              "<div class='toggle'>" +
                "<input class='layout-builder-editable-toggle toggle-state' type='checkbox' />" +
                "<div class='toggle-inner'>" +
                   "<div class='indicator'></div>" +
                "</div>" +
                "<div class='active-bg'></div>" +
              "</div>" +
            "</label>" +
            "</div>" +
          "</div>" +
        "</div>"+
      "</div>"
  }

  return item;
}

saveDraggableContainer = function (dragEvent, containerId) {
  let containerItemsJSON = getContainerItemsJSON(containerId);

  if (containerId === "task-queue-draggable-field-settings-container") {
    updateTaskQueueDraggableFields(containerId, containerItemsJSON);
  } else {
    updateLayoutBuilderContainer(containerId, containerItemsJSON);
  }
}

updateDraggableFieldsContainer = function (data) {
  $("#sv_builder_primary_table_draggable_fields_container").html("");
  for (var i = 0; i < data.length; i++) {
    var field = {};
    field["title"] = data[i][0];
    field["kind"] = data[i][1];
    field["table"] = data[i][2];
    let draggableField = buildDraggableField(field);

    if (containerDataContainsField("layout-builder-draggable-main-container1", field.title)) {
      if (!containerContainsDraggableItem("#layout-builder-draggable-main-container1", field.title)) {
        $("#layout-builder-draggable-main-container1").append(draggableField);
      }
    } else if (containerDataContainsField("layout-builder-draggable-main-container2", field.title)) {
      if (!containerContainsDraggableItem("#layout-builder-draggable-main-container2", field.title)) {
        $("#layout-builder-draggable-main-container2").append(draggableField);
      }
    } else if (containerDataContainsField("layout-builder-draggable-main-container3", field.title)) {
      if (!containerContainsDraggableItem("#layout-builder-draggable-main-container3", field.title)) {
        $("#layout-builder-draggable-main-container3").append(draggableField);
      }
    } else if (containerDataContainsField("task-queue-draggable-field-settings-container", field.title)) {
      if (!containerContainsDraggableItem("#task-queue-draggable-field-settings-container", field.title)) {
        $("#task-queue-draggable-field-settings-container").append(draggableField);
      }
    } else {
      $("#sv_builder_primary_table_draggable_fields_container").append(draggableField);
    }
  }
}

isDataContainer = function (containerId) {
  return isNotTrashContainer(containerId) && isNotFieldsContainer(containerId);
}

initializeDraggable = function () {
  const containers = "#layout-builder-draggable-trash-container, .draggable-list-for-relatable-table, #sv_builder_primary_table_draggable_fields_container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3, #task-queue-draggable-field-settings-container";
  const dataContainers = "#layout-builder-draggable-trash-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3, #task-queue-draggable-field-settings-container";

  window.draggable = new window.Draggable.Sortable(document.querySelectorAll(containers), {
    draggable: ".layout-builder-draggable-item",
    handle: ".layout-builder-draggable-item",
    stack: "div",
    distance: 0,
    zIndex: 5
  });
  const fieldsContainer = document.querySelectorAll("#sv_builder_primary_table_draggable_fields_container")[0];

  window.draggable.on("drag:start", (dragEvent) => {
    showTrashContainer();
  });

  window.draggable.on("drag:stop", (dragEvent) => {
    let currentContainer = dragEvent.source.parentNode;
    let destinationContainerId = currentContainer.id;
    let sourceContainerId = dragEvent.data.sourceContainer.id;

    hideTrashContainer();

    if (destinationContainerId === "layout-builder-draggable-trash-container") {
      if ($(".sv_builder_table_navigation").hasClass("active")) {
        fieldsContainer.insertBefore(dragEvent.source, fieldsContainer.childNodes[0]);
      } else {
        let table = $(".sv_builder_table_navigation").data().tableName;
        getOptionsForDraggable(table);
        $(".sv_builder_table_navigation").addClass("active");
        setTimeout(function () {
          [...$(dragEvent.sourceContainer).children()].forEach((element) => {
            if(element.innerText.includes(dragEvent.source.innerText)) {
              element.remove();
              return;
            }
          });

          fieldsContainer.insertBefore(dragEvent.source, fieldsContainer.childNodes[0]);

          let containerFields = JSON.parse(dragEvent.sourceContainer.dataset.fieldsForContainer);
          for (let [key, value] of Object.entries(containerFields)) {
            if (value.title === dragEvent.source.innerText.trim()) {
              delete containerFields[key];
              dragEvent.sourceContainer.dataset.fieldsForContainer = JSON.stringify(containerFields);
              return;
            }
          }
        }, 500);
      }
    }

    if (sourceContainerId === destinationContainerId) {
      return;
    }

    if (isDataContainer(sourceContainerId)) {
      saveDraggableContainer(dragEvent, sourceContainerId);
    }

    if (isDataContainer(destinationContainerId)) {
      saveDraggableContainer(dragEvent, destinationContainerId);
    }
  });
};
"use strict";

var draggable;
var drake;

function isNotTrashContainer(containerId) {
  return containerId !== "layout-builder-draggable-trash-container";
}

function isNotFieldsContainer(containerId) {
  return containerId !== "sv_builder_primary_table_draggable_fields_container";
}

function getContainerItems(containerId) {
  let query;
  query = "#" + containerId + " " + ".layout-builder-draggable-field:not(.draggable--original):not(.draggable-mirror)";
  return document.querySelectorAll(query);
}

function getContainerItemsJSON(containerId) {
  let containerItems = getContainerItems(containerId);
  let containerItemsJSON = [];

  for (var i = 0; i < containerItems.length; i++) {
    let field = {};
    field["title"] = containerItems[i].innerText.trim();
    field["table"] = containerItems[i].dataset.fieldTable;
    field["kind"] = containerItems[i].dataset.fieldType;
    field["editable"] = containerItems[i].dataset.fieldEditable;
    containerItemsJSON.push(field);
  }

  return containerItemsJSON;
}

function getContainerParam(containerId) {
  switch(containerId) {
    case "layout-builder-draggable-header-container1":
      return "draggable_fields_header_container1";
    case "layout-builder-draggable-header-container2":
      return "draggable_fields_header_container2";
    case "layout-builder-draggable-main-container1":
      return "draggable_fields_main_container1";
    case "layout-builder-draggable-main-container2":
      return "draggable_fields_main_container2";
    case "layout-builder-draggable-main-container3":
      return "draggable_fields_main_container3";
    case "layout-builder-draggable-side-container":
      return "draggable_fields_side_container";
    default:
      console.error("unknown container - " + containerId);
      return;
  }
}

function updateLayoutRelatedTables(el) {
  let data = {};
  let layoutID = location.pathname.split("/")[2];
  data["related_table"] = el.dataset.table;

  $.ajax({
    url: "/layouts/" + layoutID + "/related_tables",
    type: "PATCH",
    data,
    error: function(XMLHttpRequest, errorTextStatus, error){
      alert("Failed: "+ errorTextStatus+" ;"+error);
     }
  });
}

function showFieldSettingsFormScreen2() {
  $("#layout_builder_field_settings_form_screen_1").addClass("hide");
  $("#layout_builder_field_settings_form_screen_2").removeClass("hide");
}

function showFieldSettingsFormScreen1() {
  $("#layout_builder_field_settings_form_screen_2").addClass("hide");
  $("#layout_builder_field_settings_form_screen_1").removeClass("hide");
}


function removeRelatedTable() {
  let clickedTable = event.target.parentElement.parentElement;
  let containerId = "#" + "draggable-list-for-relatable-table-" + clickedTable.dataset.table;
  let data = {};
  let layoutID = location.pathname.split("/")[2];
  data['related_table'] = clickedTable.dataset.table;

  $.ajax({
    url: "/layouts/" + layoutID + "/related_tables/remove",
    type: "PATCH",
    data,
    error: function(XMLHttpRequest, errorTextStatus, error){
        alert("Failed: "+ errorTextStatus+" ;"+error);
     },
    success: function(response, status, request){
      $(clickedTable).find('i.fa-times').hide();
      $(clickedTable).appendTo(containerId);
    }
  })
}
;
function submitSettingsChange () {
  $("body").on("change", "#role--edit-settings:checkbox", function () {
    var id = $(this).data("role");
    var setting = $(this).data("setting");
    $.ajax({
     method: "PUT",
     url: "/roles",
     data: {
       id: id,
       setting: setting
     },
    });
  });

  $("body").on("change", "#role--export-limit", function () {
    var id = $(this).data("role");
    var limit = $(this).val();
    $.ajax({
     method: "PUT",
     url: "/roles",
     data: {
       id: id,
       limit: limit
     },
    })
  });
}

Paloma.controller("AdminUsers", {
  index () {
    submitSettingsChange();
  }
});
Paloma.controller("Dashboard", {
  show () {
    $(".spinner").hide();
  }
});
function submitPasswordChange () {
  $("input#database_password").on("change", function () {
    $("#database_password_changed").val(true);
  });
}

function clearGemCredentials () {
  $("#remove-gem-connection").on("click", function () {
    $("#database_domain_url").val("");
    $("#database_gem_token").val("");
  });
}

Paloma.controller("Databases", {
  new () {
    submitPasswordChange();
  },

  edit () {
    submitPasswordChange();
    clearGemCredentials();
  }
});
function uncheckEditable(target, currentField) {
  target.checked = false;
  currentField.dataset["fieldEditable"] = false;
}

function checkEditable(target, currentField) {
  target.checked = true;
  currentField.dataset["fieldEditable"] = true;
}

function showWarningModalDialog(yesCallback, noCallback) {
    $("#layout-builder-editable-warning-modal").modal({
      backdrop: "static",
      keyboard: false
    });

    $("#layout-builder-editable-warning-modal-next-button").click(function() {
        yesCallback();
    });

    $("#layout-builder-editable-warning-modal-cancel-button").click(function() {
        noCallback();
    });
}

function updateLayoutBuilderContainer (containerId, containerItems) {
  var url = window.location.href;
  var id = url.split("/")[4];
  var containerParam = getContainerParam(containerId);
  var data = {};
  data["view_builder"] = {};
  let container = $("#" + containerId);

  if (containerItems.length === 0) {
    data["view_builder"][containerParam] = JSON.stringify(containerItems);
    if (!container.hasClass("layout-placeholder--border")) {
      container.addClass("layout-placeholder--border");
    }
  } else {
    data["view_builder"][containerParam] = containerItems;
    if (container.hasClass("layout-placeholder--border")) {
      container.removeClass("layout-placeholder--border");
    }
  }

  $.ajax({
    url: "/layouts/" + id,
    type: "PATCH",
    data,
    error (){ },
    success (){ }
  });
}

function toggleInlineEditableField () {
  $(document).on("change", ".layout-builder-editable-toggle:checkbox", function(evt) {
    evt.preventDefault();
    const _this = this;
    const currentField = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    const currentFieldContainerId = currentField.parentElement.id;
    let currentFieldContainerItems;

    if (_this.checked) {
      let confirmationTitle = `Warning: You are about to make ${currentField.innerText.trim()} editable for your users`;
      let confirmationText = "" +
      "Not to alarm you and you probably want to do this as it’s one of the core features. However, we wanted to make sure you were sure." +
      "\n\nMaking this field editable will mean that:" +
      "\n - Your users will be able to edit the field" +
      "\n - Any changes will be done directly on the source data" +
      "\n - The DB will have been updated so please make sure you keep backups" +
      "\n\nYou probably should not make fields editable if:" +
      "\n - They are primary or secondary keys" +
      "\n - They are fields that are calculated by your system (and so will be soon overwritten)" +
      "\n\nIf you are unsure, ask a/your developer.";

      swal(confirmationTitle, confirmationText, {
        buttons: {
          cancel: "No keep field read only",
          confirm: "Yes please make editable"
        }
      }).then((value) => {
        if (value === null) {
          uncheckEditable(_this, currentField);
        } else {
          checkEditable(_this, currentField);
          currentFieldContainerItems = getContainerItemsJSON(currentFieldContainerId);
          updateLayoutBuilderContainer(currentFieldContainerId, currentFieldContainerItems);
        }
      });
    } else {
      uncheckEditable(_this, currentField);
      currentFieldContainerItems = getContainerItemsJSON(currentFieldContainerId);
      updateLayoutBuilderContainer(currentFieldContainerId, currentFieldContainerItems);
    }
  });
}


function getOptionsForDraggable (primaryTable) {
  $.ajax({
    url: "/table_fields_with_type",
    type: "GET",
    data: {
      table: primaryTable,
      id: $("#database-id").text().trim()
    },
    async: true,
    dataType: "json",
    error(XMLHttpRequest, errorTextStatus, error){
              window.toastr.error("Invalid target database, please review credentials.");
           },
    success(data){
      updateDraggableFieldsContainer(data);
    }
  });
}

function rebuildDraggableDataContainers() {
  var dataContainerIds = [
    "#layout-builder-draggable-main-container1",
    "#layout-builder-draggable-main-container2",
    "#layout-builder-draggable-main-container3"
  ];

  for (var i = 0; i < dataContainerIds.length; i++) {
    let containerId = dataContainerIds[i];
    let data = JSON.parse($(containerId)[0].dataset.fieldsForContainer);

    if (data !== "[]") {
      let fieldsForContainer = Object.values(data);

      for (var j = 0; j < fieldsForContainer.length; j++) {
        let field = fieldsForContainer[j];
        if (!containerContainsDraggableItem(containerId, field.title)) {
          let draggableField = buildDraggableField(field);
          $(containerId).append(draggableField);
        }
      }
    }
  }
}

function rebuildDraggable(table) {
  if (draggable) {
    draggable.destroy();
  }

  rebuildDraggableDataContainers();

  getOptionsForDraggable(table);
  initializeDraggable();
}

function loadDraggableFields () {
  $(".sv_builder_table_navigation").click(function(evt) {
    evt.preventDefault();
    if ($(this).hasClass("active")) {
      $("#sv_builder_primary_table_draggable_fields_container").html("");
      $(this).removeClass("active");
    } else {
      let table = $(this).data().tableName;

      rebuildDraggable(table);
      $(this).addClass("active");
    }
  });
}

function initializeDragula () {
  drake = dragula([...document.querySelectorAll(".draggable-list-for-relatable-table"), document.querySelector("#droppable-list-of-relatable-tables")]);

  drake.on("drop", (el) => {
    $(el).find(".remove-related-table").removeClass("hide");
    $(el).find("i.fa-times").show();
    updateLayoutRelatedTables(el);
  });
}

Paloma.controller("LayoutBuilder", {
  index () {
    $(".spinner").hide();
  },
  new () {
    $("#layout-builder-modal").modal({
      backdrop: "static",
      keyboard: false
    });
  },
  edit () {
    toggleInlineEditableField();
    rebuildDraggableDataContainers();
    initializeDraggable();
    loadDraggableFields();
    initializeDragula();
    $(".spinner").hide();
  }
});
Paloma.controller("OrganisationSettings", {
    edit () {
      $(".spinner").hide();
    }
  });
Paloma.controller("Permissions", {
    index () {
      $(".spinner").hide();
    }
  });
"use strict";

function loadNestedDataTable(columns, data, nestedTable, recordId) {
  var nestedSearchableTable = $("#target-table-" + nestedTable + "-" + recordId).DataTable({
    colReorder: false,
    info: false,
    paging: false,
    columns,
    autoWidth: true,
    dom: "",
    data,
    stateSave: true,
    stateSaveParams(settings, data) {
      data.search.search = "";
    },
    scrollX: true,
    processing: false,
    stateSaveCallback(settings, data) {
      stateSaveCallbackFunction(settings, data, $(this));
    },
    stateLoadCallback(settings, callback) {
      stateLoadCallbackFunction($(this), callback);
    },
    initComplete(settings, json) {
      initCompleteFunction(settings, json, nestedSearchableTable);
    }
  });
  $(".spinner").hide();
}

function fetchDataForNestedTable(recordId, nestedTable, tableName) {
  var databaseId = (location.pathname+location.search).substr(1).split("/")[1].split("?")[0];
  var url = "/tables/" + tableName + "/" + recordId + "?record-id=" + recordId + "&nested-table=" + nestedTable + "&table=" + nestedTable + "&database_id=" + databaseId + "&table_name=" + tableName;

  $.ajax({
    dataType: "json",
    url,
    success(d) {
      loadNestedDataTable(d.columns, d.data, nestedTable, recordId);
    },
    error(){
      toastr.error("Something went wrong. Please reload the page or speak to an Administrator");
    }
  });
}

function formatNestedTableColumns (data, tableName, nestedTable, nestedVisibleColumns) {
  var newTableStart = "<table id='target-table-"+ nestedTable +"-"+ data.id +"' class='nested-data-table table' data-table-name='"+ nestedTable +"' style='width:300px;'>"+
    "<thead>"+
      "<tr>"+
        "<th>";

  var newArray = [];
  nestedVisibleColumns.forEach(function (column) {
    newArray.push(humanizeString(column));
  });
  var headers = newArray.join("</th><th>");

  var newTableEnd = "</th>"+
      "</tr>"+
    "</thead>"+
  "</table>";

  fetchDataForNestedTable(data.id, nestedTable, tableName);

  return newTableStart + headers + newTableEnd;
}

function loadDataTable (columns) {
  let canExport = $(".data-table").data("can-export");
  let tableName = $(".data-table").data("table-name");
  let databaseName = $(".data-table").data("database-name");
  var nestedVisibleColumns = $(".data-table").data("nested-table-columns");
  let databaseId = (location.pathname+location.search).substr(1).split("/")[1].split("?")[0];

  if (nestedVisibleColumns.length > 0) {
    columns.unshift({"data":null,"defaultContent":"<a class='table--nested-table' data-remote='true' href='#'><img class='nested-table rotate' src='/assets/images/icons/triangle.svg'></a>"});
  }

  let reorderTargets = (nestedVisibleColumns.length > 0) ? [0, 1] : 0;
  let defaultOrder = (nestedVisibleColumns.length > 0) ? [ 2, "asc" ] : [ 1, "asc" ];

  let colOrderable = [
    { orderable: false, targets: reorderTargets }
  ];

  let today = new Date();

  columns.unshift({
    data: "",
    sortable: false,
    defaultContent: "<input type='checkbox' class='data-table--select-input' data-id='"+ databaseId +"' name='"+ tableName +"' value='"+ tableName +"'></input>"
  });

  var searchableTable = $(".data-table").DataTable({
    colReorder: true,
    columnDefs: colOrderable,
    order: [defaultOrder],
    deferRender: true,
    autoWidth: false,
    scrollX: true,
    serverSide: true,
    processing: false,
    pagingType: "simple_numbers",
    language: {
      paginate: {
        next: "Next >",
        previous: "< Prev",
      },
      info: "of _MAX_ results",
      zeroRecords: "Nothing found - sorry",
      infoEmpty: "No records available",
      infoFiltered: "(filtered from _MAX_ total records)"
    },
    ajax: "/" + (location.pathname+location.search).substr(1),
    dom: "f<'table--info'piB>rt<'clear'>",
    columns,
    stateSave: true,
    stateSaveParams(settings, data) {
      data.search.search = "";
    },
    stateSaveCallback(settings, data) {
      stateSaveCallbackFunction(settings, data, $(this));
    },
    stateLoadCallback(settings, callback) {
      stateLoadCallbackFunction($(this), callback);
    },
    createdRow(row, data) {
      let table = $(this).data("table-name");
      let nestedTable = $(this).data("nested-table");
      let id = data.id;
      let previewUrl = "/tables/" + table + "/" + id + "?table=" + table;

      if (nestedTable.length === 0) {
        $($(row).children()[1]).addClass("table--clickable-cell");
      } else {
        $($(row).children()[2]).addClass("table--clickable-cell");
      }

      $(row).addClass("table--nested-row");
      $(row).addClass("table--preview-link");
      $(row).attr("data-href",  previewUrl);
      $(row).attr("data-nested-table", nestedTable);
      $(row).attr("data-record-id", id);
    },
    buttons: [
      {
        extend: "colvis",
        className: "table--colvis",
        text: "Columns"
      },
      {
        extend: "csv",
        className: "table--export " + canExport,
        text: "Export",
        filename: today.toISOString().split("T")[0] + "_" + databaseName + "_" + tableName
      },
      {
        text: "Settings",
        className: "table--settings",
        action () {
          $("button.table--settings").attr("disabled", true);
          $.ajax({
            url: "/table/settings",
            type: "GET",
            data: { "table": tableName, "database_id": databaseId },
            success() {}
          });
        }
      }
    ],
    initComplete(settings, json) {
      initCompleteFunction(settings, json, searchableTable);
      $(".spinner").hide();
    }
  });

  $("body").on("click", ".buttons-columnVisibility a", function () {
    searchableTable.state.save().ajax.reload();
  });

  $("body").on("click", "#target-table-" + tableName + " > tbody > tr.table--nested-row > td > a.table--nested-table", function () {
    var tr = $(this).closest("tr");
    var row = searchableTable.row(tr);
    var nestedTable = tr.data("nested-table");

    if (nestedTable === null || nestedTable === "") {
      return;
    }

    if ( row.child.isShown() ) {
      row.child.hide();
      tr.removeClass("shown");
    }
    else {
      row.child( formatNestedTableColumns(row.data(), tableName, nestedTable, nestedVisibleColumns) ).show();
      tr.addClass("shown");
    }
  });

  selectInput(searchableTable);

  manipulateData(searchableTable);

  window["datatable"] = searchableTable;
}

function fetchDataForTable() {
  $.ajax({
    dataType: "json",
    url: "/" + (location.pathname+location.search).substr(1),
    cache: false,
    success(d) {
      loadDataTable(d.columns);
    },
    error(){
      toastr.error("Something went wrong. Please reload the page or speak to an Administrator");
    }
  });
}

function loadRelatedDataTable (columns, id, ajax) {
  var searchableRelatedTable = { [id]:
    $("#" + id).DataTable({
      colReorder: true,
      deferRender: true,
      autoWidth: false,
      scrollX: true,
      serverSide: true,
      processing: false,
      pagingType: "simple_numbers",
      language: {
        paginate: {
          next: "Next >",
          previous: "< Prev",
        },
        info: "of _MAX_ results",
        zeroRecords: "Nothing found - sorry",
        infoEmpty: "No records available",
        infoFiltered: "(filtered from _MAX_ total records)"
      },
      ajax,
      dom: "f<'table--info'piB>rt<'clear'>",
      columns,
      stateSave: true,
      stateSaveParams(settings, data) {
        data.search.search = "";
      },
      stateSaveCallback(settings, data) {
        stateSaveCallbackFunction(settings, data, $(this));
      },
      stateLoadCallback(settings, callback) {
        stateLoadCallbackFunction($(this), callback);
      },
      buttons: [
          {
            extend: "colvis",
            className: "table--colvis",
            text: "Columns"
          },
        ],
      createdRow(row, data, dataIndex) {
        var table = $(this).data("table-name");
        var id = data.id;
        var previewUrl = "/tables/" + table + "/" + id + "?table=" + table;
        $(row).addClass("clickable-row");
        $(row).attr("data-href",  previewUrl);
      },
      initComplete(settings, json) {
        initCompleteFunction(settings, json, searchableRelatedTable);
      }
    })
  };
}

function fetchDataForRelatedTables() {
  var recordId = location.pathname.split("/")[3];
  var primaryTable = location.pathname.split("/")[2];
  var relatedTables = $(".related-data-table");
  let databaseId = $(".related-data-table").first().data("database-id");

  for (var i = 0; i < relatedTables.length; i++) {
    let relatedTable = relatedTables[i].dataset.tableName;
    let relatedTableId = relatedTables[i].id;
    let url = "/tables/" + primaryTable + "/" + recordId + "?table=" + relatedTable + "&database_id=" + databaseId;

    $.ajax({
      dataType: "json",
      url,
      success(d) {
        loadRelatedDataTable(d.columns, relatedTableId, url);
      },
      error(){ }
    });
  }
}

function rotateIcon (icon, nestedRowOpen) {
  if (nestedRowOpen) {
    icon.removeClass("rotate");
  } else {
    icon.addClass("rotate");
  }
}

function rotateNestedTableIcon () {
  $("body").on("click", ".table--nested-table", function () {
    let triangleIcon = $(this).children(".nested-table");
    let nestedRowOpen = $(this).parent().parent().next().hasClass("table--nested-row");
    rotateIcon(triangleIcon, nestedRowOpen);
  });

  $("body").on("click", ".sorting_1", function () {
    let triangleIcon = $(this).children().children(".nested-table");
    let nestedRowOpen = $(this).parent().next().hasClass("table--nested-row");
    rotateIcon(triangleIcon, nestedRowOpen);
  });
}

function linkToPreview () {
  $("body").on("click", ".table--clickable-cell", function () {
    let previewLocation = $(this).parent().data("href");
    let databaseId = (location.pathname+location.search).substr(1).split("/")[1].split("?")[0];
    let databaseParams = "&database_id=" + databaseId;

    window.location.href = previewLocation + databaseParams;
  });
}

function activityItem (data) {
  return "<tr>" +
    "<td>" +
      data.created_at +
    "</td>" +
    "<td>" +
      "<strong>" + data.user_name + "</strong>" +
      "<span> added a </span><strong>tag: </strong>" +
      "<span>" + data.activity.content + "</span>" +
    "</td>" +
  "</tr>";
}

function submitActivityForm (data) {
  let formData = {
    feedable_type: data.outcome.task_queue_item_table,
    feedable_id: parseInt(data.outcome.task_queue_item_primary_key),
    kind: "outcome",
    user_id: data.user_id,
    content: data.outcome_content
  };

  $.ajax({
    url: "/activities/create_js",
    type: "POST",
    data: formData,
    async: true,
    dataType: "script",
    error () {
      window.toastr.error("Something went wrong, please try again.");
    },
    success (data) {
      if ($(".all-activities-tab").find("table > tbody > tr").length === 3) {
        $(".all-activities-tab").find("table > tbody > tr:last").remove();
      }
      $(".all-activities-tab").find(".activities-history--table").prepend(activityItem(JSON.parse(data)));
      $(".all-activities-tab .default-message").remove();
      if ($(".activity-tab-for-outcomes").find("table > tbody > tr").length === 3) {
        $(".activity-tab-for-outcomes").find("table > tbody > tr:last").remove();
      }
      $(".activity-tab-for-outcomes").find(".activities-history--table").prepend(activityItem(JSON.parse(data)));
      $(".activity-tab-for-outcomes .default-message").remove();
      window.toastr.success("Task queue outcome updated.");
    }
  });
}

function applyOutcomeRule () {
  $(".task-queue--outcome-button").click(function (event) {
    event.preventDefault();
    $(".spinner").show();
    let table = location.pathname.substr(1).split("/")[1];
    let primaryKey = location.pathname.substr(1).split("/")[2].split("?")[0];
    let outcome = $(this).data("outcome");
    let taskQueueId = $(this).data("task-queue-id");
    let url = "/task_queues/" + taskQueueId + "/outcome";

    let data = {
      outcome,
      table,
      primary_key: primaryKey,
      task_queue_id: taskQueueId
  };

    $.ajax({
      url,
      type: "POST",
      data,
      async: true,
      dataType: "json",
      error () {
                window.toastr.error("Something went wrong, please try again.");
             },
      success (data) {
        submitActivityForm(data);
        $(".task-queue--outcome-button-success").addClass("hide");
        $(".task-queue--outcome-button-failure").addClass("hide");
        window.toastr.success("Task queue outcome updated.");
        $(".spinner").hide();
      }
    });
  });
}

Paloma.controller("Tables", {
  show () {
    fetchDataForTable();
    updateEditableFieldInput();
    rotateNestedTableIcon();
    linkToPreview();
  },

  preview () {
    fetchDataForRelatedTables();
    updateEditableFieldInput();
    applyOutcomeRule();
    rotateNestedTableIcon();
    $(".spinner").hide();
  }
});
function loadTaskQueuePreviewDataTable (columns) {
  if ($.fn.dataTable.isDataTable("#task-queue-preview-table")) {
    var table = $("#task-queue-preview-table").DataTable();
    table.destroy();
  }

  $("#task-queue-preview-table").DataTable({
    colReorder: false,
    deferRender: true,
    autoWidth: false,
    scrollX: true,
    serverSide: true,
    ajax: "/task_queues/" + location.pathname.split("/")[2] + "/preview",
    dom: "<'table--info'pB>rti<'clear'>",
    pagingType: "simple_numbers",
    language: {
      paginate: {
        next: "Next >",
        previous: "< Prev",
      },
      info: "of _MAX_ results",
      zeroRecords: "Nothing found - sorry",
      infoEmpty: "",
      infoFiltered: "filtered from _MAX_ total records"
    },
    columns,
    stateSave: true,
    stateSaveParams(settings, data) {
      data.search.search = "";
    },
    stateSaveCallback(settings, data) {
      stateSaveCallbackFunction(settings, data, $(this));
    },
    stateLoadCallback(settings, callback) {
      stateLoadCallbackFunction($(this), callback);
    },
    buttons: [
      {
        extend: "colvis",
        className: "table--colvis",
        text: "Columns"
      },
      {
        extend: "csv",
        className: "table--export ",
        text: "Export"
      }
    ],
    createdRow(row, data) {
      let id = data.id;
      let table = $(this).data("table-name");
      let databaseId = $(this).data("database-id");
      let previewUrl = "/tables/" + table + "/" + id + "?table=" + table + "&database_id=" + databaseId;

      $(row).attr("data-href",  previewUrl);
      $(row).attr("data-task-queue-id", location.pathname.split("/")[2]);
      $(row).addClass("task-queue-item");
      $(row).addClass("clickable-row");
      $(row).attr( "data-task-queue-item-primary-key", id);
    }
  });

  $("#task-queue-preview-table").removeClass("hide");
}

function loadTaskQueueDataTable (columns) {
  if ($.fn.dataTable.isDataTable("#target-table-task-queues")) {
    var table = $("#target-table-task-queues").DataTable();
    table.destroy();
  }

  $("#target-table-task-queues").DataTable({
    colReorder: false,
    deferRender: true,
    autoWidth: false,
    scrollX: true,
    serverSide: true,
    processing: false,
    ajax: location.pathname,
    dom: "f<'table--info'pB>rti<'clear'>",
    pagingType: "simple_numbers",
    language: {
      paginate: {
        next: "Next >",
        previous: "< Prev",
      },
      info: "of _MAX_ results",
      zeroRecords: "Nothing found - sorry",
      infoEmpty: "",
      infoFiltered: "filtered from _MAX_ total records"
    },
    columns,
    stateSave: true,
    stateSaveParams(settings, data) {
      data.search.search = "";
    },
    stateSaveCallback(settings, data) {
      stateSaveCallbackFunction(settings, data, $(this));
    },
    stateLoadCallback(settings, callback) {
      stateLoadCallbackFunction($(this), callback);
    },
    buttons: [
      {
        extend: "colvis",
        className: "table--colvis",
        text: "Columns"
      },
      {
        extend: "csv",
        className: "table--export ",
        text: "Export"
      }
    ],
    createdRow(row, data) {
      let id = data.id;
      let table = $(this).data("table-name");
      let databaseId = $(this).data("database-id");
      let previewUrl = "/tables/" + table + "/" + id + "?table=" + table + "&database_id=" + databaseId;

      $(row).attr("data-href",  previewUrl);
      $(row).attr("data-task-queue-id", location.pathname.split("/")[2]);
      $(row).addClass("task-queue-item");
      $(row).addClass("clickable-row");
      $(row).attr( "data-task-queue-item-primary-key", id);
    }
  });

  $("#target-table-task-queues").removeClass("hide");
}

function initQueryBuilder (filters) {
  $("#builder").on("afterUpdateRuleValue.queryBuilder", function(e, rule) {
    if (rule.filter.plugin === "datepicker") {
      rule.$el.find(".rule-value-container input").datepicker("update");
    }
  });

  $("#builder").queryBuilder({
    filters,
    operators: ["equal",
                "not_equal",
                "contains",
                "not_contains",
                "between",
                "not_between",
                "is_null",
                "is_not_null",
                "begins_with",
                "not_begins_with",
                "is_empty",
                "is_not_empty",
                "less",
                "less_or_equal",
                "greater",
                "greater_or_equal",
                "ends_with",
                "not_ends_with"]
  });

  let taskQueueRules = $("#builder").data().taskQueueRules;
  $(".spinner").hide();
  if (!$.isEmptyObject(taskQueueRules) ) {
    $("#builder").queryBuilder("setRules", taskQueueRules);
  }
}

function buildFilterForDataType (type, id) {
  var filter = {};

  if (type === "datetime") {
    filter["id"] = id;
    filter["type"] = "date";
    filter["validation"] = {
      format: "YYYY/MM/DD"
    };
    filter["plugin"] = "datepicker";
    filter["plugin_config"] = {
      format: "yyyy/mm/dd",
      todayBtn: "linked",
      todayHighlight: true,
      autoclose: true
    };
  } else {
    filter["id"] = id;
    filter["type"] = type;
  }

  return filter;
}

function loadQueryBuilder (data) {
  $(".spinner").show();
  const filters = [];

  for (var i = 0; i < data.length; i++) {
    var filter;
    var id = data[i][0];
    var type = data[i][1];

    if (type === "inet" || type === "text") {
      filter = {};
      filter["id"] = id;
      filter["type"] = "string";
    } else {
      filter = buildFilterForDataType(type, id);
    }

    filters.push(filter);
  }

  initQueryBuilder(filters);
}

function getFieldsWithType (table) {
  $.ajax({
    url: "/related_table_fields_with_type",
    type: "GET",
    data: {
      table,
      id: $("#database-id").text().trim()
    },
    async: true,
    dataType: "json",
    error() {
      window.toastr.error("Invalid target database, please review credentials.");
    },
    success(data) {
      loadQueryBuilder(data);
    }
  });
}

function getFieldTypeInput (table, fieldName) {
  var tableFields = null;
  $.ajax({
    url: "/table_fields_with_type",
    type: "GET",
    data: {
      table,
      id: $("#database-id").text().trim()
    },
    async: false,
    dataType: "json",
    error() {
      window.toastr.error("Invalid target database, please review credentials.");
    },
    success(data) {
      tableFields = data;
    }
  });

  var result = null;
  for ( i=0; i < tableFields.length; i++ ) {
    if (tableFields[i][0] === fieldName) {
      result = tableFields[i];
    }
  }

  return result;
}

function loadResults () {
  var taskQueueId = document.getElementById("builder").dataset.taskQueueId;

  var params = {};
  params["task_queue"] = {};

  if ($("#builder").queryBuilder("getRules") !== null) {
    params["task_queue"]["query_builder_rules"] = JSON.stringify($("#builder").queryBuilder("getRules"), null, 2);
  }

  if ($("#builder").queryBuilder("getSQL") !== null) {
    params["task_queue"]["query_builder_sql"] = $("#builder").queryBuilder("getSQL").sql;
  }

  params["task_queue"]["details"] = document.getElementById("task_queue_details").value;
  params["task_queue"]["name"] = document.getElementById("task_queue_name").value;

  $.ajax({
    url: "/task_queues/" + taskQueueId,
    type: "PATCH",
    data: params,
    dataType: "json",
    error() {
      window.toastr.error("Task queue preview failed, review SQL.");
    },
    success(response) {
      let columns = response.columns;

      if (typeof columns !== "undefined") {
        loadTaskQueuePreviewDataTable(columns);
      }

      window.toastr.info("Task queue updated.");
    }
  });
}

function validateField(outcome, fieldType, selectedFieldType) {
  if (fieldType[1] === "string" && selectedFieldType === "Text") {
    return true;
  } else if (fieldType[1] === "integer" && selectedFieldType === "Increment") {
    return true;
  } else if (fieldType[1] === "text" && selectedFieldType === "Text") {
    return true;
  } else if (fieldType[1] === "datetime" && selectedFieldType === "DateTime") {
    return true;
  } else if (fieldType[1] === "boolean" && selectedFieldType === "Boolean") {
    return true;
  } else {
    window.toastr.error("Your selected update type does not match your " + outcome + " field type. Please select a valid type for that field.");
    return false;
  }
}

function validateFieldType(params) {
  var taskQueueTable = document.getElementById("builder").dataset.taskQueueTable;
  var successField = params["task_queue[success_database][update_field]"];
  var failureField = params["task_queue[failure_database][update_field]"];
  var success = getFieldTypeInput(taskQueueTable, successField);
  var failure = getFieldTypeInput(taskQueueTable, failureField);
  var successValid = validateField("success", success, params["task_queue[success_database][update_type]"]);
  var failureValid = validateField("failure", failure, params["task_queue[failure_database][update_type]"]);
  return successValid && failureValid;
}

function updateSettings(button) {
  var taskQueueId = document.getElementById("builder").dataset.taskQueueId;
  var params = {};
  $(button.form).serializeArray().map(function (x) {
    params[x.name] = x.value;
  });

  if (validateFieldType(params) === false) {
    return;
  }

  $.ajax({
    url: "/task_queues/" + taskQueueId,
    type: "PATCH",
    data: params,
    dataType: "json",
    error() {
      window.toastr.error("Task queue preview failed, please review errors and try again.");
    },
    success(data) {
      $(".task-queue--outcome-button-success")[0].text = data["task_queue"]["success_outcome_title"];
      $(".task-queue--outcome-button-failure")[0].text = data["task_queue"]["failure_outcome_title"];
      $(".task-queue--name")[0].innerText = data["task_queue"]["name"];
      $(".task-queue--details")[0].innerText = data["task_queue"]["details"];
      window.toastr.info("Task queue updated.");
    }
  });
}

function linkToSingleDataView () {
  $("body").on("click", ".clickable-row", function () {
    let previewLocation = $(this).data("href");
    let taskQueueId = $(this).data("task-queue-id");
    let taskQueueParams = "&task_queue_id=" + taskQueueId;

    window.location.href = previewLocation + taskQueueParams;
  });
}

function showLabel(outcome) {
  let label = $("#task-queue-" + outcome + "-label");
  if (label.hasClass("hide")) {
    label.removeClass("hide");
  }
}

function hideInput(outcome, input) {
  let inputField = $("#task-queue-" + outcome + input);
  if (!inputField.hasClass("hide")) {
    inputField.addClass("hide");
  }
}

function displayUpdateField (field, outcome) {
  if (field.value === "Boolean") {
    hideInput(outcome, "-text");
    $("#task-queue-" + outcome + "-boolean").removeClass("hide");
    showLabel(outcome);
  } else if (field.value === "Text") {
    hideInput(outcome, "-boolean");
    $("#task-queue-" + outcome + "-text").removeClass("hide");
    showLabel(outcome);
  } else if (field.value === "Increment") {
    hideInput(outcome, "-boolean");
    hideInput(outcome, "-text");
    if (!$("#task-queue-" + outcome + "-label").hasClass("hide")) {
      $("#task-queue-" + outcome + "-label").addClass("hide");
    }
  }
}

function updateTaskQueue(checkbox) {
  var taskQueueId = document.getElementById("builder").dataset.taskQueueId;

  var params = { "task_queue[enabled]": checkbox.checked };

  $.ajax({
    url: "/task_queues/" + taskQueueId,
    type: "PATCH",
    data: params,
    dataType: "json",
    error() {
      window.toastr.error("Task queue preview failed, please review errors and try again.");
    },
    success() {
      window.toastr.info("Task queue updated.");
    }
  });
}

function loadCorrectInput() {
  let successType = $("#task_queue_success_database_update_type").val();
  let failureType = $("#task_queue_failure_database_update_type").val();

  if (successType === "Boolean") {
    showLabel("success");
    $("#task-queue-success-boolean").removeClass("hide");
  } else if (successType === "Text") {
    showLabel("success");
    $("#task-queue-success-text").removeClass("hide");
  }

  if (failureType === "Boolean") {
    showLabel("failure");
    $("#task-queue-failure-boolean").removeClass("hide");
  } else if (failureType === "Text") {
    showLabel("failure");
    $("#task-queue-failure-text").removeClass("hide");
  }
}

Paloma.controller("TaskQueues", {
  index () {
    $(".spinner").hide();
  },

  new () {
    $("#new-task-queue-modal").modal({
      backdrop: "static",
      keyboard: false
    });

    $("#queue-builder-modal-save-button").click(function() {
      var params = {};
      params["task_queue"] = {};
      params["task_queue"]["name"] = document.getElementById("task_queue_name").value;
      params["task_queue"]["details"] = document.getElementById("task_queue_details").value;
      params["task_queue"]["table"] = document.getElementById("task_queue_table").value;
      saveTaskQueue(params);
    });
  },

  edit () {
    $(".spinner").show();
    let taskQueueTable = document.getElementById("builder").dataset.taskQueueTable;
    let taskQueueId = document.getElementById("builder").dataset.taskQueueId;

    getFieldsWithType(taskQueueTable);

    $(".task-queue-update-button").click(function() {
      loadResults();
    });

    $(".task-queue-update-settings").click(function(evt) {
      evt.preventDefault();
      updateSettings(this);
    });

    linkToSingleDataView();

    $("#task_queue_success_database_update_type").change(function() {
      displayUpdateField(this, "success");
    });

    $("#task_queue_failure_database_update_type").change(function() {
      displayUpdateField(this, "failure");
    });

    $("#task-queue-enable").change(function() {
      updateTaskQueue(this);
    });

    var params = {};
    params["task_queue"] = {};
    $.ajax({
      url: "/task_queues/" + taskQueueId,
      type: "PATCH",
      data: { "task_queue": { "param": null } },
      dataType: "json",
      error() {
        window.toastr.error("Task queue preview failed, review SQL.");
      },
      success(response) {
        let columns = response.columns;

        if (typeof columns !== "undefined") {
          loadTaskQueuePreviewDataTable(columns);
        }
      }
    });

    loadCorrectInput();

    $(window).load(function() {
      $(".spinner").hide();
    });
  },

  show () {
    $.ajax({
      dataType: "json",
      url: "/" + (location.pathname+location.search).substr(1),
      cache: false,
      success(d) {
        loadTaskQueueDataTable(d.columns);
      },
      error(){
        toastr.error("Something went wrong. Please reload the page or speak to an Administrator");
      }
    });
    linkToSingleDataView();
  }
});
// // let queryBuilderFilters;
// // let metaTag;
// // let isCurrentControllerTaskQueues;
// // let isCurrentActionIndex;
// // let isCurrentActionEdit;
// // // let getOptionsForDraggable;
// // let loadTaskQueuePreview;
// // // let initQueryBuilder;
// // // let buildFilterForDataType;
// // // let loadQueryBuilder;
// // // let getFieldsWithType;
// // let disableElementbyId;
// // let saveTaskQueue;
// // let buildTaskQueuePreviewFieldSetting;
// // let refreshTaskQueuePreviewSettings;
// // let updateTaskQueueDraggableFields;
// // let updateTaskQueueItemFeed;
// // let addToTaskQueueActivityStream;
// // let applyOutcomeRule;
// // let loadIndexPage;
// // let loadEditPage;

// // getOptionsForDraggable = function (primaryTable) {
// //   $.ajax({
// //     url: "/layouts/table_fields_with_type",
// //     type: "GET",
// //     data: {
// //       table: primaryTable,
// //       id: location.pathname.substr(1).split("/")[1]
// //     },
// //     async: true,
// //     dataType: "json",
// //     error(XMLHttpRequest, errorTextStatus, error){
// //               window.toastr.error("Invalid target database, please review credentials.");
// //            },
// //     success(data){
// //       updateDraggableFieldsContainer(data);
// //     }
// //   });
// // }

// // initQueryBuilder = function (filters) {
// //   $("#builder").on("afterUpdateRuleValue.queryBuilder", function(e, rule) {
// //     if (rule.filter.plugin === "datepicker") {
// //       rule.$el.find(".rule-value-container input").datepicker("update");
// //     }
// //   });

// //   $("#builder").queryBuilder({
// //     filters,
// //     operators: ["equal",
// //                 "not_equal",
// //                 "contains",
// //                 "not_contains",
// //                 "between",
// //                 "not_between",
// //                 "is_null",
// //                 "is_not_null",
// //                 "begins_with",
// //                 "not_begins_with",
// //                 "is_empty",
// //                 "is_not_empty",
// //                 "less",
// //                 "less_or_equal",
// //                 "greater",
// //                 "greater_or_equal",
// //                 "ends_with",
// //                 "not_ends_with"]
// //   });

// //   let taskQueueRules = $("#builder").data().taskQueueRules;

// //   if ($.isEmptyObject(taskQueueRules) ) {
// //     console.log("no rule present")
// //   } else {
// //     $("#builder").queryBuilder("setRules", taskQueueRules);
// //   }
// // }

// // buildFilterForDataType = function (type, id) {
// //   var filter = {};

// //   if (type === "datetime") {
// //     filter["id"] = id;
// //     filter["type"] = "date";
// //     filter["validation"] = {
// //       format: "YYYY/MM/DD"
// //     };
// //     filter["plugin"] = "datepicker";
// //     filter["plugin_config"] = {
// //       format: "yyyy/mm/dd",
// //       todayBtn: "linked",
// //       todayHighlight: true,
// //       autoclose: true
// //     };
// //   } else {
// //     filter["id"] = id;
// //     filter["type"] = type;
// //   }

// //   return filter;
// // }

// // loadQueryBuilder = function (data) {
// //   const filters = [];

// //   for (var i = 0; i < data.length; i++) {
// //     var filter;
// //     var id = data[i][0];
// //     var type = data[i][1];

// //     if (type === "inet" || type === "text") {
// //       filter = {};
// //       filter["id"] = id;
// //       filter["type"] = "string";
// //     } else {
// //       filter = buildFilterForDataType(type, id);
// //     }

// //     filters.push(filter);
// //   }

// //   initQueryBuilder(filters);
// // }

// // getFieldsWithType = function (table) {
// //   $.ajax({
// //     url: "/layouts/table_fields_with_type",
// //     type: "GET",
// //     data: {
// //       table,
// //       id: location.pathname.substr(1).split("/")[1]
// //     },
// //     async: true,
// //     dataType: "json",
// //     error(XMLHttpRequest, errorTextStatus, error) {
// //               window.toastr.error("Invalid target database, please review credentials.");
// //            },
// //     success(data){
// //       loadQueryBuilder(data);
// //     }
// //   });
// // }

// disableElementbyId = function (id) {
//   $("#" + id).attr("disabled", true);
// }

// saveTaskQueue = function (params) {
//   disableElementbyId("queue-builder-modal-save-button");
//   disableElementbyId("queue-builder-modal-back-button");

//   $.ajax({
//     url: "/task_queues",
//     type: "POST",
//     data: params,
//     dataType: "json",
//     error(response, status, request) {
//       let responseJson = response.responseJSON;
//       for (var i = 0; i < responseJson.length; i++) {
//         let errorMessage = toString(responseJson[i]);
//         window.toastr.error(errorMessage);
//       }
//       window.toastr.error("Failed to save task queue.");
//       disableElementbyId("queue-builder-modal-save-button");
//       disableElementbyId("queue-builder-modal-back-button");
//     },
//     success(response, status, request) {
//       window.toastr.info("Task queue saved.");
//       let redirectURL = "/task_queues/" + response.id + "/edit";
//       window.location.replace(redirectURL);
//     }
//   });
// }

// buildTaskQueuePreviewFieldSetting = function (title) {
//   let el = "<p><b>" + title + "</b></p>" +
//   "<div class='divider'></div>";
//   return el;
// }

// refreshTaskQueuePreviewSettings = function () {
//   $("#task-queue-field-settings-preview-container").empty();

//   $.ajax({
//     url: "/task_queues/" + window.location.pathname.split("/")[2] + "/field_settings",
//     type: "GET",
//     async: true,
//     dataType: "json",
//     error(XMLHttpRequest, errorTextStatus, error){
//       window.toastr.error("Something went wrong, please try again.");
//     },
//     success(data){
//       data.fields.forEach(function(field, index) {
//         $("#task-queue-field-settings-preview-container").append(buildTaskQueuePreviewFieldSetting(field.title));
//       })
//     }
//   });
// }

// updateTaskQueueDraggableFields = function (containerId, containerItems) {
//   let containers = "#layout-builder-draggable-trash-container, #layout-builder-draggable-fields-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3";
//   var url = window.location.href;
//   var id = url.split("/")[4];
//   var containerParam = "draggable_fields";
//   var data = {};
//   data["task_queue"] = {};

//   if (containerItems.length === 0) {
//     data["task_queue"][containerParam] = JSON.stringify(containerItems);
//   } else {
//     data["task_queue"][containerParam] = containerItems;
//   }

//   $.ajax({
//     url: "/task_queues/" + id,
//     type: "PATCH",
//     data,
//     error(XMLHttpRequest, errorTextStatus, error){
//       window.toastr.error(XMLHttpRequest.responseJSON.error);
//     },
//     success(response, status, request){
//       window.toastr.info("Task queue fields successfully updated.");
//       refreshTaskQueuePreviewSettings();
//     }
//   });
// }

// updateTaskQueueItemData = function (data) {
//   const entries = Object.entries(data.row)
//   $('#task_queue_item_data').empty();

//   for (var i = 0; i < entries.length; i++) {
//     const entryHtml = "<p><b>" + entries[i][0]+ "</b>: <span>" + entries[i][1]+ "</span></p>"
//     $('#task_queue_item_data').append(entryHtml);
//   }
// }

// addToTaskQueueActivityStream = function(kind, content, time, author) {
//   let streamIcon;
//   let stream;

//   if (kind === 'note') {
//     streamIcon = "fa fa-pencil";
//   } else if (kind === 'call') {
//     streamIcon = "fa fa-phone";
//   } else if (kind === "meeting") {
//     streamIcon = "fa fa-calendar";
//   } else {
//     streamIcon = "fa fa-circle";
//   }

//   stream = "<div class='stream'>" +
//     "<div class='stream-badge'>" +
//       "<i class='" + streamIcon + "'></i>" +
//     "</div>" +
//     "<div class='stream-panel'>" +
//       "<div class='stream-info'>" +
//         "<a href=''>" +
//           "<img src='/assets/a2-22c5f70142282015b1aa1e8611a895fed56efb2db0045afe0fa124d2a1973d3c.jpg' />" +
//           "<span>" + author + "</span>" +
//           "<span class='date'>" + moment(time).fromNow() + "</span>" +
//         "</a>" +
//       "</div>" +
//       content +
//     "</div>" +
//   "</div>";

//   $('#task-queue-record-activity-stream').append(stream);

//   if (kind === "note") {
//     $('#task-queue-record-note-activity-stream').append(stream);
//   }

//   if (kind === "call") {
//     $('#task-queue-record-call-activity-stream').append(stream);
//   }
// }

// updateTaskQueueItemFeed = function (data) {
//   const entries = Object.entries(data.activities)
//   $('#task-queue-record-activity-stream').empty();
//   $('#task-queue-record-note-activity-stream').empty();
//   $('#task-queue-record-call-activity-stream').empty();
//   $('#task-queue-record-meeting-activity-stream').empty();

//   for (var i = 0; i < entries.length; i++) {
//     addToTaskQueueActivityStream(entries[i][1].kind, entries[i][1].content, entries[i][1]["created_at"], data.author)
//   }
// }

// getTaskQueueItem = function (taskQueueId, taskQueueItemPrimaryKey) {
//   let data = {};
//   let url = "/task_queues/" + taskQueueId + "/record";

//   data["task_queue_item_primary_key"] = taskQueueItemPrimaryKey;
//   data["task_queue_id"] = taskQueueId;

//   $.ajax({
//     url,
//     type: "GET",
//     data,
//     async: true,
//     dataType: "json",
//     error(XMLHttpRequest, errorTextStatus, error){
//               window.toastr.error("Something went wrong, please try again.");
//            },
//     success(data){
//       updateTaskQueueItemData(data);
//       updateTaskQueueItemFeed(data);
//     }
//   });
// }

// // applyOutcomeRule = function (outcome) {
// //   // let table = $('#task-queue-item-modal').data('taskQueueTable');
// //   // let primaryKey = $('#task-queue-item-modal').data('taskQueueItemPrimaryKey');
// //   // let taskQueueId = $('#task-queue-item-modal').data('taskQueueId');
// //   // let url = "/task_queues/" + taskQueueId + "/outcome";
// //   // let data = {};

// //   // data['outcome'] = outcome;
// //   // data['table'] = table;
// //   // data['primary_key'] = primaryKey;
// //   // data['task_queue_id'] = taskQueueId;

// //   // $.ajax({
// //   //   url,
// //   //   type: "POST",
// //   //   data,
// //   //   async: true,
// //   //   dataType: "json",
// //   //   error(XMLHttpRequest, errorTextStatus, error){
// //   //             window.toastr.error("Something went wrong, please try again.");
// //   //          },
// //   //   success(data){
// //   //     window.toastr.success("Task queue outcome updated.");
// //   //   }
// //   // });
// // }

// loadIndexPage = function () {
//   if (isCurrentControllerTaskQueues) {
//     $("#new-task-queue-modal").modal({
//       backdrop: "static",
//       keyboard: false
//     });

//     // getFieldsWithType("users");

//     $("#queue-builder-modal-next-button").click(function() {
//       $("#new-queue-modal-screen-1").toggleClass("hide");
//       $("#new-queue-modal-screen-2").toggleClass("hide");
//     });

//     $("#queue-builder-modal-back-button").click(function() {
//       $("#new-queue-modal-screen-1").toggleClass("hide");
//       $("#new-queue-modal-screen-2").toggleClass("hide");
//     });

//     $("#queue-builder-modal-save-button").click(function() {
//       var params = {};
//       params["task_queue"] = {};
//       params["task_queue"]["name"] = document.getElementById("task_queue_name").value;
//       params["task_queue"]["details"] = document.getElementById("task_queue_details").value;
//       params["task_queue"]["table"] = document.getElementById("task_queue_table").value;
//       saveTaskQueue(params);
//     });
//   }
// }

// loadEditPage = function () {
//   if (isCurrentControllerTaskQueues && isCurrentActionEdit) {
//     // let taskQueueId = document.getElementById("builder").dataset.taskQueueId;
//     // let taskQueueTable = document.getElementById("builder").dataset.taskQueueTable;

//     // getFieldsWithType(taskQueueTable);

//     // $("#task-queue-update-button").click(function() {
//     //   console.log('what the fuck')
//     //   var params = {};
//     //   params["task_queue"] = {};

//     //   if ($("#builder").queryBuilder("getRules") != null) {
//     //     params["task_queue"]["query_builder_rules"] = JSON.stringify($("#builder").queryBuilder("getRules"), null, 2);
//     //   }

//     //   if ($("#builder").queryBuilder("getSQL") != null) {
//     //     params["task_queue"]["query_builder_sql"] = $("#builder").queryBuilder("getSQL").sql;
//     //   }

//     //   params["task_queue"]["details"] = document.getElementById("task_queue_details").value;
//     //   params["task_queue"]["name"] = document.getElementById("task_queue_name").value;
//     //   params["task_queue"]["success_outcome_title"] = document.getElementById("task_queue_success_outcome_title").value;
//     //   params["task_queue"]["success_outcome_timeout"] = document.getElementById("task_queue_success_outcome_timeout").value;
//     //   params["task_queue"]["failure_outcome_title"] = document.getElementById("task_queue_failure_outcome_title").value;
//     //   params["task_queue"]["failure_outcome_timeout"] = document.getElementById("task_queue_failure_outcome_timeout").value;

//     //   $.ajax({
//     //     url: "/task_queues/" + taskQueueId,
//     //     type: "PATCH",
//     //     data: params,
//     //     dataType: "json",
//     //     error(response, status, request) {
//     //       window.toastr.error("Task queue preview failed, review SQL.");
//     //     },
//     //     success(response, status, request) {
//     //       let columns = response.columns;

//     //       if (typeof columns !== "undefined") {
//     //         loadTaskQueuePreviewDataTable(columns);
//     //       }

//     //       window.toastr.info("Task queue updated.");
//     //     }
//     //   });
//     // });

//     // $(document).on('click','.task-queue-item', function() {
//     //   let taskQueueTable = $(this).parent().parent().data().tableName;
//     //   let taskQueueItemPrimaryKey = $(this).data().taskQueueItemPrimaryKey;
//     //   let taskQueueId = $('#task-queue-item-modal').data().taskQueueId;

//     //   $('#task-queue-item-modal').data('taskQueueTable', taskQueueTable);
//     //   $('#task-queue-item-modal').data('taskQueueItemPrimaryKey', taskQueueItemPrimaryKey);
//     //   $('#task-queue-item-modal').modal({});

//     //   getTaskQueueItem(taskQueueId, taskQueueItemPrimaryKey)
//     // })

//     $("#task-queue-record-activity-form").submit( function() {
//       let taskQueueItemPrimaryKey = $('#task-queue-item-modal').data('taskQueueItemPrimaryKey');
//       $(this).append("<input type='hidden' name='activity[feedable_id]' value='" + taskQueueItemPrimaryKey + "'/>");
//       return true;
//     });

//     // getOptionsForDraggable("users");

//     // initializeDraggable();
//   }
// }

// $(document).ready(() => {
//   metaTag = $("meta[name=psj]");
//   isCurrentControllerTaskQueues = metaTag.attr("controller") === "task_queues";
//   isCurrentActionIndex = metaTag.attr("action") === "index";
//   isCurrentActionEdit = metaTag.attr("action") === "edit";

//   loadIndexPage();
//   loadEditPage();
// });
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
//

















;
