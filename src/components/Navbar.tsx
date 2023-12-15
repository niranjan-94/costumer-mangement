"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { userLog } from "@/utils/server-actoions/log";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session, status: sessionStatus }: any = useSession();
  const router = useRouter();

  return sessionStatus === "authenticated" ? (
    <div>
      <ul className="flex justify-between m-10 item-center">
        <div>
          <Link href="/costumers">
            <li>Costumers</li>
          </Link>
        </div>
        <div className="flex gap-10">
          {!session ? (
            <>
              <Link href="/login">
                <li>Login</li>
              </Link>
              <Link href="/register">
                <li>Register</li>
              </Link>
            </>
          ) : (
            <>
              {session.user?.email}
              <li>
                <button
                  onClick={() => {
                    userLog(session.user?.email,"logout");
                    signOut();
                    router.push("/login");
                  }}
                  className="p-2 px-5 -mt-1 bg-blue-800 rounded-full"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  ) : (
    ""
  );
};

export default Navbar;
