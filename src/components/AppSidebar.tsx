import { 
  LayoutDashboard, 
  Droplets, 
  Sprout, 
  BookOpen, 
  MessageSquare, 
  Lightbulb,
  User 
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Gestión de Riego", url: "/riego", icon: Droplets },
  { title: "Control de Cultivos", url: "/cultivos", icon: Sprout },
  { title: "Catálogo de Plantas", url: "/catalogo", icon: BookOpen },
  { title: "Comunidad", url: "/comunidad", icon: MessageSquare },
  { title: "Recomendaciones", url: "/recomendaciones", icon: Lightbulb },
  { title: "Perfil", url: "/perfil", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" >
      <SidebarContent className="bg-gradient-primary">
        <SidebarGroup className="gap-4">
          <SidebarGroupLabel className="text-[1.6rem] text-white font-semibold">
            {!isCollapsed && "Navegación"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu >
              {items.map((item) => (
                <SidebarMenuItem key={item.title} >
                  <SidebarMenuButton asChild className="hover:bg-green-600 hover:text-black">
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      // className={({ isActive }) =>
                      //   isActive 
                      //     ? "bg-gradient-primary text-white font-medium" 
                      //     : "hover:bg-gradient-primary/50"
                      // }
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
