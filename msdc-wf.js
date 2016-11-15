/*! Copyright © 2016 Mayank Mathur 
see license at - https://raw.githubusercontent.com/Mynk-9/MSD-Web-Framework/master/LICENSE
*/
var library_files = [];
var onload_functions = [];

window.onload = function() {
	this.loadAllLibraries = function() {
		var list = this.getListOfLibraries();
		var imported = new Array(list.length);
		for (i = 0; i < list.length; i++) {
			if (this.isLibraryCSS(list[i]) != true) {
				imported[i] = document.createElement('script');
				imported[i].src = list[i];
			} else {
				imported[i] = document.createElement('link');
				imported[i].setAttribute('rel', 'stylesheet');
				imported[i].href = list[i];
			}
			
			document.head.appendChild(imported[i]);
		}
		
		/*executeOnload();*/
	};
	this.getListOfLibraries = function() {
		return library_files;
	};
	this.executeOnload = function() {
		for (i = 0; i < onload_functions.length; i++) {
			if (typeof onload_functions[i] === 'function') {
				onload_functions[i]();
			}
		}
	};
	this.isLibraryCSS = function(lib) {
		var q = false;
		if (lib.indexOf('.css') != -1) {q = true;}
		return q;
	};
	this.usingMin = function() {
		var q = false;
		var z = new Array(document.getElementsByTagName('link').length);
		z = document.getElementsByTagName('link');
		for (i = 0; i < z.length; i++) {
			if (z[i].getAttribute('href').indexOf('msdc-wf.min.css') != -1) {q = true;}
		}
		return q;
	};
	loadAllLibraries();
	
	adjestNB();				/* Navbars */
	adjestPSS();			/* Picture Slideshow */
	adjestTBS();			/* Tabination */
	adjestDB();				/* Dialogue Box */
	adjestIPL();			/* In Page link */
	adjestIT();				/* Interactive Table */
	adjestPB();				/* Progress Bar */
	adjestMS();				/* Masked Page */
	setTimeout(function(){adjestformobile();}, 3000);
	if (document.body.querySelectorAll('.scroll').length != 0) {
		var style = document.createElement('style');
		style.innerHTML = "body::-webkit-scrollbar {display: none;}";
		document.head.appendChild(style);
		adjestScrollBar();	/* Custom Scroll */
	}
	
	executeOnload();		/* Execute onload functions */
	/* at last remove loading animation */
	adjestLA();				/* Loading Animation */
};

/* Navbar maintainance >> */
	function adjestNB() {
		if (document.querySelectorAll('.nav-top').length > 0) {
			var hgt = ___('nav.nav.nav-top')[0].offsetHeight;
			document.body.style.padding = hgt + 'px 0px 0px 0px'; /* Setting Body padding */
			
			var mbm = new Array(document.querySelectorAll('.masked-page').length);
			mbm = document.querySelectorAll('.masked-page');
			for (i = 0; i < mbm.length; i++) {
				if (isMobile() != true) {
					mbm[i].style.height =  'calc(100vh - ' + hgt + 'px)';
				} else {
					mbm[i].style.minHeight = ((window.innerHeight) - hgt) + 'px';
				}
			}
			var fpg = document.querySelectorAll('.full-page-box');
			for (i = 0; i < fpg.length; i++) {
				if (isMobile() != true) {
					fpg[i].style.height = 'calc(100vh - ' + hgt + 'px)';
				} else {
					fpg[i].style.height = ((window.innerHeight) - hgt) + 'px';
				}
			}
		}
	}
	function toggleLeftNav() {
		if (document.querySelectorAll('.nav-left').length !== 0) {
			var ln = document.querySelectorAll('.nav-left')[0];
			var tn = new Array(document.querySelectorAll('.nav-top').length);
			tn = document.querySelectorAll('.nav-top')[0];
			if (ln.className.indexOf('goLeft') != -1) {
				___(ln).toggleClass('goLeft', 'goRight');
				___(tn).toggleClass('goLeft', 'goRight');
				if (document.querySelectorAll('div.document-body')[0].getAttribute('data-toggle-with-nav') === 'true') {
					___('div.document-body').toggleClass('toggleLeft', 'toggleRight');
				}
			} else if (ln.className.indexOf('goRight') != -1) {
				___(ln).toggleClass('goRight', 'goLeft');
				___(tn).toggleClass('goRight', 'goLeft');
				if (document.querySelectorAll('div.document-body')[0].getAttribute('data-toggle-with-nav') === 'true') {
					___('div.document-body').toggleClass('toggleRight', 'toggleLeft');
				}
			} else {
				___(ln).addClass('goRight');
				___(tn).addClass('goRight');
				if (document.querySelectorAll('div.document-body')[0].getAttribute('data-toggle-with-nav') === 'true') {
					___('div.document-body').addClass('toggleRight');
				}
			}
		}
	}
	function isMobile() {
		var q = false;
		if (document.body.clientWidth < 600) {q = true;}
		return q;
	}
