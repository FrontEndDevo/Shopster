import type { TLoading } from "../../types/shared";

type LoadingProps = {
  status: TLoading;
  error: string | null;
  children: React.ReactNode;
};

const Loading = ({ status, error, children }: LoadingProps) => {
  if (status === "pending") return <p>Loading...</p>;

  if (status === "failed") return <p>{error}</p>;

  return <>{children}</>;
};

export default Loading;
