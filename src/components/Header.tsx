import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-6 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <Link href="/" className="text-2xl font-bold font-mono">
          My Tech Blog
        </Link>
      </div>
    </header>
  );
}
