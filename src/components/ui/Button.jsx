export default function Button({ children, variant = "primary", ...props }) {
  const base =
    "px-6 py-3 rounded-full font-heading font-semibold transition-colors text-sm uppercase tracking-wider";
  const variants = {
    primary: "bg-button text-white hover:bg-button-hover",
    accent: "bg-accent text-text hover:bg-primary",
    outline:
      "border-2 border-button text-button hover:bg-button hover:text-white",
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.primary}`}
      {...props}
    >
      {children}
    </button>
  );
}
