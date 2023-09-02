// export const regExpEmail = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);
export const regExpEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
export const regExpNo = RegExp(/^\d{10}$/);
export const regExpNumber = RegExp(/[^0-9]/g);
export const regExpOnlyNumeric = RegExp(/^(0|[1-9][0-9]*)$/);
//export const regExpName = RegExp(/^[A-Za-z]{4,25}$/);
export const regExpName = RegExp(/[^a-zA-Z]/g);
export const regExpPincode = RegExp(/^[1-9][0-9]{2}\s{0,1}[0-9]{3}$/);
