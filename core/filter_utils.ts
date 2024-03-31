import { Criteria, Filter, FilterOperator } from "./types"

type FilterCriteria = (key: string, value: string | string[]) => Criteria;

const equals$: FilterCriteria = (key, value) => {
    return { key, value: value as string, operator: FilterOperator.EQUAL }
}

const notEquals$: FilterCriteria = (key, value) => {
    return { key, value: value as string, operator: FilterOperator.NOT_EQUAL }
}

const in$: FilterCriteria = (key, value) => {
    return { key, values: value as string[], operator: FilterOperator.IN }
}

const notIn$: FilterCriteria = (key, value) => {
    return { key, values: value as string[], operator: FilterOperator.NOT_IN }
}

const greaterThan$: FilterCriteria = (key, value) => {
    return { key, value: value as string, operator: FilterOperator.GREATER_THAN }
}

const lessThan$: FilterCriteria = (key, value) => {
    return { key, value: value as string, operator: FilterOperator.LESS_THAN }
}

const createFilter = (...filters: Criteria[]): Filter => {
    return {
        pageNumber: 10,
        pageSize: 0,
        criteria: [...filters],
        isAnd: true
    }
}

export {
    createFilter,
    equals$,
    notEquals$,
    in$,
    notIn$,
    greaterThan$,
    lessThan$
}