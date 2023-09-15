const EmailServices = require("../services/email.service");

exports.sendEmail = async (req, res) => {
  const { userEmail, appointmentData } = req.body;

  try {
    const response = await EmailServices.sendEmail(userEmail);
    res.status(200).send({ response });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.sendEmailConfirm = async (req, res) => {
  const { userEmail, appointmentData } = req.body;

  try {
    const adminResponse = await EmailServices.sendEmailConfirm(
      userEmail,
      appointmentData
    );

    res.status(200).send({ adminResponse });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

exports.sendEmailReject = async (req, res) => {
  const { userEmail, appointmentData } = req.body;

  try {
    const adminResponse = await EmailServices.sendEmailReject(
      userEmail,
      appointmentData
    );

    res.status(200).send({ adminResponse });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};