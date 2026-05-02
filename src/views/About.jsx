import countryFacts from "../Api/CountryData.json"
import '../styles/pages/About.css'

const About = () => {
  return (
    <section className="about-main">
      <header className="about-heading">
        <h1>Here are the Interesting Facts</h1>
        <p>we&apos;re proud of</p>
      </header>

      <div className="about-grid">
        {countryFacts.map((country) => {
          return (
            <article className="about-card" key={country.id}>
              <h2>{country.countryName}</h2>
              <p><span>Capital:</span> {country.capital}</p>
              <p><span>Population:</span> {country.population}</p>
              <p><span>Interesting Fact:</span> {country.interestingFact}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default About;
