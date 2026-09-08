"use client";

import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";

import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  Save,
  Settings,
  UserRound,
} from "lucide-react";

import {
  changeAccountPassword,
  updateAccountProfile,
} from "@/services/account";

import {
  useAccount,
} from "@/hooks/use-account";

function getErrorMessage(
  error: unknown
) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = (
      error as {
        response?: {
          data?: {
            detail?: string;
          };
        };
      }
    ).response;

    return (
      response?.data?.detail ||
      "The request could not be completed."
    );
  }

  return "The request could not be completed.";
}

export default function AccountSettingsPage() {
  const {
    account,
    loading,
    setAccount,
  } = useAccount();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    profileSaving,
    setProfileSaving,
  ] = useState(false);

  const [
    passwordSaving,
    setPasswordSaving,
  ] = useState(false);

  const [
    profileMessage,
    setProfileMessage,
  ] = useState("");

  const [
    profileError,
    setProfileError,
  ] = useState("");

  const [
    passwordMessage,
    setPasswordMessage,
  ] = useState("");

  const [
    passwordError,
    setPasswordError,
  ] = useState("");

  const [
    showPasswords,
    setShowPasswords,
  ] = useState(false);

  useEffect(() => {
    if (!account) {
      return;
    }

    setFullName(account.full_name);
    setEmail(account.email);
  }, [account]);

  async function handleProfileSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setProfileMessage("");
    setProfileError("");

    try {
      setProfileSaving(true);

      const response =
        await updateAccountProfile({
          full_name: fullName.trim(),
          email: email.trim(),
        });

      setAccount(response.user);
      setProfileMessage(
        response.message
      );
    } catch (error) {
      setProfileError(
        getErrorMessage(error)
      );
    } finally {
      setProfileSaving(false);
    }
  }

  async function handlePasswordSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setPasswordMessage("");
    setPasswordError("");

    if (
      newPassword !== confirmPassword
    ) {
      setPasswordError(
        "New passwords do not match."
      );

      return;
    }

    try {
      setPasswordSaving(true);

      const response =
        await changeAccountPassword({
          current_password:
            currentPassword,
          new_password: newPassword,
        });

      setPasswordMessage(
        response.message
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordError(
        getErrorMessage(error)
      );
    } finally {
      setPasswordSaving(false);
    }
  }

  return (
    <div className="relative isolate min-h-full overflow-hidden p-6 lg:p-8">
      <div className="pointer-events-none absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />

      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 text-white shadow-lg shadow-indigo-500/25">
            <Settings className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-950">
              Account Settings
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your profile information and password.
            </p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <SettingsCard
            title="Profile information"
            description="Update the name and email address associated with your account."
            icon={
              <UserRound className="h-5 w-5" />
            }
          >
            <form
              onSubmit={
                handleProfileSubmit
              }
              className="space-y-5"
            >
              <InputField
                label="Full name"
                type="text"
                value={fullName}
                onChange={setFullName}
                icon={
                  <UserRound className="h-4 w-4" />
                }
              />

              <InputField
                label="Email address"
                type="email"
                value={email}
                onChange={setEmail}
                icon={
                  <Mail className="h-4 w-4" />
                }
              />

              <FeedbackMessage
                success={profileMessage}
                error={profileError}
              />

              <button
                type="submit"
                disabled={
                  loading ||
                  profileSaving
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {profileSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}

                Save profile
              </button>
            </form>
          </SettingsCard>

          <SettingsCard
            title="Account security"
            description="Change your password to keep your GridBeacon account secure."
            icon={
              <LockKeyhole className="h-5 w-5" />
            }
          >
            <form
              onSubmit={
                handlePasswordSubmit
              }
              className="space-y-5"
            >
              <InputField
                label="Current password"
                type={
                  showPasswords
                    ? "text"
                    : "password"
                }
                value={
                  currentPassword
                }
                onChange={
                  setCurrentPassword
                }
                icon={
                  <LockKeyhole className="h-4 w-4" />
                }
              />

              <InputField
                label="New password"
                type={
                  showPasswords
                    ? "text"
                    : "password"
                }
                value={newPassword}
                onChange={
                  setNewPassword
                }
                icon={
                  <LockKeyhole className="h-4 w-4" />
                }
              />

              <InputField
                label="Confirm new password"
                type={
                  showPasswords
                    ? "text"
                    : "password"
                }
                value={
                  confirmPassword
                }
                onChange={
                  setConfirmPassword
                }
                icon={
                  <LockKeyhole className="h-4 w-4" />
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPasswords(
                    (current) =>
                      !current
                  )
                }
                className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 transition hover:text-indigo-800"
              >
                {showPasswords ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}

                {showPasswords
                  ? "Hide passwords"
                  : "Show passwords"}
              </button>

              <FeedbackMessage
                success={
                  passwordMessage
                }
                error={passwordError}
              />

              <button
                type="submit"
                disabled={
                  passwordSaving
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {passwordSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LockKeyhole className="h-4 w-4" />
                )}

                Change password
              </button>
            </form>
          </SettingsCard>
        </div>
      </div>
    </div>
  );
}

function SettingsCard({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-indigo-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-950">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-6">
        {children}
      </div>
    </section>
  );
}

function InputField({
  label,
  type,
  value,
  onChange,
  icon,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  icon: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-500">
          {icon}
        </span>

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          required
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-sm text-slate-950 outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />
      </div>
    </label>
  );
}

function FeedbackMessage({
  success,
  error,
}: {
  success: string;
  error: string;
}) {
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
        {error}
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        {success}
      </div>
    );
  }

  return null;
}
