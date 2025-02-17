import React, {useState} from 'react';

const BrandItem = ({brand}) => {
    const [checked, setChecked] = useState(false);
    const handleCheck = () => {
        setChecked(prevState => !prevState);
    }
    return (
        <div className="d-flex gap-2">
            <input
                type="checkbox"
                checked={checked}
                onChange={handleCheck}
            />
            <div>{brand.name}</div>
        </div>
    );
};

export default BrandItem;