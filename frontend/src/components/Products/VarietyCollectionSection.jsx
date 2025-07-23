import { Link } from "react-router-dom";
import tsavoriteCollectionImage from "../../assets/tsavorite-collection.png";
import spinalCollectionImage from "../../assets/spinal-collection.png";

const VarietyCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Spinal Collection */}
        <div className="relative flex-1">
          <img
            src={spinalCollectionImage}
            alt="Spinal Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Spinal Collection
            </h2>
            <Link
              to="/collections/all?variety=Spinal"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
        {/* Tsavorite Collection */}
        <div className="relative flex-1">
          <img
            src={tsavoriteCollectionImage}
            alt="Tsavorite Collection"
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Tsavorite Collection
            </h2>
            <Link
              to="/collections/all?variety=Tsavorite"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default VarietyCollectionSection;
