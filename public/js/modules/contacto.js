
console.log('🆗: Módulo PageContacto cargado.');

class PageContacto {

    static async init () {
        console.log('PageContacto.init()');

        
            const inputName = document.getElementById('name')
            const inputEmail = document.getElementById('email')
            const inputComentarios = document.getElementById('textarea')
            const errorName = document.querySelector('.form__name-error')
            const errorEmail = document.querySelector('.form__email-error')
            const errorComentarios = document.querySelector('.form__textarea-error')
            const form = document.querySelector('.form')
            const elementForm = document.querySelectorAll('.formContact')
            console.log(elementForm)
            
            const expresionesContact ={
                name: /^[a-záéíóúüñA-ZÁÉÍÓÚÑ0-9.,-\s\'\"\_\-]{1,30}$/,
                mail: /^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$/,
                textarea: /^(.*){10,2000}$/,
            }
            
            const validarFormulario = (e) => {
                switch(e.target.name){
                    case 'name':
                        if(expresionesContact.name.test(e.target.value)){
                            errorName.style.display = 'none';
                        }else{
                            errorName.style.display = 'block';
                        }
                    break;
                    case 'mail':
                        if(expresionesContact.name.test(e.target.value)){
                            errorEmail.style.display = 'none';
                        }else{
                            errorEmail.style.display = 'block';
                        }
                    break;
                    case 'textarea':
                        if(expresionesContact.name.test(e.target.value)){
                            errorComentarios.style.display = 'none';
                        }else{
                            errorComentarios.style.display = 'block';
                        }
                }
            }
            
            
            
            elementForm.forEach((element) => {
                element.addEventListener('keyup', validarFormulario);
                element.addEventListener('blur', validarFormulario);
                
            })
            
            form.addEventListener('submit', (e) =>{
                e.preventDefault();
                //validarFormulario;
            })
        
    }
}

export default PageContacto;
