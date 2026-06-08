import { Text, View, FlatList, TextInput } from 'react-native';
import { styles } from './styles';
import { CurrentOrderedlists } from './Orders';
const OrderItem = (props) => {
    const { params } = props.route;
    const RenderList = ({ item, index }) => {
        return <View style={{}} >
            <View style={[styles.OrderListbottomSpace,]}>
                <View style={[styles.orderlists, { marginTop: 10 }]}>
                    <View style={styles.itemlists}>
                        <Text >{item.name}</Text>
                    </View>
                    <View style={styles.itemqty}>

                        <Text >{item.qty}</Text>
                    </View>
                    <View style={styles.itemtext}>
                        <TextInput style={styles.quantityInput}
                            onChangeText={text => setlength(text)}
                            placeholderTextColor='grey'
                            selectionColor="black"
                            inputMode={'numeric'}
                            value={`${item.qty}`}
                        />
                    </View>
                </View>
                <View style={[styles.horizontalLineGray]} />
            </View>
        </View>
    }
    return (
        <View>
            <FlatList
                keyExtractor={(item, index) => `key-${index}`}
                ListHeaderComponent={() => {
                    return (
                        <View style={styles.headerAlign}>
                            <View style={styles.headerItem}>
                                <Text style={[styles.tableContentHeader,]}>
                                    Item
                                </Text>
                            </ View>
                            <View style={styles.headerQuantity}>
                                <Text style={[styles.tableContentHeader]}>
                                    Order Quantity
                                </Text>
                            </View>
                            <View style={styles.headerStatus}>
                                <Text style={[styles.tableContentHeader]}>
                                    Picked Quantity
                                </Text>
                            </View>
                        </View>
                    )
                }}
                data={params.groupItem.orderItems}
                renderItem={RenderList}
                ListEmptyComponent={() => <Text style={[styles.noData]}>No Data Found</Text>}
            />
        </View>
    )
}
export default OrderItem;