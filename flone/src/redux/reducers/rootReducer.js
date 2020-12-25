import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import auth from "./auth";
import profile from "./profile";
import blog from "./blog";
import play from "./play";
import review from "./review";
import clothes from "./clothes";
import users from "./users";
import livraison from "./livraison";
import proposition from "./proposition";
const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  auth,
  profile,
  blog,
  play,
  review,
  clothes,
  users,
  livraison,
  proposition,
});

export default rootReducer;
