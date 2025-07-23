import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    origin: "",
    variety: "",
    color: "",
    weight: [],
    shape: [],
    certificate: [],
    minPrice: 0,
    maxPrice: 1000000,
  });

  const [priceRange, setPriceRange] = useState([0, 1000000]);

  const origins = ["Sri Lanka", "Tanzania", "Madagascar", "Burma", "Mozambique"];

  const colors = [
    "Pink",
    "Blue",
    "Red",
    "Green",
    "Orange",
    "Purple",
    "Violet",
    "Yellow",
    "Gray",
  ];

  const weights = ["0", "1", "2", "3", "5", "10"];

  const shapes = [
    "Cushion",
    "Oval",
    "Round",
    "Emerald",
    "Pear",
    "Princess",
    "Angel",
    "Octagon",
    "Fancy",
    "Mixed",
    "Pair",
    "Heart",
    
  ];

  const certificates = [
    "GIA",
    "GRS",
    "EGL",
    "AIGS",
    "NGJA",
    "AGCL",
    "Gubelin",
    "Guild",
    "GIC",
  ];

  const varieties = ["Spinal", "Tsavorite", "Sapphire", "Ruby", "Emerald", "Other"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      origin: params.origin || "",
      variety: params.variety || "",
      color: params.color || "",
      weight: params.weight ? params.weight.split(",") : [],
      shape: params.shape ? params.shape.split(",") : [],
      certificate: params.certificate ? params.certificate.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 1000000,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    // {origin: "Tanzania", weight: ["1", "5"]}
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`); // ?origin=Tanzania&weight=1%2CS
  };
 
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(filters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Origin Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Origin</label>
        {origins.map((origin) => (
          <div key={origin} className="flex items-center mb-1">
            <input
              type="radio"
              name="origin"
              value={origin}
              onChange={handleFilterChange}
              checked={filters.origin === origin}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{origin}</span>
          </div>
        ))}
      </div>

      {/* Variety Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Variety</label>
        {varieties.map((variety) => (
          <div key={variety} className="flex items-center mb-1">
            <input
              type="radio"
              name="variety"
              value={variety}
              onChange={handleFilterChange}
              checked={filters.variety === variety}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{variety}</span>
          </div>
        ))}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
                filters.color === color ? "ring-2 ring-blue-500" : ""
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Weight Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Weight (Cts)</label>
        {weights.map((weight) => (
          <div key={weight} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="weight"
              value={weight}
              onChange={handleFilterChange}
              checked={filters.weight.includes(weight)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{weight}</span>
          </div>
        ))}
      </div>

      {/* Shape Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Shape</label>
        {shapes.map((shape) => (
          <div key={shape} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="shape"
              value={shape}
              onChange={handleFilterChange}
              checked={filters.shape.includes(shape)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{shape}</span>
          </div>
        ))}
      </div>

      {/* Certificate Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Certificate</label>
        {certificates.map((certificate) => (
          <div key={certificate} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="certificate"
              value={certificate}
              onChange={handleFilterChange}
              checked={filters.certificate.includes(certificate)}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{certificate}</span>
          </div>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          min={0}
          max={1000000}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};
export default FilterSidebar;