/* Picture Slide Show Maintainance */
	function adjestPSS() {
		var pss = document.querySelectorAll('.picture-slideshow');
		for (i = 0; i < pss.length; i++) {
			var left, right; // will create handles for right and left buttons
			left = pss[i].querySelectorAll('.goleft')[0];
			right = pss[i].querySelectorAll('.goright')[0];
			var pssx = pss[i];	/* Done because pss[i] returns an 'undefined' value. Found it using console.log(typeof pss[i]); */
			left.addEventListener('click', function() {ssgoleft(pssx);});
			right.addEventListener('click', function() {ssgoright(pssx);});
			
			/* Now, check for auto-sliding slideshows*/
			
			if (pss[i].getAttribute('data-autoscroll') == 'true') {
				setInterval(function() {var param = pssx; autoSlide(param);}, 3500);
			}
		}
		
		function autoSlide(ss) {
			var slides = [];
			slides = ss.querySelectorAll('div.picture');
				for (x = 0; x < slides.length; x++) {
					if (slides[x].className.indexOf('active') > 0) {
						slides[x].className = slides[x].className.replace('active', '');
						if (x === slides.length - 1) {
							slides[0].className += ' active';
						} else {
							x++;
							slides[x].className += ' active';
						}
						break;
					}
				}
		}
		function ssgoleft(ss) {
			var pics = ss.querySelectorAll('.picture');
			var z = 0;
			for (i = 0; i < pics.length; i++) {
				if (pics[i].className.indexOf('active') != -1) {
					if (i == 0) {
						z = pics.length - 1;
					} else {
						z = i - 1;
					}
				}
			}
			for (i = 0; i < pics.length; i++) {
				___(pics[i]).toggleClass(' active', ' ');
			}
			___(pics[z]).addClass('active');
		}
		function ssgoright(ss) {
			var pics = ss.querySelectorAll('.picture');
			var z = 0;
			for (i = 0; i < pics.length; i++) {
				if (pics[i].className.indexOf('active') != -1) {
					if (i == (pics.length - 1)) {
						z = 0
					} else {
						z = i + 1;
					}
				}
			}
			for (i = 0; i < pics.length; i++) {
				___(pics[i]).toggleClass(' active', ' ');
			}
			___(pics[z]).addClass('active');
		}
	}
	
/* Tabination Maintainance */
	function adjestTBS() {
		var tabins = document.querySelectorAll('.tabination');
		for (i = 0; i < tabins.length; i++) {
			var tabs, divs;
			tabs = tabins[i].querySelectorAll('.tabs')[0].querySelectorAll('.item');
			divs = tabins[i].querySelectorAll('.information')[0].querySelectorAll('.info');
			for (ii = 0; ii < tabs.length; ii++) {
				tabs[ii].addEventListener('click', function() {
					for (q = 0; q < tabs.length; q++) {
						___(tabs[q]).toggleClass(' active', '');
						___(divs[q]).toggleClass(' active', '');
					}
					this.className += ' active';
					var id = this.getAttribute('data-tabtarget');
					___(document.getElementById(id)).addClass('active');
				});
			}
		}
	}
/* Dialogue Box Maintainance */
	function adjestDB() {
		var dbs = document.querySelectorAll('.d-box');
		for (i = 0; i < dbs.length; i++) {
			var db = dbs[i];
			dbs[i].querySelectorAll('.footer')[0].querySelectorAll('.close')[0].addEventListener('click', function() {
				___(db.querySelectorAll('.content')[0]).toggleClass(' active', '');
				document.body.style.overflow = 'auto';
			});
			dbs[i].querySelectorAll('.toggle')[0].addEventListener('click', function() {
				___(db.querySelectorAll('.content')[0]).addClass('active');
				document.body.style.overflow = 'hidden';
			});
		}
	}
