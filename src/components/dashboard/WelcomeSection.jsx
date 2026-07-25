import Badge from '../ui/Badge';

export default function WelcomeSection() {
  return (
    <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[28px] font-bold leading-tight tracking-[0] text-[#191b23] dark:text-white sm:text-[32px]">
          Boshqaruv paneli
        </h1>
        <p className="mt-2 text-sm font-medium leading-6 text-[#737686] dark:text-slate-400 sm:text-[15px]">
          <span className="block">Xush kelibsiz!</span>
          <span className="block">Bugungi holat bilan tanishing.</span>
        </p>
      </div>

      <Badge variant="neutral" className="h-9 self-start rounded-full px-4 text-[13px] sm:self-auto">
        Sentyabr 24, 2024
      </Badge>
    </section>
  );
}
