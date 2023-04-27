import { useEffect, useState } from "react";
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Form } from 'semantic-ui-react';
import Currency from '../../../entities/Currency';
import axios from 'axios'
import { set } from "lodash";

export default function Input(props){

  const [result,setReult] = useState(0);
  const [currency,setCurrency] = useState([]);
  let secondaryOptions = [];
let options = Currency.options();
  
    useEffect(()=>{
        updateSecondaryOptions(props.base);
    },[])

   let updateSecondaryOptions=(base)=> {
        secondaryOptions =Currency.options().filter(option => option.key !== base);
        setCurrency(secondaryOptions);
        console.log('secondatry--->',secondaryOptions);
      }

let  handleBaseChange = (event, { value }) => {
        props.changeSettingsCurrency({
          base: value,
          secondary: props.secondary
        });
      };
    
    let  handleSecondaryChange = (event, { value }) => {
        props.changeSettingsCurrency({
          base: props.base,
          secondary: value
        });
      };

    let  handleExchage = ()=>{
        // console.log('button clicked');
        // console.log('base is',props.base);
    
        // console.log('additional is clicked',props.secondary);
         exchangeApiCall();
      }

      
 let exchangeApiCall = ()=>{
    console.log('api method called');


axios.get(`https://api.apilayer.com/exchangerates_data/convert?to=${props.secondary}&from=${props.base}&amount=1`, {
  headers:{
    apiKey: 'XSYkuk2JeREokM7IAra6IXtb4VqDqCZz'
  }
})
.then(function (response) {
  console.log(response);
  console.log('resuct-->',response.data.result);
 
    setReult(response.data.result);


})
.catch(function (error) {
  console.log(error);
});
  
    //);
  }
    return(<>
    <Form>
        <Form.Group widths="equal">
          <Form.Field>
            <label>Base Currency</label>
            <Dropdown
              search
              selection
              onChange={handleBaseChange}
              options={options}
              value={props.base}
            />
          </Form.Field>
          <Form.Field>
            <label>Additional Currencies (optional)</label>
            <Dropdown
              placeholder="Select additional currencies"
              search
              selection
              multiple
              renderLabel={item => item.key}
              closeOnChange
              onChange={handleSecondaryChange}
              options={currency}
              value={props.secondary}
            />
          </Form.Field>
        </Form.Group>
        <button onClick={handleExchage}>Exchange</button>
        ,<h5>{props.secondary} amount is = {result}</h5>
      </Form>
    </>)
}
