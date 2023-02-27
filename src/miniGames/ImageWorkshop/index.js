import React, { useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const useStyles = makeStyles({
  convolve: {
    padding: 25,
  },
  threshold: {
    padding: 25,
  },
  kernelInput: {
    width: 90,
  },
  slider: {
    width: 600,
    display: "block",
  },
});

export default function InputSlider() {
  const classes = useStyles();
  const [hValue, sethValue] = React.useState(3);
  const [vValue, setvValue] = React.useState(3);
  const [thresholdValue, setThresholdValue] = React.useState(0);
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState("");
  const [base64, setBase64] = useState();
  const onChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = _handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;
    setBase64(btoa(binaryString));
  };
  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setFile(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const convertBase64ToFile = function (image) {
    const byteString = atob(image);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const newBlob = new Blob([ab], {
      type: "image/jpeg",
    });
    setFile(newBlob);
    setImagePreview("data:image/jpeg;base64," + image);
    setBase64(image);
  };
  const remove = () => {
    setFile("");
    setImagePreview("");
    setBase64("");
  };
  const handleVSliderChange = (event, newValue) => {
    setvValue(newValue);
  };
  const handleHSliderChange = (event, newValue) => {
    sethValue(newValue);
  };
  const handleThresholdSliderChange = (event, newValue) => {
    setThresholdValue(newValue);
  };
  const kernelUploadHandler = () => {
    let elements = document.getElementsByClassName("kernelInput");
    let column = [];
    let row = [];
    for (let i = 0; i < vValue; i++) {
      column = [];
      for (let j = 0; j < hValue; j++) {
        column.push(
          elements[i * (vValue + 1) + j].getElementsByTagName(
            "input"
          )[0].value
        );
      }
      row.push(column);
    }
    fetch("http://localhost:8000/imageWorkshop/convolve/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rowSize: vValue,
        columnSize: hValue,
        matrix: row,
        image: base64,
      }),
    })
      .then((res) => res.json())
      .then((result) => convertBase64ToFile(result.image));
  };
  const thresholdUploadHandler = () => {
    fetch("http://localhost:8000/imageWorkshop/convolve/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: thresholdValue,
        image: base64,
      }),
    })
      .then((res) => res.json())
      .then((result) => convertBase64ToFile(result.image));
  };
  return (
    <>
      <Container>
        <form onChange={(e) => onChange(e)}>
          <div>
            <img alt='' src={imagePreview} />
            <input
              type="file"
              name="avatar"
              id="file"
              accept=".jpg"
              onChange={photoUpload}
              src={imagePreview}
              style={{ color: "transparent" }}
            />
          </div>
          {imagePreview !== "" && (
            <>
              <button type="button" onClick={remove}>
                Remove
                            </button>
            </>
          )}
        </form>
      </Container>
      <div className={classes.convolve}>
        <Typography id="input-slider" gutterBottom>
          Size
                </Typography>
        <Slider
          defaultValue={3}
          value={typeof hValue === "number" ? hValue : 0}
          onChange={handleHSliderChange}
          aria-labelledby="discrete-slider-always"
          step={1}
          valueLabelDisplay="on"
          min={3}
          max={7}
          className={classes.slider}
        />
        <Slider
          defaultValue={3}
          value={typeof vValue === "number" ? vValue : 0}
          onChange={handleVSliderChange}
          aria-labelledby="discrete-slider-always"
          step={1}
          valueLabelDisplay="on"
          min={3}
          max={7}
          className={classes.slider}
        />
        <Grid container spacing={2} alignItems="center">
          {Array(vValue)
            .fill(null)
            .map(() => (
              <>
                <Grid item container>
                  {Array(hValue)
                    .fill(null)
                    .map((val, index) => (
                      <Grid item key={index}>
                        <TextField
                          className={`${classes.kernelInput} kernelInput`}
                          margin="dense"
                          variant="outlined"
                        />
                      </Grid>
                    ))}
                </Grid>
              </>
            ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={kernelUploadHandler}
        >
          Send
                </Button>
      </div>
      <div className={classes.convolve}>
        <Typography id="input-slider" gutterBottom>
          Value
                </Typography>
        <Slider
          defaultValue={0}
          value={typeof hValue === "number" ? hValue : 0}
          onChange={handleThresholdSliderChange}
          aria-labelledby="discrete-slider-always"
          step={10}
          valueLabelDisplay="on"
          min={0}
          max={255}
          className={classes.slider}
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={thresholdUploadHandler}
        >
          Send
                </Button>
      </div>
    </>
  );
}
