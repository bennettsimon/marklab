import React, { useState, Children } from "react";
import { getLogo } from "../../../utility/utilities";
import arr from "../../../config/brands.json";
import SpringBtn from "../../common/springBtn";
import PopUp from "../../common/popUp";

function LogoSelector({ brand, onSelect }) {
  // 搜索
  const [searchField, setSearchField] = useState("");
  // 弹出标记
  const [bubble, setBubble] = useState(false);

  return (
    <div className="relative h-auto">
      <SpringBtn
        onClick={() => setBubble(!bubble)}
        className="bg-white h-10 w-16 p-3 flex justify-center items-center rounded-xl"
      >
        <img
          className="h-full"
          src={require(`../../../asset/logo/${getLogo(brand)}`)}
          alt={brand}
        />
      </SpringBtn>

      <PopUp visibility={bubble} onPopup={setBubble} touchClose={true}>
        {/* Search Field */}
        <div className="space-y-2">
          <input
            className="w-full p-3 my-2 bg-slate-50 rounded-xl text-sm font-bold placeholder:text-slate-300"
            type="text"
            placeholder="Search icons"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
          />
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-72 overflow-hidden overflow-y-scroll overscroll-none">
            {Children.toArray(
              Object.keys(arr[0])
                .filter(
                  (i) =>
                    i.toLowerCase().indexOf(searchField.toLowerCase()) > -1 &&
                    !i.includes("_light")
                )
                .map((e) => (
                  <SpringBtn
                    onClick={() => {
                      onSelect(e);
                      setBubble(!bubble);
                      setSearchField("");
                    }}
                    className="col-span-1 bg-gray-50 h-10 w-16 p-3 flex justify-center items-center rounded-xl"
                  >
                    <img
                      className="h-full"
                      src={require(`../../../asset/logo/${arr[0][e]}`)}
                      alt={e}
                    />
                  </SpringBtn>
                ))
            )}
          </div>
        </div>
      </PopUp>
    </div>
  );
}

export default LogoSelector;
