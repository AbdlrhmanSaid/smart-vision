export function WelcomeBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-lg shadow-primary/20">
      <div className="absolute -top-10 -left-10 size-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-10 left-20 size-32 rounded-full bg-white/10 blur-2xl" />
      <div className="relative">
        <p className="text-sm font-medium text-primary-foreground/70 mb-1">
          مرحباً بك في
        </p>
        <h1 className="text-2xl font-bold mb-1">Smart Vision Dashboard</h1>
        <p className="text-sm text-primary-foreground/70">
          نظرة عامة على أداء متجرك اليوم
        </p>
      </div>
    </div>
  );
}
