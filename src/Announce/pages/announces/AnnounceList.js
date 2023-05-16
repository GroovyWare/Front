import AnnounceItem from "../../items/AnnounceItem";

function AnnounceList({ announceList }) {

    return (
        <div>
            {
                Array.isArray(announceList)
                && announceList.map(announce => <AnnounceItem key={ announce.announceCode } announce={announce}/>)
            }
        </div>
    );
}
   
export default AnnounceList;