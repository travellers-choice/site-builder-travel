import { SearchByDestination } from "@/types/attractions";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    Destination: "";
    // activities: ActivityExcursion[];
    // cart: ActivityExcursion[];
    favourites: SearchByDestination[];
  };

  const favItems = typeof window !== "undefined" && localStorage.getItem("favourites");
  const initialState = {
    Destination: "",
    activities: [],
    favourites: favItems ? JSON.parse(favItems) : [],
  } as InitialState;

  export const attraction = createSlice({
    name: "attraction",
    initialState: initialState,
    reducers: {

        handleSetFavourites: (state, action) => {
            var array = [];
            let localstrg = localStorage.getItem("favourites");
            if (localstrg) {
              array = JSON.parse(localstrg);
            }
            const isItemExist = array.find(
              (item:  SearchByDestination) =>
                item._id === action.payload._id
            );
            if (isItemExist) {
              const result = array.filter(
                (item:  SearchByDestination) =>
                  item._id !== action.payload._id
              );
              array = result;
              state.favourites = array;
              localStorage.setItem("favourites", JSON.stringify(array));
            } else {
              array = [action.payload, ...array];
              state.favourites = array;
              localStorage.setItem("favourites", JSON.stringify(array));
            }
          },
        },
      });

      export const {
        
        handleSetFavourites,
       
      } = attraction.actions;
      export default attraction.reducer;