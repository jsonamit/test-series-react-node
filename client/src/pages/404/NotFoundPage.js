import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <div style={{fontWeight:'bold'}}>
          <h1>Page Not Found</h1>
        </div>
        <div>
            <Link to={'/login'}><span>Login</span></Link>
        </div>
    </div>
  )
}
