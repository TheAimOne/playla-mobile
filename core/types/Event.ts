export enum EventTypes {
    SPORTS
}

export enum EventStatus {
    CREATED
}

export interface Event {
    eventId?: string
    name: string
    description: string
    groupId: string
    venueId: string
    type: EventTypes,
    status: EventStatus,
    noOfParticipants: number,
    noOfJoinedParticipants: number
    startDateAndTime: Date
    endDateAndTime: Date
    creatorId: string,
    createTime: Date,
    updateTime: Date,
    deleteTime: Date
    totalCost: number
}


export interface EventDisplay extends Event {
    startDateDisplay: string
    startTimeDisplay: string
    endDateDisplay: string
    endTimeDisplay: string
    venueName: string
    venueAddress: string
    latitude: number
    longitude: number
    costPerPerson: number
}

export interface EventMember {
    id: number,
    eventId: string,
    groupId: string,
    memberId: string,
    action: string,
    name: string,
    type: string, 
    status: string,
}
