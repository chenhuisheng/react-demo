import * as React from 'react'
import {AppRouter} from './Router'

class APP extends React.Component{
    render(){
        return(
            <div className="APP">
                <AppRouter></AppRouter>
            </div>
        )
    }
}

export default APP
