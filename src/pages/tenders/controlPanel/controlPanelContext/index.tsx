import { createContext, useEffect, useState } from "react";
import { Api } from "../../../../constants";
import axios from "axios";
import { Tender } from "../../../../types";
import {
  InComing,
  Ingoing,
  OnComingAndOngoing,
} from "../../../../types/Tasks/OnComingAndOngoing";

export const ControlPanelContext = createContext<ContextType>({
  isManager: false,
});

export default function ControlPanelContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tasksControlData, setTasksControlData] = useState<TenderStateType>({
    incoming: "none",
    ongoing: "none",
  });
  const [isManager, setIsManager] = useState(false);
  function getTasks(params?: unknown) {
    setTasksControlData({
      incoming: "loading",
      ongoing: "loading",
    });
    axios
      .get<Partial<OnComingAndOngoing> & { is_manager: boolean }>(
        Api("employee/tender/form"),
        {
          params,
        }
      )
      .then((res) => {
        let stateToUpdate: TenderStateType = {
          ongoing: "empty",
          incoming: "empty",
        };
        if (res.data.incoming?.length)
          stateToUpdate.incoming = res.data.incoming;

        if (res.data.ongoing?.length) stateToUpdate.ongoing = res.data.ongoing;
        setTasksControlData(stateToUpdate);
        setIsManager(!!res.data.is_manager);
      })
      .catch((error) => {
        setTasksControlData({
          incoming: "error",
          ongoing: "error",
        });
      });
  }
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <ControlPanelContext.Provider
      value={{
        tasksControlData,
        setTasksControlData: getTasks,
        isManager,
      }}
    >
      {children}
    </ControlPanelContext.Provider>
  );
}

type TenderStateType = {
  incoming: InComing[] | "none" | "error" | "loading" | "empty";
  ongoing: Ingoing[] | "none" | "error" | "loading" | "empty";
};
type ContextType = {
  tasksControlData?: TenderStateType;
  isManager: boolean;
  setTasksControlData?: ((param?: unknown) => void) | null;
};
