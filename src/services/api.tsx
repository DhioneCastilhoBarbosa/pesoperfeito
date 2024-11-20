import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-pesoperfeito.onrender.com/'
  
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