
import { useState } from 'react';
import { useEffect } from 'react';
import Banner from './componentes/Banner/Banner';

import Formulario from './componentes/Formulario';
import Time from './componentes/Time';

function App() {

  

  const backend_get = process.env.REACT_APP_BACKEND_GET


  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  let value = params.bucket; // "some_value"
  let backend1 = params.backend
  console.log(params.bucket)




  console.log('GET endereco de teste ' + backend_get)


  const end = backend1 + '/buckets/' + value + '/objects'


  console.log('GET endereco final ' + end)

  
  // CATCHING FROM API
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(end)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);

  console.log(data)

  const data1 = [
    "teste",
    "teste1",
    "teste5"
  ]

  console.log(data1)


  const times = [
    {
      nome: 'S3 Files',
      corPrimaria: '#808080',
      corSecundaria: '#696969'
    }
  ] 

  const [arquivos, setArquivos] = useState([])

  const aoNovoArquivoAdicionado = (arquivo) => {
    console.log(arquivo)
    setArquivos([...arquivos, arquivo])
  }

  return (
    <div className="App">
      <Banner />
      <Formulario times={times.map(time => time.nome)} aoArquivoCadastrado={arquivo => aoNovoArquivoAdicionado(arquivo)} />
      {times.map(time => <Time key={time.nome} nome={time.nome} corPrimaria={time.corPrimaria} corSecundaria={time.corSecundaria} arquivos={arquivos} data={data}/>)}
    </div>
  );
}

export default App;
