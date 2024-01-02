import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../state/counterSlice';
import userReducer from '../user/userSlice';
import profileSlice from '../profile/profileSlice';
import userRoleSlice from '../user/userRoleSlice';
import userProgramSlice from '../user/userProgramSlice';
import weeklyduchSlice from '../weeklyduch/weeklyduchSlice';
import submissionSlice from '../weeklyduch/submissionSlice'; 

// import rootReducer from './reducers'

// const store = configureStore({ reducer: rootReducer })

export default configureStore({

    reducer:{
        counter:counterReducer,
        users:userReducer,
        profile:profileSlice,
        userPrograms:userProgramSlice,
        userRoles:userRoleSlice,
        weeklyduchs:weeklyduchSlice,
        submissions:submissionSlice, 
    }

})