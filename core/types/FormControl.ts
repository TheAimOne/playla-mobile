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

    get valid() {
        console.log("ISVALID::", this.config.required && !this.value && this.touched)
        if (this.config.required && !this.value && this.touched) {
            return false;
        }
        return true;
    }
}

// export class FormGroup {
//     private _controls: Map<string, FormFieldControl<any>>

//     constructor(formControls: {[key: string]: FormFieldControl<any>}) {
//         this._controls = new Map<string, FormFieldControl<any>>();
//         for(const key in formControls) {
//             this._controls.set(key, formControls[key])
//         }
//     }

//     addFormControl<T,>(key: string, value: any, config: FormConfig) {
//         this._controls.set(key, new FormFieldControl<T>(value, config))
//         console.log(this._controls)
//     }

//     isValid() {
//         return [...this._controls.values()].every(control => control.isValid())
//     }

//     get(key: string) {
//         return this._controls.get(key)
//     }

//     getAllValues() {
//         let formValue: any = {}
//         for (const [key, control] of this._controls) {
//             formValue[key] = control.getValue()
//         }
//         return formValue
//     }

//     getAllControls() {
//         return [...this._controls.values()]
//     }
// }