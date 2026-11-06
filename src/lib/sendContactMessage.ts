"use server";

import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre.")
    .max(100, "El nombre no puede superar los 100 caracteres.")
    .regex(/^[^\r\n]+$/, "El nombre debe ocupar una sola línea."),
  email: z.string().trim().pipe(z.email("Ingresa un correo válido.")),
  phone: z
    .string()
    .trim()
    .max(30, "El teléfono no puede superar los 30 caracteres.")
    .regex(/^[+\d\s().-]*$/, "Ingresa un teléfono válido."),
  message: z
    .string()
    .trim()
    .min(10, "Cuéntame un poco más (mínimo 10 caracteres).")
    .max(5000, "El mensaje no puede superar los 5000 caracteres."),
});

type ContactFields = z.input<typeof contactSchema>;

export type ContactFormState = {
  success: boolean;
  message?: string;
  errors?: Partial<Record<keyof ContactFields, string[]>>;
  /** Submitted values, returned on failure so the form can keep them after React resets it. */
  values?: ContactFields;
};

const DEFAULT_FROM_EMAIL = "Portafolio <onboarding@resend.dev>";
const SEND_ERROR_MESSAGE =
  "No se pudo enviar tu mensaje. Inténtalo de nuevo más tarde.";

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const readField = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  // Honeypot: report success so bots get no signal that they were filtered out.
  if (readField("website")) return { success: true };

  const values: ContactFields = {
    name: readField("name"),
    email: readField("email"),
    phone: readField("phone"),
    message: readField("message"),
  };

  const result = contactSchema.safeParse(values);
  if (!result.success) {
    return {
      success: false,
      message: "Revisa los campos marcados.",
      errors: z.flattenError(result.error).fieldErrors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return { success: false, message: SEND_ERROR_MESSAGE, values };
  }

  const { name, email, phone, message } = result.data;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL,
      to: toEmail,
      replyTo: email,
      subject: `Nuevo mensaje de ${name}`,
      text: [
        `Nombre: ${name}`,
        `Correo: ${email}`,
        `Teléfono: ${phone || "No indicado"}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Contact form: Resend rejected the email.", error.name, error.message);
      return { success: false, message: SEND_ERROR_MESSAGE, values };
    }
  } catch (error) {
    console.error("Contact form: request to Resend failed.", error);
    return { success: false, message: SEND_ERROR_MESSAGE, values };
  }

  return {
    success: true,
    message: "¡Gracias! Recibí tu mensaje y te responderé pronto.",
  };
}
