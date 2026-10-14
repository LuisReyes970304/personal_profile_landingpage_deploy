type TagProps = {
  children: React.ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="rounded-full border border-black/15 px-3 py-1 text-xs">
      {children}
    </span>
  );
}
