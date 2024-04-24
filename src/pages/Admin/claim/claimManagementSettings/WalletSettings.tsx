/** @format */

import { useState } from "react";

const baseOptions = ["Payment Summary", "Wallet Details"];

export const WalletSettings: any = () => {
  const [choice, setchoice] = useState(baseOptions[0]);
  return (
    <div className="card mt-5 d-flex flex-wrap flex-stack">
      <div
        className="w-100 fw-bolder my-2 mt-5 mb-5"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        {baseOptions.map((elements, index) => {
          return (
            <button
              style={{ cursor: "pointer", width: "175px" }}
              key={index}
              className={
                choice === elements
                  ? "rounded shadow btn btn-sm btn-primary cursor-pointer"
                  : "btn btn-sm btn-primary cursor-pointer rounded"
              }
              onClick={() => setchoice(elements)}
            >
              {elements}
            </button>
          );
        })}
      </div>

      {choice}
    </div>
  );
};
