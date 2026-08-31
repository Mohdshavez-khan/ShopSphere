import Hero from '../components/Hero';
import  Categories  from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
function Home() {
    return (
        <main className="min-h-screen `bg-[radial-gradient(circle_at_top,_rgba(244,244,245,0.9),_transparent_70%)]` px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <Hero />
            <Categories />
            <FeaturedProducts limit={12} showbtn={true}/>
        </main>
    );
}

export default Home;