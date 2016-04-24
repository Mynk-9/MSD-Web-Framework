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
				if (list[i] == 'msdc-wf-m.css' && this.usingMin()) {imported[i].href = 'msdc-wf-m.min.css';}
			}
			
			document.head.appendChild(imported[i]);
			console.log(imported[i]);
		}
	};
	this.getListOfLibraries = function() {
		var files = ['JS FW/msdc-wf-JSFW.js', 'msdc-wf-m.css'];
		return files;
	};
	this.isLibraryCSS = function(lib) {
		var q = false;
		if (lib.indexOf('.css') != -1) q = true;
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
	
	initializeNavBars();
	adjestPSS();
	adjestTBS();
	adjestDB();
	adjestScrll();
	adjestIT();
	adjestLA();
	adjestPB();
	adjestMS();
	setTimeout(function(){adjestformobile();}, 3000);
	adjestScrollBar();
};

/* Navbar maintainance >> */
	function initializeNavBars() {
		if (document.getElementsByClassName('nav nav-top').length > 0) {
			document.body.style.padding = '70px 0px 0px 0px'; /* Setting Body padding */
			
			var mbm = new Array(document.getElementsByClassName('masked-page').length);
			mbm = document.getElementsByClassName('masked-page');
			for (i = 0; i < mbm.length; i++) {
				if (isMobile() != true) {
					mbm[i].style.height =  'calc(100vh - 70px)';
				} else {
					mbm[i].style.minHeight = ((window.innerHeight) - 70) + 'px';
				}
			}
			var fpg = document.getElementsByClassName('full-page-box');
			for (i = 0; i < fpg.length; i++) {
				if (isMobile() != true) {
					fpg[i].style.height = 'calc(100vh - 70px)';
				} else {
					fgp[i].style.height = ((window.innerHeight) - 70) + 'px';
				}
			}
		}
	}
	function toggleLeftNav() {
		var ln = document.getElementsByClassName('nav nav-left')[0];
		var tn = new Array(document.getElementsByClassName('nav nav-top').length);
		tn = document.getElementsByClassName('nav nav-top')[0];
		if (ln.className.indexOf('nav-left-anim-go-left') != -1) {
			new $$(ln).toggleClass('nav-left-anim-go-left', 'nav-left-anim-go-right');
			new $$(tn).toggleClass('nav-left-anim-nav-top-go-left', 'nav-left-anim-nav-top-go-right');
		} else if (ln.className.indexOf('nav-left-anim-go-right') != -1) {
			new $$(ln).toggleClass('nav-left-anim-go-right', 'nav-left-anim-go-left');
			new $$(tn).toggleClass('nav-left-anim-nav-top-go-right', 'nav-left-anim-nav-top-go-left');
		} else {
			new $$(ln).addClass('nav-left-anim-go-right');
			new $$(tn).addClass('nav-left-anim-nav-top-go-right');
		}
	}
	function isMobile() {
		var q = false;
		if (document.body.clientWidth < 600) q = true;
		return q;
	}
/* Picture Slide Show Maintainance */
	function adjestPSS() {
		var pss = document.getElementsByClassName('picture-slideshow');
		for (i = 0; i < pss.length; i++) {
			var left, right;
			left = pss[i].getElementsByClassName('goleft')[0];
			right = pss[i].getElementsByClassName('goright')[0];
			var pssx = pss[i];	/* Done because pss[i] returns an 'undefined' value. Found it using console.log(typeof pss[i]); */
			left.addEventListener('click', function() {ssgoleft(pssx);});
			right.addEventListener('click', function() {ssgoright(pssx);});
		}
	}
	function ssgoleft(ss) {
		var pics = ss.getElementsByClassName('picture');
		var z = 0;
		for (i = 0; i < pics.length; i++) {
			if (pics[i].className.indexOf('picture-active') != -1) {
				if (i == 0) {
					z = pics.length - 1;
				} else {
					z = i - 1;
				}
			}
		}
		for (i = 0; i < pics.length; i++) {
			new $$(pics[i]).toggleClass(' picture-last-active', '');
			new $$(pics[i]).toggleClass(' picture-active', ' picture-last-active');
		}
		new $$(pics[z]).addClass('picture-active');
	}
	function ssgoright(ss) {
		var pics = ss.getElementsByClassName('picture');
		var z = 0;
		for (i = 0; i < pics.length; i++) {
			if (pics[i].className.indexOf('picture-active') != -1) {
				if (i == (pics.length - 1)) {
					z = 0
				} else {
					z = i + 1;
				}
			}
		}
		for (i = 0; i < pics.length; i++) {
			new $$(pics[i]).toggleClass(' picture-last-active', '');
			new $$(pics[i]).toggleClass(' picture-active', ' picture-last-active');
		}
		new $$(pics[z]).addClass('picture-active');
	}
