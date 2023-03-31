import { Show, createSignal } from "solid-js";
import { CurrencySelect } from "../currencyselect/CurrencySelect";
import { Search } from "../search/Search";

export const Toggle = () => {
  const [toogleCryptoList, setToogleCryptoList] = createSignal(false);
  const [filter, setFilter] = createSignal("");

  return (
    <div>
      <CurrencySelect
        toogleCryptoList={toogleCryptoList}
        setToogleCryptoList={setToogleCryptoList}
      />
      <Show when={toogleCryptoList()}>
        <Search
          setToogleCryptoList={setToogleCryptoList}
          filter={filter}
          setFilter={setFilter}
        />
      </Show>
    </div>
  );
};
