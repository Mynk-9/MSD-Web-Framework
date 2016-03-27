window.onload = function() {
	initializeNavBars();
	adjestPSS();
	adjestTBS();
	adjestDB();
}

/* Navbar maintainance >> */
	function initializeNavBars() {
		if (document.getElementsByClassName('nav nav-top').length > 0) {
			document.body.style.padding = '70px 0px 0px 0px'; /* Setting Body padding */
			
			var mbm = new Array(document.getElementsByClassName('masked-page').length); /* Set masked-body-mobile height */
			mbm = document.getElementsByClassName('masked-page');
			for (i = 0; i < mbm.length; i++) {
				mbm[i].style.height =  'calc(100vh - 70px)';
			}
			var fpg = document.getElementsByClassName('full-page-box');
			for (i = 0; i < fpg.length; i++) {
				fpg[i].style.height = 'calc(100vh - 70px);'
			}
		}
	}
	function toggleLeftNav() {
		var ln = document.getElementsByClassName('nav nav-left')[0];
		var tn = new Array(document.getElementsByClassName('nav nav-top').length);
		tn = document.getElementsByClassName('nav nav-top')[0];
		if (ln.className.indexOf('nav-left-anim-go-left') != -1) {
			ln.className = ln.className.replace(' nav-left-anim-go-left', '');
			ln.className += (' nav-left-anim-go-right');
			document.body.className = document.body.className.replace(' nav-left-anim-body-go-left', '');
			document.body.className += (' nav-left-anim-body-go-right');
			tn.className = tn.className.replace(' nav-left-anim-nav-top-go-left','');
			tn.className += ' nav-left-anim-nav-top-go-right';
		} else if (ln.className.indexOf('nav-left-anim-go-right') != -1) {
			ln.className = ln.className.replace(' nav-left-anim-go-right', '');
			ln.className += (' nav-left-anim-go-left');
			document.body.className = document.body.className.replace(' nav-left-anim-body-go-right', '');
			document.body.className += (' nav-left-anim-body-go-left');
			tn.className = tn.className.replace(' nav-left-anim-nav-top-go-right', '');
			tn.className += ' nav-left-anim-nav-top-go-left';
		} else {
			ln.className = ln.className.replace(' nav-left-anim-go-left', '');
			ln.className += (' nav-left-anim-go-right');
			document.body.className = document.body.className.replace(' nav-left-anim-body-go-left', '');
			document.body.className += (' nav-left-anim-body-go-right');
			tn.className = tn.className.replace(' nav-left-anim-nav-top-go-left','');
			tn.className += ' nav-left-anim-nav-top-go-right';
		}
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
			pics[i].className = pics[i].className.replace(' picture-last-active', '');
			pics[i].className = pics[i].className.replace(' picture-active', ' picture-last-active');
		}
		console.log('z = ' + z);
		pics[z].className += ' picture-active';
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
			pics[i].className = pics[i].className.replace(' picture-last-active', '');
			pics[i].className = pics[i].className.replace(' picture-active', ' picture-last-active');
		}
		console.log('z = ' + z);
		pics[z].className += ' picture-active';
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
						tabs[q].className = tabs[q].className.replace(' active', '');
						divs[q].className = divs[q].className.replace(' active', '');
					}
					this.className += ' active';
					var id = this.getAttribute('tabtarget')
					document.getElementById(id).className += ' active';
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
				db.getElementsByClassName('content')[0].className = db.getElementsByClassName('content')[0].className.replace(' active', '');
				document.body.style.overflow = 'auto';
			});
			dbs[i].getElementsByClassName('toggle')[0].addEventListener('click', function() {
				db.getElementsByClassName('content')[0].className += ' active';
				document.body.style.overflow = 'hidden';
			});
		}
	}