/* Tabination Maintainance */
	function adjestTBS() {
		var tabins = document.getElementsByClassName('tabination');
		for (i = 0; i < tabins.length; i++) {
			var tabs, divs;
			tabs = tabins[i].getElementsByClassName('tabs')[0].getElementsByClassName('item');
			divs = tabins[i].getElementsByClassName('information')[0].getElementsByClassName('info');
			for (ii = 0; ii < tabs.length; ii++) {
				tabs[ii].addEventListener('click', function() {
					for (q = 0; q < tabs.length; q++) {
						new $$(tabs[q]).toggleClass(' active', '');
						new $$(divs[q]).toggleClass(' active', '');
					}
					this.className += ' active';
					var id = this.getAttribute('tabtarget');
					new $$(document.getElementById(id)).addClass('active');
				});
			}
		}
	}
/* Dialogue Box Maintainance */
	function adjestDB() {
		var dbs = document.getElementsByClassName('d-box');
		for (i = 0; i < dbs.length; i++) {
			var db = dbs[i];
			dbs[i].getElementsByClassName('footer')[0].getElementsByClassName('close')[0].addEventListener('click', function() {
				new $$(db.getElementsByClassName('content')[0]).toggleClass(' active', '');
				document.body.style.overflow = 'auto';
			});
			dbs[i].getElementsByClassName('toggle')[0].addEventListener('click', function() {
				new $$(db.getElementsByClassName('content')[0]).addClass('active');
				document.body.style.overflow = 'hidden';
			});
		}
	}
/* Smooth Scroll */
	function adjestScrll() {
		x = document.getElementsByTagName('a');
		for (i = 0; i < x.length; i++) {
			if (x[i].getAttribute('role') == 'inPageLink') {
				x[i].className += ' in-page-link';
				if (x[i].getAttribute('toElement').indexOf('#') == 0) {
					x[i].addEventListener('click', function() {
						var z = this;
						var ele = document.getElementById(z.getAttribute('toElement').replace('#', ''));
						
						
						var tt = parseInt(z.getAttribute('timetaken'));
						var fps =  100;
						var interval = 1000 / fps;
						var iteration = fps * tt;
						var n = 0;
						var ii = (ele.offsetTop - getWinYOset()) / iteration;
						
						var w = false;
						if (getWinYOset() > ele.offsetTop) {
							ii = (0 - (getWinYOset() - ele.offsetTop)) / iteration;
							w = true;
						}
						var q = setInterval(function() {move();}, interval);
						function move() {
							if (getWinYOset() == ele.offsetTop) {
								clearInterval(q);
								return;
							} else if (w == true & getWinYOset() < ele.offsetTop) {
								clearInterval(q);
								return;
							} else if (w == false & getWinYOset() > ele.offsetTop) {
								clearInterval(q);
								return;
							} else {
								n++;
							}
							window.scrollBy(0, ii);
						}
						function getWinYOset() {
							var y = 0;
							if (document.getElementsByClassName('nav nav-top').length > 0) {
								y = (window.pageYOffset + 70);
							} else {
								y = window.pageYOffset;
							}
							return y;
						}
					});
				}
			}
		}
	}
