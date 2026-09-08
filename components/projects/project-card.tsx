"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  ArrowRight,
  Building2,
  KeyRound,
  Loader2,
  MapPin,
  Search,
  Trash2,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { deleteProject } from "@/services/projects";

interface ProjectCardProps {
  id: number;
  name: string;
  city: string;
  keyword: string;
  businessCount?: number;
  keywordCount?: number;
}

export function ProjectCard({
  id,
  name,
  city,
  keyword,
  businessCount = 0,
  keywordCount = 0,
}: ProjectCardProps) {
  const [deleting, setDeleting] =
    useState(false);

  const [deleteError, setDeleteError] =
    useState("");

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete the project "${name}"?\n\n` +
        "This will permanently delete its businesses, " +
        "keywords, scan history, grid results, and rank history."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setDeleteError("");

      await deleteProject(id);

      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setDeleteError(
          error.response?.data?.detail ||
            "Failed to delete project"
        );
      } else {
        setDeleteError(
          "Failed to delete project"
        );
      }
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Card className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-slate-900">
              {name}
            </h2>

            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4 shrink-0" />

              <span className="truncate">
                {city || "Location not set"}
              </span>
            </div>
          </div>

          <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Active
          </span>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-xl bg-blue-50/70 px-3 py-3 text-sm text-slate-700">
          <Search className="h-4 w-4 shrink-0 text-blue-600" />

          <span className="truncate">
            {keyword || "No primary keyword"}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <Building2 className="h-4 w-4 text-blue-600" />
              Businesses
            </div>

            <div className="mt-2 text-2xl font-bold text-slate-900">
              {businessCount}
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <KeyRound className="h-4 w-4 text-emerald-600" />
              Keywords
            </div>

            <div className="mt-2 text-2xl font-bold text-slate-900">
              {keywordCount}
            </div>
          </div>
        </div>

        {deleteError && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {deleteError}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <Link
            href={`/projects/${id}`}
            className="flex flex-1 items-center justify-between rounded-lg px-1 py-2 text-sm font-semibold text-slate-600 transition hover:text-blue-700"
          >
            <span>Open Project</span>

            <ArrowRight className="h-5 w-5 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-blue-600" />
          </Link>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}

            {deleting
              ? "Deleting"
              : "Delete"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}