import emailjs from "@emailjs/browser";

// Create a free account at https://emailjs.com, set up an email service +
// template, then put these three values in a `.env` file at the project
// root (never commit real keys):
//
// VITE_EMAILJS_SERVICE_ID=xxxx
// VITE_EMAILJS_TEMPLATE_ID=xxxx
// VITE_EMAILJS_PUBLIC_KEY=xxxx

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactForm(data: ContactFormData) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      "EmailJS is not configured yet. Add your service/template/public key to .env"
    );
  }

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
    },
    { publicKey: PUBLIC_KEY }
  );
}
