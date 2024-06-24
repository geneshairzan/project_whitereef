import { Resend } from "resend";
import { Email } from "./email";

const resend = new Resend("re_4SKu8bbG_GLtm7kCR36jeZ5DVY8pjf7wm");

resend.sendEmail({
  from: "you@example.com",
  to: "user@gmail.com",
  subject: "hello world",
  react: <Email firstName="John" product="MyApp" />,
});
