import axios from "axios";

export async function sendEmail(userEmail) {
  try {
    const response = await axios.post("http://localhost:3001/api/send-mail", {
      userEmail: userEmail,
    });
    return response.data;
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw new Error("Error al enviar el correo electrónico");
  }
}

export async function sendEmailConfirm(userEmail, appointmentData) {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/send-mail/confirm",
      {
        userEmail: userEmail,
        appointmentData,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw new Error("Error al enviar el correo electrónico");
  }
}
export async function sendEmailReject(userEmail, appointmentData) {
  try {
    const response = await axios.post(
      "http://localhost:3001/api/send-mail/reject",
      {
        userEmail: userEmail,
        appointmentData,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw new Error("Error al enviar el correo electrónico");
  }
}