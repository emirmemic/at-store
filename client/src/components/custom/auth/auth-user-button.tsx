import Link from "next/link";

import { Button } from "@/components/ui/button";
import { StrapiUserMeProps } from "@/lib/types";
import { AuthLogoutButton } from "./auth-logout-button";

export function AuthUserNavButton({ user }: Readonly<StrapiUserMeProps>) {
  return (
    <div className="hidden items-center gap-2 md:flex">
      {user?.username}
      <Button asChild className="h-8 w-8 rounded-full">
        <Link href="/" className="cursor-pointer">
          {user?.username[0].toLocaleUpperCase()}
        </Link>
      </Button>
      <AuthLogoutButton />
    </div>
  );
}
