export default function About() {
  const plans = [
    { year: 'FY.2022', href: '#' },
    { year: 'FY.2023', href: '#' },
    { year: 'FY.2024', href: '#' },
    { year: 'FY.2025', href: '#' },
  ]

  return (
    <section className="w-full bg-white" style={{ padding: '80px 80px 80px 80px' }}>
      <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">

        {/* ── LEFT: Text Content ── */}
        <div className="flex-1">

          {/* Section label */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-[#282974]" />
            <span className="text-[11px] font-bold uppercase tracking-[3px] text-[#282974]">
              About Us
            </span>
          </div>

          {/* Heading */}
          <h2 className="mb-8 font-sans text-3xl font-extrabold leading-tight text-black lg:text-4xl">
            Gender Equality<br />
            Mainstreaming Towards<br />
            Nation Building
          </h2>

          {/* Body */}
          <p className="mb-12 text-justify text-[15px] leading-relaxed text-gray-600">
            &nbsp;&nbsp;&nbsp;&nbsp;Gender and Development adopts Gender Mainstreaming as a strategy for
            making women's as well as men's concerns and experiences an integral
            dimension of the design, implementation, monitoring, and evaluation of
            policies, programs and projects in all social, political, civil, and economic
            spheres so that women and men benefit equally. Please find below CIAC's
            GAD Plans and Budget:.
          </p>

          {/* Plan links */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {plans.map(({ year, href }) => (
              <a
                key={year}
                href={href}
                className="group block p-3 text-center no-underline outline outline-2 outline-transparent transition-all duration-300 ease-out hover:scale-150 hover:z-10"
                style={{ transformOrigin: 'center center' }}
              >
                <span className="block text-[13px] font-extrabold uppercase leading-snug text-black transition-all duration-300 group-hover:text-[#282974] group-hover:scale-110">
                  Gender and<br />Development<br />(GAD) Plan<br />and Budget
                </span>
                <span className="mt-2 block text-[14px] font-extrabold uppercase text-black transition-all duration-300 group-hover:text-[#282974] group-hover:scale-125">
                  {year}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Video embed ── */}
        <div className="w-full lg:w-[46%] lg:shrink-0">
          <div className="relative overflow-hidden bg-black shadow-xl">
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/ilFvvFR_wAU"
                title="GAD Explainer Video — WorldFish"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}