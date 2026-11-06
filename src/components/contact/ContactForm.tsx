"use client";

import { useActionState } from "react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import {
  sendContactMessage,
  type ContactFormState,
} from "@/lib/sendContactMessage";

const initialState: ContactFormState = { success: false };

const labelClass =
  "text-xs font-bold uppercase tracking-[0.2em] text-white/70";
const fieldClass =
  "w-full border-b border-white/40 bg-transparent py-3 text-lg text-cream caret-lime transition-colors placeholder:text-white/55 hover:border-white focus:border-lime focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime aria-invalid:border-lime [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_var(--color-ink)] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--color-cream)]";

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;

  return (
    <p id={id} className="text-sm text-lime">
      {errors[0]}
    </p>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  return (
    <form action={formAction} className="grid gap-x-8 gap-y-10 md:grid-cols-2">
      {/* Honeypot: hidden from people, filled in by bots. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="contact-website">Sitio web</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label htmlFor="contact-name" className={labelClass}>
          Nombre
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Ingresa tu nombre"
          defaultValue={state.values?.name}
          aria-invalid={Boolean(state.errors?.name)}
          aria-describedby={state.errors?.name ? "contact-name-error" : undefined}
          className={fieldClass}
        />
        <FieldError id="contact-name-error" errors={state.errors?.name} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className={labelClass}>
          Correo electrónico
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Ingresa tu correo de contacto"
          defaultValue={state.values?.email}
          aria-invalid={Boolean(state.errors?.email)}
          aria-describedby={state.errors?.email ? "contact-email-error" : undefined}
          className={fieldClass}
        />
        <FieldError id="contact-email-error" errors={state.errors?.email} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-phone" className={labelClass}>
          Teléfono (opcional)
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Ingresa tu número de teléfono"
          defaultValue={state.values?.phone}
          aria-invalid={Boolean(state.errors?.phone)}
          aria-describedby={state.errors?.phone ? "contact-phone-error" : undefined}
          className={fieldClass}
        />
        <FieldError id="contact-phone-error" errors={state.errors?.phone} />
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label htmlFor="contact-message" className={labelClass}>
          Mensaje
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          placeholder="Cuéntame sobre tu idea"
          defaultValue={state.values?.message}
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "contact-message-error" : undefined}
          className={`${fieldClass} resize-y`}
        />
        <FieldError id="contact-message-error" errors={state.errors?.message} />
      </div>

      <div className="flex flex-col gap-4 md:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="group flex w-full items-center justify-center gap-3 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white focus-visible:outline-1 focus-visible:outline-offset-3 focus-visible:outline-lime disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
        >
          {pending ? "Enviando..." : "Enviar mensaje"}
          <span className="transition-transform group-hover:translate-x-1">
            <ArrowIcon />
          </span>
        </button>
        <p
          role="status"
          className={`min-h-6 text-sm ${state.success ? "text-lime" : "text-cream"}`}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
