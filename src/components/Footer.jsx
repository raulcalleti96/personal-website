export default function Footer() {
  return (
    <footer className="bg-negro-mate text-gray-400 py-6 text-center border-t border-gris-oscuro">
      <p className="text-blanco-suave">&copy; {new Date().getFullYear()} Raul Santiago Prieto. All rights reserved.</p>
    </footer>
  );
}