import { combineReducers } from 'redux'
import sessionReducer from '../services/session/sessionReducer'
import manifestReeducer from '../services/Manifestsession/ManifestReducer'
// import loading from ''


export default combineReducers({
    session: sessionReducer,
    Manifest: manifestReeducer,
    // loginLoading: loading
  })
  