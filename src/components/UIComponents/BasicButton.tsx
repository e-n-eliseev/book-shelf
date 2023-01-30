import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FC } from 'react';
import { IButton } from '../../types/types';

const BasicButton: FC<IButton> = ({ textBtn, authed = true, vision = false, handleDoing, children }) => {
  return (
    <Stack spacing={2} direction="row" sx={{
      background: "#FFCA42",
      border: "2px solid #FFCA42",
      borderRadius: "18px",
      margin: "1px"
    }}>
      <Button variant="text" disabled={!authed || !!vision} onClick={handleDoing} >{children}{textBtn}</Button>
    </Stack>
  );
}

export default BasicButton;