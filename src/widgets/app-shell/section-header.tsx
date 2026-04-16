import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function SectionHeader({
  title,
  description,
  actions,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight dark:text-white text-zinc-900">
          {title}
        </h2>
        {description && <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>}
      </div>

      {actions ? <div>{actions}</div> : null}
    </div>
  );
}