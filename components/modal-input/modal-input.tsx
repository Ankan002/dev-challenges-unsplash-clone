import React from 'react';

interface Props{
    placeholder: string;
    inputStateValue: string;
    setInputStateValue: Function;
    inputType: "text" | "password"
}

const ModalInput = (props: Props) => {

    const {placeholder, inputStateValue, setInputStateValue, inputType} = props;

    return (
        <>
        {
            inputType === "password" ? (
            <input className="w-full px-3 py-1 font-light outline-none border-[1px] border-primary-grey mb-1 rounded-md md:text-base text-xs" placeholder={placeholder} value={inputStateValue} onChange={(e) => setInputStateValue(e.target.value)} type="password" autoComplete="new-password"/>
        ) : (
            <input className="w-full px-3 py-1 font-light outline-none border-[1px] border-primary-grey mb-1 rounded-md md:text-base text-xs" placeholder={placeholder} value={inputStateValue}  onChange={(e) => setInputStateValue(e.target.value)}/>
        )
        }
        </>
    );
};

export default ModalInput;
