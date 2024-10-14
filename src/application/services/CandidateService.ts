import CandidateRepository from '../../infrastructure/http/CandidateRepository'
import type { CandidateDTO } from '@/application/dtos/CandidateDTO'

export default {
  async fetchCandidates(vacancyId: string) {
    const response = await CandidateRepository.getVacancyCandidates(vacancyId)
    return response.data
  },

  async createCandidate(candidate: CandidateDTO) {
    const response = await CandidateRepository.addCandidate(candidate)
    return response.data
  },

  async updateCandidate(candidateId: string, candidate: CandidateDTO) {
    const response = await CandidateRepository.updateCandidate(candidateId, candidate)
    return response.data
  },

  async fetchCandidateStatus(vacancyId: string) {
    const response = await CandidateRepository.getCandidateStatus(vacancyId)
    return response.data
  }
}
