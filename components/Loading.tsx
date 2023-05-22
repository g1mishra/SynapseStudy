export default function Loading() {
  return (
    <div className="fixed inset-0 bg-base-200 flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}