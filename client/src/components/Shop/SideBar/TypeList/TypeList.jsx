import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../../index";
import {ListGroup} from "react-bootstrap";

const TypeList = observer(() => {
    const {store} = useContext((Context));
    return (
        <div className="m-3">
            <div className="mb-2">Type: <span>{store?.types?.length}</span></div>
            <div style={{maxHeight: 200, overflowY: 'auto'}}>
                <ListGroup>
                    {store.types.map(type =>
                        <ListGroup.Item
                            style={{cursor: 'pointer', fontSize: 14}}
                            active={type.id === store?.selectedType?.id}
                            key={type.id}
                            variant='light'
                            onClick={() => store.setSelectedType(type)}
                        >
                            {type.name}
                        </ListGroup.Item>)}
                </ListGroup>
            </div>
        </div>
    );
});

export default TypeList;