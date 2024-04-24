import { PulseLoader } from "react-spinners";
// import { ScaleLoader } from "react-spinners";

export function LoadScreen() {
  return (
    <div className="mt-5 mb-5 text-center rounded p-5 ">
      <PulseLoader color="#633D95" />
      {/* <ScaleLoader color="#009EF7" /> */}
      {/* <h1>Loading</h1> */}
    </div>
  );
}