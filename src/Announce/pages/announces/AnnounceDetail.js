import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AnnounceDetail() {
  const { announceCode } = useParams();
  const [announce, setAnnounce] = useState(null);

  useEffect(() => {
    const fetchAnnounce = async () => {
      try {
        const response = await axios.get(`/api/announces/${announceCode}`);
        setAnnounce(response.data);
      } catch (error) {
        console.error("Error fetching announce details:", error);
      }
    };

    fetchAnnounce();
  }, [announceCode]);

  if (!announce) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{announce.annTitle}</h1>
      <h2>
        {announce.employee.empName}{" "}
        {new Date(announce.annDate).toLocaleString("ko-KR")}
      </h2>
      <div>{announce.annContent}</div>
    </div>
  );
}

export default AnnounceDetail;
