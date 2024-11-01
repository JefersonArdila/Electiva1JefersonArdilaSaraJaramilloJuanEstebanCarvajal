import React, { useState, useEffect } from "react";
import {
  Tweetbox,
  Div,
  Avatar,
  Form,
  DivBox,
  File,
  Notification,
} from "./styles";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import { Button } from "@mui/material";
import { db, storage, auth } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import User from "../../img/user.jpg";

export const TweetBox = () => {
  const [tweetMsg, setTweetMsg] = useState("");
  const [usuario, setUsuario] = useState("");
  const [images, setImages] = useState("");
  const [tweetImg, setTweetImg] = useState("");
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsuario(storedUsername);
    }

    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setImages(userData.profilePicture || User); // Usa la imagen o la imagen por defecto
        }
      }
    };

    fetchUserProfile();
  }, []);

  const updateProfilePicture = async (url) => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { profilePicture: url }, { merge: true });
    }
  };

  const handleSubir = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `/avatar/${file.name}`);
    uploadBytes(storageRef, file)
      .then(() => getDownloadURL(storageRef))
      .then((url) => {
        setImages(url);
        updateProfilePicture(url); // Guarda la URL en Firestore
      })
      .catch((error) => {
        console.error("Error al cargar la imagen:", error);
      });
  };

  const enviarTweet = async (e) => {
    e.preventDefault();
    if (tweetMsg.length < 5 || tweetMsg.length > 280) {
      return alert("Tu tweet debe estar entre 5 y 280 caracteres.");
    }
    await addDoc(collection(db, "posts"), {
      name: usuario,
      username: usuario,
      verified: true,
      text: tweetMsg,
      timestamp: Date.now(),
      avatar: images,
      imagePost: tweetImg,
    });
    setTweetImg("");
    setTweetMsg("");
    setMostrarNotificacion(true);
    setTimeout(() => setMostrarNotificacion(false), 3000);
  };

  const handlePost = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(storage, `/Post/${file.name}`);
    uploadBytes(storageRef, file)
      .then(() => getDownloadURL(storageRef))
      .then((url) => setTweetImg(url))
      .catch((error) => {
        console.log("Error al cargar la imagen:", error);
      });
  };

  return (
    <Tweetbox>
      {mostrarNotificacion && <Notification>Your post was published!</Notification>}
      <Form>
        <Div>
          <Avatar src={images || User} alt="User avatar" />
          <File type="file" onChange={handleSubir} />
          <div className="columns">
            <input
              type="text"
              placeholder="Déjanos un tweet"
              value={tweetMsg}
              onChange={(e) => setTweetMsg(e.target.value)}
            />
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
        </Div>

        <Div>
          <DivBox>
            <File type="file" primary onChange={handlePost} />
            <BrokenImageOutlinedIcon />
            <GifBoxOutlinedIcon />
          </DivBox>

          <input
            type="text"
            placeholder="Opcional: Url de la imagen/gif"
            value={tweetImg}
            onChange={(e) => setTweetImg(e.target.value)}
          />
          <Button onClick={enviarTweet} type="submit">
            Post
          </Button>
        </Div>
      </Form>
    </Tweetbox>
  );
};
