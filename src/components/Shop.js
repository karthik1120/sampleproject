import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Shop = () => {
  const [item, setItem] = useState([]);
  useEffect(async () => {
    const data = await fetch(
      "https://fortnite-api.theapinetwork.com/upcoming/get"
    );
    const finalData = await data.json();
    setItem(finalData.data);
    console.log("data", finalData.data);
  }, []);

  return (
    <div>
      {item.map((data) => (
        <h2 key={data.itemId} style={{ textAlign: "center", color: "red" }}>
          <Link style={{ color: "red" }} to={`/shop/${data.itemId}`}>
            {data?.item?.name}
          </Link>
        </h2>
      ))}
    </div>
  );
};

export default Shop;
