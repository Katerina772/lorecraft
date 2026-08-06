export default function Footer() {
  return (
    <footer className="bg-card mt-16 py-8 text-center text-sm text-text/50">
      <div className="max-w-6xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} LoreCraft. All rights reserved.</p>
      </div>
    </footer>
  );
}
