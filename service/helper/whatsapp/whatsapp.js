const _ = require('lodash')

WTS_HOST =process.env.WTS_HOST

const generateAccessToken = () => {
    const data = JSON.stringify({
        "email": "god@mode.com",
        "password": "123"
    });

    const url = `${WTS_HOST}/api/v1/login`;

    const config = {
        method: 'POST',
        body: data,
        headers: { 
            'Content-Type': 'application/json'
        },
    };

    return fetch(url, config)
}

module.exports.sendMessage = async ({phoneNumber,message}) => {
    let data = JSON.stringify({
        "phone": phoneNumber,
        "message": message
    });

    const accessTokenRequest = await generateAccessToken().then(res => res.json())

    console.log(accessTokenRequest)
    const accessToken = _.get(accessTokenRequest, 'data.token.bearer')

    const url = `${WTS_HOST}/api/v1/message/private`;
    
    console.log(data)
    const config = {
        method: 'POST',
        body: data,
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${accessToken}`
        },
    };
      
    return fetch(url, config)
}