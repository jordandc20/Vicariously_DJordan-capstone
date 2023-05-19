import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from './Pagelayout';

const Home = () => {
  // const {theme} = useContext(ThemeContext);
  // console.log(theme)
  // isAuthenticated ?

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
console.log(user)
console.log(isAuthenticated)
console.log(isLoading)




  return (
    <PageLayout>

    <div>Home</div>
    </PageLayout>
  )
}

export default Home