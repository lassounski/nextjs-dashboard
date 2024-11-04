import { redirect } from "next/navigation";
import SideNav from "../ui/dashboard/sidenav"
import { Metadata } from 'next';
import { auth } from "@/auth";
 
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export const experimental_ppr = true;

export default async function Layout({children}:{children: React.ReactNode}) {

    const session = await auth();

    if(!session?.user)
        redirect('/')
      
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    )
}