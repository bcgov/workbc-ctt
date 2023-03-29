import React, { FunctionComponent, Key } from 'react'
import { useGetReferenceType } from '../client/careerSkillsClient'
import { ReferenceType, ReferenceTypeModel } from '../client/careerSkillTypes'
import WbSelect, { WbSelectProps } from './wbSelect'
import { Select } from 'antd'

interface OwnProps {
    referenceType: ReferenceType
    showPlaceHolderAsOption: boolean
}
  
type Props = OwnProps & WbSelectProps

const SelectReferenceType: FunctionComponent<Props> = ({referenceType, onChange, showPlaceHolderAsOption, placeholder, ...rest}) => {
    const { codeTypes, isValidating, isSettled } = useGetReferenceType(referenceType)

    function handleChange(value: Key, options: any) {
        //console.log("on change: value = " + value)
        if (!!value) {
            let selectedCode: ReferenceTypeModel = codeTypes.find((item) => item.value === value)
            if (!!selectedCode) {
                onChange?.(selectedCode.id, options)
            } else {
                onChange?.(-1, options)
            }
        } else {
            onChange?.(-1, options)
        }
    }

    return (
        <WbSelect
            loading={isValidating}
            showSearch={false}
            showArrow={false}
            filterOption={false}
            onChange={handleChange}
            placeholder={placeholder}
            {...rest}
        >
            {showPlaceHolderAsOption && placeholder &&
                <Select.Option key={-1} value={placeholder.toString()}>
                    {placeholder.toString()}
                </Select.Option>
            } 
            {isSettled? codeTypes.map((code) => (
                <Select.Option key={code.id} value={code.value}>
                    {code.value}
                </Select.Option>
            )) : []}
        </WbSelect>
    )
}

export default SelectReferenceType