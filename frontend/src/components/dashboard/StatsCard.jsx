import { motion } from "framer-motion";

const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
}) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      className="
        rounded-2xl
        border
        border-slate-100
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
      "
    >
      <div className="flex items-start justify-between">

        {/* Left Side */}

        <div className="space-y-2">

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-800">
            {value}
          </h2>

          {subtitle && (
            <p className="text-sm text-slate-400">
              {subtitle}
            </p>
          )}

        </div>

        {/* Icon */}

        {icon && (
          <div
            className={`
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              ${iconBg}
            `}
          >
            <div className={`text-2xl ${iconColor}`}>
              {icon}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default StatsCard;