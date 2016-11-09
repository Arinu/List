var data = !localStorage.getItem("_listdata")?[]:JSON.parse(localStorage["_listdata"]);
class Lidata extends React.Component{
    remove(){
        data.splice(this.props.index,1);
        this.props.remove();
    }
    okgreen(){
        data.splice(this.props.index,1,{title:this.props.lida.title,green:"green"});
        this.props.remove();
    }
    render(){
        return (
            <div key={this.props.index + 1} className="lidiv">
                <li className={this.props.lida.green}>{this.props.lida.title}</li>
                <button onClick={this.okgreen.bind(this)}>完成</button>
                <button onClick={this.remove.bind(this)}>删除</button>
            </div>
        )//class不会自动绑定this
    }
}
class List extends React.Component{
    render() {
        var list = [];
        for(var i=0; i<(this.props.data).length; i++){
            list.push(<Lidata lida={(this.props.data)[i]} index={i} remove={this.props.remove} />)
        }
        if((this.props.data).length===0){
            return(
                <ul>
                    <li className="lidiv">没有想做的事情吗</li>
                </ul>
            )
        }
        if((this.props.data).length!==0){
            return (
                <ul>{list}</ul>
            )
        }
    }
}
class Form extends React.Component{
    submit(e){
        e.preventDefault();
        const inputText = this.refs.In.value;
        this.props.edit(inputText);
        this.refs.In.value = "";
    }
    render() {
        return (
            <form onSubmit={e => {this.submit(e)}}>
                <input ref="In" type="text" placeholder="说点什么"/>
            </form>
        )
    }
}
class Box extends React.Component{
    constructor(){
        super();
        this.state={listdata:data}
    }
    update(){
        localStorage.setItem("_listdata",JSON.stringify(data));
        this.setState({listdata:data});
    }
    edit(val){
        if(val)data.push({title:val});
        localStorage.setItem("_listdata",JSON.stringify(data));
        console.log(val);
        this.update();
    }
    componentDidMount(){
        this.update();
    }
    render() {
        return (
            <div className="box">
                <h3>写下你想做的事</h3><hr/>
                <List data={this.state.listdata} remove={this.update.bind(this)} />
                <Form edit={val => {this.edit(val)}} />
            </div>
        )
    }
}

ReactDOM.render(
    <Box />,
    document.body
)