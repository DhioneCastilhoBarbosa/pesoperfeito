import axios from 'axios'

const api = axios.create({
  //baseURL: 'https://api-pesoperfeito.onrender.com/'
  //baseURL: 'http://localhost:3000' // desenvovimento
   baseURL: 'http://3.147.63.120:3000' // AWS-EC2
  
 })

 api.interceptors.response.use(
  (response) => response, // Retorna a resposta normalmente
  (error) => {
    // Você pode logar ou exibir mensagens aqui
    console.error('Erro na API:', error.response || error.message);
    return Promise.reject(error); // Deixa o erro disponível para tratamento local
  }
);

 export default api