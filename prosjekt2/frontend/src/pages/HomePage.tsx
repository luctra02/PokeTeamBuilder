//import AddPokemonToDatabase from '../components/AddPokemonToDatabase';
import DisplayCardComponents from '../components/DisplayCardComponents';
import SortDropdown from '../components/SortDropdown';
import TypesDropdown from '../components/TypesDropdown';

// import styles
import '../styles/HomePage.css';

function HomePage() {
  return (
    <>
      <section className="sorting">
        {location.pathname == '/project2' && <TypesDropdown />}
        {location.pathname == '/project2' && <SortDropdown />}
      </section>
      <DisplayCardComponents />
      {/*<AddPokemonToDatabase />*/}
    </>
  );
}

export default HomePage;
