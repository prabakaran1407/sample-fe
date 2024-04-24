// import { PulseLoader } from "react-spinners";
import { ScaleLoader } from "react-spinners";

export function SecondaryLoadScreen() {
    return <div className="text-center rounded">
        {/* <PulseLoader color="#009EF7" /> */}
        <ScaleLoader color="#009EF7" height={30} />
        {/* <h1>Loading</h1> */}
    </div>
}