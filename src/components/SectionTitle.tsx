import { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  icon?: ReactNode;
}

const SectionTitle = ({
  title,
  subtitle,
  centered = false,
  className = "",
  icon
}: SectionTitleProps) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      {icon && <div className="flex justify-center mb-4">{icon}</div>}
      <h2 className="text-2xl md:text-3xl font-bold mb-3 gradient-text">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
