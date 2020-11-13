import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

// Pages
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/Item";
import PostPage from "./pages/PostPage";
import MyAdsPage from "./pages/MyAds";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemIndex from "./components/ItemIndex";
import ItemDetails from "./components/ItemDetails/index";

import "./App.css";

// database
import { db } from "./firebase";
import { useEffect } from "react";
import { useStateValue } from "./GlobalContext/StateProvider";

function App() {
  const [{ items }, dispatch] = useStateValue();

  const getContacts = async () => {



    const databaseRef = await db
      .collection("posts")


    databaseRef.onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));

      //console.log("All data in 'books' collsections", data);

      dispatch({ type: "LOADING_ITEM", payload: data });


    });
  };

  // getting contact when component did mount

  useEffect(() => {
    getContacts();

    return () => getContacts();
  }, []);


  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="item" element={<ItemPage />}>
          <Route path=":itemIndex" element={<ItemIndex />}></Route>
          <Route path="/itemIndex/:itemDetails" element={<ItemDetails />} />
        </Route>
        <Route path="/post" element={<PostPage />} />
        <Route path="/myads" element={<MyAdsPage />} />

        <Route path="*" element={<h2>Sorry Page not found !!!</h2>} />
      </Routes>

    </div>
  );
}

export default App;
