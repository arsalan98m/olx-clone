import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { ToastContainer, toast } from 'react-toastify';

import { Link } from "react-router-dom";
import "./Card.css";
import { Button } from "@material-ui/core";
import { auth, db } from "../../firebase";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "20px;",
  },
  card: {
    minWidth: 900,
    maxWidth: 1000,
  },
  media: {
    width: "100%",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function CardAds({
  id,
  name,
  email,
  phone,
  price,
  description,
  adTitle,
  condition,
  location,
  image,
  category,
  make,
  uid,
  docid
}) {
  const classes = useStyles();

  function deletePost() {
    console.log("wo")
    console.log(id)
    db.collection("posts").doc(docid).delete().then(() => {
      toast("Post Deleted", {
        type: "error",
      });
    })


  }
  return (

    <Card className={classes.root}>
      <Link to={`/item/itemIndex/${id}`}>
        <CardMedia
          className={classes.media}
          image={image}

        />
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <FavoriteIcon />
            </IconButton>
          }
          title={adTitle}
          subheader={`Rs ${price}`}
        />

        <CardContent className={classes.card}>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>


        </CardContent>
      </Link>
      {auth.currentUser?.uid === uid ? (<Button onClick={() => deletePost(id)} style={{ display: "flex", width: "100%" }}>Delete Ad</Button>
      ) : ("")}
    </Card>

  );
}
