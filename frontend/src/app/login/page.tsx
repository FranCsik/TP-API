'use client';

import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(){
        //TODO: Agregue un proxy en el package.json para que no tenga que poner el dominio completo
        let response = await fetch("/api/personas")
        // let response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({email: email, password: password})
        // })
        let data = await response.json();
        console.log(data)
    } 

  return (
    <>  
        <main className="flex justify-center items-center h-full w-full">
            <form className="flex max-w-md flex-col gap-4 p-6 rounded-3xl bg-gray-100 w-[700px]">
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="email1" value="Email" />
                    </div>
                    <TextInput id="email1" type="email" placeholder="Ingrese su email" required value={email} onChange={(e) => {setEmail(e.target.value)}} />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label htmlFor="password1" value="Contraseña" />
                    </div>
                    <TextInput id="password1" type="password" required value={password} onChange={(e) => {setPassword(e.target.value)}} />
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label htmlFor="remember">Remember me</Label>
                </div>
                <Button onClick={() => {login()}} type="submit">Submit</Button>
            </form>
        </main>
    </>
  );
}