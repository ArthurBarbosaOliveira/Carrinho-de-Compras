const fetchItem = async (ItemID) => {
  try {
    const url = `https://api.mercadolibre.com/items/${ItemID}`;
    const promise = await fetch(url);
    
    const response = await promise.json();
    return response;  
  } catch (error) { 
    return (error);
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
