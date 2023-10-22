import React, { useEffect } from "react";
import { FormFieldControl, FormGroup, FormGroupUtils, getFormGroupUtils } from "../types/FormControl";
import _ from "lodash"

function useFormGroup(formControls: FormGroup): FormGroupUtils {
    const [controls, setControls] = React.useState(formControls)
    return getFormGroupUtils(controls, setControls)
}

export default useFormGroup;