import tz_lookup from "tz-lookup";
import {
  setAddBtn,
  setLocation,
  setSearchPanelOpen,
  setTimezone,
} from "../store/main";
import { fetchBoundry, setAddLocationData } from "../store/clock";

export const useSelectedItembyClick = (place, dispatch) => {
  const details = {
    name: place?.name,
    country: place?.address?.country,
    country_code: place?.address?.country_code.toUpperCase(),
    address: place?.display_name,
    lat: place?.lat,
    lng: place?.lon,
    osm_id: place?.osm_id,
    osm_type: place?.osm_type,
  };

  const timezone = tz_lookup(details?.lat, details?.lng);

  const fullLocationData = {
    ...details,
    timezone,
  };

  dispatch(setAddBtn(true));
  dispatch(setSearchPanelOpen(false));
  dispatch(setLocation(details));
  dispatch(setTimezone(timezone));
  dispatch(setAddLocationData(fullLocationData));
  dispatch(fetchBoundry(details?.osm_id, details?.osm_type));
};
