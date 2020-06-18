import React from 'react'

function Item(props) {
    console.log('props:', props)
    return (
        <div className="columns is-vcentered is-mobile is-gapless">
            <div className="column is-5 d-flex">
                <div className="paddingitem">
                    <i className="fa fa-dot-circle-o has-text-success" aria-hidden="true"></i>
                </div>
                <div>
                <h5 className="title is-5">{props.data.name}</h5>
                    <h6 className="subtitle is-6">${props.data.price}</h6>
                </div>
            </div>
            <div className="column is-4 has-text-centered">
                <h5 className="title is-5 mb-0">Quantity</h5>
                <span>{props.data.item}</span>
            </div>
            <div className="column has-text-right">
                <span
                    className="tag is-success is-normal m-1"
                    onClick={() => props.updateItem('remove', props.keyname, props.data)}>
                    <i className="fa fa-minus"></i>
                </span>
                <span
                    className="tag is-success is-normal m-1"
                    onClick={() => props.updateItem('add', props.keyname, props.data)}>
                    <i className="fa fa-plus"></i>
                </span>
            </div>
        </div>
    )
}

export default Item