// import { OrganizationProfile } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organization",
  description: "Organization management",
};

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      {/* <OrganizationProfile /> */}
      <div className="flex-1">{children}</div>
    </div>
  );
}