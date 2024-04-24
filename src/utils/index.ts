/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
export const getSkipCount = (page: number, pageSize: number) =>
  page === 1 ? 0 : pageSize * (page - 1);

export const getReplaceString = (
  replaceValue: string,
  replacer: Record<string, any>
) => {
  let stringValue = replaceValue;
  Object.entries(replacer)?.map(([k, v]: any[]) => {
    console.log('value', v,'key', k)
    stringValue.replace(`{${k}}`, v);
    console.log('stringValue', stringValue)
  });
  console.log("MAP_URL", stringValue);
  return stringValue;
};

export const GET_CONST_FROM_AUTH = (AUTH: Record<string, any>) =>  AUTH?.data?.userRecord?.CONSTANT_DATA 

export const isInteger = (value: string) => Boolean(/^\d*$/.test(value))

export const isDecimal = (value: string) => Boolean(/^\d*\.?\d*$/.test(value)) 

// *************** For API state
export const getApiCallableState = (const_data: string[], type: string = 'ALL') => {
  if(type){
    return {
      brand: true,
      category: true,
      subcategory: true,
      producttype: true,
      color: true,
      size: true
    }
  }
  else if(type === const_data[0]){
    return {
      brand: false,
      category: true,
      subcategory: true,
      producttype: true,
      color: true,
      size: true
    }
  }else if(type === const_data[1]){
    return {
      brand: false,
      category: false,
      subcategory: true,
      producttype: true,
      color: true,
      size: true
    }
  }else if(type === const_data[2]){
    return {
      brand: false,
      category: false,
      subcategory: false,
      producttype: true,
      color: true,
      size: true
    }
  }else if(type === const_data[3]){
    return {
      brand: false,
      category: false,
      subcategory: false,
      producttype: false,
      color: true,
      size: true
    }
  }else if(type === const_data[4]){
    return {
      brand: false,
      category: false,
      subcategory: false,
      producttype: false,
      color: false,
      size: true
    }
  }else {
    return {
      brand: false,
      category: false,
      subcategory: false,
      producttype: false,
      color: false,
      size: false
    }
  }
}


const decimalPlace = /^\d*\.?\d*$/;

export const checkDecimalFn = (value: any) =>
  value?.trim() && decimalPlace.test(value);