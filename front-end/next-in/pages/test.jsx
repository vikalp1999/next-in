import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const endpoint = 'http://localhost:8080/'
let socket;

export default function Tester() {

    useEffect(()=>{
        socket = io.connect(endpoint)
        socket.emit('setup', '63a417eb102fa15a6c9843eb')
        socket.emit('newMsg', 
            {
                msg:"Hello",
                sender:"63a3f0feba34e12291c0b54a",
                chat:"63a417eb102fa15a6c9843eb"
            }
        )
    }, [])

    return (
        <>
        <h1>Hello</h1>
        </>
    )
}