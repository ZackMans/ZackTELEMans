const axios = require("axios");

const cookie = { 
    "cookie": 'sessionid=29837335308:8jmOAwWl9yqPEG:14:AYfVRWXF5rjCZ8w4vqLGxMf1U2iBZjXmETVnj4x_Lg', 
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36", 
    "x-asbd-id": "129477", 
    "x-csrftoken": "Zcvcc4Ww4Az0WDs3cDLliLU4LeqIZlhT", 
    "x-ig-app-id": "936619743392459", 
    "x-ig-www-claim": "hmac.AR3ajL_pzSvqLdRm8n0mkI4PUkUJQaRD9Oi9fIwZJs19tZiF" 
} 
 
const stalk = async (user) => { 
    try { 
        const {data} = await axios.get('https://i.instagram.com/api/v1/users/web_profile_info/?username=' + user, { 
            headers: cookie
        }) 
        return (data.status == 'ok' ? { 
            status: true, 
            user: data.data.user, 
        } : {status: false, message: 'user not found'}) 
    } catch (e){ 
        return ({ 
            status: false, 
            message: e, 
        }) 
    } 
}

const story = async (user) => {
  	try {
  		const userdata = await stalk(user)
  		if (!userdata.status) return ({
  			status: false,
  			message: 'user not found'
  		})
  		const {
  			data
  		} = await axios.get(`https://i.instagram.com/api/v1/feed/user/${userdata.data.id}/story/`, {
  			headers: cookie
  		})
  		const url = []
  		for (let i of data.reel.items) {
  			if (i.video_duration == 5 || i.video_duration == undefined) url.push({
  				type: 'image',
  				url: i.image_versions2.candidates[0].url
  			})
  			else url.push({
  				type: 'video',
  				url: i.video_versions[0].url
  			})
  		}
  		const result = {
  			status: true,
  			user: data.reel.user,
  			story: url
  		}
  		return result
  	} catch(e) {
  		return ({
  			status: false,
  			message: 'user not found',
  			error: e
  		})
  	}
}

module.exports = { stalk, story };