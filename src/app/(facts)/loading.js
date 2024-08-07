// https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states

import LoadingSpinner from "@/ui/LoadingSpinner";

export default function Loading() {
  return <LoadingSpinner color="orange" />;
}
