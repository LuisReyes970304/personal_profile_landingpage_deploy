type GridCornerProps = {
  className?: string;
};

/**
 * Decorative grid of thin ink lines that hugs the top and left edges of its
 * box, strongest at the top-left corner and fading toward the center.
 * Rotate it 180° to anchor it to the bottom-right instead.
 */
export function GridCorner({ className = "" }: GridCornerProps) {
  return (
    <div
      aria-hidden="true"
      // Mask: (top band ∪ left band) ∩ a long fade away from the corner.
      className={`pointer-events-none absolute h-full w-full bg-[linear-gradient(to_right,var(--color-ink)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-ink)_1px,transparent_1px)] [background-size:40px_40px] opacity-40 [mask-image:radial-gradient(ellipse_100%_100%_at_0_0,black_30%,transparent_95%),linear-gradient(to_bottom,black,transparent_35%),linear-gradient(to_right,black,transparent_25%)] [mask-composite:intersect,add,add] ${className}`}
    />
  );
}