/* Smooth Scroll */
	function adjestIPL() {
		___('a[data-role=anchor]').onEvent('click', function() {
			var hgt = ___('nav.nav.nav-top')[0].offsetHeight;
			var to = ___(this.getAttribute('data-to').toString())[0];
			var time = parseInt(this.getAttribute('data-time')) || 1;
			var frameRate = 60;
			
			var pos = ___(to).coordinates().y;
			var scrolledTo = ___(document.body).scrolled().y;
			if (___('nav.nav-top').length > 0) pos -= hgt;
			
			var speed = ((pos - scrolledTo) / (time));
			var displacementPerFrame = speed/frameRate;
			
			try {clearInterval(open);} catch (e) {}
			open = setInterval(function() {
				if (Math.abs(document.body.scrollTop-pos) <= Math.abs(displacementPerFrame)) {
					window.scrollTo(0, pos);
				} else {
					window.scrollBy(0, displacementPerFrame);
				}
			}, 1000/60);
			setTimeout(function() {clearInterval(open); window.scrollTo(0, pos);}, time*1000);
		});
	}
/* Interactive Table Maintainance */
	function adjestIT() {
		var t = ___('table.table.interactive');
		for (i = 0; i < t.length; i++) {
			var rws = [];
			rws = t[i].rows;
			for (ii = 0; ii < rws.length; ii++) {
				___(rws[ii]).onEvent('click', function() {
					if (this.className.indexOf('clicked') != -1) {
						___(this).toggleClass('clicked', '');
					} else {
						for (iii = 0; iii < this.parentNode.children.length; iii++) {
							___(this.parentNode.children[iii]).toggleClass('clicked', '');
						}
						___(this).addClass('clicked');
					}
				});
			}
		}
	}
/* Loading Animation Maintainance */
	function adjestLA() {
		var la = new Array(document.querySelectorAll('.loading-page').length);
		la = document.querySelectorAll('.loading-page');
		for (i = 0; i < la.length; i++) {
			la[i].setAttribute('style', 'display: none;');
			la[i].innerHTML = '';
			la[i].className = '';
		}
	}
/* Progress Bar Maintainance */
	function adjestPB() {
		var pb = new Array(document.querySelectorAll('.progress-bar').length);
		pb = document.querySelectorAll('.progress-bar');
		for (i = 0; i < pb.length; i++) {
			var pbp = pb[i].querySelectorAll('.progress')[0];
			pbp.style.width = pbp.getAttribute('data-value');
		}
	}
	function changeProgress(pBar, progress) {
		pBar.style.width = (parseInt(progress) + '%');
	}
/* Masked Scrolling Maintainance */
	function adjestMS() {
		var mskd = new Array(document.querySelectorAll('.masked-page').length);
		mskd = document.querySelectorAll('.masked-page');
		for (i = 0; i < mskd.length; i++) {
			var bk = mskd[i].getAttribute('data-maskedbkground');
			if (bk != null) {mskd[i].style.backgroundImage = 'url(' + bk + ')';}
		}
	}
/* Mobile Device Maintainance */
	function adjestformobile() {
		if (isMobile() === true) {
			var mskd = new Array(document.querySelectorAll('.masked-page').length);
			mskd = document.querySelectorAll('.masked-page');
			for (i = 0; i < mskd.length; i++) {
				var fp = mskd[i].querySelectorAll('.slide-full')[0];
				if (typeof fp != 'undefined') {mskd[i].style.height = fp.offsetHeight + 'px'; /*console.log(fp.offsetHeight);*/}
			}
		}
	}
	function forceAdjestForMobile() {
		var mskd = new Array(document.querySelectorAll('.masked-page').length);
		mskd = document.querySelectorAll('.masked-page');
		for (i = 0; i < mskd.length; i++) {
			var fp = mskd[i].querySelectorAll('.slide-full')[0];
			if (typeof fp != 'undefined') {mskd[i].style.height = fp.offsetHeight + 'px'; /*console.log(fp.offsetHeight);*/}
		}
	}
