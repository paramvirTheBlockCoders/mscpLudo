import React from 'react'
import UserProfile from '../Component/UserProfile'
import {getSession} from 'next-auth/react'

const userprofile = () => {
  return (
    <div>
        <UserProfile/>
  
    </div>
  )
}

export default userprofile;

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   if (session) {
//     return {
//       redirect: {
//         destination: "/dashboard",
//         permanent: false,
//       }
//     }
//   }
//   return {
//     props:{
//       session
//     }
//   }
// }