import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "./button";
import { LogOut, Settings, User2Icon, UserRound } from "lucide-react";
import { useAuth } from "@/context/AuthContext";


export default function Navbar(){
    const {user,logout} = useAuth();
    const handleLogout = async () => {
      await logout();
    }
    return(
        <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="flex justify-between items-center h-16">
      {/* Logo/Brand */}
      <div className="flex items-center">
        <div className="flex-shrink-0">
        </div>
      </div>

      {/* Menu Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-gray-800 hover:text-white transition-colors cursor-pointer ">
            <UserRound className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800 p-4 rounded-md shadow-lg">
          <DropdownMenuItem className="flex items-center space-x-2 mb-2  focus:bg-gray-800">
            <User2Icon className="h-4 w-4" />
            <span>{user?.email}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-800" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:bg-gray-800 focus:bg-gray-800 text-red-400 focus:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</nav>

    )
}