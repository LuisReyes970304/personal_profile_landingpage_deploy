type TagProps = {
  children: React.ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="rounded-full border border-black/20 px-3 py-1 text-xs font-medium">
      {children}
    </span>
  );
}
