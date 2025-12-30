import React from "react";

const RouteContext = React.createContext({
    route: {
        add: false,
        info: null,
        edit: null,
        filter: null
    },
    updateRoute: () => {}
});

export default RouteContext;
