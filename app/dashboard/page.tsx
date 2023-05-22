import Profile from "./Profile";

export default function Dashboard() {
  return (
    <main className="hero min-h-[calc(100vh-80px)] bg-base-200 py-4">
      <div className="hero-content container justify-evenly flex-col sm:flex-row">
        <h1 className="text-5xl font-bold">Dashboard</h1>
        <Profile />
      </div>
    </main>
  );
}
