import { useParams } from "react-router-dom";
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

import { Link } from "react-router-dom";
import "../../components/Card/Card.css";
import { Hidden } from "@material-ui/core";
import { useStateValue } from "../../GlobalContext/StateProvider";

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


const ItemIndex = () => {
  const classes = useStyles();
  const { itemIndex } = useParams();
  const [{ items }, dispatch] = useStateValue();
  console.log("item index=>", itemIndex)
  const filterData = items.filter((item) => item.category === itemIndex);



  return (
    <div>
      <h2>{itemIndex} Posts</h2>
      <div className="card__container">
        {filterData.length > 0 ? (
          filterData?.map((item) => (

            <Link to={`/item/itemIndex/${item.id}`}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media}
                  image={item.image}

                />
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <FavoriteIcon />
                    </IconButton>
                  }
                  title={item.adTitle}
                  subheader={`Rs ${item.price}`}
                />

                <CardContent className={classes.card}>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>


          ))
        ) : (<h2>No Posts Found </h2>)}
      </div>
    </div>
  );
};

export default ItemIndex;
