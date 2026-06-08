import { createRequestTypes } from "../../store/util";
export const PROFILEDATA = createRequestTypes('PROFILEDATA')
export const MANIFEST = createRequestTypes('MANIFEST')
export const COMPLETEDMANIFEST = createRequestTypes('COMPLETEDMANIFEST')
export const ACCEPTMANIFEST = createRequestTypes('ACCEPTMANIFEST')
export const DELETEMANIFEST = createRequestTypes('DELETEMANIFEST')
export const CANCELMANIFEST = createRequestTypes('CANCELMANIFEST')

export const RECENTMANIFESTLISTS = createRequestTypes('RECENTMANIFESTLISTS')
export const COMPLETEDMANIFESTLISTS = createRequestTypes('COMPLETEDMANIFESTLISTS')
export const CANCELMANIFESTLISTS = createRequestTypes('COMPLETEDMANIFESTLISTS')
export const ORDERDETAILS= createRequestTypes('ORDERDETAILS')

export const ORDEREMPTYLISTITEMS= createRequestTypes('ORDEREMPTYLISTITEMS')
export const ORDERDELETEMANIFEST= createRequestTypes('ORDERDELETEMANIFEST')

export const ETACALL= createRequestTypes('ETACALL')
export const COMMENTSGETALL= createRequestTypes('COMMENTSGETALL')
export const COMMENTSPOSTED= createRequestTypes('COMMENTSPOSTED')

export const UPDATEQUANTITY= createRequestTypes('UPDATEQUANTITY')
export const UPDATEEMPTYQUANTITY= createRequestTypes('UPDATEEMPTYQUANTITY')
export const NOTIFICATION= createRequestTypes('NOTIFICATION')


export const UPDATESUCESS= createRequestTypes('UPDATESUCESS')

export const SWIPESCREENORDERLIST= createRequestTypes('SWIPESCREENORDERLIST')
export const SWIPERESUMEORDERLIST= createRequestTypes('SWIPERESUMEORDERLIST')
export const SWIPEPAUSEORDERLIST= createRequestTypes('SWIPEPAUSEORDERLIST')
export const SWIPESTOPORDERLIST= createRequestTypes('SWIPESTOPORDERLIST')


export const GET_PICKUP_TRACK= createRequestTypes('GET_PICKUP_TRACK')

export const UPDATE_PICKUP_TRACK= createRequestTypes('UPDATE_PICKUP_TRACK')

export const UPDATE_LAT_LONG= createRequestTypes('UPDATE_LAT_LONG')