import './Map.css';
import { ReactComponent as FranceMap } from "./france_map.svg";

function Map({ cities }) {
    return (
        <div className="Map">
            <FranceMap />
        </div>
    )
}

export default Map;