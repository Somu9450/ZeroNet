import { useEffect, useRef } from "react";

export default function LocationAutocomplete({
  placeholder = "Enter location",
  onSelect,
  className = "",
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    let autocomplete;

    const initAutocomplete = () => {
      if (
        !window.google ||
        !window.google.maps ||
        !window.google.maps.places
      ) {
        // retry after short delay if script not loaded yet
        setTimeout(initAutocomplete, 500);
        return;
      }

      autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["(cities)"], // cities only
          componentRestrictions: { country: "in" }, // India only
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place || !place.address_components) return;

        let city = "";
        let state = "";

        place.address_components.forEach((comp) => {
          if (comp.types.includes("locality")) {
            city = comp.long_name;
          }
          if (comp.types.includes("administrative_area_level_1")) {
            state = comp.long_name;
          }
        });

        const lat = place.geometry?.location?.lat();
        const lng = place.geometry?.location?.lng();

        onSelect?.({
          fullAddress: place.formatted_address,
          city,
          state,
          lat,
          lng,
        });
      });
    };

    initAutocomplete();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className={className}
    />
  );
}