import styled from "styled-components";
import React, { useState } from "react";
import ImgSlider from "./ImgSlider";
import Viewer from "./Viewer";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../config";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import { getDocs, collection } from "firebase/firestore";
// import { doc, onSnapshot } from "firebase/firestore";

// const colref = collection(db, "movie");
// getDocs(colref).then((snapshot)=>{
//     console.log(snapshot.docs);
// });
const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  // const [recommends, setrecommends] = useState([]);
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];

  useEffect(() => {
    // console.log("hello");
    const colref = collection(db, "movie");
    getDocs(colref).then((snapshot) => {
      recommends = [];
      newDisneys = [];
      originals = [];
      trending = [];
      snapshot.docs.map((doc) => {
        // console.log(doc.data().type);
        // console.log(recommends);
        switch (doc.data().type) {
          case "recommend":
            recommends = [...recommends, { id: doc.id, ...doc.data() }];
            // setrecommends([...recommends, { id: doc.id, ...doc.data() }]);
            // setrecommends([...recommends, { id: doc.id, ...doc.data() }]);
            // recommends.push({ id: doc.id, ...doc.data() });
            // console.log(recommends);
            break;

          case "new":
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            // newDisneys.push({ id: doc.id, ...doc.data() });
            break;

          case "original":
            originals = [...originals, { id: doc.id, ...doc.data() }];
            // originals.push({ id: doc.id, ...doc.data() });
            // console.log(originals);
            break;

          case "trending":
            trending = [...trending, { id: doc.id, ...doc.data() }];
            // trending.push({ id: doc.id, ...doc.data() });
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trending,
        })
      );
    });
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewer />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &::after {
    content: "";
    background: url("images/home-background.png") center center / cover
      no-repeat fixed;
    position: absolute;
    inset: 0;
    opacity: 1;
    z-index: -1;
  }
`;
export default Home;
