"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus !== "authenticated") {
      router.replace("/login");
    } else {
      router.replace("costumers");
    }
  }, [sessionStatus, router]);

  return <>Home</>;
}
