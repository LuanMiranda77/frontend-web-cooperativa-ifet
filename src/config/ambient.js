if(process.env.NODE_ENV === "production"){
    module.exports = {apiURI: 'https://agility-ecommerce-api.herokuapp.com/'}
}else{
    module.exports = {apiURI: 'http://localhost:8080/'}
}