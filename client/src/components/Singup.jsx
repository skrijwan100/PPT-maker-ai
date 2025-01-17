import React from 'react'

export default function Singup() {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div class="login singup wrap">
<div class="h1">Singup</div>
<input placeholder="Name" id="password" name="password" type="text"/>
<input pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="Email" id="email" name="email" type="text"/>
<input placeholder="Password" id="password" name="password" type="password"/>
<input value="Singup" class="btn" type="submit"/>
</div>
  </div>
  )
}
