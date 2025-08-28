import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate,Link } from 'react-router-dom'

const Navbar = () => {

     const { loginWithRedirect, user, isAuthenticated, logout, isLoading } = useAuth0();
  return (
          <nav className='navbar'>
        <div className='username'>
          
          {isAuthenticated ? <div>Welcome {user.name}</div> : <div></div>}
        </div>


        <div className='profile'>

        {isAuthenticated&& <Link to="/show-history"><div className='history'>History</div></Link>   }
          <Link to="/"><div className='home'>Home</div></Link>
          <div>

            {isAuthenticated && (
              <div>
                <img src={user.picture} alt={user.name} />
                {/* <h2>{user.name}</h2> */}
                {/* <p>{user.email}</p> */}
              </div>
            )}
          </div>

          


          <div>
            
            {
              isAuthenticated ? <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
              </button> : <button onClick={() => loginWithRedirect()}>Log In</button>
            }
          </div>

        </div>


      </nav>
  )
}

export default Navbar
