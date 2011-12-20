/*(c) TheNinja 2010 */
(function(){

    ////////////OVERWRITE OPTIONS HERE///////////////////////
    var options = {
        iDate: [2021, 6, 8, 12, 30],
        timeZone: -7,
        SkinName: '../../images/default.jpg',
        msg: ['Vegas Baby!', 'white', '170%', 'Trebuchet MS']
    };

    /////////////////////////////////////////////////////////

    var $ = function(s) {return document.getElementById(s);},

		add = function(el, e, func) {
			el.addEventListener ? el.addEventListener(e,func,false) : 
			el.attachEvent ? el.attachEvent('on'+e, func) : 
			el['on'+e] = func;
		},

		p = function() {
			var today = new Date(),
				target = new Date(options.iDate[0], options.iDate[1]-1, options.iDate[2], options.iDate[3], options.iDate[4]),
				timeZ = (options.timeZone - (-today.getTimezoneOffset()/60))*3600000,
				counter = target.getTime() - today.getTime() - timeZ,
				s = Math.floor(counter/1000),
				m = Math.floor(s/60),
				h = Math.floor(m/60),
				d = ''+Math.floor(h/24);

			if(counter>0) {

				s = bTt(s % 60);
				m = bTt(m % 60);
				h = bTt(h % 24);
				d = (d.length<2) ? '00'+d : (d.length<3) ? '0'+d : d;

				d = d.split('',d.length);
				h = h.split('',h.length);
				m = m.split('',m.length);
				s = s.split('',s.length);

				set(d,0);
				set(h,5);
				set(m,8);
				set(s,11);

				var t = setTimeout(p, 1000);

			} else {
				while($('jsCount').firstChild) $('jsCount').removeChild($('jsCount').lastChild);
				$('jsCount').style.textAlign = 'center';
				$('jsCount').style.color = options.msg[1];
				$('jsCount').style.fontSize = options.msg[2];
				$('jsCount').style.fontFamily = options.msg[3]+',Helvetica,Geneva';
				if(options.link) {
					var a = document.createElement('a');
					a.href = options.link;
					a.style.color = options.msg[1];
					a.appendChild(document.createTextNode(options.msg[0]));
					$('jsCount').appendChild(a);
				} else {
					$('jsCount').appendChild(document.createTextNode(options.msg[0]));
				}
				if(options.redirect)
					setTimeout(function() {window.location = options.redirect[0];}, options.redirect[1]);
			}
		},
		
		set = function(d, pos) {
			var div = $('jsCount').getElementsByTagName('div');
			for(var i=0; i<d.length; i++) {
				div[i+pos].style.backgroundPosition = d[i]*-50+'px 0px';
			}
		},
		
		bTt = function(arg) {
			num = arg<10 ? '0'+arg : ''+arg;
			return num;
		},
		
		create = function(n) {
			var e;
			for(var i=0; i<n.length; i++){
				for(var j=0; j<n[i][0]; j++){
					e = document.createElement('div');
					e.style.background = 'url("'+options.SkinName+'") no-repeat';

					if(!window.attachEvent||window.opera) e.style.cssFloat = 'left';
					else e.style.styleFloat = 'left';
	
					if(n[i][1]!='txt') {
						e.className = n[i][1];
						e.style.height = '80px';
					}
					if(n[i][1]=='num') {
						e.style.width = '50px';

					} else if(n[i][1]=='sep') {
						e.style.width = '20px';
						e.style.backgroundPosition = '-500px 0px';

					} else if(n[i][1]=='txt') {
						e.id = 'txt';
						e.style.height = '20px';
						e.style.width = '560px';
						e.style.backgroundPosition = '0px -80px';
					}
					$('jsCount').appendChild(e);
				}
			}
		};

	add(window, 'load', function() {
		$('jsCount').style.width = '560px';
		create([
			[4,'num'],[1,'sep'],
			[2,'num'],[1,'sep'],
			[2,'num'],[1,'sep'],
			[2,'num'],[1,'txt']
		]);
		p();
	});

})();