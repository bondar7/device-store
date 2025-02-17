import React, {useContext, useState} from 'react';
import {Context} from "../../../../index";
import {observer} from "mobx-react-lite";

const BrandItem = observer(({brand}) => {
    const {store} = useContext(Context);
    const [checked, setChecked] = useState(false);
    const handleCheck = () => {
        const newCheckedState = !checked;
        setChecked(newCheckedState);

        if (newCheckedState) {
            store.setSelectedBrands([...store.selectedBrands, brand.id]);
        } else {
            store.setSelectedBrands(store.selectedBrands.filter(b => b !== brand.id));
        }
    };
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
});

export default BrandItem;