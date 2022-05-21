import React from "react";

import {
  NavigateFunction,
  Params,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { Location } from "history";

import { URLSearchParamsInit } from "react-router-dom";
export type ISerachParamsFunction = (
  nextInit: URLSearchParamsInit,
  navigateOptions?: { replace?: boolean | undefined; state?: any } | undefined
) => void;

export interface WithRouter {
  location?: Location;
  params?: Readonly<Params<string>>;
  searchParams?: URLSearchParams;
  setSearchParams?: ISerachParamsFunction;
  navigate?: NavigateFunction;
}

const withRouter =
  <P extends object>(
    Component: React.ComponentType<P>
  ): React.FC<P & WithRouter> =>
  (props) => {
    let location = useLocation();
    let params = useParams();
    let [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate();

    return (
      <Component
        location={location}
        params={params}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        navigate={navigate}
        {...(props as P)}
      />
    );
  };

export default withRouter;
