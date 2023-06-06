import { useEffect, useState } from "react";

import styled, { keyframes } from "styled-components";

import Map from "./Map";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const json = await response.json();
      setData(json.slice(0, 10));
    } catch (error) {
      console.error("API isteği başarısız:", error);
    }
  };

  return (
    <MapContainer>
      {data && (
        <Map
          marker={{
            // @ts-ignore
            geometries: data?.map((d: any) => ({
              coordinates: [289757 * (d.id * 0.2), 41.0197 * (d.id * 0.2)],
              properties: { title: d.title, detected: d.id > 5 ? false : true },
              type: "Point",
            })),
            type: "GeometryCollection",
          }}
        />
      )}
    </MapContainer>
  );
}

const pulseTrue = keyframes`
0% {
  filter: drop-shadow(0 0 0.3vw rgba(255,255,255, 0.7));
}

70% {
  filter: drop-shadow(0 0 0 rgba(255,255,255, 0.7));
}

100% {
  filter: drop-shadow(0 0 0.3vw rgba(255,255,255, 0.7));
}
`;

const pulseFalse = keyframes`
0% {
  filter: drop-shadow(0 0 0.3vw rgba(255, 0, 0, 0.7));
}

70% {
  filter: drop-shadow(0 0 0 rgba(255, 0, 0, 0.7));
}

100% {
  filter: drop-shadow(0 0 0.3vw rgba(255, 0, 0, 0.7));
}
`;

const MapContainer = styled.section`
  border: solid 1px red;

  > section {
    width: 500px;
    height: 500px;
    border-radius: 100%;
    overflow: hidden;
    margin: 0px auto;
  }

  #mark-false {
    fill: red;
    animation: ${pulseFalse} 1.5s infinite;
    filter: drop-shadow(0 0 0.5vw rgba(255, 0, 0, 0.7));
  }

  #mark-true {
    fill: white;
    animation: ${pulseTrue} 1.5s infinite;
    filter: drop-shadow(0 0 0.5vw rgba(255, 255, 255, 0.7));
  }
`;
