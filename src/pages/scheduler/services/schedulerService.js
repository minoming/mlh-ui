import axios from "axios";
import { applicationConfigState } from "../../../config/atoms/ApplicationAtom";
import { useRecoilValue } from 'recoil';

const useSchedulerService = () => {
  const applicationConfig = useRecoilValue(applicationConfigState);

  const getSchduler = async (schedulerId) => {
    try {

    } catch (error) {
      console.error("Error fetching scheduler:", error);
      throw error;
    }
  };

  const getSchedulers = async () => {
    try {

    } catch (error) {
      console.error("Error fetching schedulers:", error);
      throw error;
    }
  };

  const postScheduler = async (schedulerInfo) => {
    try {
      let data = {
        name: schedulerInfo.schedulerName,
        description: schedulerInfo.schedulerDescription,
        status: "stopped",
        cronExpression: schedulerInfo.cronExpression
      }

      axios
        .post(applicationConfig?.service?.url + '/schedulers', data)
        .then((response) => {
          console.log(response)
          return response
        })
        .catch((Error) => {
          console.log(Error)
        })
    } catch (error) {
      console.error("Error creating scheduler:", error);
      throw error;
    }
  };

  const putScheduler = async (schedulerId, schedulerInfo) => {
    try {

    } catch (error) {
      console.error("Error updating scheduler:", error);
      throw error;
    }
  };

  const patchScheduler = async (schedulerId, schedulerInfo) => {
    try {

    } catch (error) {
      console.error("Error patching scheduler:", error);
      throw error;
    }
  };

  const deleteScheduler = async (schedulerId) => {
    try {

    } catch (error) {
      console.error("Error deleting scheduler:", error);
      throw error;
    }
  };

  return {
    getSchduler,
    getSchedulers,
    postScheduler,
    putScheduler,
    patchScheduler,
    deleteScheduler,
  };
};

export default useSchedulerService;
