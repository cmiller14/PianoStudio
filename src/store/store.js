import { configureStore } from '@reduxjs/toolkit'
import { applicationReducer } from './application_slice'
import { configReducer } from './config_slice'

export default configureStore({
  reducer: {
    application: applicationReducer,
    config: configReducer,
  },
})

