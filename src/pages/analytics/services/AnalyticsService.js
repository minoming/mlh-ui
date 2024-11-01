import axios from 'axios'
import {useRecoilValue, useSetRecoilState} from 'recoil'
import { applicationConfigState } from '../../../config/atoms/ApplicationAtom';
import { isAnalyticsLoadingState } from '../../../automs/AppAtom';

const useAnalyticsService = () => {
  const applicationConfig = useRecoilValue(applicationConfigState)
  const setLoading = useSetRecoilState(isAnalyticsLoadingState)
  
  const postAnalytics = async (url, option) => {
    const data = option ? option : {}
    try {
      setLoading(true)
      const response = await axios.post(
        applicationConfig?.service?.url + '/analytics',
        data
      )
      return response
    } catch (error) {
      console.error('Error posting analytics:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    postAnalytics,
  }
}

export default useAnalyticsService