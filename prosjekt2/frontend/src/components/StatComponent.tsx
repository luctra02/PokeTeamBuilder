
function StatComponent(props : {stats: number, statName: string}) {
    const {statName, stats} = props;

    function roundToFive(num: number) {
        num = num * 150;
        num = num / 255;
        return Math.round(num / 5) * 5;
      }

    return (
    <section className="stat-container">
        <div id="specialDefenseFill" className="fill-bar-container">
                <figure className="fill-bar" style={{ height: `${roundToFive(stats)}px` }}>
                </figure>
            </div>
        <label htmlFor="specialDefenseFill">{statName}</label>
    </section>
    )
}

export default StatComponent