import { useParams } from "react-router-dom";
import { useStateValue } from "../../GlobalContext/StateProvider";

import "./ItemDetails.css";

const ItemDetails = () => {
  const { itemDetails } = useParams();
  const [{ items, user }, dispatch] = useStateValue();

  let itemDetail = items.filter((it) => it.id === Number(itemDetails));
  console.log("itemDetail=>", itemDetail);

  return (
    <div>
      <div className="item__details">
        <div className="item__detailsRight">
          <img
            src={itemDetail[0].image}
            alt="item-image"
            className="item__image"
          />
        </div>

        <div className="item__detailsLeft">
          <div className="item__price">
            <h4>Rs {itemDetail[0].price}</h4>
            <p>{itemDetail[0].adTitle} </p>
            <p>{itemDetail[0].location}</p>
          </div>

          <div className="seller__description">
            <h2>Seller Description</h2>
            <h3>{itemDetail[0].name}</h3>
            <h3>Phone: {itemDetail[0].phone}</h3>
            <button>Chat with Seller</button>
          </div>
        </div>
      </div>

      <div className="item__description">
        <h3>Details</h3>
        <div className="item__descriptionDetails">
          <p>Make</p>
          <p>{itemDetail[0].make}</p>

          <p>Condition</p>
          <p>{itemDetail[0].condition}</p>
        </div>

        <h3>Description</h3>
        <p style={{ overflow: "scroll" }}>{itemDetail[0].description}</p>
      </div>
    </div>
  );
};

export default ItemDetails;
