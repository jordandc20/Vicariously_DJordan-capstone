import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { PageLayout } from './Pagelayout';

const Home = () => {
  // const {theme} = useContext(ThemeContext);
  // console.log(theme)
  // isAuthenticated ?

  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated)

  return (
    <PageLayout>

    <div>Home</div>
    </PageLayout>
  )
}

export default Home