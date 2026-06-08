import axios, { post } from 'axios'
import * as types from './ManifestActionType';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/routers';
import { useNavigation } from '@react-navigation/native';
import { encryptUsingAES256, baseURL } from '../../Common/Utils';
import reactotron from 'reactotron-react-native';
import { Platform } from 'react-native';

export const Updatestatus = (statusId, tenantId, orderId) => async (dispatch) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');

    const authDatas = JSON.parse(authDataString)
    try {
        const status = 4;
        const requestData = { tenantId: tenantId, orderId: orderId, statusId: statusId };
        const response = await axios.put(`${baseURL}orders/updateStatus`,
            requestData, { headers: { Authorization: `Bearer ${authDatas.data.token}` } });
        if (response && response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch({ type: types.UPDATESUCESS.SUCCESS, payload: response.data });

        } else {
            // Toast.show('Status Update Unsuccessfully !!!');
        }
        return response;
    } catch (error) {
        console.log("error response data", error.response.data);
        console.log("error response status", error.response.status);
        // Toast.show('Error & Status Update Unsuccessfully!!' + error);
    }
};

export const UpdateQuantity = (data) => async (dispatch, getState) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    try {
        dispatch({ type: types.UPDATEQUANTITY.SUCCESS, payload: data });
    } catch (error) {
        console.log("Error & profileData Fetched Un Successfully!!", error);
    }
};
export const profileData = (roleID) => async (dispatch, getState) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    try {
        if (!authDataString) {
            return;
        }
        let url = ''
        if (roleID === 2) {
            url = `${baseURL}tenants/${authDatas.data.loginUserId}`
        }
        else if (roleID === 3) {
            url = `${baseURL}drivers/${authDatas.data.loginUserId}`
        }
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${authDatas.data.token}` }
        });
        if (response.status === 200) {
            const [fetchUsers] = response.data.data;
            dispatch({ type: types.PROFILEDATA.SUCCESS, payload: fetchUsers });
        }

        return response;
    } catch (error) {
        console.log("Error & profileData Fetched Un Successfully!!", error);
    }
};
////////////////////////
export const UpdateAll = (updateData) => async (dispatch, getState) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)

    try {
        const response = await axios.put(`${baseURL}orders`, updateData, {
            headers: {
                Authorization: `Bearer ${authDatas.data.token}`,
                // 'pageNo': page,
                // 'pageSize': pageSize,
                // "status": "current"
            },
        },);
        if (response.status === 200) {
            const fetchUsers = response.data.data;
            Toast.show('Order detail screen updated');
            dispatch(orderdetails(updateData.orderId))
        }
        return response;
    } catch (error) {
        console.log("error77", error);
        Toast.show('Error while Updating!');
    }
};

export const orderemptyItems = (orderId, page, pageSize) => async (dispatch, getState) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)

    try {
        const response = await axios.get(`${baseURL}OrderItemsTypes?isAll=true`, {
            headers: {
                Authorization: `Bearer ${authDatas.data.token}`,
                // 'pageNo': page,
                // 'pageSize': pageSize,
                // "status": "current"
            },
        });
        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch({ type: types.ORDEREMPTYLISTITEMS.SUCCESS, payload: response.data });
        }
        return response;
    } catch (error) {
        console.log("error77", error);
    }
};
/////////////////////
export const orderdetails = (orderId, page, pageSize) => async (dispatch, getState) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)

    try {
        const response = await axios.get(`${baseURL}orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${authDatas.data.token}`,
                // 'pageNo': page,
                // 'pageSize': pageSize,
                // "status": "current"
            },
        });
        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch({ type: types.ORDERDETAILS.SUCCESS, payload: response.data });
        }
        return response;
    } catch (error) {
        console.log("error77", error);
        dispatch({ type: types.ORDERDETAILS.SUCCESS, payload: {} });
    }
};
export const recentManifests = (data, pageSize) => async (dispatch, getState) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    const maniFestId = data
    try {
        const response = await axios.get(`${baseURL}orders/manifestid/${maniFestId}`, {
            // params: {
            //     "status":"current"
            // },
            headers: {
                Authorization: `Bearer ${authDatas.data.token}`
            },
        });
        if (response.status === 200) {
            const fetchUsers = response.data.data;

            dispatch({ type: types.RECENTMANIFESTLISTS.SUCCESS, payload: response.data });

        }
        return response;
    } catch (error) {
        console.log("error77", error);
    }
};

export const completedManifestsLists = (data, pageSize) => async (dispatch, getState) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    const maniFestId = data
    try {
        const response = await axios.get(`${baseURL}orders/manifestid/${maniFestId}`, {
            // params: {
            //     "status": "completed"
            // },
            headers: {
                Authorization: `Bearer ${authDatas.data.token}`,
                // 'pageNo': page,
                'pageSize': pageSize,
            },
        });
        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch({ type: types.COMPLETEDMANIFESTLISTS.SUCCESS, payload: response.data });
        }
        return response;
    } catch (error) {
        console.log("error77", error);
    }
};
export const cancelledmanifestslists = (data, pageSize) => async (dispatch, getState) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    const maniFestId = data
    try {
        const response = await axios.get(`${baseURL}orders/manifestid/${maniFestId}`, {
            params: {
                "status": "current"
            },
            headers: {
                Authorization: `Bearer ${authDatas.data.token}`
            },
        });
        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch({ type: types.CANCELMANIFESTLISTS.SUCCESS, payload: response.data });
        }

        return response;
    } catch (error) {
        console.log("error77", error);
    }
};

export const Manifests = (page, pageSize) => async (dispatch, getState) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString);
    dispatch({ type: types.MANIFEST.REQUEST, });
    try {
        const response = await axios.get(`${baseURL}manifests/status`, {
            headers: {
                Authorization: `Bearer ${authDatas.data.token}`,
                'pageNo': 1,
                'pageSize': 1000,
                "status": "current"
            },
        });
        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch({ type: types.MANIFEST.SUCCESS, payload: response.data });
        }
        return response;
    } catch (error) {
        console.log("error77", error);
    }
};


export const completedManifests = (page, pageSize) => async (dispatch, getState) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)

    try {
        const response = await axios.get(`${baseURL}manifests/status`, {
            headers: {
                Authorization: `Bearer ${authDatas.data.token}`,
                "status": "completed",
                'pageNo': 1,
                'pageSize': 1000,
            },

        });

        if (response.status === 200) {
            const fetchedManifests = response.data.data;
            dispatch({ type: types.COMPLETEDMANIFEST.SUCCESS, payload: fetchedManifests });
        }

        return response;
    } catch (error) {
        console.log("error", error);
    }
};


export const cancelManifest = (page, pageSize) => async (dispatch, getState) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)

    try {
        const response = await axios.get(`${baseURL}cancelledmanifests/driver`, {
            // params: {
            //     "status": "cancelled"
            // },
            headers: {
                Authorization: `Bearer ${authDatas.data.token}`,
                // "status": "cancelled",
                'pageNo': 1,
                'pageSize': 1000,
            },
        });
        if (response.status === 200) {
            const fetchedManifests = response.data.data;
            dispatch({ type: types.CANCELMANIFEST.SUCCESS, payload: fetchedManifests });
        }

        return response;
    } catch (error) {
        console.log("error", error);
    }
};


export const ManifestsAcceptStatus = (maniFestId, setHandle = () => { }) => async (dispatch) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    try {
        const status = 4;
        const requestData = {
            manifestId: maniFestId,
            statusId: status,
            reason: "Good arrival"
        };

        const response = await axios.put(
            `${baseURL}manifests/status`,
            requestData,
            { headers: { Authorization: `Bearer ${authDatas.data.token}` } }
        );
        if (response && response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch({ type: types.ACCEPTMANIFEST.SUCCESS, payload: response.data });
            setHandle(true);
            dispatch(notification());
            dispatch(Manifests(10, 1));
        } else {
            // Toast.show('Request sent but AcceptStatus Fetching Unsuccessful');
        }

        return response;
    } catch (error) {
        console.log("error", error);
    }
};

export const commentspost = (orderID, value) => async (dispatch) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    try {
        const statusId = 3
        const response = await axios.post(
            `${baseURL}Comments`,
            {
                "orderId": orderID,
                "comment": value
            },
            {
                headers: {
                    Authorization: `Bearer ${authDatas.data.token}`,
                }
            }
        );

        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch(Commentsgetall(orderID))
            dispatch({ type: types.COMMENTSPOSTED.SUCCESS, payload: response.data });
        }

        return response;
    } catch (error) {
        console.log("error", error);
    }
};

export const Commentsgetall = (orderId, page, pageSize) => async (dispatch) => {
    const pageSize = 100
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    try {
        const statusId = 3
        const response = await axios.get(
            `${baseURL}Comments`,
            {
                headers: {
                    Authorization: `Bearer ${authDatas.data.token}`,
                    "orderId": orderId,
                    "pageSize": pageSize
                }
            }
        );

        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch({ type: types.COMMENTSGETALL.SUCCESS, payload: response.data });
        }

        return response;
    } catch (error) {
        console.log("error", error);
        // Toast.show('Comments Failure :(');
    }
};



export const OrderdetailDeclineStatus = (tenantId, orderID, reason, details, navigation, orderStatus, params) => async (dispatch) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    try {
        const statusId = 3
        const response = await axios.put(
            `${baseURL}orders/updateStatus`,
            {
                "tenantId": tenantId,
                "orderId": orderID,
                "statusId": statusId,
                "reason": reason
            },
            {
                headers: {
                    Authorization: `Bearer ${authDatas.data.token}`
                }
            }
        );

        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch(recentManifests(details))
            dispatch({ type: types.ORDERDELETEMANIFEST.SUCCESS, payload: response.data });
            navigation.navigate("deliverylists", {
                manifestId: details,
                orderStatus: orderStatus,
                name: params?.manifestCode,
                vehicleRegistrationNumber: params?.vehicleRegistrationNumber

            });
        }

        return response;
    } catch (error) {
        console.log("error", error);
    }
};

export const adminTrackingCall = (manifestID, reason, navigation) =>
    async (dispatch) => {
        const authDataString = await AsyncStorage.getItem('userLoggedData');
        const authDatas = JSON.parse(authDataString)

        try {
            const statusId = 3
            const response = await axios.get(
                `${baseURL}TrackLocation?manifestid=${manifestID}`,
                // {
                //     "manifestid": manifestID,
                //     "orderId": orderID,
                //     "statusId": statusId,
                // },

                {
                    headers: {
                        Authorization: `Bearer ${authDatas.data.token}`
                    }
                }
            );
            if (response.status === 200) {
                const fetchUsers = response.data.data;
                dispatch({ type: types.UPDATE_LAT_LONG.SUCCESS, payload: fetchUsers });
            } return response;
        } catch (error) {
            console.log("error", error);
        }
    };

export const trackingCall = (datas, reason, navigation) =>
    async (dispatch) => {
        const authDataString = await AsyncStorage.getItem('userLoggedData');
        const authDatas = JSON.parse(authDataString)

        try {
            const statusId = 3
            const response = await axios.post(
                `${baseURL}TrackLocation`,
                {
                    ...datas
                },
                {
                    headers: {
                        Authorization: `Bearer ${authDatas.data.token}`
                    }
                }
            );
            if (response.status === 200) {
                const fetchUsers = response.data.data;
            } return response;
        } catch (error) {
            console.log("error", error);
        }
    };
export const etaCall = (tenantId, reason, navigation) =>
    async (dispatch) => {
        const authDataString = await AsyncStorage.getItem('userLoggedData');
        const authDatas = JSON.parse(authDataString)
        dispatch({ type: types.ETACALL.REQUEST, payload: {} });

        try {
            const statusId = 3
            const response = await axios.get(
                `${baseURL}tenants/settings`,
                {
                    headers: {
                        Authorization: `Bearer ${authDatas.data.token}`
                    }
                }
            );
            if (response.status === 200) {
                const fetchUsers = response.data.data;
                dispatch({ type: types.ETACALL.SUCCESS, payload: response.data });
            } return response;
        } catch (error) {
            console.log("error", error);
        }
    };
export const ManifestsDeclineStatus = (maniFestId, reason, navigation) => async (dispatch) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    try {

        const statusId = 3
        const response = await axios.put(
            `${baseURL}manifests/status`,
            {
                "manifestId": maniFestId,
                "statusId": statusId,
                "reason": reason
            },
            {
                headers: {
                    Authorization: `Bearer ${authDatas.data.token}`
                }
            }
        );

        if (response.status === 200) {
            const fetchUsers = response.data.data;

            dispatch(Manifests(10, 1));
            dispatch({ type: types.DELETEMANIFEST.SUCCESS, payload: response.data });
            dispatch(notification());
            navigation.navigate("manifest");

        }

        return response;
    } catch (error) {
        console.log("error", error);
    }
};




export const ordetailTimeUpdate = (maniFestId,) => async (dispatch) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    try {
        const authDataString = await AsyncStorage.getItem('userLoggedData');
        const authDatas = JSON.parse(authDataString)

        const response = await axios.get(
            `${baseURL}driverstimelog`,
            {
                headers: {
                    // "manifestId": maniFestId,
                    Authorization: `Bearer ${authDatas.data.token}`,
                }
            }
        );
        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch({ type: types.SWIPESCREENORDERLIST.SUCCESS, payload: response.data });
        }

        return response;
    } catch (error) {
        console.log("error response data", error.response.data);
        console.log("error response status", error.response.status);
        dispatch({ type: types.SWIPESCREENORDERLIST.FAILURE, payload: error });
    }
};

export const ordetailswipeScreen = (formattedDate, maniFestId,) => async (dispatch, getState) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    try {
        const authDataString = await AsyncStorage.getItem('userLoggedData');
        const authDatas = JSON.parse(authDataString)

        const response = await axios.post(
            `${baseURL}driverstimelog`,
            {
                "manifestId": maniFestId,
                "startTime": formattedDate,
                "breakStartTime": null,
                "breakEndTime": null,
                "endTime": null,
                "direction": true,
                "isStart": true,
                "deviceType": Platform.OS
            },
            {
                headers: {
                    Authorization: `Bearer ${authDatas.data.token}`,
                }
            }
        );
        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch(ordetailTimeUpdate(maniFestId))
            dispatch(Manifests())
            dispatch(etaCall());
        }

        return response;
    } catch (error) {
        console.log("error response data", error.response.data);
        console.log("error response status", error.response.status);
    }
};








export const ordetailswipeResume = (formattedDate, breaktime, starttime, maniFestId) => async (dispatch) => {

    try {
        const authDataString = await AsyncStorage.getItem('userLoggedData');
        const authDatas = JSON.parse(authDataString)

        const response = await axios.post(
            `${baseURL}driverstimelog`,
            {
                "manifestId": maniFestId,
                "startTime": starttime,
                "breakStartTime": breaktime,
                "breakEndTime": formattedDate,
                "endTime": null,
                "direction": true,
                "deviceType": Platform.OS
            },
            {
                headers: {

                    Authorization: `Bearer ${authDatas.data.token}`,
                }
            }
        );
        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch(ordetailTimeUpdate(maniFestId))
        }
        return response;
    } catch (error) {
        console.log("error", error);
    }
};


export const ordetaiswipelPause = (formattedDate, starttime, maniFestId) => async (dispatch) => {
    try {
        const authDataString = await AsyncStorage.getItem('userLoggedData');
        const authDatas = JSON.parse(authDataString)

        const response = await axios.post(
            `${baseURL}driverstimelog`,
            {
                "manifestId": maniFestId,
                "startTime": starttime,
                "breakStartTime": formattedDate,
                "breakEndTime": null,
                "endTime": null,
                "direction": true,
                "deviceType": Platform.OS

            },
            {
                headers: {

                    Authorization: `Bearer ${authDatas.data.token}`,
                }
            }
        );
        if (response.status === 200) {
            const fetchUsers = response.data.data;
            // Toast.show('Pause Screen Fetched Successfully!!');
            dispatch(ordetailTimeUpdate(maniFestId))
            // dispatch({ type: types.SWIPEPAUSEORDERLIST.SUCCESS, payload: response.data });
        }

        return response;
    } catch (error) {
        // Toast.show('SWIPEPAUSEORDERLIST Fetch Unsuccessfully !!');
    }
};


export const notification = () => async (dispatch) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    try {
        const statusId = 3
        const response = await axios.get(`${baseURL}driversNotification`,
            {
                headers: {
                    Authorization: `Bearer ${authDatas.data.token}`,
                    sortColumn: "manifestid",
                    sortDirection: "DESC",
                    pageNo: 1,
                    pageSize: 1000
                }
            }
        );

        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch({ type: types.NOTIFICATION.SUCCESS, payload: response.data });
        }

        return response;
    } catch (error) {
        console.log("error", error);
    }
};


export const ordetaiswipelStop = (formattedDate, breaktime, starttime, endtime, maniFestId) => async (dispatch) => {
    try {
        const authDataString = await AsyncStorage.getItem('userLoggedData');
        const authDatas = JSON.parse(authDataString)

        const response = await axios.post(
            `${baseURL}driverstimelog`,
            {
                "manifestId": maniFestId,
                "startTime": starttime,
                "breakStartTime": breaktime,
                "breakEndTime": endtime,
                "endTime": formattedDate,
                "direction": true,
                "deviceType": Platform.OS
            },
            {
                headers: {

                    Authorization: `Bearer ${authDatas.data.token}`,
                }
            }
        );
        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch(ordetailTimeUpdate(maniFestId))
            dispatch(Manifests());
        }

        return response;
    } catch (error) {
        console.log("error", error);
    }
};

export const updatePickupTrack = (payloadData) => async (dispatch) => {
    try {
        const authDataString = await AsyncStorage.getItem('userLoggedData');
        const authDatas = JSON.parse(authDataString)
        const response = await axios.post(
            `${baseURL}orders/orderpickuplog`,
            {
                ...payloadData
            },
            {
                headers: {

                    Authorization: `Bearer ${authDatas.data.token}`,
                }
            }
        );
        if (response.status === 200) {
            const fetchUsers = response.data.data;
            dispatch(getPickupList(payloadData.manifestId))
        }

        return response;
    } catch (error) {
        console.log("error", error);
    }
};

export const getPickupList = (maniFestId,) => async (dispatch) => {
    const authDataString = await AsyncStorage.getItem('userLoggedData');
    const authDatas = JSON.parse(authDataString)
    try {
        const authDataString = await AsyncStorage.getItem('userLoggedData');
        const authDatas = JSON.parse(authDataString)

        const response = await axios.get(
            `${baseURL}orders/orderPickUpLog`,
            {
                headers: {
                    "manifestId": maniFestId,
                    Authorization: `Bearer ${authDatas.data.token}`,
                }
            }
        );
        if (response.status === 200) {
            dispatch({ type: types.GET_PICKUP_TRACK.SUCCESS, payload: response.data });
        } else {
            dispatch({ type: types.GET_PICKUP_TRACK.FAILURE });
        }
        return response;
    } catch (error) {
        Toast.show('api failed');
        dispatch({ type: types.GET_PICKUP_TRACK.FAILURE });
    }
};


export const updateOrderDetails = (data) => (dispatch) => {
    dispatch({ type: types.ORDERDETAILS.SUCCESS, payload: data })
}

export const setEmptymanifest = () => (dispatch) => {
    dispatch({ type: "EMPTY_MANIFEST" })
}