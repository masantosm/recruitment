import { defineStore } from 'pinia'
import CandidateService from '../../application/services/CandidateService'
import type { CandidateDTO } from '../../application/dtos/CandidateDTO'
import type { Status } from '../../domain/models/Status'

interface CandidateState {
  candidates: CandidateDTO[]
  vacancyStatus: Status[]
  vacancyId: string
}

export const useCandidateStore = defineStore('candidate', {
  state: (): CandidateState => ({
    candidates: [],
    vacancyStatus: [],
    vacancyId: '106ec090-e5a5-45af-b82f-a3b5eda4117c'
  }),

  actions: {
    async loadCandidateStatus(vacancyId: string) {
      const status = await CandidateService.fetchCandidateStatus(vacancyId)
      this.vacancyStatus = status.data
    },
    async loadCandidatesVacancy(vacancyId: string) {
      const status = await CandidateService.fetchCandidates(vacancyId)
      this.candidates = status.data
    },
    async updateCandidateStatus(candidateId: string, candidate: CandidateDTO, vacancyId: string) {
      await CandidateService.updateCandidate(candidateId, candidate)
      this.loadCandidatesVacancy(vacancyId)
    },
    async createNewCandidate(candidate: CandidateDTO, vacancyId: string) {
      await CandidateService.createCandidate(candidate)
      this.loadCandidatesVacancy(vacancyId)
    }
  },

  getters: {
    getCandidateStatus: (state): Status[] => {
      return state.vacancyStatus
    },
    getCandidates: (state): CandidateDTO[] => {
      return state.candidates
    },
    getVacancyID: (state) => {
      return state.vacancyId
    }
  }
})
