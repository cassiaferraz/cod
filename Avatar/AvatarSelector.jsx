import React, { useState } from 'react';
import avatar1 from '/avatar/Avatar1.png'
import avatar2 from '/avatar/Avatar2.png'
import avatar3 from '/avatar/Avatar3.png'
import avatar4 from '/avatar/Avatar4.svg'
import avatar5 from '/avatar/Avatar5.png'
import avatar6 from '/avatar/Avatar6.png'
import avatar7 from '/avatar/Avatar7.svg'
import avatar8 from '/avatar/Avatar8.svg'
import avatar9 from '/avatar/Avatar9.svg'
import avatar10 from '/avatar/Avatar10.svg'
import avatar11 from '/avatar/Avatar11.svg'
import avatar12 from '/avatar/Avatar12.png'

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12
];

function AvatarSelector({ onSelect }) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleSelect = (avatar) => {
    setSelectedAvatar(avatar);
    onSelect(avatar);
  };

  return (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {avatars.map((avatar, index) => (
        <img
          key={index}
          src={avatar}
          alt={`Avatar ${index + 1}`}
          onClick={() => handleSelect(avatar)}
          style={{
            cursor: 'pointer',
            border: selectedAvatar === avatar ? '4px solid rgb(102, 0, 153)' : 'none',
            borderRadius: '50%',
            width: '100px',
            height: '100px',
          }}
        />
      ))}
    </div>
  );
}

export default AvatarSelector;