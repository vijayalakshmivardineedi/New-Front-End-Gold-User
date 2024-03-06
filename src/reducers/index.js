
import {combineReducers} from 'redux';
import categoryReducers from './category.reducer'
import authReducers from './auth.reducers';
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';
import productReducer from './product.reducer';
const rootReducer=combineReducers({
    
    category:categoryReducers,
    auth:authReducers,
    cart:cartReducer,
    user:userReducer,
    product:productReducer


    
});
export default rootReducer;

