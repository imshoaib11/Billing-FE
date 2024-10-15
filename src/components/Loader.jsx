import React,{useState, CSSProperties} from 'react'
import HashLoader from "react-spinners/HashLoader";

function Loader() {
    let [loading, setLoading] = useState(true);
    
  return <>
            <div>
        <div className="sweet-loading text-center" style={{marginTop:'100px'}}>
        <HashLoader
        color= '#e6c60f'
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
    </div>

  </>
}

export default Loader