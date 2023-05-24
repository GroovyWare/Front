import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callAnnounceDetailAPI } from "../../../api/AnnounceAPICalls";

function AnnounceDetail() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const annCode = params.annCode;
    const [amount, setAmount] = useState(1);
    
    useEffect(() => {
        dispatch(callAnnounceDetailAPI({ annCode }));
        },
        []
    );

    function PostContent({ content }) {
        const [iframelyContent, setIframelyContent] = useState(null);
      
        useEffect(() => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            const oembedElements = doc.querySelectorAll('oembed[url]');
            const mediaUrls = Array.from(oembedElements).map(element => element.getAttribute('url'));
          
            Promise.all(
              mediaUrls.map(mediaUrl =>
                fetch(`https://iframe.ly/api/iframely?url=${mediaUrl}&api_key=c591925649e078fb19faeb`)
                  .then(response => response.json())
                  .then(data => {
                    const iframeDoc = parser.parseFromString(data.html, 'text/html');
                    const iframeElement = iframeDoc.querySelector('iframe');
                    iframeElement.style.width = '640px';
                    iframeElement.style.height = '360px';
                    iframeElement.style.position = 'static';
                    return iframeElement.outerHTML;
                  })
              )
            )
              .then(iframelyContents => setIframelyContent(iframelyContents.join('')))
              .catch(error => console.error(error));
          }, [content]);
      
        return (
            <div>
                <div dangerouslySetInnerHTML={{ __html: iframelyContent }} />
                <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        );
      }

    const goToUpdate = (annCode) => {
        navigate(`/announce/announce-update/${annCode}`);
    }

    const goToMain = () => {
        navigate("/announce");
    }

    return (
        <>
        <div>
            {userRole === '1' && (
                <>
                <button onClick={() => goToUpdate(annCode)}>수정</button>
                <button>삭제</button>
                </>
            )}
            <h2>{announce.annTitle}</h2>
            <p>{`${announce?.employee?.empName}`}</p>
            <p>{`${new Date(announce.annDate).toLocaleString()}`}</p>
            <PostContent content={announce.annContent} />
            <button onClick={ goToMain }>목록</button>
        </div>
        </>
    );
    
}

export default AnnounceDetail;
