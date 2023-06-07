import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { callAnnounceDetailAPI } from "../../../api/AnnounceAPICalls";
import AnnounceDetailCSS from "./AnnounceDetail.module.css";
import axios from "axios";
import { toast } from "react-toastify";

function AnnounceDetail() {

    // const userRole = useSelector(state => state.authCode); // 이 부분은 실제 authCode를 가져오는 Redux Selector로 변경해야 합니다.
    const [userRole, setUserRole] = useState('1'); // 임의의 userRole 상태 생성
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const announce = useSelector(state => state.announceReducer);
    const annCode = params.annCode;

    useEffect(() => {
        dispatch(callAnnounceDetailAPI({ annCode }));
    }, [annCode, dispatch]);

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

    const handleDelete = () => {
        if (window.confirm("게시글을 정말 삭제하시겠습니까?")) {
          axios.delete(`http://localhost:8059/announce/${annCode}`)
            .then(res => {
              if(res.status === 200) {
                toast.success("게시글이 삭제되었습니다.");
                navigate('/announce');
              } else {
                toast.error("삭제할 수 없습니다. 다시 한 번 시도해주세요.");
              }
            })
            .catch(err => {
              toast.error("삭제할 수 없습니다. 다시 한 번 시도해주세요.");
            });
        }
    }

    return (
        <>
        <div className={ AnnounceDetailCSS.container }>
            {userRole === '1' && (
                <div className={ AnnounceDetailCSS.registBtn }>
                  <button onClick={() => goToUpdate(annCode)}>수정</button>
                  <button onClick={handleDelete}>삭제</button>
                </div>
            )}
            <h2 className={ AnnounceDetailCSS.annTitle }>{announce.annTitle}</h2>
            <p className={ AnnounceDetailCSS.annNameAndDate }>{`${announce?.employee?.empName}`} {`${new Date(announce.annDate).toLocaleString()}`}</p>
            <div className={AnnounceDetailCSS.content}>
              <PostContent content={announce.annContent} />
            </div>
            <button className={ AnnounceDetailCSS.listBtn } onClick={ goToMain }>목록</button>
        </div>
        </>
    );
    
}

export default AnnounceDetail;
