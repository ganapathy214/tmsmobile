import { React, useState, createRef, useEffect, useLayoutEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text } from 'react-native';
import { styles } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { primaryColor } from '../../Common/Styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { commentspost } from '../../services/Manifestsession/ManifestAction';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { RefreshControl } from 'react-native-gesture-handler';
import reactotron from 'reactotron-react-native';


export const Comment = ({ navigation, ...props }) => {
    const selectormyprofile = useSelector(state => state.session.userDetails.data.roleId)
    const [value, setValue] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([])
    const ausTime = (data = new Date()) => new Date(data).toLocaleString("en-US", { hour: "numeric", minute: '2-digit', timeZone: "Australia/Sydney" });
    const ausday = (data = new Date()) => new Date(data).toLocaleString("en-US", { timeZone: "Australia/Sydney", day: '2-digit' });
    const ausdate = (data = new Date()) => new Date(data).toLocaleString("en-US", { timeZone: "Australia/Sydney", month: 'short', year: 'numeric' });
    const textInputRef = createRef();
    const comments = useSelector(state => state.Manifest.commentsgetall);
    const dispatch = useDispatch()
    const { params } = props.route;
    const fetchdata = params.fetchdata
    const type = params?.type
    const orderID = params.orderID
    const statusUpdate = params?.statusType
    const orderNumber = params?.orderNumber
    const isEnable = params?.params ?? false
    const flatListRef = useRef(null);
    useEffect(() => {
        const commentsShow = comments.data?.map((item) => item)
        setData(commentsShow)

    }, [comments])
    const commentValues = (e) => {
        setValue(e?.nativeEvent?.text)
    }


    const updatedValues = async () => {
        const list = { comment: value, date: `${ausday()} ${ausdate()} - ${ausTime()}` };
        if (value.length === 0) {
            setValue('');
        } else {
            dispatch(commentspost(orderID, value));
            const updatedData = [...data, list];
            setData(updatedData);
            setValue('');
            setTimeout(() => {
                flatListRef.current.scrollToEnd({ animated: true });
            }, 0);
        }
        textInputRef.current.blur()
    };

    const RenderList = ({ item }) => {
        const time = item.createdDate
        return (
            <View style={styles.commentAlignment}>
                <Text style={styles.card}>{item.comment}</Text>
                <View style={styles.clock}>
                    <EvilIcons
                        name={"clock"}
                        size={18}
                        color={'black'}
                    />
                    <Text style={styles.time}>{`${ausday(item.createdDate)} ${ausdate(item.createdDate)} - ${ausTime(item.createdDate)}`}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.textContainer}>
            <View style={[styles.commentsContainer]}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}  >
                        <Icons
                            name={'close'}
                            size={20}
                            color={'#4E5052'}
                            style={{ marginRight: 5 }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.commentHeadertext}>Comments</Text>
                </View>
                <View style={[styles.commentHeaderalign]}>
                    <Text style={[styles.headerComments]}>{'Order # :'} {orderNumber}</Text>
                </View>
            </View>
            <FlatList
                ref={flatListRef}
                keyExtractor={(item, index) => `key-${index}`}
                data={data}
                renderItem={RenderList}
                onContentSizeChange={() => {
                    flatListRef.current.scrollToEnd({ animated: true });
                }}
                ListEmptyComponent={() => <Text style={[styles.noData]}>No Comments Added</Text>}
            />
            {selectormyprofile === 2 || fetchdata === 'completed' || type === "Cancelled" || type === "Delivered" || !params?.isEnable ? null :
                <View style={styles.imageAlignment}>
                    <TextInput ref={textInputRef} style={styles.textField} placeholder='Notes...' placeholderTextColor={'black'} onChange={(e) => commentValues(e)} value={value} multiline />
                    <TouchableOpacity onPress={() => updatedValues()}>
                        <View >
                            <MaterialCommunityIcons
                                name={"send-circle"}
                                size={50}
                                color={'#1bcfb4'}
                            />
                        </View>
                    </TouchableOpacity>
                </View>}
        </View>
    )
}
