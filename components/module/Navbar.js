import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("id");
    router.push("/auth/login");
  };

  return (
    <>
      <Link href="/main/home">Main Home</Link> | <Link href="/">Home</Link> |{" "}
      <Link href="/profile">Profile</Link> | <Link href="/login">Login</Link> |{" "}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
