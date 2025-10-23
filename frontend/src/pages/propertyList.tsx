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
      <div className="bg-white border-1 border-gray-200 rounded-2xl h-auto w-100 p-3">
        <div className="bg-gray-200 rounded-2xl h-50"></div>
        <div className="text-left text-gray-800 w-10/12">
          <div>Views</div>
          <div className="text-red-300 mt-2">Independent House</div>
          <div className="font-semibold my-1">Godrej Society</div>
          <div className="">
            R.A. Kidwai Marg, Azad Nagar, Wadala, Mumbai, Maharashtra India
          </div>
          <div className="flex flex-row mt-2 font-medium">
            <div className="mr-10">Beds: 2</div>
            <div>Baths: 4</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyList;
