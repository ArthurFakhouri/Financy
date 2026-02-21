import logo from "@/assets/logo.svg";
import { Avatar } from "../Avatar";
import { Link } from "../Link";
import { useHeader } from "./hook";

export function Header() {
  const {
    pathname,
    avatarFallback,
    handleProfile
  } = useHeader();

  return (
    <div className="w-full bg-white border-b border-b-gray-200 flex items-center justify-between gap-4 px-12 py-4">
      <div>
        <img src={logo} alt="Financy logo" />
      </div>
      <div className="flex-1 flex items-center justify-center gap-5">
        <Link
          data-active={pathname === "/"}
          className='text-gray-600 data-[active="true"]:text-brand-base'
          to="/"
        >
          Dashboard
        </Link>
        <Link
          data-active={pathname === "/transactions"}
          className='text-gray-600 data-[active="true"]:text-brand-base'
          to="/transactions"
        >
          Transações
        </Link>
        <Link
          data-active={pathname === "/categories"}
          className='text-gray-600 data-[active="true"]:text-brand-base'
          to="/categories"
        >
          Categorias
        </Link>
      </div>
      <div>
        <Avatar size="sm" className="hover:cursor-pointer" onClick={handleProfile}>
          {avatarFallback}
        </Avatar>
      </div>
    </div>
  );
}
