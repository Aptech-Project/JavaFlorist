import React, { useState, useEffect } from "react";

const useForm = (initialFieldValues, validate, setCurrentId) => {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setValues({
            ...values,
            ...fieldValue
        })
        validate(fieldValue)
    }

    const resetForm = () => {
        setValues({
            ...initialFieldValues
        })
        setErrors({})
        setCurrentId(0)
    }
    const reset = () => {
        setValues({
            ...initialFieldValues
        })
        setErrors({})
    }
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm,
        reset
    };
}

export default useForm;