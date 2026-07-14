export default function CatalogCardSkeleton() {
  return (
    <div className="glass-card animate-pulse overflow-hidden rounded-[24px]">
      <div className="aspect-[3/4] bg-surface-container-high" />
      <div className="space-y-3 p-6">
        <div className="h-5 w-2/3 rounded bg-surface-container-high" />
        <div className="h-3 w-1/2 rounded bg-surface-container-high" />
        <div className="h-11 rounded-xl bg-surface-container-high" />
        <div className="h-11 rounded-xl bg-surface-container-high" />
      </div>
    </div>
  );
}
