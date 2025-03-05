import { Link } from "react-router-dom";
import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className="bg-purple-950 shadow-md px-6 py-3 fixed w-full top-0 left-0 z-50 border-b border-purple-800">
      <div className="container mx-auto flex justify-center items-baseline">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-orange-300 hover:text-orange-400 transition">
          Weather App
        </Link>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-orange-300 hover:text-orange-400 transition"
                >
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Example Dropdown Menu */}
            {/* Uncomment if needed */}
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger className="text-orange-300 hover:text-orange-400 transition">
                Menu
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-purple-900 shadow-md p-2 rounded-md border border-purple-800">
                <NavigationMenuLink asChild>
                  <Link to="/" className="block px-4 py-2 text-orange-300 hover:text-orange-400 rounded-md">
                    Home
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="/about" className="block px-4 py-2 text-orange-300 hover:text-orange-400 rounded-md">
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;

