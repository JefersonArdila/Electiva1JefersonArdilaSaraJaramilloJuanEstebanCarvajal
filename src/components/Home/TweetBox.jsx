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
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [images, setImages] = useState(User);
  const [tweetImg, setTweetImg] = useState("");
  const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFullName(userData.fullName || "Nombre Completo");
          setUsername(userData.username);
          setImages(userData.profilePicture || User); //poniendo la imagen de perfil de cada uno
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
        updateProfilePicture(url); // Guarda la URL en Firestore para que se muestrbn
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
      name: fullName,
      username: username,
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
      {mostrarNotificacion && (
        <Notification>¡Your post was published!</Notification>
      )}
      <Form>
        <Div>
          <Avatar src={images} alt="User avatar" />
          <File type="file" onChange={handleSubir} />
          <div className="columns">
            <textarea
              placeholder="Déjanos un tweet"
              value={tweetMsg}
              onChange={(e) => setTweetMsg(e.target.value)}
              rows={4} // Área de texto con varias líneas
            />
            <input
              type="text"
              placeholder="Usuario"
              value={username || "Usuario"} // para que muestre estático
              readOnly // Campo de usuario en solo lectura
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
