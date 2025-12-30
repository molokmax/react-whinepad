import Logo from './Logo';
import './Header.css';

import schema from '../config/schema';

import Button from './Button';
import Dialog from './Dialog';
import Form from './Form';
import FormInput from './FormInput';

import DataContext from '../contexts/DataContext';
import RouteContext from '../contexts/RouteContext';
import { useContext, useState, useRef } from 'react';

function Header({ onSearch }) {
    const {data, updateData} = useContext(DataContext);
    const {route, updateRoute} = useContext(RouteContext);
    const [addNew, setAddNew] = useState(route.add);
    
    const form = useRef(null);

    const count = data.length;

    const placeholder = count > 0 ? `Search ${count} items` : 'Search';

    function onAdd() {
        setAddNew(true);
        updateRoute('add');
    }

    function saveNew(action) {
        setAddNew(false);
        updateRoute();
        if (action === 'dismiss') {
            return;
        }

        const formData = {};
        Array.from(form.current).forEach(input => formData[input.id] = input.value);
        data.unshift(formData);
        updateData(data);
    }

    return (
        <div className="Header">
            <Logo />
            <div>
                <FormInput
                    id="search"
                    placeholder={placeholder}
                    onChange={onSearch}
                    defaultValue={route.filter}
                />
            </div>
            <Button onClick={onAdd}>
                <b>&#65291;</b> Add whine
            </Button>
            {addNew ? (
                <Dialog
                    modal={true}
                    header="Add new item"
                    confirmLabel="Add"
                    onAction={(action) => saveNew(action)}>
                    <Form ref={form} fields={schema} />
                </Dialog>
            ) : null}
        </div>
    )
}

export default Header;