/* Interactive Table Maintainance */
	function adjestIT() {
		var t = new Array(document.getElementsByClassName('table').length);
		t = document.getElementsByClassName('table');
		for (i = 0; i < t.length; i++) {
			if (t[i].className.indexOf('interactive') != -1) {
				var rws = new Array(t[i].rows.length);
				rws = t[i].rows;
				var tab = t[i];
				for (ii = 0; ii < rws.length; ii++) {
					rws[ii].addEventListener('click', function() {
						if (this.className.indexOf('clicked') != -1) {
							new $$(this).toggleClass('clicked', '');
						} else {
							for (iii = 0; iii < this.parentNode.children.length; iii++) {
								new $$(this.parentNode.children[iii]).toggleClass('clicked', '');
							}
							new $$(this).addClass('clicked');
						}
					});
				}
			}
		}
	}
/* Loading Animation Maintainance */
	function adjestLA() {
		var la = new Array(document.getElementsByClassName('loading-page').length);
		la = document.getElementsByClassName('loading-page');
		for (i = 0; i < la.length; i++) {
			la[i].setAttribute('style', 'display: none;');
			la[i].innerHTML = '';
			la[i].className = '';
		}
	}
/* Progress Bar Maintainance */
	function adjestPB() {
		var pb = new Array(document.getElementsByClassName('progress-bar').length);
		pb = document.getElementsByClassName('progress-bar');
		for (i = 0; i < pb.length; i++) {
			var pbp = pb[i].getElementsByClassName('progress')[0];
			pbp.style.width = pbp.getAttribute('value');
		}
	}
	function changeProgress(pBar, progress) {
		pBar.style.width = (parseInt(progress) + '%');
	}
/* Masked Scrolling Maintainance */
	function adjestMS() {
		var mskd = new Array(document.getElementsByClassName('masked-page').length);
		mskd = document.getElementsByClassName('masked-page');
		for (i = 0; i < mskd.length; i++) {
			var bk = mskd[i].getAttribute('maskedbkground');
			if (bk != null) {mskd[i].style.backgroundImage = 'url(' + bk + ')';}
		}
	}
/* Mobile Device Maintainance */
	function adjestformobile() {
		var mskd = new Array(document.getElementsByClassName('masked-page').length);
		mskd = document.getElementsByClassName('masked-page');
		for (i = 0; i < mskd.length; i++) {
			var fp = mskd[i].getElementsByClassName('slide-full')[0];
			if (typeof fp != 'undefined') {mskd[i].style.height = fp.offsetHeight + 'px'; /*console.log(fp.offsetHeight);*/}
		}
	}
/* Scroll Bar */
	function adjestScrollBar() {
		var vh = window.top.innerHeight;
		var fh = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.body.clientHeight, document.body.scrollHeight, document.body.offsetHeight);
		
		var scrollBox = new Array(document.getElementsByClassName('scroll').length);
		scrollBox = document.getElementsByClassName('scroll');
		var sb = scrollBox[0];							//Scroll Box
		var sh = sb.clientHeight;
		
		var sbr = sb.getElementsByClassName('scr')[0];	//Scroll Bar
		var x = Math.max(sb.getElementsByClassName('top')[0].offsetHeight, sb.getElementsByClassName('bottom')[0].offsetHeight);
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
			
			scrollBox = new Array(document.getElementsByClassName('scroll').length);
			scrollBox = document.getElementsByClassName('scroll');
			sb = scrollBox[0];							//Scroll Box
			sh = sb.clientHeight;
			
			sbr = sb.getElementsByClassName('scr')[0];	//Scroll Bar
			x = Math.max(sb.getElementsByClassName('top')[0].offsetHeight, sb.getElementsByClassName('bottom')[0].offsetHeight);
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
		sbr.addEventListener('mouseup', function() {msdn = false;});
		sbr.addEventListener('mousemove', function(event) {evnt = event;});
		document.body.addEventListener('mousemove', function(event) {
			if (event.clientX >= document.body.clientWidth - sb.clientWidth && sb.className.indexOf('scrll-hidden') != -1) {
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
			if (msdn) {
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
		var topButton = sb.getElementsByClassName('top')[0];
		var bottomButton = sb.getElementsByClassName('bottom')[0];
		topButton.addEventListener('click', function() {window.scrollBy(0, -5);})
		topButton.addEventListener('mousedown', function() {window.scrollBy(0, -5);})
		bottomButton.addEventListener('click', function() {window.scrollBy(0, 5);})
		bottomButton.addEventListener('mousedown', function() {window.scrollBy(0, 5);})
	}