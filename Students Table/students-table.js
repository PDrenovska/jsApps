var Student = Class.create({
	init: function(fname, lname, grade) {
		this.fname = fname;
		this.lname = lname;
		this.grade = grade;
	},
	FirstName: function() {
		return this.fname;
	},
	LastName: function() {
		return this.lname;
	},
	Grade: function() {
		return this.grade;
	}
});

var StudentsTable = Class.create({
	init: function(args) {
		this.students = args;
	},
	render: function() {
		var table = $("<table/>").attr("class", "students");
		var thead = $("<tr/>")
		.append($("<th/>").text("First name"))
		.append($("<th/>").text("Last name"))
		.append($("<th/>").text("Grade"));
		table.append(thead);

		for (var i = 0; i < this.students.length; i++) {
			var row = $("<tr/>")
			.append($("<td/>").text(this.students[i].FirstName()))
			.append($("<td/>").text(this.students[i].LastName()))
			.append($("<td/>").text(this.students[i].Grade()));
			table.append(row);
		};
		$("body").append(table);
	}
});
