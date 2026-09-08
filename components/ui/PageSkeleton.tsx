import LoadingSkeleton from "./LoadingSkeleton";

export default function PageSkeleton() {
  return (
    <div className="space-y-8">

      <div className="space-y-3">
        <LoadingSkeleton className="h-9 w-72" />
        <LoadingSkeleton className="h-5 w-96" />
      </div>

      <div className="grid gap-6 md:grid-cols-4">

        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-white p-6"
          >
            <LoadingSkeleton className="h-4 w-24" />

            <LoadingSkeleton className="mt-4 h-9 w-20" />

            <LoadingSkeleton className="mt-6 h-2 w-full" />
          </div>
        ))}

      </div>

      <div className="rounded-2xl border bg-white p-6">

        <LoadingSkeleton className="h-5 w-40" />

        <div className="mt-6 space-y-4">

          {Array.from({ length: 8 }).map((_, index) => (
            <LoadingSkeleton
              key={index}
              className="h-10 w-full"
            />
          ))}

        </div>

      </div>

    </div>
  );
}