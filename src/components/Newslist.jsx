import React, { Component } from 'react';
import {Link} from '@reach/router';


class Cmtlist extends Component{
    constructor(props){
        super(props)
        this.state={
            articles:[],  //新闻列表
            author:[],  //用户信息
            details:[], //新闻id，新闻标题，用户名
            page:1
        }
    }
    

    componentDidMount() {
        const url =`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${this.state.page}`
        fetch(url, {method: 'GET'})
            .then(res=>res.json())
            .then(res=>{this.setState({articles:res})
                res.map((entry, index) => {
                    const url = `https://jsonplaceholder.typicode.com/users/${entry.userId}`
                    fetch(url, {method: 'GET'})
                        .then(res=>res.json())
                        .then(res=>{this.setState({author:res})
                        var user={
                            id: entry.id,
                            title: entry.title,
                            body: entry.body,
                            name: res.name
                        }
                    this.setState({details: this.state.details.concat(user)})
                })})})
    }
    
    async show(i){
        const page=this.state.page
        if (i==false && page>1){
            await this.setState({
            page: page - 1,
            details:[]
        })
            this.componentDidMount()
        }
        if(i==true && page<13){
            await this.setState({
                page: page + 1,
                details:[]
            })
            this.componentDidMount()
        }
    }

    render() {
        var i
        const details=this.state.details;
        const page=this.state.page;
        const detail=details.map((entry, index) => {
            return  (
                <div key={index}>
                <li>作者: {entry.name}</li>
                    <li key={index}>
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
