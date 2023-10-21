import React, { useEffect } from "react";
import { FormFieldControl, FormGroup } from "../types/FormControl";
import _ from "lodash"

interface FormGroupUtils {
    setValue: (key: string, value: any) => void
    get: (key: string) => FormFieldControl<any>
    triggerChange: () => void
    getAllValue: () => any
}

function useFormGroup(formControls: FormGroup): FormGroupUtils {
    const [controls, setControls] = React.useState(formControls)

    const formGroup: FormGroupUtils = {
        setValue: (key: string, value: any) => {
            console.log("SETVAL", key, value)
           setControls(prevValue => {
            const control = _.clone(prevValue[key])
            control.value = value
            control.touched = true
            return {...prevValue, control}
           })
        },
        get: (key: string) => {
            return controls[key]
        },
        triggerChange: () => {
            setControls(prevValue => {
                const clonedControls = _.clone(prevValue)
                Object.keys(clonedControls).forEach(key => clonedControls[key].touched = true)
                return {...clonedControls}
            })
        },
        getAllValue: () => {
            let obj: any = {}
            console.log(controls)
            Object.keys(controls).forEach(key => {
                console.log(key, controls[key].value)
                obj[key] = controls[key].value
            })
            return obj
        }
    }

    return formGroup
}

export default useFormGroup;