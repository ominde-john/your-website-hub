interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle = ({
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionTitleProps) => {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""} ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-techgold">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-3xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionTitle;
