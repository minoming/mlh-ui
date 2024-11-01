import axios from 'axios'
import { applicationConfigState } from '../../../config/atoms/ApplicationAtom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isLoadingState } from '../../../automs/AppAtom';


const useSchedulerLogService = () => {
  const applicationConfig = useRecoilValue(applicationConfigState)
  const setLoading = useSetRecoilState(isLoadingState)

  const getSchedulerLogs = async (params) => {
    params = params ? params : {}
    try {
      setLoading(true)
      const response = await axios.get(
        applicationConfig?.service?.url + '/schedulerlogs', {
          params: params
        }
      )

      return response.data

    } catch (error) {
      console.error('Error fetching scheduler logs:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getSchdulerLog = async (schedulerId) => {
    try {
    } catch (error) {
      console.error('Error fetching scheduler:', error)
      throw error
    }
  }

  return {
    getSchedulerLogs, 
    getSchdulerLog
  }
}

export default useSchedulerLogService
