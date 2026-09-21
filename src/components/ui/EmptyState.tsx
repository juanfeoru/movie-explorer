interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
}

export default function EmptyState({ icon, title, message }: EmptyStateProps) {
  return (
    <div className="flex min-h-100 items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-surface text-muted-text">
          {icon}
        </div>

        <h2 className="mt-4 text-lg font-semibold text-primary-text">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-secondary-text">{message}</p>
      </div>
    </div>
  );
}
