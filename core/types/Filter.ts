export interface Criteria {
    key: string
    value?: string
    operator: FilterOperator
    values?: string[]
}

export enum FilterOperator {
    EQUAL = 'EQUAL',
    NOT_EQUAL = 'NOT_EQUAL',
    CONTAINS = 'CONTAINS',
    NOT_CONTAINS = 'NOT_CONTAINS',
    IN = 'IN',
    NOT_IN = 'NOT_IN'
}

export class Filter {
    pageNumber: number = 0
    pageSize: number = 10

    criteria: Criteria[] = []
    isAnd: boolean = true

    constructor(
    ) { }
}
