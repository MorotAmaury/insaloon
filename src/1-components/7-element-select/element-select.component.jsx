import './element-select.component.scss'

import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';

import { SelectContext } from '../../3-context/5-select.context';

const CustomSelect = ({elementOptions, placeholder, sujet, prepa, matiere, annee}) => {
    const { setSelectSubject, setPrepa, setAnnee, setUserMatiere } = useContext(SelectContext)

    const [element, setElement] = useState([]);
    const [selectedElement, setSelectedElement] = useState(null);
    const customStyles = {
        control: (provided) => ({
          ...provided,
          cursor:'pointer',
          backgroundColor:'white',
          borderRadius:'0',
          border:'none',
          borderBottom: '1px solid gray',
          height: '3vw', 
          width: '100%',
          minWidth: '24vw',
          color: 'black',
        }),
      };   
    useEffect(() => {
      setElement(elementOptions);
    }, []);
  
    const handleSelectChange = (selectedOption) => {      
      setSelectedElement(selectedOption);
      sujet && setSelectSubject(selectedOption.value)
      prepa && setPrepa(selectedOption.label)
      annee && setAnnee(selectedOption.label)
      matiere && setUserMatiere(selectedOption.label)
    }

    return (
      <div className='select-container'>
        <Select
          value={selectedElement}
          onChange={handleSelectChange}
          options={element}
          styles={customStyles}
          isSearchable
          placeholder={placeholder}
        />
      </div>
    );
  };
  
export default CustomSelect;