import { useState } from "react";
import axios from "axios";
import searchImage from "./images/loupe.png"
import styles from "./Home.module.css"
import { useDispatch } from "react-redux";
import { imageActions } from "./store/Store";
import { Link } from "react-router-dom";

const Home = () => {

   const dispatch = useDispatch();

   const [searchedTerm, setSearchedTerm] = useState("");
   const [searchImageOf, setSearchImageOf] = useState([]);

   const searchValueHandler = (event) => {
      setSearchedTerm(event.target.value);
   };

   const fetchImageHandler = () => {

      const fetchImages = async () => {
         try {
            const response = await axios.get(`https://pixabay.com/api/?key=24050565-b4b900753ed11fc8f088ee1a8&q=${searchedTerm}&image_type=photo`)
            console.log(response.data.hits);
            setSearchImageOf(response.data.hits);
         }
         catch (error) {
            console.log(error)
            alert("something went wrong!")
         }
      };

      fetchImages();
   }


   const addCaptionHandler = (url) => {
      console.log(url);
      dispatch(imageActions.addedImage(url));
   }

   return (
      <div>
         <div className={styles.info}>
            <h3>Name : Saurabh karki</h3>
            <h3>Email : sskmas2058@gmail.com</h3>
         </div>
         <div className={styles.inputDiv}>
            <input type="text" placeholder="Search image" value={searchedTerm} onChange={searchValueHandler} required></input>
            {searchedTerm && <button onClick={fetchImageHandler}><img src={searchImage} className={styles.searchImage} alt="search" /></button>}
         </div>
         <div className={styles.images}>
            {searchImageOf.map((items, index) => {
               return <div key={index}>
                  <img src={items.largeImageURL} alt="" /><br />
                  <button onClick={() => addCaptionHandler(items.largeImageURL)}><Link to={"/canvas"} style={{
                     textDecoration: 'none',
                     color: "aliceblue"
                  }}>Add caption</Link></button>
               </div>
            })}
         </div>
      </div>
   )
}

export default Home;