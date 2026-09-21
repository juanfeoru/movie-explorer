interface LoadingStateProps {
  message: string;
}

export default function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="text-center">
        <div className="mx-auto mb-4 size-8 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />

        <p className="text-sm text-secondary-text">{message}</p>
      </div>
    </div>
  );
}
