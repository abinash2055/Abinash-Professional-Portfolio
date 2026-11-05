import react from "react"
import Logo from "./navbar/Logo";
import Title from "./navbar/Title";
import NavLinks from "./navbar/NavLinks";
import ResumeMenu from "./navbar/ResumeMenu";
import GetHire from "./navbar/GetHire";
import ToggleTheme from "./navbar/ToggleTheme";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">

        {/* Logo and Title */}
        <div className="flex shrink-0 items-center gap-3">
          <Logo />
          <Title />
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-6 lg:flex">
          <NavLinks />
        </div>

        {/* Navbar Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <ResumeMenu />
          <GetHire />
          <ToggleTheme />
        </div>

      </nav>
    </header>
  );
};

export default Navbar;