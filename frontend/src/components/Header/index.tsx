import logoMobile from "@/assets/icon.svg";
import logo from "@/assets/logo.svg";
import { navBars } from "@/constants/navBars";
import { Avatar } from "../Avatar";
import { Link } from "../Link";
import { useHeader } from "./hook";

export function Header() {
  const { pathname, screenWidth, avatarFallback, handleProfile } = useHeader();

  return (
    <header className="w-full px-4 bg-white border-b border-b-gray-200 flex items-center justify-between gap-4 md:px-12 py-4">
      <div>
        <img src={screenWidth > 768 ? logo : logoMobile} alt="Financy logo" />
      </div>
      <div className="flex-1 flex items-center justify-center gap-5">
        {navBars.map((navBar) => {
          return (
            <Link
              key={`${navBar.name}:${navBar.url}`}
              data-active={pathname === navBar.url}
              className='text-gray-600 text-xs md:text-sm data-[active="true"]:text-brand-base'
              to={navBar.url}
            >
              {navBar.name}
            </Link>
          );
        })}
      </div>
      <div>
        <Avatar
          size="sm"
          className="hover:cursor-pointer"
          onClick={handleProfile}
        >
          {avatarFallback}
        </Avatar>
      </div>
    </header>
  );
}
