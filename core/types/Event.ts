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
}


export interface EventDisplay extends Event {
    startDateDisplay: string
    startTimeDisplay: string
    endDateDisplay: string
    endTimeDislay: string
}
