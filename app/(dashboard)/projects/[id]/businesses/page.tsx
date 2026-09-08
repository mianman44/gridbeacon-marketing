"use client";

import {
  useMemo,
  useState,
} from "react";
import { useParams } from "next/navigation";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  Building2,
  Clock3,
  Globe2,
  MapPin,
  Phone,
  Plus,
  Search,
  Star,
  Tags,
} from "lucide-react";

import {
  deleteBusiness,
  getProjectBusinesses,
  refreshBusinessProfile,
  type Business,
} from "@/services/businesses";

import ProjectPageHeader from "@/components/projects/project-page-header";
import { DataTable } from "@/components/shared/data-table/data-table";
import { DataTableEmpty } from "@/components/shared/data-table/data-table-empty";
import { DataTableLoading } from "@/components/shared/data-table/data-table-loading";
import { CreateBusinessDialog } from "@/components/businesses/create-business-dialog";
import ProjectTabs from "@/components/projects/project-tabs";
import BusinessActions from "@/components/businesses/business-actions";
import EditBusinessDialog from "@/components/businesses/edit-business-dialog";
import ConfirmDialog from "@/components/ui/confirm-dialog";


export default function BusinessesPage() {
  const params = useParams();
  const projectId = Number(params.id);
  const queryClient = useQueryClient();

  const [search, setSearch] =
    useState("");
  const [dialogOpen, setDialogOpen] =
    useState(false);
  const [
    deletingBusiness,
    setDeletingBusiness,
  ] = useState<Business | null>(null);
  const [
    editingBusiness,
    setEditingBusiness,
  ] = useState<Business | null>(null);

  const {
    data: businesses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "businesses",
      projectId,
    ],
    queryFn: () =>
      getProjectBusinesses(projectId),
    enabled:
      Number.isFinite(projectId),
  });

  const deleteMutation = useMutation({
    mutationFn: (
      businessId: number,
    ) => deleteBusiness(businessId),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "businesses",
          projectId,
        ],
      });

      setDeletingBusiness(null);
    },

    onError: (error) => {
      console.error(
        "Delete failed:",
        error,
      );
    },
  });

  const refreshMutation = useMutation({
    mutationFn: (
      businessId: number,
    ) =>
      refreshBusinessProfile(
        businessId,
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "businesses",
          projectId,
        ],
      });
    },

    onError: (error: any) => {
      window.alert(
        error?.response?.data?.detail
        || "Unable to refresh this business profile.",
      );
    },
  });

  const filteredBusinesses =
    useMemo(() => {
      const query =
        search.trim().toLowerCase();

      if (!query) {
        return businesses;
      }

      return businesses.filter(
        (business) => {
          const searchableValues = [
            business.business_name,
            business.category,
            business.full_address,
            business.phone,
            business.website,
            business.place_id,
            business.profile_status,
            business.latitude,
            business.longitude,
          ];

          return searchableValues.some(
            (value) =>
              String(value ?? "")
                .toLowerCase()
                .includes(query),
          );
        },
      );
    }, [businesses, search]);

  const activeBusinesses =
    businesses.filter(
      (business) =>
        business.profile_status
        === "active",
    ).length;

  const categoryCount = new Set(
    businesses
      .map(
        (business) =>
          business.category,
      )
      .filter(Boolean),
  ).size;

  const ratedBusinesses =
    businesses.filter(
      (business) =>
        typeof business.rating
          === "number",
    );

  const averageRating =
    ratedBusinesses.length > 0
      ? ratedBusinesses.reduce(
          (total, business) =>
            total
            + Number(
              business.rating ?? 0,
            ),
          0,
        ) / ratedBusinesses.length
      : null;

  return (
    <main className="p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-7">
        <ProjectPageHeader
          icon={Building2}
          title="Businesses"
          description="Manage and monitor your Google Business Profiles from one place."
          actions={
            <button
              type="button"
              onClick={() =>
                setDialogOpen(true)
              }
              className="flex h-10 items-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" />
              Add business
            </button>
          }
        />

        <ProjectTabs
          projectId={projectId}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total businesses"
            value={businesses.length}
            icon={Building2}
            helper="Profiles in this project"
          />

          <SummaryCard
            label="Active profiles"
            value={activeBusinesses}
            icon={MapPin}
            helper={
              businesses.length > 0
                ? `${Math.round(
                    (
                      activeBusinesses
                      / businesses.length
                    )
                    * 100,
                  )}% operational`
                : "No profiles yet"
            }
            valueClassName="text-emerald-600"
          />

          <SummaryCard
            label="Average rating"
            value={
              averageRating !== null
                ? averageRating.toFixed(1)
                : "—"
            }
            icon={Star}
            helper={
              ratedBusinesses.length > 0
                ? `Across ${ratedBusinesses.length} rated profile${
                    ratedBusinesses.length
                    === 1
                      ? ""
                      : "s"
                  }`
                : "No rating data yet"
            }
          />

          <SummaryCard
            label="Categories"
            value={categoryCount}
            icon={Tags}
            helper="Unique business categories"
          />
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-950">
                Google Business Profiles
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review profile details, contact information, status, and scan activity.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
              <div className="relative w-full sm:w-80">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value,
                    )
                  }
                  placeholder="Search name, address, phone..."
                  className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="whitespace-nowrap text-sm font-medium text-slate-500">
                {
                  filteredBusinesses.length
                }{" "}
                {filteredBusinesses.length
                === 1
                  ? "business"
                  : "businesses"}
              </div>
            </div>
          </div>

          {isError ? (
            <div className="m-5 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
              Unable to load businesses. Check the API endpoint and backend server.
            </div>
          ) : (
            <DataTable
              headers={
                <tr>
                  <TableHeader>
                    Business
                  </TableHeader>

                  <TableHeader>
                    Profile
                  </TableHeader>

                  <TableHeader>
                    Contact
                  </TableHeader>

                  <TableHeader>
                    Status & activity
                  </TableHeader>

                  <th className="w-16 px-5 py-3" />
                </tr>
              }
            >
              {isLoading ? (
                <tr>
                  <td colSpan={5}>
                    <DataTableLoading />
                  </td>
                </tr>
              ) : filteredBusinesses.length
                === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <DataTableEmpty />
                  </td>
                </tr>
              ) : (
                filteredBusinesses.map(
                  (business) => (
                    <BusinessRow
                      key={business.id}
                      business={business}
                      projectId={
                        projectId
                      }
                      onEdit={() =>
                        setEditingBusiness(
                          business,
                        )
                      }
                      onDelete={() =>
                        setDeletingBusiness(
                          business,
                        )
                      }
                      onRefresh={() =>
                        refreshMutation.mutate(
                          business.id,
                        )
                      }
                      refreshing={
                        refreshMutation.isPending
                        && refreshMutation.variables
                          === business.id
                      }
                    />
                  ),
                )
              )}
            </DataTable>
          )}
        </section>
      </div>

      <CreateBusinessDialog
        projectId={projectId}
        open={dialogOpen}
        onClose={() =>
          setDialogOpen(false)
        }
      />

      <EditBusinessDialog
        business={editingBusiness}
        open={
          editingBusiness !== null
        }
        onClose={() =>
          setEditingBusiness(null)
        }
      />

      <ConfirmDialog
        open={
          deletingBusiness !== null
        }
        title="Delete Business"
        description={`Are you sure you want to delete "${deletingBusiness?.business_name ?? ""}"? This action cannot be undone.`}
        confirmLabel="Delete Business"
        destructive
        loading={
          deleteMutation.isPending
        }
        onClose={() =>
          setDeletingBusiness(null)
        }
        onConfirm={() => {
          if (deletingBusiness) {
            deleteMutation.mutate(
              deletingBusiness.id,
            );
          }
        }}
      />
    </main>
  );
}


