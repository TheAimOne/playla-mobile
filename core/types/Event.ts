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
    creatorId: string,
    createTime: Date,
    updateTime: Date,
    deleteTime: Date
}