import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { useRecoilState } from 'recoil';
import { urlState } from '../automs/AnalyricsAtom';

const UrlInput = () => {
  const [url, setUrl] = useRecoilState(urlState)

  const handleChange = (event) => {
    const value = event.target.value;

    if (!value.startsWith('https://')) {
      setUrl(`https://${value.replace(/^https?:\/\//, '')}`);
    } else {
      setUrl(value);
    }
  };

  return (
    <TextField
      label="Enter URL"
      variant="outlined"
      value={url}
      onChange={handleChange}
      fullWidth
      sx={{
        bgcolor: '#ffffff'}}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LinkIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default UrlInput;
