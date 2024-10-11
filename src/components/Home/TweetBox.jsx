import React, { useState,useEffect } from 'react';
import { Tweetbox, Div, Avatar, Form, DivBox, File } from "./styles";
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import { Button } from '@mui/material';
import { db, storage } from '../../firebase'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import User from '../../img/user.jpg';
import { Timestamp } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore'; 

export const TweetBox = () => {
  const [tweetMsg, setTweetMsg]= useState('');
  const[usuario,setUsuario] = useState('');
  const [images, setImages] = useState('');
  const [tweetImg, setTweetImg] = useState('');


  useEffect(() =>{
    const perfil = JSON.parse(localStorage.getItem('Perfil'))
    if(perfil){
      setImages(perfil)
    }
  },[])

  useEffect(() =>{
    localStorage.setItem('Perfil',JSON.stringify(images))
  },[images])

  

  const sendTweet = async (e) =>{
    e.preventDefault()
    if(usuario.length < 1){
      return alert("Debes ingresar un nombre de usuario")
    }
    if (images.length < 1){
      return alert("Debes ingresar una foto de usuario")
    }
    if(tweetMsg.length < 5){
      return alert("Tu tweet debe ser mayor a 5 caracteres")
    }
    if(tweetMsg.length > 300){
      return alert("Tu tweet debe ser menor a 300 caracteres")
    }else{
      await addDoc(collection(db, 'posts'), {
        name: usuario,
        username: usuario,
        verified: true,
        text: tweetMsg,
        timestamp: Date.now(),
        avatar: images,
        imagePost: tweetImg
      });

      setTweetImg('')
      setTweetMsg('')
      setUsuario('')
    }

    
  }

  const handleSubir = (e) => {
    const file = e.target.files[0];
    if (!file) return; 

    const storageRef = ref(storage, `/avatar/${file.name}`); 

    uploadBytes(storageRef, file).then(() => {
    
      getDownloadURL(storageRef)
      .then(url => {
        setImages(url); 
      }).catch(error => {
        console.log('Error al obtener la URL:', error);
      });
    }).catch(error => {
      console.log('Error al subir el archivo:', error);
    });
  };


    const handlePost = (e) =>{
      const file = e.target.files[0];
    if (!file) return; 

    const storageRef = ref(storage, `/Post/${file.name}`); 

    uploadBytes(storageRef, file).then(() => {
      
      getDownloadURL(storageRef)
      .then(url => {
        setTweetImg(url); 
      }).catch(error => {
        console.log('Error al obtener la URL:', error);
      });
    }).catch(error => {
      console.log('Error al subir el archivo:', error);
    });

    };


  return (
    <Tweetbox>
      <Form>
        <Div>
          {
            images ? <Avatar src={images} alt=''/>:<Avatar src={User} alt=''/>
          }
          
          <File type="file" onChange={handleSubir} />
          <div className='columns'>
            <input
              type="text"
              placeholder="Déjenos un tweet"
              value={tweetMsg}
              onChange={e => setTweetMsg(e.target.value)}
            />
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={e => setUsuario(e.target.value)}

            />
          </div>
        </Div>
        
        <Div>
          <DivBox>

            <File type="file" primary onChange={handlePost} />
            <BrokenImageOutlinedIcon />
            
            <GifBoxOutlinedIcon />
            
          </DivBox>
          <File type="file"onChange={handlePost} />
          <input
            type="text"
              placeholder="Opcional: Url de la imagen/gif"
              value={tweetImg}
              onChange={e=>setTweetImg(e.target.value)}
          />
          <Button
          onClick={sendTweet}
          type='submit'

          >
            
            Post</Button>
        </Div>
      </Form>
    </Tweetbox>
  );
};
