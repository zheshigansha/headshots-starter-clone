import { Login } from "./components/Login";

export default function LoginPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const redirectTo = searchParams?.redirectTo as string | undefined;

  return (
    <div className="flex flex-col flex-1 w-full h-[calc(100vh-73px)]">
      <Login redirectTo={redirectTo} />
    </div>
  );
}
