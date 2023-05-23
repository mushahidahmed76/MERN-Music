import { useParams } from "react-router-dom";
import { Error, Loader, RelatedSongs, DetailsHeader } from "../components";
import { setActiveSong,playPause } from "../redux/features/playerSlice"; 
import { useDispatch, useSelector } from "react-redux";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    const {songid} = useParams();
    const {data:songData,isFetching: isFetchingSongDetails ,error} = useGetSongDetailsQuery({songid});
    const {data,isFetching:isFetchingRelatedData,error:relatedError} = useGetSongRelatedQuery({songid}); 
    const dispatch = useDispatch();
    const {isPlaying, activeSong } = useSelector((state)=> state.player);
    const handlePauseClick = () => {
        dispatch(playPause(false));
    }
    const handlePlayClick = (song,i) => {
        dispatch(setActiveSong({song,data,i}));
        dispatch(playPause(true));
    }
  
    if(isFetchingRelatedData || isFetchingSongDetails){
        return(<Loader title='Search song details' />);
    }
    if(relatedError || error){
        return(<Error />);
    }

    return(
        <div className="flex flex-col">
            <DetailsHeader
                // artistId = {artistId}    
                songData = {songData}
            />
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics: </h2>
                <div className="mt-5">
                    {songData?.sections[1].type === 'LYRICS' ? 
                        songData?.sections[1].text.map((line,i)=> (
                            <p key={i} className="text-gray-400 text-base my-1">{line}</p>
                        ))    
                    :  <p className="text-gray-400 text-base my-1">Sorry No Lyrics found!</p>  }
                </div>
            </div>
            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    );
};

export default SongDetails;
