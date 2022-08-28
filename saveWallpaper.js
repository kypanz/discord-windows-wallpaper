/*
    This is the function that are used to save the image 
    and is used for your windows background
*/

import { setWallpaper } from 'wallpaper';
import fs from 'fs';
import axios from 'axios';

 const changeImage = async (_image) => { 
    try {
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
    } catch (error) {
        console.log('error in changeImage function ...');
        console.log(error);
    }
}

export default changeImage;