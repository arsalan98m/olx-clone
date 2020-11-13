import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import "./PostAd.css";
import { useStateValue } from "../../GlobalContext/StateProvider";
import { CropPortrait } from "@material-ui/icons";
import { readAndCompressImage } from "browser-image-resizer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// database
import firebase from "firebase/app";
import { storage, db, auth } from "../../firebase";

import App from "../../App";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const categories = [
  {
    value: "Mobile",
  },
  {
    value: "Cars",
  },
  {
    value: "Motorcycles",
  },
  {
    value: "TV",
  },

  {
    value: "Tablet",
  },
  {
    value: "Plots",
  },
];

const locations = [
  {
    value: "Karachi",
  },
  {
    value: "Lahore",
  },
  {
    value: "Islamabad",
  },
  {
    value: "Peshawar",
  },

  {
    value: "Balochistan",
  },
];

const PostAd = () => {
  const classes = useStyles();

  const [category, setCategory] = React.useState("Cars");
  const [location, setLocation] = React.useState("Karachi");
  const [condition, setCondition] = React.useState("used");
  const [adTitle, setAdTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [make, setMake] = React.useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [refreshBool, setRefreshBool] = React.useState(false);

  const [{ items, user, refresh }, dispatch] = useStateValue();


  // image config
  const imageConfig = {
    quality: 0.2,
    maxWidth: 800,
    maxHeight: 600,
    autoRotate: true,
  };
  // To upload image to firebase and then set the image link to the state of the app
  const imagePicker = async (e) => {
    // TODO: DONE upload image and set D-URL to state
    try {
      const file = e.target.files[0];

      var metadata = {
        contentType: file.type,
      };

      let resizedImage = await readAndCompressImage(file, imageConfig);

      const storageRef = storage.ref();

      var uploadTask = storageRef
        .child("images/" + file.name)
        .put(resizedImage, metadata);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          setIsUploading(true);
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              setIsUploading(false);
              console.log("Uploading is paused");
              break;

            case firebase.storage.TaskState.RUNNING:
              console.log("Uploading is in progress...");
              break;
            default:
              break;
          }
          if (progress === 100) {
            setIsUploading(false);
            toast("Uploaded Image", {
              type: "success",
            });
          }
        },
        (error) => {
          console.log(error);
          toast("Plase login first", {
            type: "error",
          });
        },
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((downloadURL) => {
              setDownloadUrl(downloadURL);
            })
            .catch((err) => console.log(err));
        }
      );
    } catch (error) {
      console.log(error);
      toast("Something went wrong", {
        type: "error",
      });
    }
  };


  const handlePost = async (e) => {
    e.preventDefault();

    const newPost = {
      id: Math.random(),
      name,
      email,
      phone,
      price,
      description,
      adTitle,
      condition,
      location,
      category,
      make,
      uid: auth.currentUser.uid,
      image: downloadUrl,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),

    };

    try {
      db.collection(`posts`)

        .add(newPost)
        .then(() => {
          toast("Post added successfully", { type: "success" });
        }).catch(() => {
          toast("Plase login first", {
            type: "error",
          });
        })
    } catch (error) {
      console.log(error);

    }
    // dispatch({ type: "ADD_ITEM", payload: newPost });
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleCondition = (event) => {
    setCondition(event.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="post__container">
      <h1>POST YOUR AD</h1>
      <div className="post__ad">
        <form className={classes.root} noValidate autoComplete="off">
          <div className="form-control">
            <TextField
              id="outlined-select-currency"
              select
              label="Select Category"
              value={category}
              onChange={handleCategory}
              helperText="Please Select your Category"
              variant="outlined"
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className="form-control">
            <FormControl component="fieldset">
              <FormLabel component="legend">Condition</FormLabel>
              <RadioGroup
                aria-label="condition"
                name="condition"
                value={condition}
                onChange={handleCondition}
              >
                <FormControlLabel
                  value="used"
                  control={<Radio />}
                  label="Used"
                />
                <FormControlLabel value="new" control={<Radio />} label="New" />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="form-control">
            <label htmlFor="ad title">Ad Title *</label>
            <input
              type="text"
              id="ad title"
              value={adTitle}
              onChange={(e) => setAdTitle(e.target.value)}
            />
            <small>
              A minimum length of 5 character is required please edit the field
            </small>
          </div>

          <div className="form-control">
            <label>Description *</label>
            <textarea
              rows="4"
              cols="40"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <small>Include condition,features and reason for selling</small>
          </div>

          <div className="form-control">
            <label htmlFor="ad title">Make *</label>
            <input
              type="text"
              id="ad title"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
            <small>
              A minimum length of 5 character is required please edit the
              field(eg. Apple, Nokia)
            </small>
          </div>
        </form>
      </div>

      <div className="post__ad2">
        <form className={classes.root} noValidate autoComplete="off">
          <div className="form-control">
            <label>SET A PRICE *</label>
            <small>Price *</small>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label>Upload Photo:</label>
            <input type="file"
              name="image"
              id="imagepicker"
              accept="image/*"
              multiple={false}
              onChange={(e) => imagePicker(e)} />
          </div>
        </form>
      </div>

      <div className="post__ad3">
        <form className={classes.root} noValidate autoComplete="off">
          <div className="form-control">
            <label>Location *</label>
            <TextField
              id="outlined-select-currency"
              select
              label="Select Location"
              value={location}
              onChange={handleLocation}
              helperText="Please Select your Location"
              variant="outlined"
            >
              {locations.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
      </div>
      <h2>Review Your Details</h2>

      <div className="post__ad3">
        <form className={classes.root} noValidate autoComplete="off">
          <div className="form-control">
            <label>Name *</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
            />
          </div>

          <div className="form-control">
            <label>Email *</label>

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email..."
            />
          </div>

          <div className="form-control">
            <label>Phone Number *</label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone number..."
            />
          </div>
        </form>
      </div>

      <div className="post__ad4">
        <button type="submit" onClick={handlePost}>
          Post Now
        </button>
      </div>
    </div>
  );
};

export default PostAd;
