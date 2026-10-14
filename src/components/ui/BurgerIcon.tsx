type BurgerIconProps = {
  /** Shows as an X instead of three lines. */
  open?: boolean;
};

export function BurgerIcon({ open = false }: BurgerIconProps) {
  return (
    <span aria-hidden="true" className="relative block h-4 w-5">
      <span
        className={`absolute inset-x-0 top-0 h-0.5 bg-current transition-transform duration-200 ${
          open ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current transition-opacity duration-200 ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`absolute inset-x-0 bottom-0 h-0.5 bg-current transition-transform duration-200 ${
          open ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}
