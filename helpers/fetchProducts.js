const fetchProducts = async (data) => {
  try {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${data}`;
  const promise = await fetch(url);
  
  const response = await promise.json();
  return response;  
} catch (error) { 
  return (error);
 }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
