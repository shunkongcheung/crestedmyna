import React, { memo } from "react";
import PropTypes from "prop-types";

import Layout from "../Layout/Layout";
import classes from "./LoginView.module.scss";

interface ILoginViewProps {}

function LoginView({  }: ILoginViewProps) {
  return (
    <Layout unAuth>
      <div className={classes.containerOuter}>
				<div className={classes.containerInner}>


				</div>
      </div>
    </Layout>
  );
}

LoginView.propTypes = {};
export default memo(LoginView);
