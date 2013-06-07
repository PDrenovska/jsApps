if (!Object.create) {
  Object.create = function(obj) {
    function f() {};
    f.prototype = obj;
    return new f();
  }
}

if (!Object.prototype.extend) {
	Object.prototype.extend = function(properties) {
		function f() {};
		f.prototype = Object.create(this);
		for(var prop in properties) {
			f.prototype[prop] = properties[prop];
		}
		f.prototype._super = this;
		return new f();
	}
}

var School = {
	init: function(sname, town, sclasses) {
		this.sname = sname;
		this.town = town;
		this.sclasses = sclasses;
	}
};

var Course = {
	init: function(cname, capacity, students, formTeacher) {
		this.cname = cname;
		this.capacity = capacity;
		this.students = students;
		this.formTeacher = formTeacher;
	}
};

var Person = {
	init: function(fname, lname, age) {
		this.fname = fname;
		this.lname = lname;
		this.age = age;
	},
	introduce: function() {
		return "Name: " + this.fname + " " + this.lname + ", Age: " + this.age;
	}
};

var Student = Person.extend ({
	init: function(fname, lname, age, grade) {
		//Person.init.apply(this, arguments);
		this._super = Object.create(this._super);
		this._super.init(fname, lname, age);
		this.grade = grade;
	},
	introduce: function() {
		//return  Person.introduce.apply(this) + ", grade: " + this.grade;
		var intro = this._super.introduce() + ", grade: " + this.grade;
		return  intro;
	}
});

var Teacher = Person.extend ({
	init: function(fname, lname, age, specialty) {
		this._super = Object.create(this._super);
		this._super.init(fname, lname, age);
		this.specialty = specialty;
	},
	introduce: function() {
		var intro = this._super.introduce() + ", specialty: " + this.specialty;
		return intro;
	}
});

var pesho = Object.create(Person);
pesho.init("Peter", "Petrov", 40);
var gosho = Object.create(Student);
gosho.init("Gosho", "Goshov", 10, 3);
var misho = Object.create(Student);
misho.init("Misho", "Mishov", 8, 2);
var sasho = Object.create(Student);
sasho.init("Sasho", "Sashev", 7, 1);

var papazov = Object.create(Teacher);
papazov.init("Papaz", "Papazov", 100, "Math");

var mathCourse = Object.create(Course);
mathCourse.init("Math", 20, new Array(gosho, misho, sasho), papazov);

console.log(gosho.introduce());
console.log(pesho.introduce());
console.log(misho.introduce());
console.log(sasho.introduce());

console.log(papazov.introduce());

console.log(mathCourse);