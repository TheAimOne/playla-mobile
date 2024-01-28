import { Dispatch, SetStateAction } from "react";

type FormValue<T> = T | undefined | null

interface FormConfig {
    required?: boolean
}

export type FormGroup = { [key: string]: FormFieldControl<any> }

export class FormFieldControl<T> {

    private _value: FormValue<T>
    disabled: boolean = false;
    error: any | undefined = undefined
    config: FormConfig = {}
    touched: boolean = false;

    constructor(value: FormValue<T>, config: FormConfig) {
        this.value = value;
        this.config = config
    }

    set value(val: any) {
        this._value = val as T 
    }

    get value() {
        return this._value
    }

    getValue() {
        return <T>this.value;
    }

    isValid(triggerTouch = false) {
        if ((this.config.required && !this.value && (this.touched || triggerTouch)) || this.error) {
            return false;
        }
        return true;
    }
}

export interface FormGroupUtils {
    setValue: (key: string, value: any) => void
    get: (key: string) => FormFieldControl<any>
    triggerChange: () => void
    triggerChangeByKey: (key: string) => void
    getValue: () => any
    isValid: () => boolean,
    isFieldValid: (key: string) => boolean,
    setError: (key: string, error: any | undefined) => void
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
    const triggerChangeByKey = (key: string) => {
        setControls(prevValue => {
            const control = controls[key];
            control.touched = true
            return {...prevValue, key: control}
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
        triggerChangeByKey: triggerChangeByKey,
        getValue: () => {
            let obj: any = {}
            Object.keys(controls).forEach(key => {
                obj[key] = controls[key].getValue()
            })
            return obj
        },
        isValid: () => {
            triggerChange();
            return Object.values(controls).every(control => control.isValid(true));
        },
        isFieldValid: (key) => {
            return controls[key].isValid();
        },
        setError: (key: string, error: any | undefined) => {
            controls[key].error = error
            triggerChangeByKey(key)
        },
        getError: (key: string) => {
            return controls[key].error
        },
        clearError: (key: string) => {
            controls[key].error = undefined
            triggerChangeByKey(key)
        }
    }
    return formGroup;
}