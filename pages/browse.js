import React, { useState, useContext, useEffect } from "react";
import { SelectProfileContainer } from "./profiles";
// extracting user from the db.
import { FirebaseContext } from "../context/firebase";
import { Card, Header, Loading } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";

export function BrowseContainer({ slides }) {
  // Initial category
  const [category, setCategory] = useState("series");
  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [sliderows, setSlideRows] = useState([]);

  const { firebase } = useContext(FirebaseContext);
  // Use user from the db. If currentUser doesn't exist just give an empty object.
  const user = firebase.auth().currentUser || {};

  // After 3 seconds stop loading. If prodile.displayName changes, do spinner.
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  // The active slide rows.
  useEffect(() => {
    // slides comes as films or series
    setSlideRows(slides[category]);
    // re-render slides agains, whenever they change, same goes for the category
  }, [slides, category]);

  // If there is a displayname, show loading transition from the profileSelection to the browse Container.
  // Basically, whenever someone clicks profile icon after signing-in, send him to the browse page.
  return profile.displayName ? (
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}

      <Header src='joker1' dontShowOnSmallViewPort>
        <Header.Frame>
          {/* Group is grouping our elements(Logo, and series/films section) on a top left*/}
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={logo} alt='Netflix' />
            {/* If this category is active(In our case series is true by default) apply it to true.
            Inside of the styled.component we set our font-weight: 700 for a true case. If it is
            false, it is not change font-weight */}
            <Header.TextLink
              active={category === "series" ? "true" : "false"}
              onClick={() => setCategory("series")}
            >
              Series
            </Header.TextLink>
            <Header.TextLink
              active={category === "films" ? "true" : "false"}
              onClick={() => setCategory("films")}
            >
              Films
            </Header.TextLink>
          </Header.Group>
          {/* Another group on a top right with a profile info */}
          <Header.Group>
            <Header.Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.Dropdown>
                <Header.Group>
                  {/* We want to have a picture even when the dropdown menu is open */}
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink>{user.displayName}</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>
        <Header.Feature>
          <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
          <Header.Text>
            Forever alone in a crowd, failed comedian Arthur Fleck seeks
            connection as he walks the streets of Gotham City. Arthur wears two
            masks -- the one he paints for his day job as a clown, and the guise
            he projects in a futile attempt to feel like he's part of the world
            around him.
          </Header.Text>
          <Header.PlayButton>Play</Header.PlayButton>
        </Header.Feature>
      </Header>

      <Card.Group>
        {sliderows.map((slideItem) => (
          <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
            <Card.Title>{slideItem.title}</Card.Title>
            <Card.Entities>
              {/* slideItem is taking from the Browse page */}
              {slideItem.data.map((item) => (
                <Card.Item key={item.docId} item={item}>
                  <Card.Image
                    src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}
                  />
                  <Card.Meta>
                    <Card.SubTitle>{item.title}</Card.SubTitle>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Meta>
                </Card.Item>
              ))}
            </Card.Entities>
            <Card.Feature category={category}>
              <p>Hello</p>
            </Card.Feature>
          </Card>
        ))}
      </Card.Group>
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}
