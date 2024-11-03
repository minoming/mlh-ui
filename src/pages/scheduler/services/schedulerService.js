import axios from 'axios'
import {applicationConfigState} from '../../../config/atoms/ApplicationAtom'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import {isLoadingState} from '../../../automs/AppAtom'

const useSchedulerService = () => {
  const applicationConfig = useRecoilValue(applicationConfigState)
  const setLoading = useSetRecoilState(isLoadingState)

  const getSchedulers = async (params) => {
    params = params ? params : {}
    try {
      setLoading(true)
      const response = await axios.get(
        applicationConfig?.service?.url + '/schedulers',
        {
          params: params
        }
      )
      return response.data
    } catch (error) {
      console.error('Error fetching schedulers:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getSchduler = async (schedulerId) => {
    try {
    } catch (error) {
      console.error('Error fetching scheduler:', error)
      throw error
    }
  }

  const postScheduler = async (schedulerInfo) => {
    try {
      let data = {
        name: schedulerInfo.schedulerName,
        description: schedulerInfo.schedulerDescription,
        url: schedulerInfo.url,
        status: 'stopped',
        cronExpression: schedulerInfo.cronExpression
      }

      setLoading(true)
      axios
        .post(applicationConfig?.service?.url + '/schedulers', data)
        .then((response) => {
          return response
        })
        .catch((Error) => {
          console.log(Error)
        })
    } catch (error) {
      console.error('Error creating scheduler:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const putScheduler = async (schedulerId, schedulerInfo) => {
    try {
    } catch (error) {
      console.error('Error updating scheduler:', error)
      throw error
    }
  }

  const patchScheduler = async (schedulerId, data) => {
    data = data ? data : {}
    try {
      setLoading(true)
      const response = await axios.patch(
        applicationConfig?.service?.url + '/schedulers/' + schedulerId,
        data
      )
      return response
    } catch (error) {
      console.error('Error patching scheduler:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteScheduler = async (schedulerId) => {
    try {
      setLoading(true)
      const response = await axios.delete(
        applicationConfig?.service?.url + '/schedulers/' + schedulerId
      )
      return response
    } catch (error) {
      console.error('Error deleting scheduler:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    getSchedulers,
    getSchduler,
    postScheduler,
    putScheduler,
    patchScheduler,
    deleteScheduler
  }
}

export default useSchedulerService
