"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import {
  useParams,
  useRouter,
} from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  KeyRound,
  MapPin,
  Save,
  ScanLine,
  Settings,
  Trash2,
} from "lucide-react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

import PageSkeleton from "@/components/ui/PageSkeleton";
import {
  useProject,
  useProjectOverview,
} from "@/hooks/use-projects";
import {
  deleteProject,
  updateProject,
} from "@/services/projects";

function getErrorMessage(
  error: unknown,
  fallback: string
) {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.detail
      || error.response?.data?.message
      || fallback
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export default function ProjectSettingsPage() {
  const params = useParams<{
    id: string;
  }>();

  const router = useRouter();
  const queryClient = useQueryClient();

  const projectId = Number(params.id);

  const projectQuery =
    useProject(projectId);

  const overviewQuery =
    useProjectOverview(projectId);

  const [name, setName] =
    useState("");

  const [city, setCity] =
    useState("");

  const [keyword, setKeyword] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [
    deleteConfirmation,
    setDeleteConfirmation,
  ] = useState("");

  useEffect(() => {
    if (!projectQuery.data) {
      return;
    }

    setName(
      projectQuery.data.name ?? ""
    );

    setCity(
      projectQuery.data.city ?? ""
    );

    setKeyword(
      projectQuery.data.keyword ?? ""
    );
  }, [projectQuery.data]);

  const updateMutation = useMutation({
    mutationFn: () =>
      updateProject(
        projectId,
        {
          name: name.trim(),
          city: city.trim(),
          keyword: keyword.trim(),
        }
      ),
    onSuccess: async (response) => {
      setErrorMessage("");
      setSuccessMessage(
        response.message
        || "Project settings updated."
      );

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [
            "project",
            projectId,
          ],
        }),
        queryClient.invalidateQueries({
          queryKey: ["projects"],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            "project-overview",
            projectId,
          ],
        }),
        queryClient.invalidateQueries({
          queryKey: [
            "project-competitors",
            projectId,
          ],
        }),
      ]);
    },
    onError: (error) => {
      setSuccessMessage("");

      setErrorMessage(
        getErrorMessage(
          error,
          "Failed to update project settings."
        )
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      deleteProject(projectId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      router.push("/projects");
    },
    onError: (error) => {
      setErrorMessage(
        getErrorMessage(
          error,
          "Failed to delete project."
        )
      );
    },
  });

  const project =
    projectQuery.data;

  const overview =
    overviewQuery.data;

  const formValid =
    name.trim().length > 0
    && city.trim().length > 0
    && keyword.trim().length > 0;

  const hasChanges = useMemo(() => {
    if (!project) {
      return false;
    }

    return (
      name.trim() !== (
        project.name ?? ""
      ).trim()
      || city.trim() !== (
        project.city ?? ""
      ).trim()
      || keyword.trim() !== (
        project.keyword ?? ""
      ).trim()
    );
  }, [
    project,
    name,
    city,
    keyword,
  ]);

  if (
    projectQuery.isLoading
    || overviewQuery.isLoading
  ) {
    return <PageSkeleton />;
  }

  if (
    projectQuery.isError
    || overviewQuery.isError
    || !project
    || !overview
  ) {
    return (
      <div className="space-y-5 px-4 pb-6 sm:px-5 lg:px-6">
        <Link
          href={`/projects/${projectId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to project
        </Link>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          Project settings could not be loaded.
        </div>
      </div>
    );
  }

  const deletionAllowed =
    deleteConfirmation
    === project.name;

  return (
    <div className="space-y-5 px-4 pb-8 sm:px-5 lg:px-6">
      <div>
        <Link
          href={`/projects/${projectId}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to project
        </Link>

        <div className="mt-3 flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/40">
            <Settings className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-950">
              Project Settings
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage the project name, location and primary keyword.
            </p>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Project ID"
          value={`#${project.id}`}
          icon={
            <Settings className="h-5 w-5" />
          }
        />

        <SummaryCard
          title="Businesses"
          value={String(
            overview.business_count
          )}
          icon={
            <Building2 className="h-5 w-5" />
          }
        />

        <SummaryCard
          title="Keywords"
          value={String(
            overview.keyword_count
          )}
          icon={
            <KeyRound className="h-5 w-5" />
          }
        />

        <SummaryCard
          title="Completed Scans"
          value={String(
            overview.completed_scans
          )}
          icon={
            <ScanLine className="h-5 w-5" />
          }
        />
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="font-semibold text-slate-950">
            General Settings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            These details are used throughout the project dashboard and reports.
          </p>
        </div>

        <form
          className="space-y-5 p-6"
          onSubmit={(event) => {
            event.preventDefault();

            setSuccessMessage("");
            setErrorMessage("");

            if (!formValid) {
              setErrorMessage(
                "Complete all project fields."
              );

              return;
            }

            updateMutation.mutate();
          }}
        >
          <FormField
            label="Project name"
            description="A private name used to identify this tracking project."
          >
            <div className="relative">
              <Building2 className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

              <input
                type="text"
                value={name}
                maxLength={160}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </FormField>

          <FormField
            label="City or market"
            description="The primary location associated with this project."
          >
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

              <input
                type="text"
                value={city}
                maxLength={160}
                onChange={(event) =>
                  setCity(event.target.value)
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </FormField>

          <FormField
            label="Primary keyword"
            description="Changing this updates the original keyword created with this project. Other tracked keywords remain unchanged."
          >
            <div className="relative">
              <KeyRound className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-slate-400" />

              <input
                type="text"
                value={keyword}
                maxLength={200}
                onChange={(event) =>
                  setKeyword(event.target.value)
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </FormField>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              The tracked Google Business Profile name and Place ID are managed from the Businesses page.
            </p>

            <button
              type="submit"
              disabled={
                !formValid
                || !hasChanges
                || updateMutation.isPending
              }
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="h-4 w-4" />

              {updateMutation.isPending
                ? "Saving..."
                : "Save changes"}
            </button>
          </div>
        </form>
      </section>

      <section className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm">
        <div className="border-b border-red-100 bg-red-50 px-6 py-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />

            <div>
              <h2 className="font-semibold text-red-900">
                Danger Zone
              </h2>

              <p className="mt-1 text-sm text-red-700">
                Deleting a project permanently removes its businesses, keywords, scans and ranking history.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div>
            <label className="text-sm font-medium text-slate-800">
              Type{" "}
              <span className="font-bold">
                {project.name}
              </span>{" "}
              to confirm
            </label>

            <input
              type="text"
              value={deleteConfirmation}
              onChange={(event) =>
                setDeleteConfirmation(
                  event.target.value
                )
              }
              placeholder={project.name}
              className="mt-2 h-11 w-full rounded-xl border border-red-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <button
            type="button"
            disabled={
              !deletionAllowed
              || deleteMutation.isPending
            }
            onClick={() => {
              const confirmed =
                window.confirm(
                  "This action cannot be undone. Delete this project permanently?"
                );

              if (confirmed) {
                setErrorMessage("");
                deleteMutation.mutate();
              }
            }}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />

            {deleteMutation.isPending
              ? "Deleting..."
              : "Delete project permanently"}
          </button>
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">
        {label}
      </span>

      <span className="mt-1 block text-xs leading-5 text-slate-500">
        {description}
      </span>

      <div className="mt-2">
        {children}
      </div>
    </label>
  );
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-2xl font-bold text-slate-950">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          {icon}
        </div>
      </div>
    </article>
  );
}
