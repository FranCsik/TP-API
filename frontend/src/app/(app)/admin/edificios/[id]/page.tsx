async function getEdificio(){
    return await (await fetch("http://backend/personas")).json()
}

export default async function Edificio({ params }: { params: { id: string } }){

    const data = await getEdificio()
    
    return(
        <div>
            <h1>Edificio: {params.id}</h1>
            <p>{JSON.stringify(data)}</p>
        </div>
    )
}