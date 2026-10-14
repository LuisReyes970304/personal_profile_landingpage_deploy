import { profile } from "@/lib/profile";

export function Footer() {
  return (
    <footer className="px-5 pb-24 md:px-10 md:pb-32">
      <div className="mx-auto mt-20 flex max-w-7xl flex-col gap-5 border-t border-white/10 pt-6 text-xs uppercase tracking-widest text-white/35 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {profile.copyrightYear} {profile.name}
        </span>
        <ul className="flex gap-6">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                className="transition-colors hover:text-white"
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
