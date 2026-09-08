"use client";

import Link from "next/link";
import {
  type FormEvent,
  useState,
} from "react";
import {
  BarChart3,
  Check,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  Radar,
  Sparkles,
  User,
  UserPlus,
} from "lucide-react";
import {
  useRouter,
} from "next/navigation";

import {
  register,
} from "@/services/auth";

function getErrorMessage(
  error: unknown
) {
  if (
    typeof error === "object"
    && error !== null
    && "response" in error
  ) {
    const response = (
      error as {
        response?: {
          data?: {
            detail?: string;
            message?: string;
          };
        };
      }
    ).response;

    return (
      response?.data?.detail
      || response?.data?.message
      || "Unable to create your account."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to create your account.";
}

export function SignupForm() {
  const router = useRouter();

  const [
    fullName,
    setFullName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    success,
    setSuccess,
  ] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const normalizedName =
      fullName.trim();

    const normalizedEmail =
      email.trim().toLowerCase();

    setError("");
    setSuccess("");

    if (normalizedName.length < 2) {
      setError(
        "Please enter your full name."
      );

      return;
    }

    if (
      !normalizedEmail.includes("@")
    ) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );

      return;
    }

    if (
      password !== confirmPassword
    ) {
      setError(
        "Your passwords do not match."
      );

      return;
    }

    try {
      setLoading(true);

      await register({
        full_name:
          normalizedName,
        email:
          normalizedEmail,
        password,
      });

      setSuccess(
        "Your account was created successfully. Redirecting to sign in..."
      );

      window.setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 900);
    } catch (submitError) {
      setError(
        getErrorMessage(
          submitError
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,#f8faff_0%,#f5f3ff_52%,#eef2ff_100%)]">
      <div className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-indigo-300/25 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-12 h-[28rem] w-[28rem] rounded-full bg-violet-300/25 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-[1500px] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-violet-500/25 blur-3xl" />

          <div className="relative">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-sky-400 shadow-xl shadow-indigo-950/40">
                <BarChart3 className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xl font-bold">
                  GridBeacon
                </p>

                <p className="text-xs font-medium text-indigo-200">
                  Local Rank Intelligence
                </p>
              </div>
            </Link>

            <div className="mt-20 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-indigo-100 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                Build your local visibility
              </div>

              <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight">
                See exactly where your business ranks.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-indigo-100/75">
                Track Google Business Profile rankings,
                scan local markets and turn ranking data
                into clear growth opportunities.
              </p>

              <div className="mt-10 space-y-4">
                <Feature
                  icon={MapPin}
                  text="Grid-based local ranking insights"
                />

                <Feature
                  icon={Radar}
                  text="Live scan activity and progress"
                />

                <Feature
                  icon={BarChart3}
                  text="Historical ranking performance"
                />
              </div>
            </div>
          </div>

          <p className="relative text-xs text-indigo-200/70">
            Powerful local intelligence for agencies
            and growing businesses.
          </p>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-lg">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 text-white shadow-lg shadow-indigo-500/25">
                <BarChart3 className="h-5 w-5" />
              </div>

              <div>
                <p className="font-bold text-slate-950">
                  GridBeacon
                </p>

                <p className="text-xs font-medium text-indigo-600">
                  Local Rank Intelligence
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-white/80 bg-white/90 p-6 shadow-[0_28px_80px_rgba(79,70,229,0.16)] ring-1 ring-indigo-100/80 backdrop-blur-xl sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 text-white shadow-lg shadow-indigo-500/25">
                <UserPlus className="h-5 w-5" />
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Start tracking your local search
                performance with GridBeacon.
              </p>

              <form
                onSubmit={
                  handleSubmit
                }
                className="mt-8 space-y-5"
              >
                <Field
                  label="Full name"
                  icon={User}
                >
                  <input
                    type="text"
                    autoComplete="name"
                    value={fullName}
                    onChange={(event) =>
                      setFullName(
                        event.target.value
                      )
                    }
                    placeholder="Account owner"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </Field>

                <Field
                  label="Email address"
                  icon={Mail}
                >
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    placeholder="you@company.com"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </Field>

                <Field
                  label="Password"
                  icon={LockKeyhole}
                >
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="At least 8 characters"
                    minLength={8}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-12 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (current) =>
                          !current
                      )
                    }
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </Field>

                <Field
                  label="Confirm password"
                  icon={LockKeyhole}
                >
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    placeholder="Repeat your password"
                    minLength={8}
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </Field>

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    {error}
                  </div>
                )}

                {success && (
                  <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                    {success}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={
                    loading
                    || Boolean(success)
                  }
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Create account
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-indigo-600 transition hover:text-violet-600"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              By creating an account, you agree to
              the GridBeacon terms and privacy policy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: typeof User;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-500" />

        {children}
      </div>
    </div>
  );
}

function Feature({
  icon: Icon,
  text,
}: {
  icon: typeof MapPin;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm font-medium text-indigo-100">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10">
        <Icon className="h-4 w-4" />
      </div>

      {text}
    </div>
  );
}
