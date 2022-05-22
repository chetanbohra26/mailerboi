const express = require("express");
const app = express();
require("dotenv").config();

const { sendMail } = require("./courier");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.json({ success: true, message: "Welcome to Mailerboi API" });
});

app.post("/courier", async (req, res) => {
	const { email, otp } = req.body;
	if (!email)
		return res
			.status(400)
			.json({ success: false, message: '"email" is required in body.' });
	if (!otp)
		return res
			.status(400)
			.json({ success: false, message: '"otp" is required in body.' });

	try {
		const status = await sendMail(email, otp);
		console.log(status);
		res.json({ success: true, message: "Valid data", status });
	} catch (err) {
		return res.status(500).json({
			success: false,
			message: "Unexpected error",
			error: err.message,
		});
	}
});

const PORT = process.env.PORT || 7500;
app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Listening on port ${PORT}..!`);
});
