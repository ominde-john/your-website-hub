import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

const PageHeader = ({ title, description, children, className = "" }: PageHeaderProps) => {
  return (
    <div
      className={`
        relative
        bg-gray-900
        text-white
        py-20 md:py-28 lg:py-32
        shadow-2xl
        border-b-4 border-techgold/50
        overflow-hidden
        ${className}
      `}
    >
      {/* Background Effect Layer */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-custom relative z-10">
        {/* TITLE */}
        <h1
          className="
            text-4xl md:text-5xl lg:text-6xl
            font-extrabold
            mb-4
            tracking-tight
            drop-shadow-lg
            animate-fade-up
          "
        >
          <span className="text-techgold mr-2">{title.split(" ")[0]}</span>
          {title.split(" ").slice(1).join(" ")}
        </h1>

        {description && (
          <p
            className="
              text-lg md:text-xl
              text-gray-300
              max-w-2xl
              mb-6
              leading-relaxed
              animate-fade-up
            "
            style={{ animationDelay: "0.1s" }}
          >
            {description}
          </p>
        )}

        {children && (
          <div className="mt-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
