import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      &copy; 2024 Retasusan
      <br />
      Cover photo by &copy;{" "}
      <Link href={"https://nenrin.me/"} className="text-sky-400">
        nenrinyear
      </Link>
      . Used with permission.
    </footer>
  );
}
