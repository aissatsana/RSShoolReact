import Link from 'next/link';
export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>Oops, there is nothing, probably Rick deleted this page</p>
      <Link href="/">Go home</Link>
    </div>
  );
}
