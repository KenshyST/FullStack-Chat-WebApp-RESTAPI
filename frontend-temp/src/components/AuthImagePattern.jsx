const AuthImagePattern = ({ title, subtitle, patternShape = "square" }) => {
  const getShapeClass = () => {
    switch (patternShape) {
      case "circle":
        return "rounded-full";
      case "diamond":
        return "rotate-45";
      case "ring":
        return "border-2 border-primary rounded-full";
      case "dot":
        return "w-2 h-2 rounded-full";
      default:
        return "rounded-2xl"; // square
    }
  };

  return (
    <div className="hidden lg:flex flex-col items-center justify-center p-8">
      <div className="relative w-64 h-64 mb-6">
        <div className="absolute inset-0 grid grid-cols-3 gap-4 opacity-20">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square bg-primary ${getShapeClass()} ${
                i % 2 === 0 ? "animate-pulse" : ""
              }`}
            />
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center mb-2">{title}</h2>
      <p className="text-base-content/70 text-center max-w-xs">{subtitle}</p>
    </div>
  );
};

export default AuthImagePattern;
