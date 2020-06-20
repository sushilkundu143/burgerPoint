import React, {PureComponent} from 'react'
import './List.css'
import Navbar from './../commonComponent/Navbar'

class List extends PureComponent {
    constructor() {
        super()
        this.state = {
            filter: "",
            orders: JSON.parse(localStorage.getItem('orders'))
        }
    }
    handleChange = event => {
        const {name, value} = event.target
        const orderitems = JSON.parse(localStorage.getItem('orders'))
        this.setState({
                [name]: value,
                orders: orderitems.filter(item => {
                    return item.name.toLowerCase().includes(value.toLowerCase())
                })
            })
    }
    render() {
        const List = this.state.orders === null || this.state.orders.length === 0
            ? (
                <tr rowSpan='4'>
                    <td colSpan='4' className="has-text-centered">No Orders found</td>
                </tr>
            )
            : this.state.orders.map((item, i) => {
                console.log('item:', item)
                return (
                <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.data.product.name}</td>
                    <td>{item.data.ingradients.filter(x =>  x.item > 0 && x).map(x => x.name).join(',')}</td>
                     <td>${item.total}</td>
                </tr>
            )})
        return (
            <React.Fragment>
                <Navbar />
            <section className="section">
                <div className="row">
                    <div className="column is-6 m-auto">
                        <div className="columns is-mobile is-multiline">
                            <div className="column is-full">
                                <h1 className="title is-3 has-text-centered">Order List</h1>
                            </div>
                            <div className="field column is-full">
                            <div className="control">
                                <input className="input" name="filter" type="search" placeholder="Search by Name" onChange={this.handleChange} />
                            </div>
                            </div>
                            <div className="column is-full">
                                <table className="table custom">
                                    <thead>
                                        <tr>
                                            <th style={{"width": "25%"}}>Name</th>
                                            <th style={{"width": "20%"}}>Product</th>
                                            <th style={{"width": "40%"}}>Ingradients</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {List}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </React.Fragment>
        )
    }
}

export default List;
