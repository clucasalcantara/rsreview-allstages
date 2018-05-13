import apiConfig from '../../config/api'

export const getData = async (path) => await
  fetch(`${apiConfig.address}:${apiConfig.port}/${path}`)
    .then(res => res.json())
  // getData: async (path) => 
  