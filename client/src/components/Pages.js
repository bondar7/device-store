import React, {useContext} from 'react';
import {Context} from "../index";
import {Pagination} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const Pages = observer(() => {
    const {store} = useContext(Context);
    const totalPages = Math.ceil(store.totalCount / store.limit);
    const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <Pagination >
            {pagesArray.length > 1 &&  (pagesArray.map(p =>
                    <Pagination.Item
                        key={p}
                        onClick={() => store.setSelectedPage(p)}
                        active={store.selectedPage === p}
                    >{p}</Pagination.Item>))}
        </Pagination>
    )
});

export default Pages;