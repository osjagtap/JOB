const mongoose = require("mongoose");

let schema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		achievements: {
			type: String,
			required: false,
		},
		contactNumber: {
			type: String,
			validate: {
				validator: function (v) {
					return v !== "" ? /\+\d{1,3}\d{10}/.test(v) : true;
				},
				msg: "Phone number is invalid!",
			},
		},
		bio: {
			type: String,
			required: false,
		},
		progress: {
			type: Number,
			required: false,
      default: 70,
		},
	},
	{ collation: { locale: "en" } }
);

module.exports = mongoose.model("RecruiterInfo", schema);
