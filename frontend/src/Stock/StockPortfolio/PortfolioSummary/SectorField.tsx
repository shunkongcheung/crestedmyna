import React, { memo, useEffect, useRef } from "react";
import { withFormik, FormikProps } from "formik";
import PropTypes from "prop-types";

import InputSelect from "../../../Base/Form/InputSelect2";

interface IFormVal {
  sectorsVal: Array<number>;
}

interface ISectorFieldProps {
  sectors: Array<{ name: string; id: number }>;
  handleSectorsChange: (s: Array<number>) => any;
}

interface IFormProps extends ISectorFieldProps {}

function SectorField({
  handleSectorsChange,
  sectors,
  ...formikProps
}: ISectorFieldProps & FormikProps<IFormVal>) {
  const oldSectors = useRef<Array<number>>([]);
  const { sectorsVal } = formikProps.values;

  useEffect(
    () => {
      if (!Array.isArray(sectorsVal)) return;
      if (oldSectors.current === sectorsVal) return;
      oldSectors.current = sectorsVal;
      handleSectorsChange(sectorsVal);
    },
    [handleSectorsChange, sectorsVal]
  );

  return <InputSelect choices={sectors} multiple name="sectorsVal" />;
}

SectorField.propTypes = {
  handleSectorsChange: PropTypes.func.isRequired,
  sectors: PropTypes.array.isRequired
};
export default withFormik<IFormProps, IFormVal>({
  handleSubmit: () => {}
})(memo(SectorField));
