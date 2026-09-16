import { memo } from "react";
import { useNavigate } from "react-router-dom";

type THeaderBadgeItemProps = {
  label: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
};

const HeaderBadgeItem = memo(
  ({ label, count, icon: Icon }: THeaderBadgeItemProps) => {
    const navigate = useNavigate();

    return (
      <div
        className="relative flex items-center gap-2 flex-row-reverse cursor-pointer group"
        onClick={() => navigate(`/${label}`)}
      >
        <Icon className="w-8 h-8 transition-transform duration-200 hover:scale-110 text-white" />

        {count !== 0 && (
          <p
            key={count}
            className="absolute -top-2 -right-2 bg-blue-500 font-bold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce"
          >
            {count}
          </p>
        )}
      </div>
    );
  },
);

export default HeaderBadgeItem;
