import { useState } from 'react'
import Botao from '../Botao'
import CampoTexto from '../CampoTexto/CampoTexto'
import './Formulario.css'


const Formulario = (props) => {

    

    const backend_post = process.env.REACT_APP_BACKEND_POST

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
      // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    let value = params.bucket; // "some_value"
    let backend1 = params.backend

    console.log(params.bucket)

    console.log(backend_post)

    const end = backend1 + '/buckets/' + value + '/objects'

    console.log('POST endereco de teste ' + backend_post)

    console.log('POST endereco final ' + end)

    const [file, setFile] = useState('')
    const [text, setText] = useState('')
    
    const aoSalvar = (evento) => {
        evento.preventDefault()
        props.aoArquivoCadastrado({
            file,
            text
        })

        fetch(end, {
            method: "POST",
            body: JSON.stringify({
                "ObjectName": file,
                "text": text
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            


        setFile('')
        setText('')
    }

    return (
        <section className="formulario">
            <form onSubmit={aoSalvar}>
                <h2>Envio de arquivos do Backend para o Bucket permissionado pelo modulo IAMSR</h2>

                <CampoTexto 
                    obrigatorio={true} 
                    label="FileName" 
                    placeholder="arquivo.txt"
                    valor={file}
                    aoAlterado={valor => setFile(valor)} 
                />
                <CampoTexto 
                    obrigatorio={true} 
                    label="Text" 
                    placeholder="Texto dentro do arquivo"
                    valor={text}
                    aoAlterado={valor => setText(valor)} 
                />
                <Botao>
                    Enviar arquivo
                </Botao>
            </form>
        </section>
    )

}

export default Formulario