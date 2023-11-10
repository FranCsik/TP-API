'use client'
import { useRouter } from "next/navigation"
export default function Login(){

    const router = useRouter()

    // async function get_persona(){
    //     let prueba = await fetch("http://backend/personas")
    //     let hola = prueba.json()
    //     console.log(hola)
    // }

    // get_persona()


    return(
        <>
            <div className="flex flex-col h-screen w-full items-center justify-center">
                <form action="post" className="flex flex-col gap-4 bg-slate-800 rounded-xl shadow-2xl w-1/4 p-2 h-2/4 items-center justify-center">
                    <h2 className="text-2xl font-bold">Login</h2>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="usuario">Usuario</label>
                        <input id="usuario" name="usuario" type="text" placeholder="Ingresa tu usuario"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Contraseña</label>
                        <input id="password" name="password" type="password" placeholder="Ingresa tu contraseña"/>
                    </div>
                    <button onClick={() => { router.push("/") } }>Login</button>
                </form>
            </div>
        </>
    )
}