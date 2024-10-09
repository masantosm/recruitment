import axiosInstance from '../../plugins/axios'
import type { CandidateDTO } from '../../application/dtos/CandidateDTO'

export default {
  getCandidateStatus(vacancyId: string) {
    return axiosInstance.get(`/candidate-status/${vacancyId}`)
  },

  getVacancyCandidates(vacancyId: string) {
    return axiosInstance.get(`/vacancies/${vacancyId}/candidates`)
  },

  addCandidate(candidateData: CandidateDTO) {
    return axiosInstance.post('/candidates', candidateData)
  },

  updateCandidate(candidateId: string, candidateData: CandidateDTO) {
    return axiosInstance.put(`/candidates/${candidateId}`, candidateData)
  }
}
