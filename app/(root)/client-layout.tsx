"use client";

import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import Navbar from "../components/nav";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>

      <SignedOut>
        <div className="min-h-screen flex items-center justify-center">
          <SignIn routing="hash" />
        </div>
        <UserButton afterSignOutUrl="/" />
      </SignedOut>
      <SignedIn>
        <Navbar/>
        
        {children}
      </SignedIn>
    </>
  );
}
