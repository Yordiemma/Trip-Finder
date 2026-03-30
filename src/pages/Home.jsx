
import "../styles/home.css";
import DestinationCard from "../components/DestinationCard";


function Home() {
    return (
        <main>
            <section>
                <h1>Trip Finder</h1>
                <p>Discover your next adeventure</p>
            </section>

            <section>
                <input type="text" placeholder="Search destinations.." />
            </section>
            <section>
                <h2>Featured Destinations</h2>
<DestinationCard
          image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          title="Bali Escape"
          location="Bali, Indonesia"
          price="$450"
          rating="4.8 ⭐"
        />
        <DestinationCard
          image="https://images.unsplash.com/photo-1499856871958-5b9627545d1a"
          title="Paris Getaway"
          location="Paris, France"
          price="$620"
          rating="4.7 ⭐"
        />

            </section>
            <section>
                <h2>Popular Trips</h2>
                <p>More destinations coming soon</p>
            </section>
        </main>
    )
}
export default Home;