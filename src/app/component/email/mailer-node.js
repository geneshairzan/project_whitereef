import nodemailer from "nodemailer";

// Replace with your SMTP credentials
// const smtpOptions = {
//   host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
//   port: parseInt(process.env.SMTP_PORT || "2525"),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER || "47e15db2010ce6",
//     pass: process.env.SMTP_PASSWORD || "72b04f12b60241",
//   },
// };

const smtpOptionsHelloha = {
  host: "helloha.app",
  port: 465,

  auth: {
    user: "gip@helloha.app",
    pass: "Genesha99!!",
  },
};

const smtpOptions = {
  host: "genesha.dev",
  port: 465,
  auth: {
    user: "noreply@genesha.dev",
    pass: "Genesha99!!",
  },
};

export const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
    // ...smtpOptionsHelloha,
  });

  transporter.verify((err, success) => {
    // if (err) console.error(err);
    // console.log("Your config is correct");
  });

  return await transporter.sendMail({
    from: "noreply@genesha.dev",
    ...data,
  });
};
