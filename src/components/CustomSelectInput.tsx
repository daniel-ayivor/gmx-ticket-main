import { OptionType } from '@/utils/types/global'
import React from 'react'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'

const animatedComponents = makeAnimated();


type PropType = {
  onChange: (value: OptionType) => void
  value: OptionType
}

const CustomSelectInput = (
  { onChange, value }: PropType
) => {

  const options = [
    { "label": "Obaapa Christy", "value": 89 },
    { "label": "Ohemaa Mercy", "value": 90 },
    { "label": "Osuani Afrifa", "value": 94 },
    { "label": "Patricia Kwakyewaa", "value": 99 },
    { "label": "Prince Osei Kofi", "value": 95 },
    { "label": "Sarkodie", "value": 5 },
    { "label": "Slim Young", "value": 98 },
    { "label": "Smart Nkansah", "value": 69 },
    { "label": "Vine Praise", "value": 100 },
    { "label": "Wofa Asomani", "value": 92 },
    { "label": "$Steen", "value": 36 },
    { "label": "Agnes Opoku Agyemang", "value": 91 },
    { "label": "Aseibu Amanfi", "value": 93 },
    { "label": "Black Sherif", "value": 3 },
    { "label": "Dada Kd", "value": 13 },
    { "label": "Elder Agyare", "value": 96 },
    { "label": "J.A. Adofo", "value": 97 },
    { "label": "King Promise", "value": 4 },
    { "label": "Kwesi Arthur", "value": 6 },
    { "label": "Nana Tuffour", "value": 88 }
  ]

  console.log("value", value);
  

  return (
    <Select
      value={value}
      closeMenuOnSelect={false}
      components={animatedComponents}
      // isMulti
      onChange={(newValue) => {
        console.log('Selected value:', newValue)
        onChange(newValue as OptionType)
      }}
      options={options}

    />
  )
}

export default CustomSelectInput