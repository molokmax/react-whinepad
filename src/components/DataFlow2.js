import { useState } from 'react';
import PropTypes from 'prop-types';

import Header from './Header2';
import Body from './Body';
import Excel from './Excel3';
import clone from '../modules/clone';

import schema from '../config/schema';
import DataContext from '../contexts/DataContext';
import RouteContext from '../contexts/RouteContext';

const route = {};
function resetRoute() {
    route.add = false;
    route.edit = null;
    route.info = null;
    route.filter = null;
}
resetRoute();
const path = window.location.pathname.replace(/\//, '');
if (path) {
    const [action, id] = path.split('/');
    if (action === 'add') {
        route.add = true;
    } else if (action === 'edit' && id !== undefined) {
        route.edit = parseInt(id, 10);
    } else if (action === 'info' && id !== undefined) {
        route.info = parseInt(id, 10);
    } else if (action === 'filter' && id !== undefined) {
        route.filter = id;
    }
}

function updateRoute(action = '', id = '') {
    resetRoute();
    if (action) {
        route[action] = action === 'add' ? true : id;
    }
    id = id !== '' ? '/' + id : '';
    window.history.replaceState(null, null, `/${action}${id}`);
}

let initialData = JSON.parse(localStorage.getItem('data'));

if (!initialData) {
    initialData = [{}];
    Object.keys(schema).forEach(key => initialData[0][key] = schema[key].samples[0]);
}

function commitToStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
}

function DataFlow() {
    const [data, setData] = useState(initialData);
    const [filter, setFilter] = useState(route.filter);

    function updateData(newData) {
        newData = clone(newData);
        commitToStorage(newData);
        setData(newData);
    }

    function onSearch(e) {
        const s = e.target.value;
        setFilter(s);
        if (s) {
            updateRoute('filter', s);
        } else {
            updateRoute();
        }
    }
        
    return (
        <div className="DataFlow">
            <DataContext.Provider value={{data, updateData}}>
                <RouteContext.Provider value={{route, updateRoute}}>
                    <Header onSearch={onSearch} />
                    <Body>
                        <Excel filter={filter} />
                    </Body>
                </RouteContext.Provider>
            </DataContext.Provider>
        </div>
    );
}

DataFlow.propTypes = {
    schema: PropTypes.object.isRequired,
    initialData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DataFlow;