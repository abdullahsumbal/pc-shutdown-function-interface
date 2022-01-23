import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { db, functions } from "../firebase"

export default function Shutdown() {

  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

 function handleShutdown() {
    console.log("shutting  down")
    //db.collection('shutdown').doc('pc_state').update({state: 0});
    const startShutdown = functions.httpsCallable('shutdown');
    startShutdown({ 
      secret: "shapaplay",
      state: 0
    })
    .catch(error => {
      console.log("not shutting down");
    });
  }

  return (
    <div className="w-100 text-center mt-2">
    <Button variant="link" onClick={handleShutdown}>
      Shutdown
    </Button>
  </div>
  )
}
