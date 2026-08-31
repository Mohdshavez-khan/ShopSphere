import { Link } from 'react-router-dom';

function Hero({
  badge = 'New Collection',
  title = 'Crafted for the modern lifestyle',
  description = 'Discover premium essentials designed to simplify your routine with timeless style, effortless performance, and refined comfort.',
  primaryHref = '/products',
  secondaryHref = '/products',
  imageSrc = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
}) {
  return (
    <section className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-[28px] border border-neutral-200/80 bg-white/85 px-4 py-5 shadow-[0_20px_80px_-24px_rgba(15,23,42,0.2)] backdrop-blur sm:px-6 sm:py-8 md:flex-row md:items-center md:px-8 md:py-10 lg:px-12 lg:py-14">
      <div className="order-2 flex-1 space-y-5 md:order-1 md:pr-8 lg:pr-10">
        <div className="inline-flex items-center rounded-full border border-black/10 bg-neutral-100 px-3 py-1 text-sm font-medium text-neutral-700 shadow-sm">
          <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
          {badge}
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-xl text-base leading-7 text-neutral-600 sm:text-lg lg:text-xl lg:leading-8">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to={primaryHref}
            className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-lg"
          >
            Shop Now
          </Link>
          <Link
            to={secondaryHref}
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-neutral-50 hover:shadow-md"
          >
            Explore
          </Link>
        </div>
      </div>

      <div className="order-1 mb-5 flex-1 md:order-2 md:mb-0">
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-neutral-100 via-white to-neutral-200 p-2 shadow-inner sm:p-3">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_transparent_45%)]" />
          <img
            src={imageSrc}
            alt="Premium e-commerce hero showcase"
            className="relative h-[240px] w-full rounded-[20px] object-cover object-center shadow-lg transition duration-500 hover:scale-[1.02] sm:h-[300px] md:h-[360px] lg:h-[420px]"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
