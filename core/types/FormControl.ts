import { Dispatch, SetStateAction } from "react";

type FormValue<T> = T | undefined | null

interface FormConfig {
    required?: boolean
}

export type FormGroup = { [key: string]: FormFieldControl<any> }

export class FormFieldControl<T> {
    value: FormValue<T> = undefined
    disabled: boolean = false;
    error: string | undefined = undefined
    config: FormConfig = {}
    touched: boolean = false;

    constructor(value: FormValue<T>, config: FormConfig) {
        this.value = value;
        this.config = config
    }

    getValue() {
        return <T>this.value;
    }

    isValid(triggerTouch = false) {
        if (this.config.required && !this.value && (this.touched || triggerTouch)) {
            return false;
        }
        return true;
    }
}

export interface FormGroupUtils {
    setValue: (key: string, value: any) => void
    get: (key: string) => FormFieldControl<any>
    triggerChange: () => void
    getValue: () => any
    isValid: () => boolean
    setError: (key: string, error: string | undefined) => void
    getError: (key: string) => string | undefined
    clearError: (key: string) => void
}

export function getFormGroupUtils(controls: FormGroup, setControls: Dispatch<SetStateAction<FormGroup>>) {
    const triggerChange = () => {
        setControls(prevValue => {
            Object.keys(controls).forEach(key => controls[key].touched = true)
            return { ...controls }
        })
    }
    const formGroup: FormGroupUtils = {
        setValue: (key: string, value: any) => {
            const control = controls[key]
            control.value = value
            control.touched = true
            controls[key] = control
            setControls({ ...controls })
        },
        get: (key: string) => {
            return controls[key]
        },
        triggerChange: triggerChange,
        getValue: () => {
            let obj: any = {}
            Object.keys(controls).forEach(key => {
                // console.log(key, controls[key].value)
                obj[key] = controls[key].getValue()
            })
            return obj
        },
        isValid: () => {
            triggerChange();
            return Object.values(controls).every(control => control.isValid(true));
        },
        setError: (key: string, error: string | undefined) => {
            controls[key].error = error
        },
        getError: (key: string) => {
            return controls[key].error
        },
        clearError: (key: string) => {
            controls[key].error = undefined
        }
    }
    return formGroup;
}