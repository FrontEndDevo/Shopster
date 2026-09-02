import { Link } from "react-router-dom";
import type { TCategory } from "@/types/category";

const Category = ({ name, image, slug }: TCategory) => {
  return (
    <Link
      className="transform transition duration-300 hover:cursor-pointer hover:scale-105 hover:border-blue-400 border-2 bg-white rounded-md overflow-hidden border-gray-300 flex flex-col gap-2"
      to={`/categories/${slug}`}
    >
      <img
        className="w-full h-full rounded-t-sm object-cover"
        src={image}
        alt={name}
      />
      <h2 className="text-lg font-bold my-2 text-gray-800">{name}</h2>
    </Link>
  );
};

export default Category;
