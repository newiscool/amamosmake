import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { quickviewAttributes, addCart, resetBuy, setQuickviewSaleable } from '../../actions';
import Images from '../images/index.jsx';
import Prices from '../prices/index.jsx';
import Variants from '../variants/index.jsx';
import config from '../../config.json';

import './css/index.styl';

class quickview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: undefined,
            visible: false,
            name: '',
            sku: '',
            description: '',
            hasVariants: false,
            availabled: true,
            saleable: false,
            qtd: 1,
            store: 0,
            hash: 0,
            url: ''
        };
    }

    close(event) {
        if(event.target.classList.contains('quickview')
            || event.target.classList.contains('quickview__button--close')
            || event.target.classList.contains('quickview__button--continue')) {

            this.setState({
                id: undefined,
                visible: false,
                name: '',
                sku: '',
                descriptionSmall: '',
                hasVariants: false,
                availabled: true,
                saleable: false,
                qtd: 1,
                store: 0,
                hash: 0,
                url: ''
            });

            this.props.setAttributes(0, 0 ,'', [], true, false);
            document.querySelector('body').classList.remove('quickview--loaded');
        }
    }

    init(button) {
        let id = button.getAttribute('data-id');
        
        this.setState({ id });
        this.props.resetBuy();

        axios.get('/web_api/products/' + id)
            .then(response => response.data)
            .then(data => {
                let price   = parseFloat(data.Product.price);
                let offer   = parseFloat(data.Product.promotional_price);
                let payment = data.Product.payment_option;
                let images  = data.Product.ProductImage.map(image => (image.https).replace('https:', ''));
                let availabled  = parseInt(data.Product.available) == 1 ? true : false;
                let saleable    = false;

                if(data.Product.payment_option_details.length) {
                    payment = '<span>' + data.Product.payment_option_details[0].plots + 'x</span> de <span>' + new Intl.NumberFormat('pt-br', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(data.Product.payment_option_details[0].value) + '</span>';
                }

                this.setState({
                    id: id,
                    visible: true,
                    name: data.Product.name,
                    descriptionSmall: data.Product.description_small,
                    sku: data.Product.id,
                    hasVariants: parseInt(data.Product.has_variation) == 1 ? true : false,
                    store: document.querySelector('html').getAttribute('data-store'),
                    hash: document.querySelector('html').getAttribute('data-session'),
                    url: data.Product.url.http.replace('http:', '')
                });

                this.props.setAttributes(price, offer ,payment, images, availabled, saleable);
                document.querySelector('body').classList.add('quickview--loaded');

                console.log('[ Quickview ] Load Product:', this.state, this.props);
            });


    }

    updateInputQtd(event) {
        let qtd = event.target.value;
        if(qtd < 1) qtd = 1;

        this.setState({ qtd });
        this.props.resetBuy();
    }

    componentWillMount() {
        let buttons = document.querySelectorAll('[data-quickview-button]');
        Array.from(buttons).forEach(button => button.addEventListener('click', e => this.init(e.currentTarget)));
    }

    buy(event) {
        let cart = {
            session_id: this.state.hash,
            product_id: this.state.id,
            quantity: this.state.qtd,
            variant_id: 0
        };

        if(this.state.hasVariants) {
            if (this.props.skuSelected && this.state.qtd) {
                cart.variant_id = this.props.skuSelected.id;
            }
        }

        this.props.addCart([cart]);
    }

    render() {

        let variants;

        if(this.state.hasVariants)
            variants = <Variants
                            id={this.state.id}
                            price={this.props.price}
                            offer={this.props.offer}
                            payment={this.props.payment}
                            images={this.props.images}
                            availabled={this.props.availabled}
                            saleable={this.props.saleable}
                            type={config.quickview.variants}/>;

        else
            return <div style={{ "display": "none" }}></div>

        if(this.props.availabled && !this.state.hasVariants)
            this.props.setSaleable(true);

        return <section onClick={event =>{ this.close(event) }} aria-hidden={!this.state.visible} className="quickview" id="quickview" >
            {this.props.isFinish || <div className="quickview__container">
                <button onClick={event =>{ this.close(event) }} className="quickview__button quickview__button--close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><title>close</title><g data-name="Camada 2"><path d="M14.93 4A8 8 0 0 0 12 1.07 7.83 7.83 0 0 0 8 0a7.83 7.83 0 0 0-4 1.07A8 8 0 0 0 1.07 4 7.83 7.83 0 0 0 0 8a7.83 7.83 0 0 0 1.07 4A8 8 0 0 0 4 14.93 7.83 7.83 0 0 0 8 16a7.83 7.83 0 0 0 4-1.07A8 8 0 0 0 14.93 12 7.83 7.83 0 0 0 16 8a7.83 7.83 0 0 0-1.07-4zm-3.16 5.9a.64.64 0 0 1 .2.47.65.65 0 0 1-.2.48l-.94.94a.65.65 0 0 1-.48.2.64.64 0 0 1-.47-.2L8 9.89l-1.89 1.88a.64.64 0 0 1-.47.2.65.65 0 0 1-.48-.2l-.94-.94a.65.65 0 0 1-.2-.48.64.64 0 0 1 .2-.47L6.11 8 4.23 6.11A.64.64 0 0 1 4 5.65a.65.65 0 0 1 .2-.48l.94-.94A.65.65 0 0 1 5.65 4a.64.64 0 0 1 .47.2L8 6.11l1.89-1.88a.64.64 0 0 1 .47-.2.65.65 0 0 1 .48.2l.94.94a.65.65 0 0 1 .2.48.64.64 0 0 1-.2.47L9.89 8z" data-name="Capa 1"/></g></svg>
                </button>

                <Images images={this.props.images} />

                <div className="quickview__main">
                    <h1 className="quckview__name">{this.state.name}</h1>

                    <h2 className="quickivew__sku">Código: {this.state.sku}</h2>

                    <p class="quickview__small-description">
                        {this.state.descriptionSmall}
                    </p>

                    {!this.props.availabled ||
                    <Prices price={this.props.price} offer={this.props.offer} payment={this.props.payment}/>
                    }

                    {variants}

                    {!this.props.availabled ||
                    <div className="quickview__actions">
                        <input disabled={!this.props.saleable} type="number" className="quickview__qtd" value={this.state.qtd} onChange={(e) => {this.updateInputQtd(e)}} />
                        <button disabled={!this.props.saleable} className="quickview__button--addcart" onClick={(e) => {this.buy(e)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 20"><title>cart</title><g data-name="Camada 2"><path d="M16 17.29l-1.15-12.9a.55.55 0 0 0-.55-.5h-2.35a3.95 3.95 0 0 0-7.9 0H1.7a.55.55 0 0 0-.55.5L0 17.29A2.85 2.85 0 0 0 3 20h10a2.85 2.85 0 0 0 3-2.66.2.2 0 0 0 0-.05zM8 1.1a2.85 2.85 0 0 1 2.85 2.79h-5.7A2.85 2.85 0 0 1 8 1.1zm5 17.8H3a1.76 1.76 0 0 1-1.9-1.53L2.2 5H4v1.67a.55.55 0 1 0 1.1 0V5h5.69v1.67a.55.55 0 1 0 1.1 0V5h1.91l1.1 12.36A1.76 1.76 0 0 1 13 18.9z" data-name="Capa 1"/></g></svg>
                            Adicionar à Sacola
                        </button>
                        <a href={this.state.url} className="quickview__link quickview__link--more">mais detalhes do produto</a>
                    </div>
                    }

                    {!this.props.isError.error || <div className="quickview__error">
                        {this.props.isError.msg}
                    </div>}

                    {this.props.availabled ||
                    <div className="quickview__unavailable">
                        No momento este produto está indisponível.
                    </div>
                    }
                </div>
            </div>}
            {!this.props.isFinish || <div className="quickview__container quickview__finish">
                <button onClick={event =>{ this.close(event) }} className="quickview__button quickview__button--close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><title>close</title><g id="Camada_2" data-name="Camada 2"><g id="Layer_1" data-name="Layer 1"><path d="M75.19,50,98.68,26.51a4.51,4.51,0,0,0,0-6.38L79.87,1.32a4.51,4.51,0,0,0-6.38,0L50,24.81,26.51,1.32a4.51,4.51,0,0,0-6.38,0L1.32,20.13a4.51,4.51,0,0,0,0,6.38L24.81,50,1.32,73.49a4.51,4.51,0,0,0,0,6.38L20.13,98.68a4.51,4.51,0,0,0,6.38,0L50,75.19,73.49,98.68a4.51,4.51,0,0,0,6.38,0L98.68,79.87a4.51,4.51,0,0,0,0-6.38Z"/></g></g></svg>
                </button>
                <div className="quckview__actions">
                    <button onClick={event =>{ this.close(event) }} className="quickview__button quickview__button--continue" type="button">Continuar Comprando</button>
                    <a className="quickview__button quickview__button--finish" href={ '/loja/carrinho.php?loja='+this.state.store+'&transID='+this.state.hash+'&hash='+this.state.hash }>Finalizar Compra</a>
                </div>
            </div>}
        </section>;
    }

}

quickview.propTypes = {
    price: PropTypes.number.isRequired,
    offer: PropTypes.number.isRequired,
    payment: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    availabled: PropTypes.bool.isRequired,
    saleable: PropTypes.bool.isRequired,
    skuSelected: PropTypes.object,
    isBuy: PropTypes.bool.isRequired,
    isFinish: PropTypes.bool.isRequired,
    isError: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        price: state.quickviewPrice,
        offer: state.quickviewOffer,
        payment: state.quickviewPayment,
        images: state.quickviewImages,
        availabled: state.quickviewAvailabled,
        saleable: state.quickviewSaleable,
        skuSelected: state.quickviewSkuSelected,
        isBuy: state.isBuy,
        isFinish: state.buyFinish,
        isError: state.buyError
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setAttributes: (price,offer,payment, images, availabled, saleable) => dispatch(quickviewAttributes(price,offer,payment, images, availabled, saleable)),
        addCart: (cart) => dispatch(addCart(cart)),
        resetBuy: () => dispatch(resetBuy()),
        setSaleable: (saleable) => dispatch(setQuickviewSaleable(saleable))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(quickview);
