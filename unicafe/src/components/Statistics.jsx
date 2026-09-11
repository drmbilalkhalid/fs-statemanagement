import { useGood, useBad, useNeutral } from "../store";

const Statistics = () => {
  const good = useGood();
  const bad = useBad();
  const neutral = useNeutral();
  const all = good + bad + neutral;
  const average =
    all === 0
      ? 0
      : Math.round((((good * 1 ) + (neutral * 0) + (bad * -1)) / all) * 100) / 100;
  const positive = all === 0 ? 0 : Math.round((good / all) * 100 * 10) / 10;

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Statistics;
