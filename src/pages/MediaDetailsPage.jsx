import React, { useState, useEffect } from "react";
import { getMediaById }from '../services/mediaService';

const MediaDetailsPage = () => {
  const [data, setData] = useState([]);

  // didnt manage to do this
  const id = "id-goes-here";

  useEffect(() => {
    getMediaById(id).then((response) => setData(response.data));
  }, []);

  console.log(data);

  return (
    <div>
      <h1>Media Details Page</h1>
      <ul>
        {data.map((item) => (
          <>
            <img src={item?.imageUrl} alt="Cover"/>
            <li key={item.id}>Title: {item?.title}</li>
            <li key={item.id}>Description: {item?.description}</li>
            <li key={item.id}>Rating: {item?.averageRating}</li>
            <li key={item.id}>Type: {item?.mediaType}</li>
            <li key={item.id}>Release date: {item.releaseDate}</li>
            <li key={item.id}>Cast: {item?.cast.map((member) => ( <li key={member.id}>{member.name}</li> ))}</li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default MediaDetailsPage;
