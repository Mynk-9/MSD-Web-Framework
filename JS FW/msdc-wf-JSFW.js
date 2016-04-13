function $$(element) {
	
	// Class-Id Management
	this.getClass = function() {
		return element.getAttribute('class');
	}
	this.getId = function() {
		return element.getAttribute('id');
	}
	this.addClass = function(classname) {
		if (element.className != '') {
			element.className += ' ' + classname;
		} else {
			element.className += classname;
		}
	}
	this.toggleClass = function(oldClass, newClass) {
		element.className = element.className.replace(oldClass, newClass);
	}
	this.removeClass = function(theClass) {
		new $$(element).toggleClass(theClass, '');
	}
	
	// Event
	this.setEvent = function(evnt, fun) {
		element.addEventListener(evnt, fun);
	}
	
	// External
	this.loadScript = function(path) {
		var x = document.createElement('script');
		x.setAttribute('src', path);
		document.head.appendChild(x);
	}
	this.loadStyleSheet = function(path) {
		var x = document.createElement('link');
		x.setAttribute('rel', 'stylesheet');
		x.setAttribute('href', path);
		document.head.appendChild(x);
	}
}