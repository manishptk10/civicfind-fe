export default function OfflinePage() {
  return (
    <div className="flex items-center justify-center h-screen text-center px-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">You are offline</h1>
        <p className="text-zinc-600">Please check your internet connection and try again.</p>
      </div>
    </div>
  );
}
