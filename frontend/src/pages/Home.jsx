import React from 'react'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import Bestseller from '../components/Bestseller'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Bestseller />
      <OurPolicy />
      <NewLetterBox />
    </div>
  )
}

export default Home