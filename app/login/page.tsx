import { Login } from "./components/Login";

export default function LoginPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const redirectTo = searchParams?.redirectTo as string | undefined;

  // 登录成功后
  const handleLoginSuccess = () => {
    if (redirectTo) {
      window.location.href = redirectTo;
    } else {
      window.location.href = '/overview';
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full h-[calc(100vh-73px)]">
      <Login onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}
