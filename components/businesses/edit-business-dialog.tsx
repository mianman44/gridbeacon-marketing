"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CheckCircle2,
  Loader2,
  MapPin,
  Search,
  X,
} from "lucide-react";

import {
  resolveBusinessLocation,
  updateBusiness,
  type Business,
  type BusinessLocationCandidate,
  type CreateBusinessPayload,
} from "@/services/businesses";

interface EditBusinessDialogProps {
  business: Business | null;
  open: boolean;
  onClose: () => void;
}

interface FormState {
  businessName: string;
  category: string;
  mapsUrl: string;
  placeId: string;
  latitude: string;
  longitude: string;
}

const emptyFormState: FormState = {
  businessName: "",
  category: "",
  mapsUrl: "",
  placeId: "",
  latitude: "",
  longitude: "",
};

export default function EditBusinessDialog({
  business,
  open,
  onClose,
}: EditBusinessDialogProps) {
  const queryClient = useQueryClient();

  const [form, setForm] =
    useState<FormState>(emptyFormState);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [
    resolveMessage,
    setResolveMessage,
  ] = useState<string | null>(null);

  const [
    candidates,
    setCandidates,
  ] = useState<
    BusinessLocationCandidate[]
  >([]);

  const [
    selectedCandidate,
    setSelectedCandidate,
  ] = useState<
    BusinessLocationCandidate | null
  >(null);

  useEffect(() => {
    if (!business) {
      setForm(emptyFormState);
      return;
    }

    setForm({
      businessName:
        business.business_name ?? "",
      category:
        business.category ?? "",
      mapsUrl:
        business.maps_url ?? "",
      placeId:
        business.place_id ?? "",
      latitude: String(
        business.latitude ?? "",
      ),
      longitude: String(
        business.longitude ?? "",
      ),
    });

    setCandidates([]);
    setSelectedCandidate(null);
    setResolveMessage(null);
    setErrorMessage(null);
  }, [business, open]);

  function applyCandidate(
    candidate: BusinessLocationCandidate,
  ) {
    setSelectedCandidate(candidate);
    setCandidates([]);

    setForm((current) => ({
      ...current,
      businessName:
        candidate.business_name
        || current.businessName,
      category:
        candidate.category
        || current.category,
      mapsUrl:
        candidate.maps_url
        || current.mapsUrl,
      placeId:
        candidate.place_id || "",
      latitude:
        candidate.latitude,
      longitude:
        candidate.longitude,
    }));

    setErrorMessage(null);
    setResolveMessage(
      "Exact business location selected.",
    );
  }

  const resolveMutation = useMutation({
    mutationFn: () =>
      resolveBusinessLocation({
        business_name:
          form.businessName.trim(),
        maps_url:
          form.mapsUrl.trim(),
        category:
          form.category.trim(),
      }),

    onSuccess: (response) => {
      setResolveMessage(
        response.warning ?? null,
      );

      if (
        response.candidates.length === 1
      ) {
        applyCandidate(
          response.candidates[0],
        );
        return;
      }

      setSelectedCandidate(null);
      setCandidates(
        response.candidates,
      );
    },

    onError: (error: any) => {
      setSelectedCandidate(null);
      setCandidates([]);

      setErrorMessage(
        error?.response?.data?.detail
        || "Unable to resolve this Google Maps link.",
      );
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      businessId,
      payload,
    }: {
      businessId: number;
      payload: CreateBusinessPayload;
    }) =>
      updateBusiness(
        businessId,
        payload,
      ),

    onSuccess: async () => {
      if (business) {
        await queryClient.invalidateQueries({
          queryKey: [
            "businesses",
            business.project_id,
          ],
        });
      }

      setErrorMessage(null);
      onClose();
    },

    onError: (error: any) => {
      const detail =
        error?.response?.data?.detail;

      if (typeof detail === "string") {
        setErrorMessage(detail);
        return;
      }

      if (Array.isArray(detail)) {
        setErrorMessage(
          detail
            .map((item) => {
              const field =
                Array.isArray(item.loc)
                  ? item.loc[
                      item.loc.length - 1
                    ]
                  : "field";

              return `${field}: ${item.msg}`;
            })
            .join(" • "),
        );

        return;
      }

      setErrorMessage(
        "Unable to update the business.",
      );
    },
  });

  if (!open || !business) {
    return null;
  }

  function updateField(
    field: keyof FormState,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (
      field === "businessName"
      || field === "mapsUrl"
    ) {
      setSelectedCandidate(null);
      setCandidates([]);
      setResolveMessage(null);

      setForm((current) => ({
        ...current,
        placeId: "",
        latitude: "",
        longitude: "",
      }));
    }
  }

  function handleResolve() {
    setErrorMessage(null);

    if (
      !form.businessName.trim()
      || !form.mapsUrl.trim()
    ) {
      setErrorMessage(
        "Enter the business name and Google Maps URL first.",
      );
      return;
    }

    resolveMutation.mutate();
  }

  function handleClose() {
    if (
      updateMutation.isPending
      || resolveMutation.isPending
    ) {
      return;
    }

    setErrorMessage(null);
    onClose();
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setErrorMessage(null);

    if (
      !form.businessName.trim()
      || !form.category.trim()
      || !form.mapsUrl.trim()
      || !form.latitude.trim()
      || !form.longitude.trim()
    ) {
      setErrorMessage(
        "Find and confirm the exact business location before saving.",
      );
      return;
    }

    if (!business) {
      setErrorMessage(
        "Business data is unavailable. Close the dialog and try again.",
      );
      return;
    }

    updateMutation.mutate({
      businessId: business.id,
      payload: {
        project_id:
          business.project_id,
        business_name:
          form.businessName.trim(),
        category:
          form.category.trim(),
        maps_url:
          form.mapsUrl.trim(),
        place_id:
          form.placeId.trim(),
        latitude:
          form.latitude.trim(),
        longitude:
          form.longitude.trim(),
        full_address:
          selectedCandidate?.formatted_address
          ?? business.full_address
          ?? "",
        rating:
          selectedCandidate?.rating
          ?? business.rating
          ?? null,
        reviews:
          selectedCandidate?.reviews
          ?? business.reviews
          ?? 0,
        website:
          selectedCandidate?.website
          ?? business.website
          ?? "",
        phone:
          selectedCandidate?.phone
          ?? business.phone
          ?? "",
        profile_status:
          selectedCandidate?.profile_status
          ?? business.profile_status
          ?? "unknown",
      },
    });
  }

  const busy =
    updateMutation.isPending
    || resolveMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative z-10 max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Edit business
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recheck the exact Google Maps
              location before running scans.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <FormField
            label="Business name"
            value={form.businessName}
            placeholder="Business name"
            onChange={(value) =>
              updateField(
                "businessName",
                value,
              )
            }
          />

          <FormField
            label="Primary category"
            value={form.category}
            placeholder="Primary category"
            onChange={(value) =>
              updateField(
                "category",
                value,
              )
            }
          />

          <FormField
            label="Google Maps URL"
            value={form.mapsUrl}
            placeholder="Paste the business Share link"
            onChange={(value) =>
              updateField(
                "mapsUrl",
                value,
              )
            }
          />

          <button
            type="button"
            disabled={
              busy
              || !form.businessName.trim()
              || !form.mapsUrl.trim()
            }
            onClick={handleResolve}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {resolveMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}

            {resolveMutation.isPending
              ? "Finding exact location..."
              : "Find exact Google location"}
          </button>

          {candidates.length > 0 && (
            <div className="space-y-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <div>
                <h3 className="font-semibold text-slate-950">
                  Select the correct listing
                </h3>

                <p className="mt-1 text-xs text-slate-600">
                  Confirm the matching business.
                </p>
              </div>

              {candidates.map(
                (candidate) => (
                  <CandidateCard
                    key={
                      candidate.place_id
                      || `${candidate.latitude}-${candidate.longitude}`
                    }
                    candidate={candidate}
                    onSelect={() =>
                      applyCandidate(
                        candidate,
                      )
                    }
                  />
                ),
              )}
            </div>
          )}

          {selectedCandidate && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                <div>
                  <p className="font-semibold text-green-900">
                    Exact location confirmed
                  </p>

                  <p className="mt-1 text-sm text-green-800">
                    {form.businessName}
                  </p>

                  <p className="mt-1 font-mono text-xs text-green-700">
                    {form.latitude},{" "}
                    {form.longitude}
                  </p>
                </div>
              </div>
            </div>
          )}

          {resolveMessage && (
            <p className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600">
              {resolveMessage}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Latitude"
              value={form.latitude}
              placeholder="Found automatically"
              readOnly
              required={false}
              onChange={() => undefined}
            />

            <FormField
              label="Longitude"
              value={form.longitude}
              placeholder="Found automatically"
              readOnly
              required={false}
              onChange={() => undefined}
            />
          </div>

          <FormField
            label="Google Place ID"
            value={form.placeId}
            placeholder="Added when available"
            readOnly
            required={false}
            onChange={() => undefined}
          />

          <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />

            <p className="text-xs leading-5 text-slate-500">
              A new scan uses the coordinates
              saved here. Existing scans keep
              their original grid locations.
            </p>
          </div>

          {errorMessage && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={handleClose}
              disabled={busy}
              className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                busy
                || !form.latitude
                || !form.longitude
              }
              className="flex h-10 items-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {updateMutation.isPending
                ? "Saving..."
                : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CandidateCard({
  candidate,
  onSelect,
}: {
  candidate: BusinessLocationCandidate;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="w-full rounded-xl border border-blue-200 bg-white p-4 text-left transition hover:border-blue-400 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-950">
            {candidate.business_name}
          </p>

          {candidate.formatted_address && (
            <p className="mt-1 text-xs leading-5 text-slate-600">
              {candidate.formatted_address}
            </p>
          )}
        </div>

        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
          Select
        </span>
      </div>

      <p className="mt-3 font-mono text-xs text-slate-500">
        {candidate.latitude},{" "}
        {candidate.longitude}
      </p>
    </button>
  );
}

interface FormFieldProps {
  label: string;
  value: string;
  placeholder: string;
  required?: boolean;
  readOnly?: boolean;
  onChange: (value: string) => void;
}

function FormField({
  label,
  value,
  placeholder,
  required = true,
  readOnly = false,
  onChange,
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <input
        type="text"
        required={required}
        readOnly={readOnly}
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={`h-11 w-full rounded-lg border px-3 text-sm outline-none transition placeholder:text-slate-400 ${
          readOnly
            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-600"
            : "border-slate-200 bg-white text-slate-900 focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        }`}
      />
    </label>
  );
}
