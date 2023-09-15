const nodemailer = require("nodemailer");
const transporter = require("../config/mailer");

class EmailServices {
  static async sendEmail(userEmail) {
    try {
      const mailOptions = {
        from: "houseofdev2023@gmail.com",
        to: userEmail,
        subject: "Se ha solicitado una cita - House of Dev",
        html: `<p>Tu solicitud de cita se ha generado satisfactoriamente. A la brevedad será confirmada.</p>
        <p><a href="http://localhost:3000/">Hace clic acá para volver al home</a></p>`,
      };

      const info = await transporter.sendMail(mailOptions);

      return "Correo electrónico enviado";
    } catch (error) {
      console.error(error);
      throw new Error("Error al enviar el correo electrónico");
    }
  }

  static async sendEmailConfirm(userEmail, appointmentData) {
    try {
      const mailOptions = {
        from: "houseofdev2023@gmail.com",
        to: userEmail,
        subject: "Cita confirmada - House of Dev",
        html: `
          <p>Hola,</p>
          <p>La cita para la fecha ${appointmentData.date} a las ${appointmentData.hour}hs ha sido confirmada.</p>
          <p>Detalles de la propiedad:</p>
         
          
          <p>Gracias por confirmar la cita.</p>
          <p>Equipo de House of Dev</p>
          <p><a href="http://localhost:3000/">Hacé clic acá para volver al home</a></p>
        `,
      };
      
      const info = await transporter.sendMail(mailOptions);

      return "Correo electrónico enviado";
    } catch (error) {
      console.error(error);
      throw new Error("Error al enviar el correo electrónico");
    }
  }

  static async sendEmailReject(userEmail, appointmentData) {
    try {
      const mailOptions = {
        from: "houseofdev2023@gmail.com",
        to: userEmail,
        subject: "Cita cancelada - House of Dev",
        html: `
          <p>Hola,</p>
          <p>La cita para la fecha ${appointmentData.date} a las ${appointmentData.hour}hs ha sido cancelada.</p>
            
          
          <p>Por favor vuelve a programa una nueva y te responderemos a la brevedad.</p>
          <p>Equipo de House of Dev</p>
          <p><a href="http://localhost:3000/">Hacé clic acá para volver al home</a></p>`
        ,
      };

      const info = await transporter.sendMail(mailOptions);

      return "Correo electrónico enviado";
    } catch (error) {
      console.error(error);
      throw new Error("Error al enviar el correo electrónico");
    }
  }
}



module.exports = EmailServices;

