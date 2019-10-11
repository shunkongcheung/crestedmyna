import React, { memo, useCallback } from "react";
import { Button, Popconfirm, message } from "antd";
import PropTypes from "prop-types";

import classNames from "./StockCtrl.module.scss";

interface IStockCtrlProps {
  handleDelete: () => Promise<boolean>;
}

function StockCtrl({ handleDelete }: IStockCtrlProps) {
  const handleDeleteI = useCallback(
    async () => {
      const ok = await handleDelete();
      if (ok) message.success("Stock item is deleted");
    },
    [handleDelete]
  );
  return (
    <div className={classNames.row}>
      <div className={classNames.deleteBtn}>
        <Popconfirm
          title="Are you sure delete this stock?"
          onConfirm={handleDeleteI}
          okText="Delete"
          cancelText="Cancel"
        >
          <Button type="danger">DELETE</Button>
        </Popconfirm>
      </div>
    </div>
  );
}

StockCtrl.propTypes = {
  handleDelete: PropTypes.func.isRequired
};
export default memo(StockCtrl);
