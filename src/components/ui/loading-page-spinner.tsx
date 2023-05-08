// components/LoadingSpinner.tsx
import React from "react";
import {Oval} from "react-loader-spinner";

interface LoadingPageSpinnerProps {
  size?: number;
}

const LoadingPageSpinner: React.FC<LoadingPageSpinnerProps> = ({size = 50}) => {
  return (
    <div className="loading-spinner-container">
      <Oval
        height={size}
        width={size}
        color="#2644EF"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#5F70D3"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
      <span className="loadingText">Loading...</span>
    </div>
  );
};

export default LoadingPageSpinner;
