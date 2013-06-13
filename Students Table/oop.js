Function.prototype.inherit = function(parent) {
		var oldPrototype = this.prototype; // Student
		var prototype = new parent(); // Person 
		this.prototype._superConstructor = parent; // The base constructor ~ Person
		for(var prop in oldPrototype) // All new properties from Student
			this.prototype[prop] = oldPrototype[prop]; // added to all properties from Person

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