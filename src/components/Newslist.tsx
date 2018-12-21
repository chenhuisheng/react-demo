import React, { Component } from 'react';
import {Link} from '@reach/router';


interface Variable{
    userId: number
    name: string
    id: number
    title: string
    i: boolean
}

class Cmtlist extends Component<any, any>{
    constructor(props: any){
        super(props)
        this.state={
            details:[], //新闻id，新闻标题，用户名
            page:1
        }
    }

    accessToResources(){
        const url =`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${this.state.page}`
        fetch(url, {method: 'GET'})
            .then(res=>res.json())
            .then(res=>{res.forEach((entry :Variable, index :Variable) => {
                    const url = `https://jsonplaceholder.typicode.com/users/${entry.userId}`
                    fetch(url, {method: 'GET'})
                        .then(res=>res.json())
                        .then(res=>{entry.name=res.name
                        this.setState({details: this.state.details.concat(entry)})
                })})})
    }

    componentDidMount() {
        this.accessToResources()
    }

    async show(i:boolean){
        const page=this.state.page
        if (i==false && page>1){
            await this.setState({
            page: page - 1,
            details:[]
        })
            this.accessToResources()
        }
        if(i==true && page<10){
            await this.setState({
                page: page + 1,
                details:[]
            })
            this.accessToResources()
        }
    }

    render() {
        var i
        const details=this.state.details;
        const page=this.state.page;
        const detail=details.map((entry :Variable, index :Variable) => {
            return  (
                <div key={entry.id}>
                <li>作者: {entry.name}</li>
                    <li key={entry.id}>
                        <Link to={`/Detail/${entry.id}`}>标题: {entry.title} {entry.id}</Link>
                    </li>
                    <p></p>
                </div>
                )
        })
        return (
            <div>
                <ul>{detail}</ul>
                <h6>第{page}页</h6>
                <button onClick={this.show.bind(this, i=false)}>上一页</button>
                <button onClick={this.show.bind(this, i=true)}>下一页</button>
            </div>
        )
        
    }
}

export default Cmtlist;
