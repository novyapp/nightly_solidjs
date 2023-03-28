import { listOfCurrencyProps } from "../../Main";
import "./Search.css";

export interface SearchProps {
  cryptoList: listOfCurrencyProps[];
  setSelectedCurrency: ({}: listOfCurrencyProps) => void;
  filter: () => string;
  setFilter: (value: string) => void;
}

export const Search = ({
  cryptoList,
  setSelectedCurrency,
  filter,
  setFilter,
}: SearchProps) => {
  return (
    <div class="currency-search">
      <div class="search">
        <input
          type="text"
          placeholder="Search coin"
          value={filter()}
          onInput={(e) => setFilter(e.currentTarget.value)}
        />
        <img src="union.png" />
      </div>
      <ul class="options">
        {cryptoList
          .filter(
            (f) =>
              f.fullLabel.toLowerCase().includes(filter().toLowerCase()) ||
              filter() === ""
          )
          .map((crypto) => {
            return (
              <li onClick={() => setSelectedCurrency(crypto)}>
                <img src={crypto.iconUrl} /> {crypto.fullLabel}
                <span>({crypto.shortLabel})</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
