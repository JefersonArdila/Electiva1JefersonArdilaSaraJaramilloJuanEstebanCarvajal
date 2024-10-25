import React, { useState, useEffect } from 'react';
import { Contenedor, UserInfoContainer, UserStats } from './styles';
import XIcon from '@mui/icons-material/X';
import { IconOption } from './IconOption';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import BrowserNotSupportedRoundedIcon from '@mui/icons-material/BrowserNotSupportedRounded';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import BoltIcon from '@mui/icons-material/Bolt';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Button } from '@mui/material';

export const Sidebar = ({ onFollowingClick, onFollowersClick }) => {
  // Estados locales para los contadores
  const [followingCount, setFollowingCount] = useState(13);
  const [followersCount, setFollowersCount] = useState(15);

  // Restablecer los contadores cuando se cambia de página
  useEffect(() => {
    setFollowingCount(13);  // Valor quemado original para Following
    setFollowersCount(15);  // Valor quemado original para Followers
  }, []);

  // Función para aumentar el contador de "Following"
  const handleFollowingIncrement = () => {
    setFollowingCount(prev => prev + 1);  // Aumentamos el contador
    onFollowingClick();  // Ejecutamos la función para mostrar la lista de Following
  };

  // Función para aumentar el contador de "Followers"
  const handleFollowersIncrement = () => {
    setFollowersCount(prev => prev + 1);  // Aumentamos el contador
    onFollowersClick();  // Ejecutamos la función para mostrar la lista de Followers
  };

  return (
    <Contenedor>
      <XIcon className='XLogo' />

      <UserInfoContainer>
        {/* Sección de "Following" */}
        <UserStats>
          <h4>Following</h4>
          {/* Aumenta el contador de Following al hacer clic */}
          <p onClick={handleFollowingIncrement} style={{ cursor: 'pointer' }}>{followingCount}</p>
        </UserStats>

        {/* Sección de "Followers" */}
        <UserStats>
          <h4>Followers</h4>
          {/* Aumenta el contador de Followers al hacer clic */}
          <p onClick={handleFollowersIncrement} style={{ cursor: 'pointer' }}>{followersCount}</p>
        </UserStats>
      </UserInfoContainer>

      <br />

      {/* Opciones del menú */}
      <IconOption active text="Home" Icon={HomeRoundedIcon} />
      <IconOption text="Explore" Icon={SearchRoundedIcon} />
      <IconOption text="Notifications" Icon={NotificationsNoneRoundedIcon} />
      <IconOption text="Messages" Icon={MailOutlineRoundedIcon} />
      <IconOption text="Grok" Icon={BrowserNotSupportedRoundedIcon} />
      <IconOption text="Communities" Icon={PeopleOutlineIcon} />
      <IconOption primary text="Premium" Icon={XIcon} />
      <IconOption primary text="Business" Icon={BoltIcon} />
      <IconOption primary text="Profile" Icon={PermIdentityOutlinedIcon} />
      <IconOption primary text="More" Icon={MoreHorizOutlinedIcon} />

      <br />
      <br />

      {/* Botón para publicar un nuevo tweet */}
      <Button variant='outlined' fullWidth>Post</Button>
    </Contenedor>
  );
};
