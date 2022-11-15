import productController from '/js/controllers/product.js';

console.log('🆗: Módulo PageInicio cargado.');
//ante el clik al link tiene q ejecutar los productsCategory
class PageInicio {
    
    static async renderTemplateCards(products) {
        const hbsFile = await fetch('templates/inicio.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        document.querySelector('.cards-container').innerHTML = html;
    }
    
    static async init () {
        console.log('PageInicio.init()');
        
        const products = await productController.getProducts();
        console.log(`Se encontraron ${products.length} productos`);
        //aca tengo que preguntat: si se le hace click a algun link de category
        await PageInicio.renderTemplateCards(products); // esto creo que es lo que hay que llamar y en vez de product, se pasa el resultado de la peticion
        
         // ACA ABAJO SE INTENTA QUE AL DARLE CLICK AL LINK, RENDERICE LOS PRODUCTOS SEGUN CATEGORIA
        //******************** */
        // const category = async () =>{
        //     let footer1 = document.querySelector('.main-footer__list-of-categories')
        //     //console.log(footer1)
        //     footer1.addEventListener('click',(e)=>{
        //         if(e.target.classList.contains('main-footer__list__link')){
        //             e.preventDefault();
        //             return e.target.getAttribute('href');
        //             //console.log(categoryLink)
        //         }})
        //         console.log(category)
        //         let productsCategory = await productController.getProductsCategory(category);// esto es lo q hay q descomentar la rederizar 
        //         await PageInicio.renderTemplateCards(productsCategory);
        // }
        //*********** */

        // VARIABLES PARA EL CARRITO Y MODAL
        const card = document.querySelector('.cards-container')
        const btnClose = document.querySelector('.modal__close-btn');
        //const btnClose2 = document.querySelector('.modal__close-btn');
        const modal = document.querySelector('.modal');
        const cart = document.querySelector('.main-header__cart-button-container');
        const interactiveAdd = document.querySelector('.interactive');
        const interactiveDelete = document.querySelector('#interactiveDelete');
        //const btnDeleteProduct = document.querySelector('.delete-product')
        let allContainerCart = document.querySelector('.cards-container')
        let buyThings = [];
        let priceTotal = document.querySelector('.price-total')
        let countProduct = 0;
        let totalCard = 0;
        let amountProduct = document.querySelector('.count-product')
        let containerModal = document.querySelector('container-modal')


        //FUNCION QUE SI SE EJECUTA "ESCONDE" EL ELEMENTO
        function desaparecer(element){
            element.style.display = 'none';
        }

        // FUNCION QUE CUANDO SE APRETA ESCAPE, SE CIERRA EL MODAL
        document.addEventListener('keydown', e => {
            if(e.code === 'Escape' || e.keyCode === 27 ) {
                modal.style.display = 'none';
            }
        });


        // document.addEventListener('click', (e) => {
        //     if(modal.style.display = 'block' && e.target !== e.target.contains('.modal')){
        //         modal.style.display='none';
        //         console.log(e.target)
        //     }
        // })

        // btnClose.addEventListener('click', (e)=>{// Esto hay que meterlo en la cruz para cerrar el modal
        //     console.log('cambio!');
        //     console.log(e.target)
        //     //btnClose.classList.add('escondido');
        // //     if(btnClose.classList.contains('escondido'){
        // //         btnClose.remove('escondido')
        // //     })else{
        // //         btnClose.classList.add('escondido')
        // // }
        // });
        let row ;

        // cart.addEventListener('click', ()=>{// Esto hay que meterlo en la cruz para cerrar el modal
        //     console.log('cambio!');
        //     modal.classList.toggle('escondido');
        // });
        //variables
        // let allContainerCart = document.querySelector('.cards-container')
        // let buyThings = [];
        // let priceTotal = document.querySelector('.price-total')
        // let countProduct = 0;
        // let totalCard = 0;
        // let amountProduct = document.querySelector('.count-product')
        // let containerModal = document.querySelector('container-modal')

        //eventos del carrito
        loadEventListeners()
        function loadEventListeners(){
            allContainerCart.addEventListener('click', addProduct )
            modal.addEventListener('click', deleteProduct)
        }

        // Mediante el boton comprar, captura el elemento padre que es todo el article(card)
        function addProduct(e){
            if(e.target.classList.contains('card__btn-buy')){
                const selectProduct = e.target.parentElement
                readTheContent(selectProduct)
                //console.log(e.target.parentElement)
            }
            //loadHtml()
        }
         //FUNCION QUE ELIMINA PRODUCTO
        function deleteProduct(e){
            if(e.target.classList.contains('delete-product')){
                const deleteId = e.target.getAttribute('data-id');
            
                buyThings.forEach(value => { // recorremos el array y vamos preguntando si el id del producto es igual al id q hay q borrar
                    if(value.id == deleteId){
                        let priceReduce = parseFloat(value.price) * parseFloat(value.amount); // Guardamos en la variable el valor del precio, multiplicado por dos, para despues restarlo
                        totalCard = totalCard - priceReduce;
                        totalCard = totalCard.toFixed(2); // con .tofixed(2)redondeamos los decimales a solo 2
                    
                    }
                })
                buyThings = buyThings.filter(product => product.id !== deleteId)
                countProduct--;
            
                if(buyThings.length === 0){
                    //console.log('esta vacio')
                    priceTotal.innerHTML = 0;
                    amountProduct.innerHTML = 0;
                    if(modal.style.display = 'block'){
                        modal.style.display = 'none'
                    }
                }
                interactiveDelete.style.display = 'block';
            setTimeout(() => {
                desaparecer(interactiveDelete);
                //interactive.innerHTML = '<p class="container-interactive__message-delete">Eliminaste un producto<p>';
            }, 3000);
                //console.log(e.target.parentElement)
            }
            
            loadHtml();
            
            
        }

        // FUNCION QUE RECIBE EL PRODUCTO Y CON LOS DATOS, CREA EL OBJETO infoProduct 
        function readTheContent(product){
            const infoProduct = {
                image: product.querySelector('div img').src,
                title: product.querySelector('.card__heading').textContent,
                description: product.querySelector('.card__description__chica').textContent,
                price: product.querySelector('div p span').textContent,
                id: product.querySelector('button').getAttribute('data-id'),
                amount: 1
            }
        
            totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
            totalCard = totalCard.toFixed(2);
        
            // el metodo some, devuelve verdadero. entonces recorremos el array y si el id existe, devuelve verdadero
            const exist = buyThings.some(product => product.id === infoProduct.id)
            if(exist){
                const pro = buyThings.map(product => { // recorro el array y si hay un producto igual, incrementa el amount
                    if(product.id === infoProduct.id){
                        product.amount ++;
                        return product;
                    }else{
                        return product
                    }
                });
                buyThings = [...pro];
            }else{
                buyThings = [...buyThings, infoProduct]
                countProduct++
            }
            interactiveAdd.style.display = 'block';
                setTimeout(() => {
                    desaparecer(interactiveAdd);
                }, 3000);
            loadHtml();
        }

            // CREA EL MODAL CON EL CARRITO Y LOS PRODUCTOS QUE TENGA ADENTRO
        function loadHtml(){
            clearHtml()
            buyThings.forEach(product => {
                const {image, title, description, price, amount, id} = product;
                const row = document.createElement('div');
                row.classList.add('modal__product')
                row.innerHTML = `
                    <div class="modal__product">
                        <div class=" container modal__product__img">
                            <img src="${image}" alt="Producto" class="image-modal">
                        </div>
                        <div class=" container modal__product__info">
                            <p class=" item title">${title}</p>
                            <p class=" item description">${description}</p>
                            <p class=" item price"> $${price}</p>
                            <p class="amount"> Cantidad: ${amount}</p>
                        </div>
                        <div class=" container modal__product__btn-eliminar">
                            <span class="delete-product" data-id="${id}">X</span>
                        </div>
                    </div>
                `;
            
                modal.appendChild(row);
            
                priceTotal.innerHTML = totalCard;
            
                amountProduct.innerHTML = countProduct;
            });
        
        }

            // EVENTO SOBRE EL BOTON DEL CARRITO PARA ESCONDERLO, MOSTRARLO O MOSTRAR X SEGUNDOS EL CARTEL DE QUE ESTA VACIO
        cart.addEventListener('click', (e) =>{
            if(modal.style.display = 'none' && buyThings.length > 0){
                modal.style.display = 'block';
                //console.log(e.target);
            }else if (modal.style.display = 'block' && buyThings <= 0){
                modal.style.display = 'block';
                modal.innerHTML = 'Todavia no hay productos en el carrito';
                setTimeout(() => {
                    modal.style.display = 'none';
                    //modal.innerHTML = 'Todavia no hay productos en el carrito';
                }, 3000);
            }
        })

        // cart.addEventListener('click', (e)=>{
        //     if(modal.style.display = 'block'){
        //         modal.style.display = 'none';
        //     }
        // })
        function clearHtml(){
            
            modal.innerHTML =
            `

            <h2>Mi carrito</h2>
            <p class="modal__close-btn">X</p>

            <form method="post" action="/cart" enctype="multipart/form-data">
                
                <button class="btn-buy-cart"> Comprar </button>
                <span>Total: $ <strong class="price-total">${totalCard}</strong></span>
                
            </form>

            
            `;

            // CON ESTO ESCONDE EL MODAL AL TOCAR LA X
            let btnClose2 = document.querySelector('.modal__close-btn')
            btnClose2.addEventListener('click', (e)=>{// Esto hay que meterlo en la cruz para cerrar el modal
                console.log('cambio!');
                //console.log(e.target)
                modal.style.display = 'none'   
                //btnClose.classList.add('escondido');
            //     if(btnClose.classList.contains('escondido'){
            //         btnClose.remove('escondido')
            //     })else{
            //         btnClose.classList.add('escondido')
            // }
            });

            //console.log(btn_buy)
            
            //EVENTO Y FUNCION PARA ENVIAR EL CARRITO AL SERVIDOR Y POSTERIORMENTE DESDE ALLA IMPRIMIRLO EN CONSOLA
            let btn_buy = document.querySelector('.btn-buy-cart')
            btn_buy.addEventListener('click', async (e) =>{
                //console.log(buyThings)        
                    try {
                        return await fetch('http://localhost:8080/cart', {
                            method: 'post',
                            body: JSON.stringify(buyThings),
                            headers: { 'content-type': 'application/json' }
                        }).then(r => r.json());
                    } catch (e) {
                        console.error('ERROR POST' + e);
                    }
                
            })
            // window.addEventListener('click', (e)=>{
            //     if(e.target !contains('modal__product') ){
            //         modal.style.display = 'none'
            //         console.log('lalala')
            //     }
            // })
        }

    }
        


}

export default PageInicio;
