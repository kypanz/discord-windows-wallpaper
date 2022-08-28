/*
    This is the function that are used to save the image 
    and is used for your windows background
*/

import { getWallpaper, setWallpaper } from 'wallpaper';
import fs from 'fs';
import axios from 'axios';

 const changeImage = async (_image) => { 
    const response = await axios({
        method:'get',
        url : _image,
        responseType : 'arraybuffer'
    });
    fs.writeFile('./images/actual_image.jpg', response.data, (err) => {
        if(err) return console.log('Error al intentar guardar imagen. ',err);
        console.log('imagen guardada.');
    });
    await setWallpaper('./images/actual_image.jpg');
}

//const image = 'https://static01.nyt.com/images/2022/05/10/science/28DOGS-BEHAVIOR1/28DOGS-BEHAVIOR1-mobileMasterAt3x.jpg';
//changeImage(image);

export default changeImage;