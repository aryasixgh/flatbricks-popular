import React, { useEffect, useState } from "react";
import { fetchPopularProperties } from "../utils/apiCalls";

const PropertyList = () => {
  const [properties, setProperties] = useState<any[]>([]);
  useEffect(() => {
    const getPopular = async () => {
      const popular = await fetchPopularProperties();
      setProperties(popular); // You can now map over this safely
    };
    getPopular();
  }, []);

  return (
    <>
      <div className="flex flex-row w-screen">
        {properties.map((property) => (
          <div className="bg-white border-1 border-gray-200 rounded-2xl h-auto w-100 p-3 mx-5">
            <div className="bg-gray-200 rounded-2xl h-50">
              Place holder image
            </div>
            <div key={property.ID} className="text-left text-gray-800 w-10/12 ">
              <div className="text-sm text-gray-500">
                Recent Views: {property.visit_count ?? "N/A"}
              </div>
              <div className="text-red-300 mt-2">
                {property.type ?? "Independent House"}
              </div>
              <div className="font-semibold my-1">{property.post_title}</div>
              <div>{property.post_address ?? "Address unavailable"}</div>
              <div className="flex flex-row mt-2 font-medium">
                <div className="mr-10">Beds: {property.post_beds ?? "-"}</div>
                <div>Baths: {property.post_baths ?? "-"}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PropertyList;
