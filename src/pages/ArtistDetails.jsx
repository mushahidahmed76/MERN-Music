import { useParams } from "react-router-dom";
import { Error, Loader, RelatedSongs, DetailsHeader } from "../components"; 
import { useSelector } from "react-redux";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
    const {id: artistId} = useParams();
    const {isPlaying, activeSong } = useSelector((state)=> state.player);
    const {data:artistData,isFetching:isFetchingArtistDetails,error} = useGetArtistDetailsQuery(artistId);
      
    if(isFetchingArtistDetails){
        return(<Loader title='Loading Artist details' />);
    }
    if(error){
        return(<Error />);
    }

    return(
        <div className="flex flex-col">
            <DetailsHeader
                artistId = {artistId}    
                artistData = {artistData}
            />
            
            <RelatedSongs
                data={Object.values(artistData?.songs)}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
            />
        </div>
    );
};

export default ArtistDetails;
