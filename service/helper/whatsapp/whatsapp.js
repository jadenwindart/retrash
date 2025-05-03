module.exports.sendMessage = ({phoneNumber,message}) => {
    let data = JSON.stringify({
        "phone": phoneNumber,
        "message": message
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://45.76.157.102:8069/api/v1/message/private',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiIxIiwic3ViIjoidXNlciIsImV4cCI6MTc0NTkwMTA3MywiaWF0IjoxNzQ1ODk3NDczfQ.17d8DoqM24IYLkMNoAP_X9Vt_nOpqTFifZ5H7NAdO8E'
        },
        data : data
      };
      
    return fetch(url, config)
}