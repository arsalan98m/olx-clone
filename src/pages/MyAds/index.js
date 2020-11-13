import { useStateValue } from "../../GlobalContext/StateProvider";
import { auth } from "../../firebase";
import Card from "../../components/Card"
import { Button } from "@material-ui/core"
const MyAdsPage = () => {
    const [{ items, user }, dispatch] = useStateValue();
    const filterdata = items.filter((data) => data.uid === auth.currentUser?.uid);
    console.log("f=>", filterdata);

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Total {filterdata?.length} ads</h2>
            <div className="card__container">
                {filterdata?.map((item) => (
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
                        uid={item.uid}
                        docid={item.docId}
                    />

                ))}

            </div>
        </div>
    );
}

export default MyAdsPage;