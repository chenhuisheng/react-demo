import React, {Component} from 'react';
import {Link} from '@reach/router';


class Detail extends Component {
    constructor(props) {
    super(props)
    this.state={
        articles:[],
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
        console.log(articles.title)
        const comment=comments.map((entry, index) => {
            return  (
                <div key={index}>
                <li>邮箱: {entry.email}</li>
                    <li key={index}>
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