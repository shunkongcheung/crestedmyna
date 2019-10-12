import React, { memo, useCallback, useState } from "react";
import { Button, Popconfirm, message } from "antd";
import PropTypes from "prop-types";

import EditAlertModal from "./EditAlertModal";

import classNames from "./StockCtrl.module.scss";

type TCondition = "COND_ABOVE" | "COND_BELOW";
interface IStockAlert {
  marketPriceValue: number;
  marketPriceCondition: TCondition;
  ccassPercentValue: number;
  ccassPercentCondition: TCondition;
  lastTriggerAt?: Date;
}

interface IStockCtrlProps {
  handleDelete: () => Promise<boolean>;
  handleStockAlertSubmit: (s: IStockAlert, f: any) => Promise<any>;
  stockAlert: IStockAlert;
}

function StockCtrl({
  handleDelete,
  handleStockAlertSubmit,
  stockAlert
}: IStockCtrlProps) {
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const handleAlertModalCancel = useCallback(
    () => setAlertModalVisible(false),
    []
  );
  const handleAlertModalOpen = useCallback(
    () => setAlertModalVisible(true),
    []
  );
  const handleDeleteI = useCallback(
    async () => {
      const ok = await handleDelete();
      if (ok) message.success("Stock item is deleted");
    },
    [handleDelete]
  );
  const handleStockAlertSubmitI = useCallback(
    async (s, f) => {
      const ok = await handleStockAlertSubmit(s, f);
      if(ok)setAlertModalVisible(false);
    },
    [handleStockAlertSubmit]
  );
  return (
    <div className={classNames.row}>
      <div className={classNames.alertBtn}>
        <Button onClick={handleAlertModalOpen}>EDIT ALERT</Button>
        <EditAlertModal
          isVisible={alertModalVisible}
          handleCancel={handleAlertModalCancel}
          handleAlertSubmit={handleStockAlertSubmitI}
          {...stockAlert}
        />
      </div>
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
