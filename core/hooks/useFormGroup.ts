import React from "react";
import { FormFieldControl, FormGroup, FormGroupUtils, getFormGroupUtils } from "../types/FormControl";

enum FormControlAction {

}

interface FormGroupAction {
    type: FormControlAction,
    payload: FormFieldControl<any>
}

interface FormGroupState {
    form: FormGroup
}

const reducer = (state: FormGroupState, action: FormGroupAction) => {

}

function useFormGroup(formControls: FormGroup): FormGroupUtils {
    const [controls, setControls] = React.useState(formControls)
    // const [state, dispatch] = React.useReducer(reducer, { form: formControls } as FormGroupState);
    return getFormGroupUtils(controls, setControls)
}

export default useFormGroup;