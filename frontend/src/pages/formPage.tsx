const FormPage = () => {
  const additional_row_one: string[] = ["Property ID", "Status", "Label"];
  const additional_row_two: string[] = [
    "Rooms",
    "Beds",
    "Baths",
    "Parking",
    "Year built",
    "Home area(sqft)",
    "Floor",
  ];
  const location_row: string[] = ["Suburb", "Address"];
  const media_row: string[] = ["Featured Image", "Gallery", "Attachments"];
  const amenities_row: string[] = [
    "Air Condtioning",
    "Barbeque",
    "Balcony",
    "Dryer",
    "Laundry",
    "Lawn",
    "Gym",
    "Outdoor Shower",
    "Microwave",
    "Parking",
    "Refrigerator",
    "Swimming Pool",
    "Sauna",
    "Pet-friendly",
    "TV-cable",
    "Wi-Fi",
    "Window Coverings",
    "Washer",
  ];
  return (
    <>
      <div className="text-black text-left">
        <h2>Add New Property</h2>
        <div className="sub-box">
          <h3>Basic Information</h3>
          <div className="additional-input-binder">
            <label htmlFor="propertyTitle">Property Title</label>
            <input type="text" id="propertyTitle" className="input-form" />
          </div>
          <div className="additional-input-binder">
            <label htmlFor="type">Type</label>
            <input type="text" id="type" className="input-form" />
          </div>
          <div className="additional-input-binder">
            <label htmlFor="property-description">Property Description</label>
            <input
              type="text"
              id="property-description"
              className="input-form !h-40"
            />
          </div>
        </div>
        <div className="sub-box">
          <h3>Additional</h3>
          <div className="grid grid-cols-3">
            {additional_row_one.map((information, index) => (
              <>
                <div key={index} className="additional-input-binder">
                  <label htmlFor={index.toString()}>{information}</label>
                  <input
                    type="text"
                    id={index.toString()}
                    className="input-form"
                  />
                </div>
              </>
            ))}
            {additional_row_two.map((information, index) => (
              <>
                <div key={index} className="additional-input-binder">
                  <label htmlFor={index.toString()}>{information}</label>
                  <input
                    type="number"
                    id={index.toString()}
                    className="input-form"
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
              />
            </div>
            <div className="additional-input-binder">
              <label htmlFor="price-prefix">Price Prefix</label>
              <input type="text" className="input-form" id="price-prefix" />
              <label htmlFor="price-prefix" className="sub-text">
                Any text shown before price (for example: from).
              </label>
            </div>
            <div className="additional-input-binder">
              <label htmlFor="price-suffix">Price Suffix</label>
              <input type="text" className="input-form" id="price-suffix" />
              <label htmlFor="price-suffix" className="sub-text">
                Any text shown after price (for example: per night)
              </label>
            </div>
            <div className="additional-input-binder">
              <label htmlFor="price-custom">Price Custom</label>
              <input type="text" className="input-form" id="price-custom" />
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
                <label htmlFor={index.toString()}>{information}</label>
                <input
                  type="text"
                  id={index.toString()}
                  className="input-form"
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
            />
            <input
              type="number"
              className="input-form"
              id="latitude"
              placeholder="Longitude "
            />
          </div>
        </div>
        <div className="sub-box">
          <h3 className="mb-3">Media</h3>
          {media_row.map((information, index) => (
            <>
              <div className="flex flex-col mt-2">
                <label htmlFor={index.toString()}>{information}</label>
                <button className="upload-btn">Upload File</button>
              </div>
            </>
          ))}
          <div className="additional-input-binder">
            <label htmlFor="video-link">Video Link</label>
            <input type="text" className="input-form" id="video-link" />
            <label htmlFor="video-link" className="sub-text">
              Enter Youtube or Viemo url
            </label>
          </div>
        </div>
        <div className="sub-box">
          <h3>Amenities</h3>
          <button className="text-btn">Select / Deselect All</button>
          <div className="grid grid-cols-2">
            {amenities_row.map((information, index) => (
              <>
                <div className="flex flex-row">
                  <input
                    type="checkbox"
                    id={index.toString()}
                    className="input-checkbox"
                  />
                  <label htmlFor={index.toString()} className="label-checkbox">
                    {information}
                  </label>
                </div>
              </>
            ))}
          </div>
        </div>
        <hr />
        <button className="submit-btn mt-5">Save & Preview</button>
      </div>
    </>
  );
};

export default FormPage;
