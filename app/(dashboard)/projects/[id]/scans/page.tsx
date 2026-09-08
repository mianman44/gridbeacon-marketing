"use client";

import {
  useEffect,
  useState,
} from "react";
import { useParams } from "next/navigation";
import {
  Building2,
  KeyRound,
  ScanLine,
} from "lucide-react";

import {
  getProjectKeywords,
  type Keyword,
} from "@/services/keywords";
import {
  getKeywordScanHistory,
} from "@/services/scans";

type ScanHistoryItem = {
  id: number;
  scan_job_id: number;
  keyword_id: number;
  rank: number | null;
  radius_miles: number | null;
  status: string | null;
  scanned_at: string;
};

type ScanHistoryResponse = {
  success: boolean;
  keyword_id: number;
  history: ScanHistoryItem[];
};

export default function ScansPage() {
  const params = useParams();
  const projectId = Number(params.id);

  const [keywords, setKeywords] =
    useState<Keyword[]>([]);

  const [
    selectedKeywordId,
    setSelectedKeywordId,
  ] = useState<number | null>(null);

  const [history, setHistory] =
    useState<ScanHistoryResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (
      !projectId ||
      Number.isNaN(projectId)
    ) {
      return;
    }

    loadKeywords();
  }, [projectId]);

  async function loadKeywords() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getProjectKeywords(projectId);

      setKeywords(data);

      if (data.length > 0) {
        const firstKeywordId =
          data[0].id;

        setSelectedKeywordId(
          firstKeywordId
        );

        await loadHistory(
          firstKeywordId
        );
      } else {
        setHistory(null);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load keywords"
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadHistory(
    keywordId: number
  ) {
    try {
      setLoading(true);
      setError("");

      const data =
        await getKeywordScanHistory(
          keywordId
        );

      setHistory(data);
    } catch (err) {
      setHistory(null);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load scan history"
      );
    } finally {
      setLoading(false);
    }
  }

  function formatRadius(
    radius: number | null
  ) {
    if (
      radius === null ||
      radius === undefined
    ) {
      return "â€”";
    }

    return `${radius} ${
      radius === 1
        ? "mile"
        : "miles"
    }`;
  }

  const selectedKeyword =
    keywords.find(
      (keyword) =>
        keyword.id === selectedKeywordId
    ) ?? null;

  return (
    <div className="space-y-7 p-6 lg:p-8">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/40">
          <ScanLine className="h-5 w-5" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-950">
            Scan Results
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View completed scans for each keyword.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="max-w-2xl rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/40 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <KeyRound className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1">
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Select keyword
            </label>

            <select
              value={
                selectedKeywordId ?? ""
              }
              onChange={async (event) => {
                const keywordId =
                  Number(
                    event.target.value
                  );

                setSelectedKeywordId(
                  keywordId
                );

                await loadHistory(
                  keywordId
                );
              }}
              disabled={
                keywords.length === 0
              }
              className="h-11 w-full rounded-xl border border-indigo-100 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {keywords.map(
                (keyword) => (
                  <option
                    key={keyword.id}
                    value={keyword.id}
                  >
                    {keyword.keyword}
                    {" | "}
                    {keyword.business_name
                      || "Unknown business"}
                  </option>
                )
              )}
            </select>

            {selectedKeyword && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-indigo-100 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm">
                  <Building2 className="h-3.5 w-3.5 shrink-0" />

                  <span className="truncate">
                    {selectedKeyword.business_name
                      || "Unknown business"}
                  </span>
                </span>

                <span className="text-xs font-medium text-slate-500">
                  All scan results below belong
                  to this company.
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {selectedKeyword && (
          <div className="flex flex-col gap-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-500">
                Scan history
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-950">
                {selectedKeyword.keyword}
              </h2>
            </div>

            <div className="inline-flex max-w-full items-center gap-2 self-start rounded-xl border border-indigo-100 bg-white px-3 py-2 text-sm font-semibold text-indigo-700 shadow-sm sm:self-auto">
              <Building2 className="h-4 w-4 shrink-0" />

              <span className="truncate">
                {selectedKeyword.business_name
                  || "Unknown business"}
              </span>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-slate-50">
              <tr className="border-b text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 font-medium">
                  Scan ID
                </th>

                <th className="px-4 py-3 font-medium">
                  Rank
                </th>

                <th className="px-4 py-3 font-medium">
                  Radius
                </th>

                <th className="px-4 py-3 font-medium">
                  Scanned at
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    Loading scan history...
                  </td>
                </tr>
              ) : history?.history
                  ?.length ? (
                history.history.map(
                  (scan) => (
                    <tr
                      key={scan.id}
                      onClick={() => {
                        window.location.href =
                          `/projects/${projectId}/scans/${scan.scan_job_id ?? scan.id}`;
                      }}
                      className="cursor-pointer border-b transition-colors last:border-0 hover:bg-slate-50"
                    >
                      <td className="px-4 py-4 font-medium text-slate-900">
                        #{scan.id}
                      </td>

                      <td className="px-4 py-4">
                        {scan.rank ??
                          "Not ranked"}
                      </td>

                      <td className="px-4 py-4">
                        {formatRadius(
                          scan.radius_miles
                        )}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-slate-500">
                        {new Date(
                          scan.scanned_at
                        ).toLocaleString()}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-10 text-center text-slate-500"
                  >
                    No scan history found
                    for this keyword.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