function SummaryCard({
  label,
  value,
  helper,
  icon: Icon,
  valueClassName = "text-slate-950",
}: {
  label: string;
  value: string | number;
  helper: string;
  icon: typeof Building2;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

          <p
            className={`mt-2 text-3xl font-bold ${valueClassName}`}
          >
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        {helper}
      </p>
    </div>
  );
}


function BusinessRow({
  business,
  projectId,
  onEdit,
  onDelete,
  onRefresh,
  refreshing,
}: {
  business: Business;
  projectId: number;
  onEdit: () => void;
  onDelete: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}) {
  const websiteLabel =
    getWebsiteLabel(
      business.website,
    );

  return (
    <tr className="align-top transition hover:bg-slate-50/80">
      <td className="min-w-[330px] px-5 py-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
            <Building2 className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-950">
              {business.business_name}
            </p>

            <p className="mt-1 text-xs font-medium text-slate-500">
              Business ID:{" "}
              {business.id}
            </p>

            <div className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-slate-500">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />

              <span>
                {business.full_address
                  || formatCoordinates(
                    business.latitude,
                    business.longitude,
                  )}
              </span>
            </div>
          </div>
        </div>
      </td>

      <td className="min-w-[220px] px-5 py-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5 text-amber-700">
            <Star className="h-4 w-4 fill-current" />

            <span className="text-sm font-bold">
              {typeof business.rating
              === "number"
                ? business.rating.toFixed(
                    1,
                  )
                : "—"}
            </span>
          </div>

          <span className="text-xs text-slate-500">
            {business.reviews ?? 0}{" "}
            reviews
          </span>
        </div>

        <div className="mt-3 inline-flex max-w-full items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
          <span className="truncate">
            {business.category
              || "Category not set"}
          </span>
        </div>
      </td>

      <td className="min-w-[240px] px-5 py-5">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-sm">
            <Globe2 className="h-4 w-4 shrink-0 text-slate-400" />

            {business.website ? (
              <a
                href={business.website}
                target="_blank"
                rel="noreferrer"
                className="max-w-[190px] truncate font-medium text-blue-700 hover:underline"
              >
                {websiteLabel}
              </a>
            ) : (
              <span className="text-slate-400">
                No website
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 shrink-0 text-slate-400" />

            {business.phone ? (
              <a
                href={`tel:${business.phone}`}
                className="font-medium text-slate-700 hover:text-blue-700"
              >
                {business.phone}
              </a>
            ) : (
              <span className="text-slate-400">
                No phone
              </span>
            )}
          </div>
        </div>
      </td>

      <td className="min-w-[210px] px-5 py-5">
        <StatusBadge
          status={
            business.profile_status
            ?? "unknown"
          }
        />

        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <Clock3 className="h-3.5 w-3.5 text-slate-400" />

          <span>
            Last scan:{" "}
            {formatLastScan(
              business.last_scan,
            )}
          </span>
        </div>
      </td>

      <td className="whitespace-nowrap px-5 py-5 text-right">
        <BusinessActions
          projectId={projectId}
          businessId={business.id}
          mapsUrl={business.maps_url}
          onEdit={onEdit}
          onDelete={onDelete}
          onRefresh={onRefresh}
          refreshing={refreshing}
        />
      </td>
    </tr>
  );
}


function StatusBadge({
  status,
}: {
  status: Business["profile_status"];
}) {
  const styles = {
    active: {
      label: "Active",
      wrapper:
        "bg-emerald-50 text-emerald-700 ring-emerald-100",
      dot: "bg-emerald-500",
    },
    temporarily_closed: {
      label: "Temporarily closed",
      wrapper:
        "bg-amber-50 text-amber-700 ring-amber-100",
      dot: "bg-amber-500",
    },
    permanently_closed: {
      label: "Permanently closed",
      wrapper:
        "bg-red-50 text-red-700 ring-red-100",
      dot: "bg-red-500",
    },
    unknown: {
      label: "Status unknown",
      wrapper:
        "bg-slate-100 text-slate-600 ring-slate-200",
      dot: "bg-slate-400",
    },
  } as const;

  const selected =
    styles[status]
    ?? styles.unknown;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${selected.wrapper}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${selected.dot}`}
      />

      {selected.label}
    </span>
  );
}


function formatCoordinates(
  latitude: string | null | undefined,
  longitude: string | null | undefined,
) {
  if (!latitude && !longitude) {
    return "Address not available";
  }

  return `${latitude || "—"}, ${longitude || "—"}`;
}


function formatLastScan(
  value: string | null | undefined,
) {
  if (!value) {
    return "Never";
  }

  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return "Unknown";
  }

  return new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    },
  ).format(date);
}


function getWebsiteLabel(
  website: string | null | undefined,
) {
  if (!website) {
    return "";
  }

  try {
    return new URL(
      website,
    ).hostname.replace(
      /^www\./,
      "",
    );
  } catch {
    return website;
  }
}


function TableHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </th>
  );
}
