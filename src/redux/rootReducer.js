import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import UIReducer from './UI/reducer';
// import dataReducer from './data/reducer';
import departmentsReducer from './departments/reducer';
import supervisorsReducer from './supervisors/reducer';
import agentsReducer from './agents/reducer';
import territoriesReducer from './territories/reducer';
import customersReducer from './customers/reducer';
import productCategoriesReducer from './product_categories/reducer';
import productsReducer from './products/reducer';
import schedulesReducer from './schedules/reducer';
import tasksReducer from './tasks/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    UI: UIReducer,
    // data: dataReducer,
    departmentsData: departmentsReducer,
    supervisorsData: supervisorsReducer,
    agentsData: agentsReducer,
    territoriesData: territoriesReducer,
    customersData: customersReducer,
    productCategoriesData: productCategoriesReducer,
    productsData: productsReducer,
    schedulesData: schedulesReducer,
    tasksData: tasksReducer,
});

export default rootReducer;