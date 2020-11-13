import Card from "../../components/Card";
import { useStateValue } from "../../GlobalContext/StateProvider";
import "./HomePage.css";
const HomePage = () => {
  const [{ items, user }, dispatch] = useStateValue();


  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Total {items?.length} ads</h2>
      <div className="card__container">
        {items?.map((item) => (
          <Card
            id={item.id}
            name={item.name}
            email={item.email}
            phone={item.phone}
            price={item.price}
            description={item.description}
            adTitle={item.adTitle}
            condition={item.condition}
            location={item.location}
            image={item.image}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
