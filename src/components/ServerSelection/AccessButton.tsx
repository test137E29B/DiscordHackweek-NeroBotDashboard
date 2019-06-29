import React from "react";
import { LoadingButton } from "../../ui/LoadingButton";
import { ButtonProps } from "@material-ui/core/Button";

export const AccessButton = ({ onClick, classes, ...rest }: ButtonProps) => {
  const [loading, setLoading] = React.useState(false);
  const handleClick = async (e: never) => {
    setLoading(true);
    if (onClick) await onClick(e);
  };
  return (
    <LoadingButton
      disabled={loading}
      loading={loading}
      {...rest}
      onClick={handleClick}
    />
  );
};
