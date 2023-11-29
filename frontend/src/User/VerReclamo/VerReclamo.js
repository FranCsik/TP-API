import { useParams } from "react-router-dom";


function VerReclamo(){

    const params = useParams();

    return(
        <div>
            <h1>Ver Reclamo {params.idReclamo}</h1>
        </div>
    )

}

export default VerReclamo;