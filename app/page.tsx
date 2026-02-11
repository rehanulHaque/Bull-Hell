import Category from '@/components/Home/Category'
import Gallery from '@/components/Home/Gallery'
import HeroBanner from '@/components/Home/HeroBanner'
import NewArrivals from '@/components/Home/NewArrivals'
import Trending from '@/components/Home/Trending'

export default function Page() {
  return (
    <div>
      <HeroBanner/>
      <NewArrivals/>
      <Category/>
      <Trending/>
      <Gallery/>
    </div>
  )
}
