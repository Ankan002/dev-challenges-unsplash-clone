import React from 'react';

interface Props{
    fieldName: string
}

const ModalField = (props: Props) => {

    const {fieldName} = props;

    return (
        <p className="my-2 md:text-base text-xs font-light">
            {fieldName}
        </p>
    );
};

export default ModalField;
