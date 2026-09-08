"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useLogin } from "@/hooks/use-login";

export function LoginForm() {

  const { signIn, loading } = useLogin();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const success = await signIn(email, password);

  if (success) {
    router.push("/projects");
  } else {
    alert("Invalid credentials");
  }
}

  return (
    <Card className="w-full max-w-md shadow-xl">

      <CardHeader>

        <CardTitle className="text-3xl">
          GridBeacon
        </CardTitle>

        <p className="text-sm text-slate-500">
          Sign in to continue
        </p>

      </CardHeader>

      <CardContent>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>

            <Input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <Button
  type="submit"
  className="w-full"
  disabled={loading}
>
            {loading ? "Signing In..." : "Sign In"}
          </Button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New to GridBeacon?{" "}
          <Link
            href="/signup"
            className="font-semibold text-indigo-600 hover:text-violet-600"
          >
            Create an account
          </Link>
        </p>

      </CardContent>

    </Card>
  );
}