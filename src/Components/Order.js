import React, {PureComponent} from 'react'
import './Order.css'
import config from './../config'
import Item from './../commonComponent/Item'
import _ from 'lodash'
import Navbar from './../commonComponent/Navbar'

class Order extends PureComponent {
    constructor() {
        super()
        this.state = {
            name: '',
            data: {},
            total: 0
        }
    }
    handleChnage = (event) => {
        const {name, value, type} = event.target
        if (type === 'text') {
            this.setState({[name]: value})
        }
    }
    handleSubmit = (event) => {
        event.preventDefault()
        console.log('values:', this.state)
        if(this.state.name !== '' && this.state.data.product.item > 0){
            const orders = localStorage.getItem('orders') == null ? [] : JSON.parse(localStorage.getItem('orders'));
            const data = {...this.state}
            orders.push(data);
            localStorage.setItem('orders', JSON.stringify(orders));
            this.props.history.push(`/list`)
        } else if (this.state.name === '') {
            alert('Name should not be blank')
        } else if(this.state.data.product.item <= 0){
            alert('Burger must be selected.')
        }
        
    }
    updateItem = (type, keyname, obj) => {
        console.log('type:', type, keyname)
        this.setState(prevState => {
                switch (true) {
                    case keyname === 'product':
                        if (type === 'add'  && prevState.data.product.item >= 1) {
                            alert('We are sorry! Only 1 unit(s) in each order');
                        } else if(type === 'remove' && prevState.data.product.item === 0){
                            alert('We are sorry! Item already removed or not added');
                        } else {
                            return {
                                ...prevState,
                                data: {
                                    ...prevState.data,
                                    product: {
                                        ...prevState.data.product,
                                        item: type !== 'add' && prevState.data.product.item > 0 ? prevState.data.product.item - 1 : prevState.data.product.item + 1
                                    }
                                },
                                total: type !== 'add' && prevState.data.product.item > 0 ? prevState.total - prevState.data.product.price : prevState.total + prevState.data.product.price
                            }
                        }
                        break;
                    case keyname === 'ingradients':
                        console.log('item value:', prevState.data.ingradients[obj.id - 1].item, obj.id)
                        if (type === 'add'  && prevState.data.ingradients[obj.id - 1].item >= 1) {
                            alert('We are sorry! Only 1 unit(s) in each order');
                        } else if(type === 'remove' && prevState.data.ingradients[obj.id - 1].item === 0){
                            alert('We are sorry! Item already removed or not added');
                        } else {
                            return {
                                ...prevState,
                                data: {
                                    ...prevState.data,
                                    ingradients: [
                                        ...prevState.data.ingradients.slice(0, obj.id - 1),
                                        {...prevState.data.ingradients[obj.id - 1], item: type !== 'add' && prevState.data.ingradients[obj.id - 1].item > 0 ? prevState.data.ingradients[obj.id - 1].item - 1 : prevState.data.ingradients[obj.id - 1].item + 1},
                                        ...prevState.data.ingradients.slice(obj.id),
                                    ]
                                },
                                total: type !== 'add' && prevState.data.ingradients[obj.id - 1].item > 0 ? prevState.total - prevState.data.ingradients[obj.id - 1].price : prevState.total + prevState.data.ingradients[obj.id - 1].price
                            }
                        }
                        break;
                    }
            })
    }
    componentDidMount() {
        const base = config.get('base')
        const itemsApi = base + config.get('items')
        fetch(itemsApi)
            .then(res => res.json())
            .then(result => {
                this.setState({data: result})
            }, (error) => {
                console.log('error in fetch request', error)
                alert(error);
            })
    }
    render() {
        //console.log('updated state:', this.state)
        const productview = !_.isEmpty(this.state.data.product) && <Item
            data={this.state.data.product}
            updateItem={this.updateItem}
            keyname='product'/>;
        const ingradientsview = !_.isEmpty(this.state.data.ingradients) && this
            .state
            .data
            .ingradients
            .map((item, i) => <Item
                data={item}
                updateItem={this.updateItem}
                key={i}
                keyname='ingradients'/>);
        return (
            <React.Fragment>
            <Navbar />
            <section className="section">
                <div className="columns">
                    <form className="column is-6 m-auto" name="order" onSubmit={this.handleSubmit}>
                        <h1 className="title is-3 has-text-centered">Order Online</h1>
                        <div className="columns is-multiline">
                            <div className="column is-full">
                                <div className="field">
                                    <div className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleChnage}/>
                                        <span className="icon is-small is-left">
                                            <i className="fa fa-user"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-full">
                                {productview}
                            </div>
                            <div className="column is-full">
                                <h5 className="title is-5 borderlineheading">Ingradients</h5>
                            </div>
                            <div className="column is-full">
                                {ingradientsview}
                            </div>
                            <hr className="w-100"/>
                            <div className="column is-full">
                                <div className="columns is-mobile">
                                    <div className="column">
                                        <h5 className="title is-5">Total</h5>
                                    </div>
                                    <div className="column has-text-right">
                                        <h5 className="title is-5">${this.state.total}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-full has-text-centered">
                                <button className="button is-success is-rounded" type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            </React.Fragment>
        );
    }
}

export default Order;
