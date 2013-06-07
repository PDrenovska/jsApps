Function.prototype.inherit = function(parent) {
	var oldPrototype = this.prototype;
	var prototype = new parent();
	this.prototype._superConstructor = parent;
	for(var prop in oldPrototype)
		this.prototype[prop] = oldPrototype[prop];

};

var Class = (function() {
	function createClass(properties) {
		var f = function() {
			if(this._superConstructor) {
				this._super = new this._superConstructor(arguments);
			}

			this.init.apply(this, arguments);
		}

		for(var prop in properties) {
			f.prototype[prop] = properties[prop];
		}
		if(!f.prototype.init) {
			f.prototype.init = function() {}
		}
		return f;
	}

	return {
		create: createClass
	};
}());