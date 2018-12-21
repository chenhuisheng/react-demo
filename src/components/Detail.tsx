import React, {Component} from 'react';
import {Link, RouteComponentProps} from '@reach/router';

interface Post{
    title: string
    body: string
    id: number
}

interface Comment{
    email: string
    id: number
    body: string
}

interface Route{
    id: number
}

class Detail extends Component<RouteComponentProps<Route>, {articles: Partial<Post>, comments: Comment[]}> {
    constructor(props:any) {
    super(props)
    this.state={
        articles:{},
        comments:[]
    }
    }

    componentDidMount(){
        const url1 =`https://jsonplaceholder.typicode.com/posts?id=${this.props.id}`
        fetch(url1, {method: 'GET'})
            .then(res=>res.json())
            .then(res=>{this.setState({articles:res[0]})})
        const url2 =`https://jsonplaceholder.typicode.com/comments?postId=${this.props.id}`
        fetch(url2, {method: 'GET'})
            .then(res=>res.json())
            .then(res=>{this.setState({comments:res})})
    };

    render() {
        const comments=this.state.comments;
        const articles=this.state.articles;
        const comment=comments.map((entry) => {
            return  (
                <div key={entry.id}>
                <li>邮箱: {entry.email}</li>
                    <li key={entry.id}>
                        评论内容: {entry.body}
                    </li>
                    <p></p>
                </div>
                )
        })
        return (
            <div>
                <Link to={`/`}>返回</Link>
                <h2>标题: {articles.title}</h2>
                    <h4>内容: {articles.body}</h4>
                    <p></p>
                    <p></p>
                    <h3>评论内容</h3>
                <p></p>
                <ul>{comment}</ul>
            </div>
        )
    }
}

export default Detail;