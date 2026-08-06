export default function SectionTitle({ children, icon }) {
  return (
    <h2 className="text-2xl font-heading font-semibold text-text mb-6 flex items-center gap-2">
      {icon && <span>{icon}</span>}
      {children}
    </h2>
  );
}
