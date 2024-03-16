import { InitialAttractionDestiantions, InitialCountries, InitialCurrencies, InitialHotelDestinations } from '@/types/generaltypes';
import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    countries: InitialCountries[];
    attractionDestinations: InitialAttractionDestiantions[];
    currencies: InitialCurrencies[];
  hotelDestinations: InitialHotelDestinations[];
}

const initialState = {
  countries: [],
  attractionDestinations: [],
  currencies: [],
  hotelDestinations: []
} as InitialState;

// Define slice
export const initialSlice = createSlice({
  name: 'InitialData',
  initialState:initialState,
  reducers: {
    setInitialData: (state, action) => {
        state.countries = action.payload.countries;
        state.attractionDestinations = action.payload.destinations;
        state.currencies = action.payload.currencies;
        state.hotelDestinations = action.payload.popularHotelCities;
    }
  },
});

// Export actions
export const { setInitialData} = initialSlice.actions;

// Export reducer
export default initialSlice.reducer;