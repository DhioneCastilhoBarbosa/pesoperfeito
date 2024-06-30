
import { Separator } from "@/components/ui/separator";
import { LogOut, Weight } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Header(){
  return(
    <div className="flex items-center justify-between absolute top-0 left-0 right-0 z-10 gap-5 py-2 px-4 bg-indigo-200">
      <div className="flex items-center gap-1">
        <Weight className="h-6 w-6" />
        <Separator orientation="vertical" className="h-6" />
        <p>Peso Perfeito</p>
      </div>
     
      <nav className="flex items-center gap-5">
        <NavLink to={"/"}><LogOut /></NavLink>
      </nav>
    </div>
)
}