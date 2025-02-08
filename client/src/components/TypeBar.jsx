import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";

const TypeBar = observer(() => {
    const {store} = useContext((Context));
    return (
        <ListGroup>
            {store.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === store?.selectedType?.id}
                    key={type.id}
                    variant='secondary'
                    onClick={() => store.setSelectedType(type)}
                >
                    {type.name}
                </ListGroup.Item>)}
        </ListGroup>
    );
});

export default TypeBar;