/* Scroll Bar */
	function adjestScrollBar() {
		var body = document.body;
		
		var vh = window.top.innerHeight;
		var fh = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.body.clientHeight, document.body.scrollHeight, document.body.offsetHeight);
		
		var scrollBox = new Array(document.querySelectorAll('.scroll').length);
		scrollBox = document.querySelectorAll('.scroll');
		var sb = scrollBox[0];							//Scroll Box
		var sh = sb.clientHeight;
		
		var sbr = sb.querySelectorAll('.scr')[0];	//Scroll Bar
		var x = Math.max(sb.querySelectorAll('.top')[0].offsetHeight, sb.querySelectorAll('.bottom')[0].offsetHeight);
		var bh = ((vh * sh) - (2 * vh * x)) / fh;
		
		var robject = sbr.getBoundingClientRect();
		var y = robject.top - 20;
		var scrlH = sh - (2 * x);
		
		var doc = document.documentElement;
		var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
		var height = doc.offsetHeight;
		
		this.refreshValues = function() {
			vh = window.top.innerHeight;
			fh = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.body.clientHeight, document.body.scrollHeight, document.body.offsetHeight);
			
			scrollBox = new Array(document.querySelectorAll('.scroll').length);
			scrollBox = document.querySelectorAll('.scroll');
			sb = scrollBox[0];							//Scroll Box
			sh = sb.clientHeight;
			
			sbr = sb.querySelectorAll('.scr')[0];	//Scroll Bar
			x = Math.max(sb.querySelectorAll('.top')[0].offsetHeight, sb.querySelectorAll('.bottom')[0].offsetHeight);
			bh = ((vh * sh) - (2 * vh * x)) / fh;
			
			robject = sbr.getBoundingClientRect();
			y = robject.top - 20;
			scrlH = sh - (2 * x);
			
			doc = document.documentElement;
			top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
			height = doc.offsetHeight;
		}
		
		setInterval(function() {
			refreshValues();			
			sbr.style.height = bh + 'px';
		}, 1000);
		
		// Now movement
		
		var msdn = false; var evnt; var my = 0, my0 = 0;
		sbr.addEventListener('mousedown', function() {msdn = true;});
		sb.addEventListener('mousedown', function() {msdn = true;});
		sbr.addEventListener('mouseup', function() {msdn = false;});
		sb.addEventListener('mouseup', function() {msdn = false;});
		
		sbr.addEventListener('mousemove', function(event) {evnt = event;});
		document.body.addEventListener('mousemove', function(event) {
			if (event.clientX >= document.body.clientWidth - sb.clientWidth && sb.className.indexOf('scrll-hidden') != -1 && body.style.overflowY !== 'hidden') {
				sb.className = sb.className.replace(' scrll-hidden', '');
				sb.className += ' scrll-active';
			} else if (event.clientX < document.body.clientWidth - sb.clientWidth && sb.className.indexOf('scrll-active') != -1 && !msdn){
				sb.className = sb.className.replace(' scrll-active', '');
				sb.className += ' scrll-hidden';
			} else if (event.clientX < document.body.clientWidth - sb.clientWidth && sb.className.indexOf('scrll-active') == -1 && sb.className.indexOf('scrll-hidden') == -1){
				sb.className += ' scrll-hidden';
			}
		});
		
		// Scroll Bar Movement
		setInterval(function() {
			if (msdn && body.style.overflowY !== 'hidden') {
				refreshValues();
				
				my = evnt.clientY;
				if (my0 != 0) {
					var d = my - my0;
					if (robject.top + d >= 20 && robject.top + d + bh <= vh - 20) {
						sbr.style.top = (robject.top + d) + 'px';
						scroll();
					}
				}
				my0 = my;
			} else {
				my = my0 = y = scrlH = 0;
			}
		}, 1);
		
		// Scroll the Document
		this.scroll = function() {
			refreshValues();
			var yc = y * height / (sh - (2*x));
			window.scrollTo(0,yc);
		}
		
		// Scroll Scroll Bar According to the document
		setInterval(function() {
			if (!msdn) {
				refreshValues();
				
				this.getH = function() {							
					var yc = top;
					y = yc * (sh - (2*x)) / height;
					y += 20;
					return y;
				}
				sbr.style.top = getH() + 'px';
			}
		}, 10);
		
		// Make use of top and bottom buttons
		var topButton = sb.querySelectorAll('.top')[0];
		var bottomButton = sb.querySelectorAll('.bottom')[0];
		topButton.addEventListener('click', function() {window.scrollBy(0, -5);})
		topButton.addEventListener('mousedown', function() {window.scrollBy(0, -5);})
		bottomButton.addEventListener('click', function() {window.scrollBy(0, 5);})
		bottomButton.addEventListener('mousedown', function() {window.scrollBy(0, 5);})
	}