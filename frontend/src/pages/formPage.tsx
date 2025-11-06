import { useState } from "react";
import { postProperty } from "../utils/apiCalls";
const FormPage = () => {
  // 🏠 Basic Property Info
  const property_info = [
    { label: "Title", name: "_property_title" },
    { label: "Type", name: "_property_type" },
    { label: "Description", name: "_property_description" },
  ];

  // 📋 Additional Row 1
  const additional_row_one = [
    { label: "Property ID", name: "_property_property_id" },
    { label: "Status", name: "_property_status" },
    { label: "Label", name: "_property_post_type" },
  ];

  // 🛏️ Additional Row 2
  const additional_row_two = [
    { label: "Rooms", name: "_property_rooms" },
    { label: "Beds", name: "_property_beds" },
    { label: "Baths", name: "_property_baths" },
    { label: "Parking", name: "_property_garages" },
    { label: "Year built", name: "_edit_last" }, // if you use a proper year field later, adjust
    { label: "Home area (sqft)", name: "_property_price" }, // or change to correct one if needed
    { label: "Floor", name: "_views_by_date" }, // placeholder, update to your schema
  ];

  // 📍 Location Info
  const location_row = [
    { label: "Suburb", name: "_property_location" },
    { label: "Address", name: "_property_address" },
  ];

  // 🖼️ Media Row
  const media_row = [
    { label: "Featured Image", name: "_property_featured_image_img" },
    { label: "Gallery", name: "_property_gallery_img" },
    { label: "Attachments", name: "_property_attachments_img" },
  ];

  // 🌿 Amenities (you may store these as checkboxes later)
  const amenities_row = [
    { label: "Air Conditioning", name: "air_conditioning" },
    { label: "Barbeque", name: "barbeque" },
    { label: "Balcony", name: "balcony" },
    { label: "Dryer", name: "dryer" },
    { label: "Laundry", name: "laundry" },
    { label: "Lawn", name: "lawn" },
    { label: "Gym", name: "gym" },
    { label: "Outdoor Shower", name: "outdoor_shower" },
    { label: "Microwave", name: "microwave" },
    { label: "Parking", name: "amenity_parking" },
    { label: "Refrigerator", name: "refrigerator" },
    { label: "Swimming Pool", name: "swimming_pool" },
    { label: "Sauna", name: "sauna" },
    { label: "Pet-friendly", name: "pet_friendly" },
    { label: "TV-cable", name: "tv_cable" },
    { label: "Wi-Fi", name: "wifi" },
    { label: "Window Coverings", name: "window_coverings" },
    { label: "Washer", name: "washer" },
  ];

  //State managment
  const [selectAll, setSelectAll] = useState(false);
  const [formData, setFormData] = useState({
    _property_title: "",
    _property_type: "",
    _property_description: "",
    _property_property_id: "",
    _property_status: "",
    _property_rooms: "",
    _property_beds: "",
    _property_baths: "",
    _property_garages: "",
    _property_price: "",
    _property_location: "",
    _property_address: "",
    _property_map_location: "",
    _property_featured_image_img: "",
    _property_gallery_img: "",
    _property_attachments_img: "",
    _property_post_type: "",
    _thumbnail_id: "",
    _edit_last: "",
    _property_expiry_date: "",
    rs_page_bg_color: "",
    _edit_lock: "",
    _views_by_date: "",
    _recently_viewed: "",
    _property_views: "",
    _property_views_count: "",
  });

  //Functions

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Form Submitted");
    e.preventDefault();
    const result = await postProperty(formData);
    console.log("Response:", result);
    alert(result.message);
  };

  return (
    <>
      <div className="text-black text-left">
        <form onSubmit={handleSubmit}>
          <h2>Add New Property</h2>
          <div className="sub-box">
            <h3>Basic Information</h3>
            <div className="additional-input-binder">
              <label htmlFor="propertyTitle">Property Title</label>
              <input
                type="text"
                name="_property_title"
                id="propertyTitle"
                className="input-form"
                onChange={handleChange}
              />
            </div>
            <div className="additional-input-binder">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                name="_property_type"
                id="type"
                className="input-form"
                onChange={handleChange}
              />
            </div>
            <div className="additional-input-binder">
              <label htmlFor="property-description">Property Description</label>
              <input
                type="text"
                name="_property_description"
                id="property-description"
                className="input-form !h-40"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sub-box">
            <h3>Additional</h3>
            <div className="grid grid-cols-3">
              {additional_row_one.map((information, index) => (
                <>
                  <div key={index} className="additional-input-binder">
                    <label htmlFor={index.toString()}>
                      {information.label}
                    </label>
                    <input
                      type="text"
                      name={information.name}
                      id={index.toString()}
                      className="input-form"
                      onChange={handleChange}
                    />
                  </div>
                </>
              ))}
              {additional_row_two.map((information, index) => (
                <>
                  <div key={index} className="additional-input-binder">
                    <label htmlFor={index.toString()}>
                      {information.label}
                    </label>
                    <input
                      type="number"
                      name={information.name}
                      id={index.toString()}
                      className="input-form"
                      onChange={handleChange}
                    />
                  </div>
                </>
              ))}
            </div>
            <div></div>
          </div>
          <div className="sub-box">
            <h3>Price</h3>
            <div className="grid grid-cols-2">
              <div className="additional-input-binder">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="input-form"
                  id="price"
                  placeholder="eg 1000"
                  onChange={handleChange}
                />
              </div>
              <div className="additional-input-binder">
                <label htmlFor="price-prefix">Price Prefix</label>
                <input
                  type="text"
                  className="input-form"
                  id="price-prefix"
                  onChange={handleChange}
                />
                <label htmlFor="price-prefix" className="sub-text">
                  Any text shown before price (for example: from).
                </label>
              </div>
              <div className="additional-input-binder">
                <label htmlFor="price-suffix">Price Suffix</label>
                <input
                  type="text"
                  className="input-form"
                  id="price-suffix"
                  onChange={handleChange}
                />
                <label htmlFor="price-suffix" className="sub-text">
                  Any text shown after price (for example: per night)
                </label>
              </div>
              <div className="additional-input-binder">
                <label htmlFor="price-custom">Price Custom</label>
                <input
                  type="text"
                  className="input-form"
                  id="price-custom"
                  onChange={handleChange}
                />
                <label htmlFor="price-custom" className="sub-text">
                  Any text instead of price (for example: by agreement). Prefix
                  and Suffix will be ignored.{" "}
                </label>
              </div>
            </div>
          </div>
          <div className="sub-box">
            <h3>Location</h3>
            {location_row.map((information, index) => (
              <>
                <div className="additional-input-binder">
                  <label htmlFor={index.toString()}>{information.label}</label>
                  <input
                    type="text"
                    id={index.toString()}
                    name={information.name}
                    className="input-form"
                    onChange={handleChange}
                  />
                </div>
              </>
            ))}
            <div className="additional-input-binder">
              <label htmlFor="map-location">Map Location</label>
            </div>
            <input
              type="text"
              className="input-form"
              placeholder="Enter search e.g Lincoln Park"
              onChange={handleChange}
            />
            <div className="w-auto h-100 my-4 rounded-xl p-3 bg-gray-300">
              This is temp map
            </div>
            <div className="grid grid-cols-2 w-1/2">
              <input
                type="number"
                className="input-form !mr-4"
                id="latitude"
                placeholder="Latitude"
                onChange={handleChange}
              />
              <input
                type="number"
                className="input-form"
                id="latitude"
                placeholder="Longitude "
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sub-box">
            <h3 className="mb-3">Media</h3>
            {media_row.map((information, index) => (
              <>
                <div className="flex flex-col mt-2">
                  <label htmlFor={index.toString()}>{information.label}</label>
                  <button className="upload-btn">Upload File</button>
                </div>
              </>
            ))}
            <div className="additional-input-binder">
              <label htmlFor="video-link">Video Link</label>
              <input
                type="text"
                className="input-form"
                id="video-link"
                onChange={handleChange}
              />
              <label htmlFor="video-link" className="sub-text">
                Enter Youtube or Viemo url
              </label>
            </div>
          </div>
          <div className="sub-box">
            <h3>Amenities</h3>
            <button
              className="text-btn"
              onClick={() => setSelectAll(!selectAll)}
            >
              Select / Deselect All
            </button>
            <div className="grid grid-cols-2">
              {amenities_row.map((information, index) => (
                <>
                  <div className="flex flex-row">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      id={index.toString()}
                      className="input-checkbox"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor={index.toString()}
                      className="label-checkbox"
                    >
                      {information.label}
                    </label>
                  </div>
                </>
              ))}
            </div>
          </div>
          <hr />
          <button className="submit-btn mt-5" type="submit">
            Save & Preview
          </button>
        </form>
      </div>
    </>
  );
};

export default FormPage;
