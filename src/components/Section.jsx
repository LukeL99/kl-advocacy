const bgClasses = {
  primary: 'bg-bg-primary',
  secondary: 'bg-bg-secondary',
  muted: 'bg-bg-muted',
  dark: 'bg-primary',
};

export default function Section({ children, bg = 'primary', className = '' }) {
  return (
    <section className={`py-16 md:py-24 ${bgClasses[bg]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, light = false }) {
  return (
    <div className="text-center mb-12">
      <h2 className={`font-heading text-3xl md:text-4xl mb-4 ${light ? 'text-white' : 'text-text-primary'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl mx-auto ${light ? 'text-purple-100' : 'text-text-muted'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
