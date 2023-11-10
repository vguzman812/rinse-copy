import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const initialState = {
  origin: {
    id: "",
    formattedAddress: "",
    location: {
      latitude: 0,
      longitude: 0,
    },
  },
  destination: null,
  travelTimeInformation: null, // time it takes to get from origin to destination
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    // Pretty self explanatory.
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

// Create an API slice for async requests
const asyncNavSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTravelTimeInformation: builder.query({
      query: ({ origin, destination, travelMode }) => ({
        url: `/api/directions`,
        method: "POST",
        body: { origin, destination, travelMode },
      }),
    }),
    getPlaceDetails: builder.query({
      query: (id) => ({
        url: `https://places.googleapis.com/v1/places/${id}?fields=id,formattedAddress,location&key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }`,
        method: "GET",
      }),
    }),
  }),
});

// Exporting the actions generated by createSlice for use in components
export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

  // Exporting the actions generated by createSlice for use in components
export const { useGetTravelTimeInformationQuery, useLazyGetPlaceDetailsQuery } =
  asyncNavSlice;

// Export the reducer to be included in the Redux store
export default navSlice.reducer;