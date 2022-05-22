const { CourierClient } = require("@trycourier/courier");

const courier = CourierClient({
	authorizationToken: process.env.COURIER_AUTH_TOKEN,
});

const sendMail = async (email, otp) => {
	if (!email) throw new Error("Invalid email");
	if (!otp) throw new Error("Invalid mail");
	return await courier.send({
		message: {
			content: {
				title: "User Email Verification!",
				body: "The OTP generated for the user is {{otp}}.",
			},
			data: {
				otp,
			},
			to: {
				email,
			},
		},
	});
};

module.exports.sendMail = sendMail;
