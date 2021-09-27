import Loader from "react-loader-spinner";

import { LoaderContainer } from "./Loader.styled";

export const LoaderSpinner = () => {
    return (
        <LoaderContainer>
            <Loader
                type="ThreeDots"
                color="#3F51B5"
                height={80}
                width={80}
                timeout={3000}
            />
        </LoaderContainer>
    )
}