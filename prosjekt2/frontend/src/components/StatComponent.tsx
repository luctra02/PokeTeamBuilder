function StatComponent(props: { stats: number; statName: string }) {
    const { statName, stats } = props;
  
    // Function to round a given number to the nearest multiple of 5
    function roundToFive(num: number) {
      // Scaling the number for a better representation in the fill bar
      num = num * 150;
      num = num / 255;

      return Math.round(num / 5) * 5;
    }
  
    return (
      // Container section for the stat component
      <section className="stat-container">
        <div id={statName} className="fill-bar-container">
          <div className="fill-bar" style={{ height: `${roundToFive(stats)}px` }}></div>
        </div>
        <label htmlFor={statName}>{statName}</label>
      </section>
    );
  }
  
  export default StatComponent;