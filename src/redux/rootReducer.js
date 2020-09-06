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
import regionsReducer from './regions/reducer';
import areasReducer from './areas/reducer';
import townsReducer from './towns/reducer';
import visitReportsReducer from './visit_reports/reducer';
import checkInSummaryReportsReducer from './check_in_summary_reports/reducer';
import checkInReportsReducer from './check_in_reports/reducer';
import taskReportsReducer from './task_reports/reducer';
import actionReportsReducer from './action_reports/reducer';


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
    areasData: areasReducer,
    regionsData: regionsReducer,
    townsData: townsReducer,
    visitReportsData: visitReportsReducer,
    checkInSummaryReportsData: checkInSummaryReportsReducer,
    checkInReportsData: checkInReportsReducer,
    taskReportsData: taskReportsReducer,
    actionReportsData: actionReportsReducer,
});

export default rootReducer;