import * as types from './ManifestActionType';
import { initialState } from '../../store/initialState';
import reactotron from 'reactotron-react-native';
const manifestReeducer = (state = { initialState }, action) => {
    // reactotron.log("UPDATE_LAT_LONG CHECKKK",action.type,action.payload)
    switch (action.type) {
        case types.PROFILEDATA.SUCCESS:
            return {
                ...state,
                loginLoading: false,
                profileUsers: action.payload,
            }
        case types.MANIFEST.REQUEST: {
            return {
                ...state,
                loading: true,
            }
        }
        case types.MANIFEST.SUCCESS:
            return {
                ...state,
                loading: false,
                ManifestData: action.payload,
            }
        case types.ACCEPTMANIFEST.SUCCESS:
            return {
                ...state,
                loginLoading: false,
                ACCEPTMANIFEST: action.payload,
            }

        case types.DELETEMANIFEST.SUCCESS:
            return {
                ...state,
                loginLoading: false,
                DELETEMANIFEST: action.payload,
            }

        case types.COMPLETEDMANIFEST.SUCCESS:
            return {
                ...state,
                loginLoading: false,
                COMPLETEDDATA: action.payload,
            }
        case types.CANCELMANIFEST.SUCCESS:
            return {
                ...state,
                loginLoading: false,
                DECLINEDATA: action.payload,
            }
        case types.RECENTMANIFESTLISTS.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                recentfetcheddata: action.payload,

            }
        case types.COMPLETEDMANIFESTLISTS.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                compeletedfetcheddata: action.payload,

            }
        case types.CANCELMANIFEST.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                cancelledfetcheddata: action.payload,
            }
        case types.ORDERDETAILS.SUCCESS:
            // reactotron.log("types.ORDERDETAILS.SUCCESS",action.payload)
            return {
                ...state,
                // loginLoading: false,
                orderDetaildata: action.payload,
            }

        case "EMPTY_MANIFEST":
            // reactotron.log("types.ORDERDETAILS.SUCCESS",action.payload)
            return {
                ...state,
                // loginLoading: false,
                etacall: {},
                ManifestData: {}
            }
        case types.ORDERDELETEMANIFEST.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                orderDeletemanifestdata: action.payload,

            }
        case types.COMMENTSGETALL.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                commentsgetall: action.payload,

            }
        case types.COMMENTSPOSTED.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                commentspost: action.payload,

            }
        case types.UPDATEQUANTITY.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                updatequantity: action.payload,

            }
        case types.UPDATEEMPTYQUANTITY.SUCCESS:
            return {
                ...state,
                updateemptyquantity: action.payload,
            }
        case types.ORDEREMPTYLISTITEMS.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                updateemptylistsitems: action.payload,

            }

        case types.NOTIFICATION.SUCCESS:
            return {
                ...state,
                notification: action.payload,

            }
        case types.SWIPESCREENORDERLIST.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                swipescreenOrder: action.payload,
            }
        case types.SWIPESCREENORDERLIST.FAILURE:
            return {
                ...state,
                // loginLoading: false,
                swipescreenOrder: action.payload,

            }

            case types.ETACALL.REQUEST:
            // reactotron.log("reducer141")
            return {
                ...state,
                // loginLoading: false,
                etacall: action.payload,

            }
        case types.ETACALL.SUCCESS:
            // reactotron.log("reducer141")
            return {
                ...state,
                // loginLoading: false,
                etacall: action.payload,

            }
        case types.SWIPERESUMEORDERLIST.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                swiperesumeOrder: action.payload,

            }
        case types.SWIPEPAUSEORDERLIST.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                swipepauseOrder: action.payload,

            }
        case types.SWIPESTOPORDERLIST.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                swipestopOrder: action.payload,

            }

        case types.UPDATESUCESS.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                orderstatus: action.payload,
            }

        case types.GET_PICKUP_TRACK.SUCCESS:
            return {
                ...state,
                pickupData: action.payload,
            }
        case types.GET_PICKUP_TRACK.FAILURE:
            return {
                ...state,
                // loginLoading: false,
                pickupData: [],
            }



        case types.UPDATE_LAT_LONG.SUCCESS:
            return {
                ...state,
                // loginLoading: false,
                adminLatLong: action.payload,
            }

        default:
            return state
    }
}

export default manifestReeducer