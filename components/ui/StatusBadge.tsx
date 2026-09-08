type Status =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

interface StatusBadgeProps {
  status: Status;
  children: React.ReactNode;
}

const styles = {
  success:
    "bg-emerald-50 text-emerald-700 border-emerald-200",

  warning:
    "bg-amber-50 text-amber-700 border-amber-200",

  danger:
    "bg-red-50 text-red-700 border-red-200",

  info:
    "bg-blue-50 text-blue-700 border-blue-200",

  neutral:
    "bg-slate-100 text-slate-700 border-slate-200",
};

export default function StatusBadge({
  status,
  children,
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {children}
    </span>
  );
}