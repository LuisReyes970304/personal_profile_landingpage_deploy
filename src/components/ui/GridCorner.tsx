type GridCornerProps = {
  className?: string;
};

// Each mask is (top band ∪ side band) ∩ a fade away from the corner, so every
// layer hugs the same two edges. The grid's mask is the shade's, scaled up.
const SHADE_MASK =
  "[mask-image:radial-gradient(ellipse_100%_100%_at_0_0,black_15%,transparent_85%),linear-gradient(to_bottom,black,10%,transparent_45%),linear-gradient(to_right,black,8%,transparent_35%)] [mask-composite:intersect,add,add]";
const GRID_MASK =
  "[mask-image:radial-gradient(ellipse_100%_100%_at_0_0,black_30%,transparent_100%),linear-gradient(to_bottom,black,20%,transparent_60%),linear-gradient(to_right,black,15%,transparent_48%)] [mask-composite:intersect,add,add]";

/**
 * Decorative soft ink shade and 40px grid that hug the top and left edges of
 * their box, strongest at the top-left corner. Grid lines are light over the
 * shade and dark beyond it. Rotate it 180° to anchor it to the bottom-right.
 * Size and position (e.g. a half-width box per side) come entirely from
 * `className` so two instances placed on opposite edges don't overlap.
 */
export function GridCorner({ className = "" }: GridCornerProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <div className={`absolute inset-0 bg-ink/55 ${SHADE_MASK}`} />
      <div
        className={`absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-ink)_1px,transparent_1px)] bg-size-[40px_40px] opacity-40 ${GRID_MASK}`}
      />
      <div
        className={`absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-ink)_1px,transparent_1px)] bg-size-[40px_40px] opacity-20 ${SHADE_MASK}`}
      />
      {/* A dot on each intersection; the offset centers it on the 1px lines. */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle,var(--color-ink)_2.5px,transparent_2px)] bg-size-[40px_40px] bg-position-[-19.5px_-19.5px] opacity-50 ${SHADE_MASK}`}
      />
    </div>
  );
}
