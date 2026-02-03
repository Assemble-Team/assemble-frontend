export default function DialogHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mb-4 space-y-1">{children}</div>;
}
