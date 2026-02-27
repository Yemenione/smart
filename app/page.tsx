export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-6xl font-heading font-bold mb-6 tracking-tighter">
        DEULEUX
      </h1>
      <p className="text-xl text-muted max-w-lg mb-12 font-body">
        We engineer weightless digital experiences & scalable systems.
      </p>
      <div className="glass-panel p-8 rounded-2xl max-w-md w-full">
        <p className="text-sm uppercase tracking-widest text-muted mb-4">
          Foundation Ready
        </p>
        <button className="bg-accent text-background px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
          Start Project
        </button>
      </div>
    </div>
  );
}
